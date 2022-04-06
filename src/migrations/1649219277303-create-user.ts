import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1649219277303 implements MigrationInterface {
  name = 'createUser1649219277303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
