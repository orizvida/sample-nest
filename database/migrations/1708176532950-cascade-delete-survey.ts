import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeleteSurvey1708176532950 implements MigrationInterface {
    name = 'CascadeDeleteSurvey1708176532950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "departmentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3"`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "departmentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_bf975afb32061d704fdfaa5aab3" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
