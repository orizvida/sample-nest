import { MigrationInterface, QueryRunner } from "typeorm";

export class First1708110699767 implements MigrationInterface {
    name = 'First1708110699767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
