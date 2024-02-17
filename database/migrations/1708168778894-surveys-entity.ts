import { MigrationInterface, QueryRunner } from "typeorm";

export class SurveysEntity1708168778894 implements MigrationInterface {
    name = 'SurveysEntity1708168778894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "json" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "departmentId" uuid, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}
