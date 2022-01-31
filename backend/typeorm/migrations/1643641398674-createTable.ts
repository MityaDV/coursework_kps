import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1643641398674 implements MigrationInterface {
    name = 'createTable1643641398674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`created\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`messageId\` int NOT NULL, \`message\` text NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`chatName\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_4838cd4fc48a6ff2d4aa01aa646\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_36bc604c820bb9adc4c75cd4115\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_36bc604c820bb9adc4c75cd4115\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_4838cd4fc48a6ff2d4aa01aa646\``);
        await queryRunner.query(`DROP TABLE \`chat_room\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
