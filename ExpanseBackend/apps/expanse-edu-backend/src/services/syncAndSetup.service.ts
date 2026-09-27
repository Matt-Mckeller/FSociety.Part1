import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import {
  Class,
  Coin,
  CoinEvent,
  Course,
  District,
  Enrollment,
  ExpansePerson,
  Experience,
  ExperienceEvent,
  ExpansePersonToCoin,
  School,
  Assignment,
  Submission,
} from '../entities';
import {
  Assignment as EdLinkAssignment,
  Submission as EdLinkSubmission,
} from '@edlink/typescript';
import { Edlink, IntegrationTokenSet, TokenSetType } from '@edlink/typescript';
import { RewardableEvent } from '../entities/RewardableEvent.entity';
import { ExpanseRole } from '../entities/ExpanseRole';
import { Role } from '../../../../libs/shared/src/enums/role.enum';

// Todo determine if any of these functions should be able to be called
// from client interactions such as retrieving assignments or submissions etc
// would allow for syncing less frequently and only doing active users
// or alternatively could do it when they log in rather than in the middle of a request
//  this is probably the best option
@Injectable()
export class SyncAndSetupService {
  constructor(
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  // move to a migration
  async initialSetup() {
    const entityManager = this.mainDataSource.manager;

    const existingExpanseCoin = await entityManager.findOne(Coin, {
      where: { name: 'xCoins' },
    });
    if (!existingExpanseCoin) {
      const expanseCoin = new Coin();
      expanseCoin.id = 'xCoins';
      expanseCoin.name = 'xCoins';
      await entityManager.save(expanseCoin);
    }

    const existingFamilyCoin = await entityManager.findOne(Coin, {
      where: { name: 'Family Coins' },
    });
    if (!existingFamilyCoin) {
      const familyCoin = new Coin();
      familyCoin.id = 'familyCoins';
      familyCoin.name = 'Family Coins';
      await entityManager.save(familyCoin);
    }
  }

  // Sync classes, courses, schools, districts
  async syncEdLinkSchoolStructure(edLinkGraphAccessToken) {
    // todo later, check if there are differences between the classes in the db
    // and the classes in the edlink api
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    const integrationTokenSet: IntegrationTokenSet = {
      access_token: edLinkGraphAccessToken,
      type: TokenSetType.Integration,
    };
    Edlink.up().then(console.log);
    const districtAsyncGenerator = edlink
      .use(integrationTokenSet)
      .districts.list();
    const districts = await districtAsyncGenerator.next();
    const district = districts.value;

    const manager = this.mainDataSource.manager;

    let expanseDistrict;
    const existingDistrict = await manager.findOne(District, {
      where: {
        edLinkID: district.id,
      },
    });
    if (!existingDistrict) {
      // create new district
      expanseDistrict = new District();
      expanseDistrict.edLinkID = district.id;
      expanseDistrict.name = district.name;
      await manager.save(expanseDistrict);
    } else {
      expanseDistrict = existingDistrict;
    }

    const schoolIterator = edlink.use(integrationTokenSet).schools.list();
    for await (const edLinkSchoolInstance of schoolIterator) {
      const existingSchool = await manager.findOne(School, {
        where: {
          edLinkID: edLinkSchoolInstance.id,
        },
      });
      let expanseSchool;
      if (!existingSchool) {
        // create new school
        expanseSchool = new School();
        expanseSchool.edLinkID = edLinkSchoolInstance.id;
        expanseSchool.name = edLinkSchoolInstance.name;
        expanseSchool.district = expanseDistrict;
        await manager.save(expanseSchool);
      } else {
        expanseSchool = existingSchool;
      }

      const courseIterator = edlink
        .use(integrationTokenSet)
        .schools.listCourses(expanseSchool.edLinkID);

      for await (const edLinkCourseInstance of courseIterator) {
        const existingCourse = await manager.findOne(Course, {
          where: {
            edLinkID: edLinkCourseInstance.id,
          },
        });
        let expanseCourse;
        if (!existingCourse) {
          // create new course
          expanseCourse = new Course();
          expanseCourse.edLinkID = edLinkCourseInstance.id;
          expanseCourse.name = edLinkCourseInstance.name;
          expanseCourse.school = expanseSchool;
          await manager.save(expanseCourse);
        } else {
          expanseCourse = existingCourse;
        }
      }

      const classIterator = edlink
        .use(integrationTokenSet)
        .schools.listClasses(expanseSchool.edLinkID);
      for await (const edLinkClassInstance of classIterator) {
        const existingClass = await manager.findOne(Class, {
          where: {
            edLinkID: edLinkClassInstance.id,
          },
        });

        let expanseClass;
        if (!existingClass) {
          // create new class
          expanseClass = new Class();
          expanseClass.edLinkID = edLinkClassInstance.id;
          expanseClass.name = edLinkClassInstance.name;
          expanseClass.school = expanseSchool;

          const course = await manager.findOne(Course, {
            where: {
              edLinkID: edLinkClassInstance.course_id,
            },
          });
          if (course) {
            expanseClass.course = course;
          }

          await manager.save(expanseClass);
        } else {
          expanseClass = existingClass;
        }
        await this.createCoinTypeForClass(expanseClass);
      }
    }
  }

  async syncEdLinkPerson(
    integrationAccessToken,
    edLinkPersonId,
  ): Promise<ExpansePerson> {
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    const integrationTokenSet: IntegrationTokenSet = {
      access_token: integrationAccessToken,
      type: TokenSetType.Integration,
    };
    Edlink.up().then(console.log);

    // could optimize by not making a second request if not needed
    const person = await edlink
      .use(integrationTokenSet)
      .people.fetch(edLinkPersonId);

    const manager = this.mainDataSource.manager;

    const expansePerson = await this.findOrCreatePersonFromEdLinkData({
      edLinkPersonId: person.id,
    });

    const personEnrollments = await edlink
      .use(integrationTokenSet)
      .people.listEnrollments(edLinkPersonId);
    for await (const personEnrollment of personEnrollments) {
      // associate the person with the class
      // associate the person with the coin type for the class ( initialize wallet )
      const existingEnrollment = await manager.findOne(Enrollment, {
        where: { edLinkID: personEnrollment.id },
      });

      if (existingEnrollment) {
        continue;
      }

      const existingClass = await manager.findOne(Class, {
        where: { edLinkID: personEnrollment.class_id },
      });

      if (!existingClass) {
        throw new NotFoundException(
          'Class not found for syncing enrollment to person',
        );
      }

      const enrollment = new Enrollment();
      enrollment.edLinkID = personEnrollment.id;
      enrollment.class = existingClass;
      enrollment.expansePerson = expansePerson;
      enrollment.role = personEnrollment.role;
      enrollment.startDate = personEnrollment.start_date;
      enrollment.endDate = personEnrollment.end_date;
      await manager.save(enrollment);
    }

    return expansePerson;
  }

  async syncEdLinkPeople(
    integrationAccessToken: string,
  ): Promise<ExpansePerson[]> {
    const syncedPeople: ExpansePerson[] = [];

    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    const integrationTokenSet: IntegrationTokenSet = {
      access_token: integrationAccessToken,
      type: TokenSetType.Integration,
    };
    Edlink.up().then(console.log);
    const personAsyncGenerator = edlink.use(integrationTokenSet).people.list();

    for await (const person of personAsyncGenerator) {
      try {
        const expansePerson = await this.syncEdLinkPerson(
          integrationAccessToken,
          person.id,
        );
        syncedPeople.push(expansePerson);
      } catch (error) {
        console.log('Error syncing person');
        console.log({ error });
      }
    }
    return syncedPeople;
  }

  async initializePersonCoinConnections(person: ExpansePerson) {
    const manager = this.mainDataSource.manager;
    const enrollments = await manager.find(Enrollment, {
      where: { expansePerson: { id: person.id }, role: 'student' },
      relations: ['class', 'class.coin'],
    });

    // Initialize Coins for Enrolled classes
    for (const enrollment of enrollments) {
      if (!enrollment?.class?.coin) {
        throw new UnprocessableEntityException('Coin not found for class');
      }

      const existingPersonCoin = await manager.findOne(Coin, {
        where: {
          expansePersonToCoins: {
            expansePerson: { id: person.id },
            coin: { id: enrollment.class.coin.id },
          },
          // coin: { id: enrollment.class.coin.id },
        },
      });

      if (existingPersonCoin) {
        break;
      }

      await this.mainDataSource.transaction(async (entityManager) => {
        try {
          const CoinEvents = new CoinEvent();
          CoinEvents.changeAmount = 0;
          CoinEvents.newValue = 0;
          CoinEvents.eventType = 'initial';
          const savedCoinEvent = await entityManager.save(CoinEvents);

          const expansePersonToCoin = new ExpansePersonToCoin();
          expansePersonToCoin.expansePerson = person;
          expansePersonToCoin.coin = enrollment.class.coin;
          expansePersonToCoin.quantity = 0;
          expansePersonToCoin.events = [savedCoinEvent];
          await entityManager.save(expansePersonToCoin);
        } catch (error) {
          console.log('Error initializing person class coin connection');
          throw error;
        }
      });
    }

    await this.mainDataSource.transaction(async (entityManager) => {
      try {
        // Initialize Expanse coins and Family Coins
        const ExpanseCoinAssociationEvent = new CoinEvent();
        ExpanseCoinAssociationEvent.changeAmount = 0;
        ExpanseCoinAssociationEvent.newValue = 0;
        ExpanseCoinAssociationEvent.eventType = 'initial';
        const savedEvent = await entityManager.save(
          CoinEvent,
          ExpanseCoinAssociationEvent,
        );

        const expansePersonToCoin = new ExpansePersonToCoin();
        expansePersonToCoin.expansePerson = person;
        expansePersonToCoin.coin = await manager.findOne(Coin, {
          where: { id: 'xCoins' },
        });
        expansePersonToCoin.quantity = 0;
        expansePersonToCoin.events = [savedEvent];
        await entityManager.save(ExpansePersonToCoin, expansePersonToCoin);
      } catch (error) {
        console.log('Error initializing expanse coin for person');
        throw error;
      }
    });
    await this.mainDataSource.transaction(async (entityManager) => {
      try {
        const FamilyCoinAssociationEvent = new CoinEvent();
        FamilyCoinAssociationEvent.changeAmount = 0;
        FamilyCoinAssociationEvent.newValue = 0;
        FamilyCoinAssociationEvent.eventType = 'initial';
        const savedCoinEvent = await entityManager.save(
          CoinEvent,
          FamilyCoinAssociationEvent,
        );

        const familyExpansePersonToCoin = new ExpansePersonToCoin();
        familyExpansePersonToCoin.expansePerson = person;
        familyExpansePersonToCoin.coin = await manager.findOne(Coin, {
          where: { id: 'familyCoins' },
        });
        familyExpansePersonToCoin.quantity = 0;
        familyExpansePersonToCoin.events = [savedCoinEvent];
        await entityManager.save(
          ExpansePersonToCoin,
          familyExpansePersonToCoin,
        );
      } catch (error) {
        console.log('Error initializing family coin for person');
        throw error;
      }
    });
  }

  async initializeExperience(expansePersonId: string) {
    const entityManager = this.mainDataSource.manager;
    await entityManager.transaction(async (transactionalEntityManager) => {
      const expansePerson = await transactionalEntityManager.findOne(
        ExpansePerson,
        {
          where: { id: expansePersonId },
        },
      );

      if (!expansePerson) {
        throw new NotFoundException(
          `Person with ID ${expansePersonId} not found`,
        );
      }

      const existingExperience = await transactionalEntityManager.findOne(
        Experience,
        {
          where: { expansePerson: { id: expansePersonId } },
        },
      );

      if (existingExperience) {
        throw new UnprocessableEntityException(
          `Experience record for person with ID ${expansePersonId} already exists`,
        );
      }

      // Create a new record if none exists and associate it with the person
      const experienceRecord = await transactionalEntityManager.create(
        Experience,
        {
          expansePersonId,
          expansePerson,
          level: 1,
          totalExperience: 0,
        },
      );
      await transactionalEntityManager.save(Experience, experienceRecord);
      const experienceEvent = await transactionalEntityManager.create(
        ExperienceEvent,
        {
          experience: experienceRecord,
          eventType: 'INITIALIZATION',
          experienceChange: 0,
        },
      );
      await transactionalEntityManager.save(ExperienceEvent, experienceEvent);
      const rewardableEvent = await transactionalEntityManager.create(
        RewardableEvent,
        {
          experienceEvents: [experienceEvent],
          eventType: 'INITIALIZATION',
          status: 'CLAIMABLE',
          student: expansePerson,
          assignment: null,
          class: null,
          school: null,
          teachers: [],
          submission: null,
        },
      );
      await transactionalEntityManager.save(RewardableEvent, rewardableEvent);
    });
  }

  async compareAndSyncAssignments(elClassAssignments: {
    [classEdLinkId: string]: EdLinkAssignment[];
  }): Promise<{
    [classEdLinkId: string]: {
      expanseAssignment: Assignment;
      elAssignment: EdLinkAssignment;
    }[];
  }> {
    // currently there are no fields being saved which should be updated because none of them should change they're just ids
    // todo, opportunity for performance improvement, one query vs multiple queries per assignments
    // also opportunity to check for last synced time?
    // let expanseAssignments = this.mainDataSource.manager.find(Assignment, {
    //   where: { edLinkID: In(elAssignments.map(({ id }) => id)) },
    // });

    const allClassIds = Object.keys(elClassAssignments);
    const expanseClasses = await this.mainDataSource.manager.find(Class, {
      where: { edLinkID: In(allClassIds) },
    });

    const expanseAssignmentMap: {
      [classEdLinkId: string]: {
        expanseAssignment: Assignment;
        elAssignment: EdLinkAssignment;
      }[];
    } = {};

    // Save all unsaved assignments
    for (const [classEdLinkId, elAssignments] of Object.entries(
      elClassAssignments,
    )) {
      const cls = expanseClasses.find((c) => c.edLinkID === classEdLinkId);
      if (!cls) {
        console.warn(`Class with EdLink ID ${classEdLinkId} not found.`);
        continue;
      }

      for (const elAssignment of elAssignments) {
        const expanseAssignment = await this.saveAssignment(elAssignment, cls);
        if (!expanseAssignmentMap[classEdLinkId]) {
          expanseAssignmentMap[classEdLinkId] = [];
        }
        expanseAssignmentMap[classEdLinkId].push({
          expanseAssignment,
          elAssignment,
        });
      }
    }
    return expanseAssignmentMap;
  }

  async compareAndSyncSubmissions(
    elSubmissions: {
      [elAssignmentId: string]: EdLinkSubmission;
    },
    expanseAssignments: { [expanseAssignmentId: string]: Assignment },
  ): Promise<
    {
      edLinkSubmission: EdLinkSubmission;
      expanseSubmission: Submission;
      elAssignmentId: string;
      expanseAssignmentId: string;
    }[]
  > {
    const expanseAssignmentsByEdLinkId = {};
    Object.values(expanseAssignments).forEach((expanseAssignment) => {
      expanseAssignmentsByEdLinkId[expanseAssignment.edLinkID] =
        expanseAssignment;
    });
    const expanseSubmissions: {
      edLinkSubmission: EdLinkSubmission;
      expanseSubmission: Submission;
      elAssignmentId: string;
      expanseAssignmentId: string;
    }[] = [];
    for (const elAssignmentId in elSubmissions) {
      const submission = elSubmissions[elAssignmentId];
      const {
        saveType,
        submission: expanseSubmission,
        updatedFields,
      } = await this.saveSubmission(
        submission,
        expanseAssignmentsByEdLinkId[elAssignmentId],
      );

      expanseSubmissions.push({
        elAssignmentId,
        expanseSubmission: expanseSubmission,
        edLinkSubmission: submission,
        expanseAssignmentId: expanseAssignmentsByEdLinkId[elAssignmentId].id,
      });
    }

    return expanseSubmissions;
  }

  async updateClassRewardSyncTimestamp(classEdLinkId: string) {
    const manager = this.mainDataSource.manager;
    const cls = await manager.findOne(Class, {
      where: { edLinkID: classEdLinkId },
    });
    cls.lastSuccessfulRewardSync = new Date();
    await manager.save(cls);
    return cls;
  }

  async saveAssignment(edLinkAssignment: EdLinkAssignment, cls: Class) {
    const manager = this.mainDataSource.manager;
    const assignment = await manager.findOne(Assignment, {
      where: { edLinkID: edLinkAssignment.id },
    });

    if (!assignment) {
      const newAssignment = new Assignment();
      newAssignment.edLinkID = edLinkAssignment.id;
      newAssignment.class = cls;
      await manager.save(newAssignment);
      return newAssignment;
    }
    return assignment;
  }

  async saveSubmission(
    submission: EdLinkSubmission,
    assignment: Assignment,
  ): Promise<{
    saveType: 'created' | 'updated' | 'none';
    submission: Submission;
    updatedFields: string[];
  }> {
    const updatedFields = [];
    const manager = this.mainDataSource.manager;
    const existingSubmission = await manager.findOne(Submission, {
      where: { edLinkID: submission.id },
      relations: ['student'],
    });

    if (!existingSubmission) {
      const student = await manager.findOne(ExpansePerson, {
        where: { edLinkID: submission.person_id },
      });
      if (!student) {
        console.error('Student not found for submission', submission);
        throw new Error(
          'Student not found for submission with edlink id: ' + submission.id,
        );
      }
      const newSubmission = new Submission();
      newSubmission.edLinkID = submission.id;
      newSubmission.assignment = assignment;
      newSubmission.state = submission.state;
      newSubmission.createdDate =
        submission.created_date && submission.created_date !== null
          ? new Date(submission.created_date)
          : null;
      newSubmission.updatedDate =
        submission.updated_date && submission.updated_date !== null
          ? new Date(submission.updated_date)
          : null;
      newSubmission.gradeComment = submission.grade_comment;
      newSubmission.gradePoints = submission.grade_points;
      newSubmission.grade = submission.grade;
      newSubmission.extraAttempts = submission.extra_attempts;
      newSubmission.student = student;
      await manager.save(newSubmission);

      return {
        saveType: 'created',
        updatedFields,
        submission: newSubmission,
      };
    } else {
      // compare the existing submission with the input data, update accordingly to match the input data
      // only update if there are differences
      if (existingSubmission.state !== submission.state) {
        existingSubmission.state = submission.state;
        updatedFields.push('state');
      }
      if (existingSubmission.gradeComment !== submission.grade_comment) {
        existingSubmission.gradeComment = submission.grade_comment;
        updatedFields.push('gradeComment');
      }
      if (existingSubmission.gradePoints !== submission.grade_points) {
        existingSubmission.gradePoints = submission.grade_points;
        updatedFields.push('gradePoints');
      }
      if (existingSubmission.grade !== submission.grade) {
        existingSubmission.grade = submission.grade;
        updatedFields.push('grade');
      }
      if (existingSubmission.extraAttempts !== submission.extra_attempts) {
        existingSubmission.extraAttempts = submission.extra_attempts;
        updatedFields.push('extraAttempts');
      }
      if (
        (submission.updated_date === null &&
          existingSubmission.updatedDate !== null) ||
        existingSubmission.updatedDate !== new Date(submission.updated_date)
      ) {
        existingSubmission.updatedDate =
          submission.updated_date && submission.updated_date !== null
            ? new Date(submission.updated_date)
            : null;
      }
      if (
        existingSubmission.createdDate !== new Date(submission.created_date)
      ) {
        existingSubmission.createdDate =
          submission.created_date && submission.created_date !== null
            ? new Date(submission.created_date)
            : null;
      }
      if (updatedFields.length === 0) {
        return {
          submission: existingSubmission,
          saveType: 'none',
          updatedFields,
        };
      } else {
        const updatedSubmission = await manager.save(existingSubmission);
        return {
          saveType: 'updated',
          updatedFields,
          submission: updatedSubmission,
        };
      }
    }
  }

  private async findOrCreatePersonFromEdLinkData({
    edLinkPersonId,
  }: {
    edLinkPersonId: string;
  }): Promise<ExpansePerson> {
    const manager = this.mainDataSource.manager;
    let expansePerson = await manager.findOne(ExpansePerson, {
      where: { edLinkID: edLinkPersonId },
    });

    if (!expansePerson) {
      const userRole = await manager.findOne(ExpanseRole, {
        where: { role: Role.ExpanseUser },
      });
      expansePerson = new ExpansePerson();
      expansePerson.edLinkID = edLinkPersonId;
      expansePerson.expanseRoles = [userRole];
      expansePerson = await manager.save(expansePerson);
    }

    return expansePerson;
  }

  private async createCoinTypeForClass(expanseClass: Class) {
    const manager = this.mainDataSource.manager;
    const classWithCoins = await manager.findOne(Class, {
      where: { id: expanseClass.id },
      relations: ['coin'],
    });

    const determineCoinName = (className: string) => {
      // Logic may be improved in the future, some details also mentioned on the Coin entity
      const words = className.split(' ');
      let coinIconText = '';

      if (words.length >= 2) {
        coinIconText = words[0][0] + words[1][0];
      } else {
        coinIconText = className.substring(0, 2);
      }

      return {
        name: className,
        coinIconText: coinIconText.toUpperCase(),
      };
    };

    const coinName = determineCoinName(expanseClass.name);

    if (!classWithCoins) {
      throw new NotFoundException(
        'Unable to find provided class in order to setup coins',
      );
    }
    if (!classWithCoins.coin) {
      // Create the coin
      const newCoin = new Coin();
      newCoin.class = expanseClass;
      newCoin.name = coinName.name;
      newCoin.coinIconText = coinName.coinIconText;
      await manager.save(newCoin);
    } else {
      // Coin already exists, no need to create a new one
    }
  }
}
