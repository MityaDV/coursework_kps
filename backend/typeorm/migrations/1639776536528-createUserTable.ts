import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUserTable1639776536528 implements MigrationInterface {
  name = 'createUserTable1639776536528'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`created\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``)
  }
}
