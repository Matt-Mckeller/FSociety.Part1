import { Resolver, Query, Args } from '@nestjs/graphql';

import { Context } from '@nestjs/graphql';
import { Request } from 'express';
import { EdLinkService } from '../services/edLink.service';
import {
  AssignmentIdAndClassIdInput,
  AssignmentDto,
  ClassDto,
  SubmissionDto,
  SubmissionAndRewardableEventDto,
} from '../dto/profile.models';
import {
  Assignment as EdLinkAssignment,
  Submission as EdLinkSubmission,
  TokenSetType,
} from '@edlink/typescript';
import { RewardableEventDto } from '../dto/reward.model';
import { RewardService } from '../services/reward.service';
import { EducationService } from '../services/education.service';
import { Assignment, Submission } from '../entities';
import { RewardableEvent } from '../entities/RewardableEvent.entity';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { SyncAndSetupService } from '../services/syncAndSetup.service';

@Resolver()
export class ProfileResolver {
  constructor(
    private edLinkService: EdLinkService,
    private rewardService: RewardService,
    private syncAndSetupService: SyncAndSetupService,
    private educationService: EducationService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  // Returns rewards that the current user created
  @Query((returns) => [AssignmentDto])
  async assignmentsForMyClasses(
    @Context('req') req: Request | any,
    @Args('elClassIds', { type: () => [String] }) elClassIds: string[],
  ): Promise<AssignmentDto[]> {
    const expansePerson = req?.expansePerson;
    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }
    if (!req.edLinkAccessToken) {
      throw new Error('Unable to find edLink access token');
    }
    const edLinkAccessToken = req.edLinkAccessToken;
    const edLinkRefreshToken = req.edLinkRefreshToken;
    const assignmentsWithClassId: { [classId: string]: EdLinkAssignment[] } =
      await this.edLinkService.getAssignmentsForClasses(
        edLinkAccessToken,
        elClassIds,
        TokenSetType.Person,
        edLinkRefreshToken,
      );

    if (
      this.configService.get('NODE_ENV') === 'development' &&
      this.configService.get('USE_MOCK_DATA_FOR_ASSIGNMENTS_RETRIEVAL') ===
        'true'
    ) {
      // Append person id to demo data id
      Object.keys(assignmentsWithClassId).forEach((classId) => {
        assignmentsWithClassId[classId].forEach((assignment) => {
          if (!assignment.id.includes(expansePerson.id)) {
            assignment.id = `${assignment.id}-${expansePerson.id}`;
          }
        });
      });
    }
    // return;
    // check for missing assignments when compared to edlink assignments
    // todo: can offload this in the future? doesnt have to be blocking of the request response, could be an event
    // Doing this because submissions will be retrieved after and rewardable events will need to be created for those
    // Submissions from expanse and submission data from edlink are merged together
    // Todo determine if this compare and sync should be done here
    const updatedAssignments: {
      [classEdLinkId: string]: {
        expanseAssignment: Assignment;
        elAssignment: EdLinkAssignment;
      }[];
    } = await this.syncAndSetupService.compareAndSyncAssignments(
      assignmentsWithClassId,
    );
    const rewardEvents = [];
    const mappedAssignments = [];
    Object.keys(updatedAssignments).forEach((classEdLinkId) => {
      mappedAssignments.push(
        ...updatedAssignments[classEdLinkId].map(
          ({ expanseAssignment, elAssignment }) =>
            AssignmentDto.fromEntity(
              elAssignment,
              rewardEvents,
              classEdLinkId,
              expanseAssignment.id,
            ),
        ),
      );
    });
    return mappedAssignments;
  }

  // @Query((returns) => [AssignmentDto])
  // async rewardableEventsPendingForClasses(
  //   @Context('req') req: Request | any,
  //   @Args('classIds', { type: () => [String] }) classIds: string[],
  // ): Promise<AssignmentDto[]> {
  //   return {
  //     abc: 1,
  //     def: 2,
  //     efg: 3,
  //   };
  // }

  // may end up converting this over to a retrieving from expanse rather than from edlink
  // for performance and to combine with rewardable events
  // since submissions are one at a time and per assignment
  @Query((returns) => [SubmissionAndRewardableEventDto])
  async submissionsAndRewardableEventsForMyAssignments(
    @Context('req') req: Request | any,
    @Args('elAssignmentIdWithClassId', {
      type: () => [AssignmentIdAndClassIdInput],
    })
    elAssignmentIdWithClassId: AssignmentIdAndClassIdInput[],
  ): Promise<SubmissionAndRewardableEventDto[]> {
    const person = req?.expansePerson;
    if (!person || !person.id || !req.edLinkAccessToken) {
      throw new Error('Unable to find current user');
    }
    const edLinkAccessToken = req.edLinkAccessToken;
    const edLinkRefreshToken = req.edLinkRefreshToken;
    const submissions: { [elAssignmentId: string]: EdLinkSubmission } =
      await this.edLinkService.getSubmissionsForAssignments(
        edLinkAccessToken,
        elAssignmentIdWithClassId,
        TokenSetType.Person,
        edLinkRefreshToken,
      );
    // problem is occuring in this ^ not getting submissions back associated with the right assignment
    // and its also an array format, should it be 1 to 1?

    if (
      this.configService.get('NODE_ENV') === 'development' &&
      this.configService.get('USE_MOCK_DATA_FOR_ASSIGNMENTS_RETRIEVAL') ===
        'true'
    ) {
      // Append person id to demo data id and update the person id to be the student id
      Object.keys(submissions).forEach((elAssignmentId) => {
        const submission = submissions[elAssignmentId];
        if (submission && !submission.id.includes(person.id)) {
          submission.id = `${submission.id}-${person.id}`;
          submission.person_id = `${person.edLinkID}`;
        }
      });
    }

    const expanseAssignments = await this.educationService.getAssignmentsByIds(
      elAssignmentIdWithClassId.map(({ elAssignmentId }) => elAssignmentId),
    );

    const expanseAssignmentIdMap: {
      [expanseAssignmentId: string]: Assignment;
    } = {};
    expanseAssignments.forEach((expanseAssignment) => {
      expanseAssignmentIdMap[expanseAssignment.id] = expanseAssignment;
    });

    const expanseSubmissions: {
      expanseSubmission: Submission;
      edLinkSubmission: EdLinkSubmission;
      elAssignmentId: string;
      expanseAssignmentId: string;
    }[] = await this.syncAndSetupService.compareAndSyncSubmissions(
      submissions,
      expanseAssignmentIdMap,
    );

    const response: SubmissionAndRewardableEventDto[] = [];
    // performance: can put in checks to see the last time the submission was updated to see if we should fetch again or if its okay
    for (const {
      expanseSubmission,
      edLinkSubmission,
      elAssignmentId,
      expanseAssignmentId,
    } of expanseSubmissions) {
      // update vs create and I only need to do this if theres not already an existing rewardable event
      // perhaps fetch class school and teachers only if the submission does not have a rewardable event
      // in the update function
      const rewardableEvent =
        await this.rewardService.updateRewardableEventForSubmission(
          expanseSubmission,
          expanseAssignmentIdMap[expanseAssignmentId],
          person,
        );
      response.push({
        submission: SubmissionDto.fromEntity(
          edLinkSubmission,
          elAssignmentId,
          rewardableEvent?.id,
          expanseAssignmentId,
        ),
        rewardableEvent: RewardableEventDto.fromEntity(
          rewardableEvent,
          elAssignmentId,
          expanseAssignmentId,
        ),
        assignmentId: expanseAssignmentId,
        elAssignmentId: elAssignmentId,
      });
    }

    return response;
  }

  async studentRewardableEventsForMyAssignments(
    @Context('req') req: Request | any,
    @Args('elAssignmentIdWithClassId', { type: () => [String] })
    elAssignmentIds: string[],
  ): Promise<RewardableEventDto[]> {
    const expansePerson = req?.expansePerson;
    if (!expansePerson || !expansePerson.id || !req.edLinkAccessToken) {
      throw new Error('Unable to find current user');
    }

    // todo make sure I'm retrieving the correct rewardable events
    const rewardableEvents =
      await this.rewardService.getStudentRewardableEventsForAssignments(
        elAssignmentIds,
        expansePerson.edLinkId,
      );

    // will need a sync function to get submissions and assignments and determine the reward events
    // currently though I'm mocking data so I can just return some fake reward events

    const mappedRewardableEvents = rewardableEvents.map((rewardableEvent) =>
      RewardableEventDto.fromEntity(rewardableEvent),
    );
    return mappedRewardableEvents;
  }

  // Returns rewards that the current user created
  @Query((returns) => [ClassDto])
  async myClasses(@Context('req') req: Request | any): Promise<ClassDto[]> {
    const expansePerson = req.expansePerson;
    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }

    const { classes: edLinkClasses, enrollments } =
      await this.edLinkService.getMyClasses(
        req.edLinkAccessToken,
        expansePerson.edLinkId,
      );
    const expanseClasses =
      await this.edLinkService.getExpanseClasses(edLinkClasses);

    const results: ClassDto[] = [];
    expanseClasses.forEach((cls) => {
      const expanseClassId = cls.id;
      const edLinkClass = edLinkClasses.find(
        (elCls) => elCls.id === cls.edLinkID,
      );
      const enrollmentsForClass = enrollments.filter(
        (enrollment) => enrollment.class_id === cls.edLinkID,
      );
      const combinedClass: ClassDto = ClassDto.fromEntity(
        edLinkClass,
        expanseClassId,
        // Note that there may be duplicate enrollments for reasons such as multiple canvas associations, based on demo data, not sure what this means exactly yet
        enrollmentsForClass,
      );
      results.push(combinedClass);
    });
    return results;
  }
}
