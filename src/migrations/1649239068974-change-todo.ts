import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeTodo1649239068974 implements MigrationInterface {
  name = 'changeTodo1649239068974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_todo" ("todo_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" varchar NOT NULL, "title" varchar NOT NULL, "status" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_todo"("todo_id", "user_id", "title", "status", "created_at", "updated_at") SELECT "todo_id", "user_id", "title", "status", "created_at", "updated_at" FROM "todo"`,
    );
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_todo" ("todo_id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "title" varchar NOT NULL, "status" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_todo"("todo_id", "user_id", "title", "status", "created_at", "updated_at") SELECT "todo_id", "user_id", "title", "status", "created_at", "updated_at" FROM "todo"`,
    );
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
    await queryRunner.query(
      `CREATE TABLE "todo" ("todo_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" varchar NOT NULL, "title" varchar NOT NULL, "status" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "todo"("todo_id", "user_id", "title", "status", "created_at", "updated_at") SELECT "todo_id", "user_id", "title", "status", "created_at", "updated_at" FROM "temporary_todo"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_todo"`);
    await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
    await queryRunner.query(
      `CREATE TABLE "todo" ("todo_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" varchar NOT NULL, "title" varchar NOT NULL, "status" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "todo"("todo_id", "user_id", "title", "status", "created_at", "updated_at") SELECT "todo_id", "user_id", "title", "status", "created_at", "updated_at" FROM "temporary_todo"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_todo"`);
  }
}
