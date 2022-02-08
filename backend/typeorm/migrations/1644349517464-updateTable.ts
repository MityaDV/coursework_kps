import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTable1644349517464 implements MigrationInterface {
    name = 'updateTable1644349517464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`created\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` text NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`chatName\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_chats\` ADD CONSTRAINT \`FK_08c4d895f04a49b5360f42a3777\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_chats\` ADD CONSTRAINT \`FK_bf986dc7900663ca73ab6425300\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_chats\` DROP FOREIGN KEY \`FK_bf986dc7900663ca73ab6425300\``);
        await queryRunner.query(`ALTER TABLE \`users_chats\` DROP FOREIGN KEY \`FK_08c4d895f04a49b5360f42a3777\``);
        await queryRunner.query(`DROP TABLE \`chat_room\``);
        await queryRunner.query(`DROP TABLE \`users_chats\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
