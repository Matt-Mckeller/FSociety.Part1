import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../../../libs/shared/src/enums/role.enum';

export class CreateRoles1746490322183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userId = uuidv4();
    const adminId = uuidv4();
    await queryRunner.query(
      `INSERT INTO expanse_role (id, role) VALUES ('${userId}', '${Role.ExpanseUser}'), ('${adminId}', '${Role.ExpanseAdmin}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM expanse_role WHERE role IN ('${Role.ExpanseUser}', '${Role.ExpanseAdmin}')`,
    );
  }
}
