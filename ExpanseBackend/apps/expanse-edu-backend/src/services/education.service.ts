import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import {
  Assignment,
  Class,
  Enrollment,
  ExpansePerson,
  School,
  Submission,
} from '../entities';
import {
  Assignment as EdLinkAssignment,
  Submission as EdLinkSubmission,
} from '@edlink/typescript';

@Injectable()
export class EducationService {
  constructor(
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  async findSchoolById(id: string): Promise<School> {
    const manager = this.mainDataSource.manager;
    const school = await manager.findOne(School, {
      where: { id },
    });
    return school;
  }

  async findAllSchools(): Promise<School[]> {
    const manager = this.mainDataSource.manager;
    const schools = await manager.find(School);
    return schools;
  }

  async getClassesForSchool(schoolId: string) {
    const manager = this.mainDataSource.manager;
    const classes = await manager.find(Class, {
      where: { school: { id: schoolId } },
    });
    return classes;
  }

  async getAssignmentsByIds(edLinkAssignmentIds: string[]) {
    const manager = this.mainDataSource.manager;
    const assignments = await manager.find(Assignment, {
      where: { edLinkID: In(edLinkAssignmentIds) },
    });
    return assignments;
  }

  async getTeachersForClass(classEdLinkId: string): Promise<ExpansePerson[]> {
    const manager = this.mainDataSource.manager;
    // find the person(s) for a class based on the enrollment relationship to the class that has the persons id
    const enrollments = await manager.find(Enrollment, {
      where: { class: { edLinkID: classEdLinkId }, role: 'teacher' },
      relations: ['expansePerson'],
    });
    const teachers = enrollments.map((enrollment) => enrollment.expansePerson);
    return teachers;
  }
}
