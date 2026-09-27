import {
  Controller,
  Get,
  NotFoundException,
  Options,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Query, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './services/authentication.service';
import { EdLinkService } from './services/edLink.service';
import { WalletService } from './services/wallet.service';
import { Class } from './entities/Class';
import { School } from './entities/School';
import {
  Class as EdLinkClass,
  Edlink,
  PersonTokenSet,
  School as EdLinkSchool,
  Assignment as EdLinkAssignment,
  Submission as EdLinkSubmission,
  TokenSetType,
  IntegrationTokenSet,
} from '@edlink/typescript';
import { EducationService } from './services/education.service';
import { RewardableEvent } from './entities/RewardableEvent.entity';
import { Assignment, ExpansePerson, Submission } from './entities';
import { RewardService } from './services/reward.service';
import { DataSource, EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CREATE_DEMO_ASSIGNMENTS, DEMO_CLASSES } from './mockData/mockData';
import { ExperienceService } from './services/experienceService';
import { SyncAndSetupService } from './services/syncAndSetup.service';
import { ExpanseRole } from './entities/ExpanseRole';
import { Role } from '../../../libs/shared/src/enums/role.enum';

// eventually will want to move some of these endpoints to a cli rather than an http endpoint
@Controller()
export class ExpanseEduBackendController {
  constructor(
    private authenticationService: AuthenticationService,
    private edLinkService: EdLinkService,
    private walletService: WalletService,
    private educationService: EducationService,
    private rewardService: RewardService,
    private syncAndSetupService: SyncAndSetupService,
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  @Get('/ssoLogin')
  async ssoLogin(
    @Req() request: Request,
    @Query() query: any,
    @Res() response: Response,
  ) {
    // todo error page redirect rather than returning an error to the user

    const queryParams = request.query;
    const redirectToken = queryParams?.code;
    if (!redirectToken || typeof redirectToken !== 'string') {
      throw new Error('No redirect token found');
    }

    const { edLinkAccessToken, edLinkRefreshToken } =
      await this.authenticationService.getEdLinkAccessTokenFromRedirectToken(
        redirectToken,
      );

    const userProfile = await this.edLinkService.getProfile(edLinkAccessToken);
    console.log({ userProfile });
    const userId = userProfile?.id;
    if (!userId) {
      throw new Error('No user id found');
    }

    const createdTokens = await this.authenticationService.saveTokensForUser(
      userId,
      edLinkAccessToken,
      edLinkRefreshToken,
    );

    // redirect w/ expanseAccessToken
    const redirectUrl = `http://localhost:3000/demo?expanseAccessToken=${createdTokens.expanseAccessToken}`;
    return response.redirect(redirectUrl);
  }

  @Get('/syncPeopleById')
  async syncPeopleById(@Res() response: Response) {
    // save client secrets to the env? well maybe database because theres alot of tokens and they may change?
    const integrationAccessTokens = [
      { name: 'Canvas', accessToken: 'KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f' },
      {
        name: 'Google Classroom',
        accessToken: 'Kr0GRJIqZKmdExRezQjJdchtx8sPkoeV',
      },
      {
        name: 'Schoology',
        accessToken: 'LcGZOqfKejp3WpJpyhd2KVUAOiqFjJaj',
      },
      {
        name: 'Blackboard',
        accessToken: 'Uy1Cua3M8JX7z86XQ2grbkcwBfuOOVfl',
      },
    ];
    // query on behalf of the integration to set up commands

    const integrationAccessToken = 'KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f';
    const edLinkpersonIds = ['8286451d-0ab3-43ae-b4d7-0536a1ca85b3'];

    for (const personId of edLinkpersonIds) {
      await this.syncAndSetupService.syncEdLinkPerson(
        integrationAccessToken,
        personId,
      );
    }

    return response.json({ message: 'Integration setup complete' });
  }

  @Get('/addRandomCoinsForDemo')
  async addRandomCoinsForDemo(
    @Req() request: Request | any,
    @Query() query: any,
    @Res() response: Response,
  ) {
    const expansePersonId = 'b9c62f0e-cc78-4d68-9e56-e92871259208';
    const coinId = 'f580f5ff-eb6b-40c7-bbc5-89500e29e86f';
    await this.walletService.addCoins(coinId, expansePersonId, 50, 'demo');
    return 'success';
  }

  @Get('/sync')
  async sync(@Res() response: Response) {
    // todo handle ongoing syncing, changes in saved data and current edlink data
    // i.e. new class, changes to classes, new assignments, etc
    // Probably want to try and utilize events as much as possible in order to save money
    // on queries. But also may need to do polling just to verify and incase any errors occur
    // Also probably need to account for errors related to having schools without classes,
    // classes without people, people with uninitialized experience or coins or something else
    // etc

    // Eventually move these somewhere else, probably db
    const integrationAccessTokens = [
      { name: 'Canvas', accessToken: 'KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f' },
      {
        name: 'Google Classroom',
        accessToken: 'Kr0GRJIqZKmdExRezQjJdchtx8sPkoeV',
      },
      {
        name: 'Schoology',
        accessToken: 'LcGZOqfKejp3WpJpyhd2KVUAOiqFjJaj',
      },
      {
        name: 'Blackboard',
        accessToken: 'Uy1Cua3M8JX7z86XQ2grbkcwBfuOOVfl',
      },
    ];
    const integrationAccessToken = integrationAccessTokens.find(
      (v) => v.name === 'Canvas',
    ).accessToken;
    await this.syncAndSetupService.initialSetup();
    await this.syncAndSetupService.syncEdLinkSchoolStructure(
      integrationAccessToken,
    );
    const syncedPeople: ExpansePerson[] =
      await this.syncAndSetupService.syncEdLinkPeople(integrationAccessToken);
    for (const expansePerson of syncedPeople) {
      await this.syncAndSetupService.initializePersonCoinConnections(
        expansePerson,
      );
      try {
        await this.syncAndSetupService.initializeExperience(expansePerson.id);
      } catch (e) {
        if (e instanceof NotFoundException) {
          console.log(e.message, expansePerson.id);
        }
        if (e instanceof UnprocessableEntityException) {
          console.error(e.message, expansePerson.id);
        }
      }
    }
    // await this.syncPeople(response);
    return response.json({ message: 'Integration setup complete' });
  }

  // @Get('/addRolesTemp')
  // async addRolesTemp() {
  //   const manager = this.mainDataSource.manager;
  //   const expansePerson = await manager.find(ExpansePerson);
  //   for (const expansePersonInstance of expansePerson) {
  //     const userRole = await manager.findOne(ExpanseRole, {
  //       where: { role: Role.ExpanseUser },
  //     });
  //     // save user role to expanse person if it doesnt already exist
  //     if (!expansePersonInstance.roles) {
  //       expansePersonInstance.roles = [userRole];
  //     }
  //     await manager.save(expansePersonInstance);
  //   }
  // }

  @Get('/createSampleAssignments')
  async createAssignments() {
    return;
    const integrationAccessToken = 'KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f';
    // const hardCodedSchoolId = '';
    const edlink = new Edlink({
      client_id: process.env.ED_LINK_CLIENT_ID,
      client_secret: process.env.ED_LINK_CLIENT_SECRET,
    });
    const integrationTokenSet: IntegrationTokenSet = {
      access_token: integrationAccessToken,
      type: TokenSetType.Integration,
    };
    Edlink.up().then(console.log);
    for (const cls of DEMO_CLASSES) {
      for (const assignment of CREATE_DEMO_ASSIGNMENTS) {
        await edlink
          .use(integrationTokenSet)
          .request({
            url: `/classes/${cls.id}/assignments`,
            method: 'POST',
            // headers?: Record<string, string>;
            data: assignment,
          })
          .then(console.log);
      }
    }
  }

  @Get('/syncAllAssignmentsAndSubmissionsAndSetupRewards')
  async syncAllAssignmentsAndSubmissionsAndSetupRewards(
    @Res() response: Response,
  ) {
    // Todo: Do I want to run these syncs during the initial setup?
    // Grab all classes in the system, determine their integration and grab token
    // begin syncing rewards for each person
    // For each school sync rewards
    const integrationAccessTokens = [
      { name: 'Canvas', accessToken: 'KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f' },
      {
        name: 'Google Classroom',
        accessToken: 'Kr0GRJIqZKmdExRezQjJdchtx8sPkoeV',
      },
      {
        name: 'Schoology',
        accessToken: 'LcGZOqfKejp3WpJpyhd2KVUAOiqFjJaj',
      },
      {
        name: 'Blackboard',
        accessToken: 'Uy1Cua3M8JX7z86XQ2grbkcwBfuOOVfl',
      },
    ];
    // query on behalf of the integration to set up commands

    const integrationAccessToken = integrationAccessTokens.find(
      (v) => v.name === 'Canvas',
    ).accessToken;
    // const hardCodedSchoolId = '';
    const schools = await this.educationService.findAllSchools();
    for (const school of schools) {
      await this.syncRewardsForSchool(school, integrationAccessToken);
    }

    return response.json({
      message: 'Reward and Assignment integration sync and setup complete',
    });
  }

  private async syncRewardsForSchool(
    school: School,
    integrationAccessToken: string,
  ) {
    // Grab all classes in the associated with a school, determine their integration and grab token
    // begin syncing rewards for each person
    // Sync and update class rewards
    // Sync and update attendance rewards

    const classes = await this.educationService.getClassesForSchool(school.id);
    for (const cls of classes) {
      try {
        await this.syncAssignmentsAndSubmissionsAndSetupRewards(
          school,
          cls,
          integrationAccessToken,
        );
        await this.syncAndSetupService.updateClassRewardSyncTimestamp(
          cls.edLinkID,
        );
      } catch (e) {
        console.log('unable to sync assignments for class', {
          error: e,
          classId: cls.id,
        });
      }
    }
  }

  // note may want to sync by class or assignment because of the way submission querying works?
  // would improve performance ( this will start to be pretty impactful in terms of number of queries needing to be sent )
  // but do i want to sync by person for how the app works?
  // @Get('/syncAssignmentRewards')
  private async syncAssignmentsAndSubmissionsAndSetupRewards(
    school: School,
    cls: Class,
    integrationToken: string,
  ) {
    // Todo: Handle checking for deletions by comparing expanse assignments to ed link assignments
    // Todo: Update to compareAndSyncAssignments and compareAndSyncSubmissions
    console.log('syncing rewards for class', cls.edLinkID);
    // Be sure to allow multiple iterations over the same data too incase of duplicate syncs

    const assignments: { [classId: string]: EdLinkAssignment[] } =
      await this.edLinkService.getAssignmentsForClasses(
        integrationToken,
        [cls.edLinkID],
        TokenSetType.Integration,
      );

    if (!assignments[cls.edLinkID] || assignments[cls.edLinkID].length === 0) {
      console.log(`No assignments found for class with ID: ${cls.edLinkID}`);
      return;
    }

    // todo remove slice, doing it to test
    console.log('assignment length before', assignments[cls.edLinkID].length);
    assignments[cls.edLinkID] = assignments[cls.edLinkID].slice(0, 3);

    const assignmentClassIdList: {
      elAssignmentId: string;
      elClassId: string;
    }[] = [];
    assignments[cls.edLinkID].forEach((assignment) => {
      assignmentClassIdList.push({
        elAssignmentId: assignment.id,
        elClassId: cls.edLinkID,
      });
    });
    const submissions: { [assignmentId: string]: EdLinkSubmission } =
      await this.edLinkService.getSubmissionsForAssignments(
        integrationToken,
        // todo remove slice, doing it to test
        assignmentClassIdList.slice(0, 1),
        TokenSetType.Integration,
      );
    console.log({ submissions });

    const teachers = await this.educationService.getTeachersForClass(
      cls.edLinkID,
    );

    // todo move to compare and sync assignments function in education service
    const expanseAssignments: {
      [assignmentEdLinkId: string]: Assignment;
    } = {};
    // Save all unsaved assignments
    for (const assignment of assignments[cls.edLinkID]) {
      const expanseAssignment = await this.syncAndSetupService.saveAssignment(
        assignment,
        cls,
      );
      expanseAssignments[expanseAssignment.edLinkID] = expanseAssignment;
      // check for existing assignments from the class associations
      // if not found, save the assignment
      //
    }

    // refresh class, query again and populate assignment and submissions
    // Save all unsaved submissions

    const expanseSubmissions: { [submissionEdLinkid: string]: Submission } = {};
    for (const assignmentId in submissions) {
      const submission = submissions[assignmentId];
      if (!submission || Object.keys(submission).length === 0) {
        continue;
      }
      // todo save submission to expanse
      const {
        saveType,
        submission: expanseSubmission,
        updatedFields,
      } = await this.syncAndSetupService.saveSubmission(
        submission,
        expanseAssignments[assignmentId],
      );
      console.log({ saveType, updatedFields, expanseSubmission });
      expanseSubmissions[expanseSubmission.edLinkID] = expanseSubmission;

      const rewardableEvent =
        await this.rewardService.createRewardEventForSubmission(
          expanseSubmission,
          expanseSubmission.student,
          expanseAssignments[assignmentId],
          cls,
          school,
          teachers,
        );
      console.log({ rewardableEvent });
    }

    // Limitations:
    // Only 1 time rewards per assignment, not multiple rewards for multiple submissions
    //  and not improved rewards for improved grades
    // Currently rewards are equal regardless of grade achieved or performance
    //  May call this a completion reward event then return and do performance reward events?
    // *
    // Person should exist in expanse already and have signed up
    // Grab submissions, assignments from ed link for the class
    // *
    // save all unsaved assignments, submissions to Expanse
    // *
    // check to see if any assignments are deleted, handle deletions
    //  todo determine how to handle deletions? mark as deleted in expanse?
    // *
    // for Each assignment
    //  Grab reward events for each assignment for the person from expanse db ( probably fetch all at the same time )
    //  Create a map of assignment id to reward event
    //  for each submission of each assignment
    //    Determine the users current submission status for this assignment
    //    go through and see if the reward event exists and is accurate
    //    if not, create a reward event for the person
    //      if submission is returned then the reward event is claimable, otherwise it is not ready
    //      may want to put more details as to why its not ready like pending grading or something, this may be a future update though
    //      students will want to see all assignments and why they are or are not eligible for claiming rewards
    //      they will want to know the status, but can improve over time too
    // *
    //
  }

  /* Get integrations
    // todo later, theres a way to list integrations rather than needing to hardcode the codes

    const response = await fetch(
      'https://ed.link/api/v1/integrations',
      request,
    );
  */
}
