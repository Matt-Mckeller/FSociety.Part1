<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Modules

The expanse-backend app is the core app/module that combines other apps/modules together into a single instance

# Useful commands

## Example Typeorm Usage, Generate and run a migration

This command utilizes entities listed in the datasource to generate the migration but is a good example of how to interact with typeorm in this project

```bash
npm run typeorm migration:generate -- -d ./apps/experience/src/experienceDatasource.ts ./apps/experience/src/migrations/LevelExperienceRequirements
npm run typeorm migration:generate -- -d ./apps/rewards/src/rewardsDatasource.ts ./apps/rewards/src/migrations/MinorUpdate
```

```bash
npm run typeorm migration:run -- -d ./apps/experience/src/experienceDatasource.ts
npm run typeorm migration:run -- -d ./apps/rewards/src/rewardsDatasource.ts
```

```bash
npm run typeorm migration:revert -- -d ./apps/experience/src/experienceDatasource.ts
npm run typeorm migration:revert -- -d ./apps/rewards/src/rewardsDatasource.ts
```

# Debugging

## Common Problems / Module Files ( Metadata Error )

If working with the expanse-backend project and running into duplicate graphql entities or missing metadata this may be a problem with the module imports from multiple projects. Ensure importing, exporting, and instantiation is done correclty.
Experiment by enabling or disabling additional module imports and focusing only on one module at a time or working with the individual module in question and avoiding the grouped version to identify if the issue is with the module and dependency setup
Entities need to be included in the forRootAsync typeorm in the backend / primary app (expanse-backend) and have the .forFeature in the individual app module ( i.e. rewards/user )

# Local Development Table Reset

Use with caution, and only in local dev
Run this via the mysql in the terminal or workbench, it wasn't working with code based execution for some reason.

SET FOREIGN_KEY_CHECKS = 0; -- Disable foreign key checks

-- Get a list of all tables in the current database.
SELECT GROUP_CONCAT(table_name) INTO @tables
FROM information_schema.tables
WHERE table_schema = DATABASE();

-- Prepare and execute a dynamic SQL statement to drop all tables.
SET @tables = CONCAT('DROP TABLES IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = 1; -- Re-enable foreign key checks
