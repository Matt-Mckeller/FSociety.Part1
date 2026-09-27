import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Enrollment } from '../entities';
import {
  Enrollment as EdLinkEnrollment,
  Assignment as EdLinkAssignment,
  Class as EdLinkClass,
} from '@edlink/typescript';
import { MaxLength } from 'class-validator';
import { Submission as EdLinkSubmission } from '@edlink/typescript';
import { RewardableEventDto } from './reward.model';

@ObjectType()
export class EnrollmentDto {
  @Field()
  elId: string;

  @Field((type) => String, { nullable: true })
  role?: string;

  static fromEntity(
    enrollments: (Partial<Enrollment> & Partial<EdLinkEnrollment>)[],
  ): EnrollmentDto[] {
    return enrollments.map((enrollment) => {
      const enrollmentDto = new EnrollmentDto();
      enrollmentDto.elId = enrollment.id;
      enrollmentDto.role = enrollment.role;
      return enrollmentDto;
    });
  }
}

@ObjectType()
export class ClassDto {
  @Field()
  id: string;

  @Field()
  elId: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => [EnrollmentDto], { nullable: true })
  enrollments?: EnrollmentDto[];

  static fromEntity(
    cls: EdLinkClass,
    expanseClassId: string,
    enrollments: EdLinkEnrollment[],
  ): ClassDto {
    const classDto = new ClassDto();
    classDto.id = expanseClassId;
    classDto.elId = cls.id;
    classDto.name = cls.name;
    classDto.enrollments = EnrollmentDto.fromEntity(
      enrollments.filter((enrollment) => enrollment.class_id === cls.id),
    );

    return classDto;
  }
}

@ObjectType()
export class AssignmentDto {
  // Was going to disable this because it seems clearer to just use elId since its able
  // to be used for getting data from db and edlink, but for relationships like rewardableEvent to assignment
  // the expanse id maybe needed. There are other thoughts related to this like hey we could just use edlink id or have both but idk
  // can revisit in future if needed, for now its okay to return this as well
  @Field()
  id: string;

  @Field()
  elClassId: string;

  @Field()
  elId: string;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  dueDate?: string;

  @Field((type) => [RewardableEventDto], { nullable: true })
  rewardableEvents?: RewardableEventDto[];

  static fromEntity(
    assignment: EdLinkAssignment,
    rewardEvents: any,
    elClassId: string,
    assignmentId: string,
  ): AssignmentDto {
    const assignmentDto = new AssignmentDto();
    assignmentDto.id = assignmentId;
    assignmentDto.elId = assignment.id;
    assignmentDto.elClassId = elClassId;
    assignmentDto.title = assignment.title;
    assignmentDto.dueDate = assignment.due_date;
    assignmentDto.rewardableEvents = rewardEvents.map((event) =>
      RewardableEventDto.fromEntity(event),
    );

    return assignmentDto;
  }
}

@InputType()
export class AssignmentIdAndClassIdInput {
  @Field((type) => String)
  @MaxLength(255)
  elAssignmentId: string;

  @Field((type) => String)
  @MaxLength(255)
  elClassId: string;
}

@ObjectType()
export class SubmissionDto {
  @Field()
  id: string;

  @Field((type) => String, { nullable: true })
  state?: string;

  @Field((type) => String, { nullable: true })
  submissionElId?: string;

  @Field((type) => String, { nullable: true })
  rewardableEventId?: string;

  @Field((type) => String, { nullable: true })
  personElId: string;

  @Field((type) => String, { nullable: true })
  assignmentElId: string;

  @Field((type) => String, { nullable: true })
  assignmentId: string;

  @Field((type) => Number, { nullable: true })
  gradePoints?: number;

  @Field((type) => String, { nullable: true })
  grade?: string;

  static fromEntity(
    submission: EdLinkSubmission,
    assignmentElId: string,
    rewardableEventId?: string,
    assignmentId?: string,
  ): SubmissionDto {
    const submissionDto = new SubmissionDto();
    submissionDto.id = submission.id;
    submissionDto.state = submission.state;
    submissionDto.submissionElId = submission.id;
    submissionDto.assignmentElId = assignmentElId;
    submissionDto.assignmentId = assignmentId;
    submissionDto.personElId = submission.person_id;
    submissionDto.gradePoints = submission.grade_points;
    submissionDto.grade = submission.grade;
    submissionDto.rewardableEventId = rewardableEventId || undefined;

    return submissionDto;
  }
}

@ObjectType()
export class SubmissionAndRewardableEventDto {
  @Field((type) => SubmissionDto)
  submission: SubmissionDto;

  @Field((type) => RewardableEventDto)
  rewardableEvent: RewardableEventDto;

  @Field((type) => String)
  assignmentId: string;

  @Field((type) => String)
  elAssignmentId: string;
}
