import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodo1649221580527 implements MigrationInterface {
  name = 'createTodo1649221580527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("task_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" varchar NOT NULL, "title" varchar NOT NULL, "status" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
