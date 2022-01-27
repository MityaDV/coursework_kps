import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1643310799043 implements MigrationInterface {
    name = 'createTables1643310799043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL, \`messageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_chats\` (\`chatId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_1f914ac3c69c9fe57bc3fb7f9d\` (\`chatId\`), INDEX \`IDX_b2e99e803e83ab966edadaa477\` (\`userId\`), PRIMARY KEY (\`chatId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_9743b3cec687ac55895f0d79ae0\` FOREIGN KEY (\`messageId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_chats\` ADD CONSTRAINT \`FK_1f914ac3c69c9fe57bc3fb7f9dc\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_chats\` ADD CONSTRAINT \`FK_b2e99e803e83ab966edadaa4779\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_chats\` DROP FOREIGN KEY \`FK_b2e99e803e83ab966edadaa4779\``);
        await queryRunner.query(`ALTER TABLE \`user_chats\` DROP FOREIGN KEY \`FK_1f914ac3c69c9fe57bc3fb7f9dc\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_9743b3cec687ac55895f0d79ae0\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2e99e803e83ab966edadaa477\` ON \`user_chats\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f914ac3c69c9fe57bc3fb7f9d\` ON \`user_chats\``);
        await queryRunner.query(`DROP TABLE \`user_chats\``);
        await queryRunner.query(`DROP TABLE \`chat_room\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
    }

}
