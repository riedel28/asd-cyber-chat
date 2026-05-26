import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageUrl1779803622375 implements MigrationInterface {
  name = 'AddImageUrl1779803622375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments" ADD "imageUrl" varchar`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "imageUrl"`);
  }
}
