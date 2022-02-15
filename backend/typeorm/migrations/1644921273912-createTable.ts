import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1644921273912 implements MigrationInterface {
    name = 'createTable1644921273912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_chats\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users_chats\` ADD \`createdAt\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_chats\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users_chats\` ADD \`createdAt\` time NOT NULL`);
    }

}
