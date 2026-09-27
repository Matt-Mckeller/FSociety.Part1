import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import {
  Edlink,
  Class as EdLinkClass,
  IntegrationTokenSet,
  PersonTokenSet,
  TokenSetType,
  Enrollment as EdLinkEnrollment,
  Assignment as EdLinkAssignment,
  Submission as EdLinkSubmission,
  TokenSet,
  RequestOptionsPaging,
  Person as EdLinkPerson,
} from '@edlink/typescript';
import {
  Class,
  Coin,
  CoinEvent,
  Course,
  District,
  Enrollment,
  ExpansePerson,
  ExpansePersonToCoin,
  School,
} from '../entities';
import { MOCK_DEMO_ASSIGNMENTS, MOCK_SUBMISSIONS } from '../mockData/mockData';
import { ConfigService } from '@nestjs/config';
import { BearerTokenAPI } from '@edlink/typescript';

@Injectable()
export class EdLinkService {
  constructor(
    @InjectDataSource('main')
    private mainDataSource: DataSource,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async getProfile(edLinkAccessToken): Promise<EdLinkPerson> {
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });

    Edlink.up().then(console.log);
    const tokenSet: TokenSet = {
      access_token: edLinkAccessToken,
      type: TokenSetType.Person,
    };

    return await edlink.use(tokenSet).my.profile();
  }

  async getAssignmentsForClasses(
    edLinkAccessToken: string,
    classIds: string[],
    type: TokenSetType = TokenSetType.Person,
    edLinkRefreshToken?: string,
  ): Promise<{ [classId: string]: EdLinkAssignment[] }> {
    console.log('getting assignments for ', classIds);
    if (
      this.configService.get('NODE_ENV') === 'development' &&
      this.configService.get('USE_MOCK_DATA_FOR_ASSIGNMENTS_RETRIEVAL') ===
        'true'
    ) {
      const mockResponse = {};
      const mockAssignmentCount = MOCK_DEMO_ASSIGNMENTS.length;
      let currentAssignmentIndex = 0;
      const assignmentsPerClass = 3;
      classIds.forEach((classId) => {
        if (currentAssignmentIndex <= mockAssignmentCount) {
          const newAssignmentIndex = Math.max(
            currentAssignmentIndex + assignmentsPerClass,
            mockAssignmentCount,
          );
          mockResponse[classId] = MOCK_DEMO_ASSIGNMENTS.slice(
            currentAssignmentIndex,
            newAssignmentIndex,
          );
          currentAssignmentIndex = newAssignmentIndex;
        } else {
          mockResponse[classId] = [];
        }
      });
      return mockResponse;
    }
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });

    Edlink.up().then(console.log);

    const assignments: { [classId: string]: EdLinkAssignment[] } = {};
    for (const classId of classIds) {
      assignments[classId] = [];
      let assignmentAsyncGenerator: AsyncGenerator<EdLinkAssignment>;
      if (type === TokenSetType.Person) {
        const tokenSet: TokenSet = {
          access_token: edLinkAccessToken,
          type: TokenSetType.Person,
          refresh_token: edLinkRefreshToken || undefined,
          expires_in: new Date(Date.now() + 24 * 3600 * 1000),
          expiration_date: new Date(Date.now() + 24 * 3600 * 1000),
        };
        assignmentAsyncGenerator = edlink
          .use(tokenSet)
          .assignments.list(classId);
      } else {
        // todo may be able to access .paginate on edlink object
        const tokenSet: TokenSet = {
          access_token: edLinkAccessToken,
          type: TokenSetType.Integration,
        };
        edlink.use(tokenSet);
        const EdLinkBearerTokenAPI = new BearerTokenAPI(edlink, tokenSet);
        const options: RequestOptionsPaging = {};
        assignmentAsyncGenerator =
          EdLinkBearerTokenAPI.paginate<EdLinkAssignment>(
            `/classes/${classId}/assignments`,
            options,
          );
      }

      for await (const assignment of assignmentAsyncGenerator) {
        assignments[classId].push(assignment);
      }
    }

    return assignments;
  }

  async getSubmissionsForAssignments(
    edLinkAccessToken: string,
    elAssignmentIdWithClassId: { elAssignmentId: string; elClassId: string }[],
    type: TokenSetType = TokenSetType.Person,
    edLinkRefreshToken?: string,
  ): Promise<{ [elAssignmentId: string]: EdLinkSubmission }> {
    // Note that non demo retrieval is untested at the moment be sure to test
    if (
      this.configService.get('NODE_ENV') === 'development' &&
      this.configService.get('USE_MOCK_DATA_FOR_SUBMISSION_RETRIEVAL') ===
        'true'
    ) {
      const mockResponse = {};
      const usedMockSubmissions = new Set();
      elAssignmentIdWithClassId.forEach(({ elAssignmentId }) => {
        const availableSubmission = MOCK_SUBMISSIONS.find(
          (submission) => !usedMockSubmissions.has(submission.id),
        );
        if (availableSubmission) {
          mockResponse[elAssignmentId] = availableSubmission;
          usedMockSubmissions.add(availableSubmission.id);
        } else {
          mockResponse[elAssignmentId] = undefined;
        }
      });
      return mockResponse;
    }

    console.log('getting submissions', elAssignmentIdWithClassId);
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    Edlink.up().then(console.log);

    const submissions: { [assignmentId: string]: EdLinkSubmission } = {};
    for (const { elAssignmentId, elClassId } of elAssignmentIdWithClassId) {
      submissions[elAssignmentId] = undefined;
      let submissionAsyncGenerator: AsyncGenerator<EdLinkSubmission>;
      if (type === TokenSetType.Person) {
        const tokenSet: TokenSet = {
          access_token: edLinkAccessToken,
          type: TokenSetType.Person,
          refresh_token: edLinkRefreshToken || undefined,
          expires_in: new Date(Date.now() + 3600 * 1000),
          expiration_date: new Date(Date.now() + 3600 * 1000),
        };
        submissionAsyncGenerator = edlink
          .use(tokenSet)
          .submissions.list(elClassId, elAssignmentId);
      } else {
        const tokenSet: TokenSet = {
          access_token: edLinkAccessToken,
          type: TokenSetType.Integration,
        };
        edlink.use(tokenSet);
        const EdLinkBearerTokenAPI = new BearerTokenAPI(edlink, tokenSet);
        const options: RequestOptionsPaging = {};
        submissionAsyncGenerator =
          EdLinkBearerTokenAPI.paginate<EdLinkSubmission>(
            `/classes/${elClassId}/assignments/${elAssignmentId}/submissions`,
            options,
          );
      }
      console.log({ assignmentId: elAssignmentId });

      for await (const submission of submissionAsyncGenerator) {
        submissions[elAssignmentId] = submission;
      }
    }

    return submissions;
  }

  // todo this needs better filtering and optimization
  // i.e. need to make sure the enrollments are the current enrollments and that they are active
  // could optimize based on profile roles but not sure if we can trust that information
  // continuous http requests for every single enrollment is not ideal, same for other requests
  // saving info to the db and updating it periodically would work and being able to query our own data
  // but this would take time to implement
  private async getClasses(
    edLinkAccessToken: string,
    personEdLinkId: string,
    enrollmentType: 'student' | 'teacher' | 'all',
  ): Promise<{ classes: EdLinkClass[]; enrollments: EdLinkEnrollment[] }> {
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    const tokenSet: PersonTokenSet = {
      access_token: edLinkAccessToken,
      type: TokenSetType.Person,
    };
    Edlink.up().then(console.log);

    const classesAsyncGenerator = edlink.use(tokenSet).classes.list();
    const classes = [];
    const enrollments = [];

    for await (const cls of classesAsyncGenerator) {
      const enrollmentAsyncGenerator = edlink
        .use(tokenSet)
        .classes.listEnrollments(cls.id, {
          filter: {
            person_id: [{ operator: 'equals', value: personEdLinkId }],
          },
        });

      let hasRequiredEnrollmentType = false;
      for await (const enrollment of enrollmentAsyncGenerator) {
        if (enrollment.role === enrollmentType || enrollmentType === 'all') {
          hasRequiredEnrollmentType = true;
          enrollments.push(enrollment);
        }
      }
      if (hasRequiredEnrollmentType) {
        classes.push(cls);
      }
    }

    return { classes, enrollments };
  }

  async getStudentClasses(edLinkAccessToken, personEdLinkId) {
    const { classes } = await this.getClasses(
      edLinkAccessToken,
      personEdLinkId,
      'student',
    );
    return classes;
  }

  async getTaughtClasses(
    edLinkAccessToken,
    personEdLinkId,
  ): Promise<EdLinkClass[]> {
    const { classes } = await this.getClasses(
      edLinkAccessToken,
      personEdLinkId,
      'teacher',
    );
    return classes;
  }

  async getMyClasses(
    edlinkAcc,
    personEdLinkId,
  ): Promise<{ classes: EdLinkClass[]; enrollments: EdLinkEnrollment[] }> {
    return this.getClasses(edlinkAcc, personEdLinkId, 'all');
  }

  async getExpanseClasses(edLinkClasses: EdLinkClass[]) {
    const expanseClasses = await this.mainDataSource.manager.find(Class, {
      where: { edLinkID: In(edLinkClasses.map((cls) => cls.id)) },
    });
    return expanseClasses;
  }

  async getEnrollmentsForClass(edLinkAccessToken, classId) {
    const enrollments = await fetch(
      `https://ed.link/api/v2/my/classes/${classId}/enrollments`,
      {
        headers: {
          Authorization: `Bearer ${edLinkAccessToken}`,
        },
      },
    );
    const enrollmentsResponse = await enrollments.json();
    return enrollmentsResponse;
  }

  async validateClassesAreTaughtByTeacher(
    edLinkAccessToken,
    classIds,
    personEdLinkId,
  ) {
    const classes = await this.getTaughtClasses(
      edLinkAccessToken,
      personEdLinkId,
    );
    if (!classes || !classes.length) {
      throw new Error('No classes found');
    }

    const classesWithEnrollments = await Promise.all(
      classes.map(
        async (
          classItem: EdLinkClass & { enrollments: EdLinkEnrollment[] },
        ) => {
          const enrollmentsResponse = await this.getEnrollmentsForClass(
            edLinkAccessToken,
            classItem.id,
          );
          classItem.enrollments = enrollmentsResponse['$data'] || [];
          return classItem;
        },
      ),
    );

    // Class ids exist in the list of user classes
    // User is a teacher in the class
    const allowedClasses = classesWithEnrollments
      .filter((classItem) => {
        return classIds.includes(classItem.id);
      })
      .filter((classItem) => {
        const teacherEnrollment = classItem.enrollments.find(
          (enrollment) => enrollment.role === 'teacher',
        );
        return !!teacherEnrollment;
      });

    return allowedClasses.length === classIds.length;
  }
}
