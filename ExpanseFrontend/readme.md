WIP, See Videos for where to look. Donate to me so i can travel, eat, and buy this chick some steak or coals.

Current LiquidDollars: 7$ in Money Laundering Evidence Coins, 15$ on X
SolanaAddress:Receiving
E2vEzkxZasuTmJ2Wzo3LbkTLmo1FhKDzLYqmGTger8KV

![Solana receive address](Screenshot%202026-09-24%20at%207.30.53%E2%80%AFPM.png)

Btc:Receiving
3PD8XHdiEPjrkhocW1U5STnRHVoNHcTUrA

![Bitcoin receive address](Screenshot%202026-09-24%20at%207.34.05%E2%80%AFPM.png)

Etherium::Receiving
0xD02Fc7a368a947C63CDea792e1dBF735A9e0Fbdf

![Ethereum receive address](Screenshot%202026-09-24%20at%207.36.00%E2%80%AFPM.png)

**Not yet live, Migration WIP**: Code is not yet deployed to prod. This code is newer than the live version with many improvements, cleanup, updated packages, and directory structure. Still working to fix the production build after react 18/next 14/mui upgrades + directory structure changes. Dev works.

**If reviewing** Check packages/auth for react code sample and apps/personalNext for the next.js root

# Installation/running

Should be able to download and install packages from the root project directory with "npm i"

Use the apps/personalNext directory for the actual application

Update the environment variable for the graphql api url to be the production endpoint ( there is a local and production .env in apps/personalNext)

Navigate to the apps/personalNext directory before attempting to start the application
Run the application with npm run dev

# Introduction

Welcome to this ongoing project, which serves as a valuable demonstration of my development skills. While still a work in progress and open for improvement, it showcases my proficiency in React development, particularly through the authentication module.

Structured into multiple modules, the project aims to facilitate micro frontend setup and promote component reusability across projects. I've chosen a monorepository approach for streamlined management and ease of integration.

Please note that while the frontend code is housed here, the backend code resides in separate repositories. Additionally, there's a shared validation repository utilized by both frontend and backend.

Many tools and technologies are used for the documentation, setting standards, and creating reusable code.

**To-Do List:** Continuously evolving as I refine and enhance the project.

**Apps: personalNext, playground**
There is really only one application in apps/personalNext, the playground app is me setting up webpack manually rather than using next.js. Its a work in progress

**Animation Note**
Currently using gsap for the primary cloud animation.

**Migrated**
Migrated code into new repository and structure, migration wip

# Local build ( docker )

**(For local with mount)**

**Build the docker image**
Docker buildkit is enabled to allow ssh key to be passed to the docker file in order to install a dependency from a private repository

`DOCKER_BUILDKIT=1 docker build --ssh default -f Dockerfile_Edu -t expanse-edu-frontend .`

**Run the docker image locally**
After building the Docker image, you can start a container using:

```bash
docker run -p 3600:3600 expanse-edu-frontend
```

To run the container in detached mode (in the background), add the `-d` flag:

```bash
docker run -d -p 3600:3600 expanse-edu-frontend
```

# Deployment

From the app/personalNext directory run
npm run build
commit files created from the build and pull the changes on the live server
Check new features and old features. Automated testing will be nice.
Check mobile and desktop.
Ideally test display on multiple browsers.

This produces updates to the out directory which can be downloaded on the server and should be hosted. Backend is separate.

# WIP

Documentation is a work in progress
So is the code

# Adding a new module

Create the module directory.
Create an index.ts file that will be the reference for the modules exports
Create a placeholder package.json with a name, if there are dependencies, add them.
Include the module in the workspace in the root expanse-frontend package.json
If the module is to be used in a next.js project with transpilation on be sure to add the module to the next config transpilePackages option.
If the module is a sub module of something such as expanse.ui (packages/ui) then add the index.ts it to the exports section of the packages/ui/package.json
If the module is not a sub module of ui or an existing package you may need to add the package as a dependency to be installed in the package.json of your project ( i.e. apps/personalNext/package.json -> add "expanse.ui": "../../packages/ui")

# Tools and Technology

Using multiple tools and technologies to speed up development, improve development quality of life, and support team collaboration and project scalability.

## Typescript

Using typescript for typing and type checking. TypeScript helps catch errors early in development, supports scalability, and speeds up coding ( especially for teams, as projects grow, and age ). It improves code usability for multiple projects and the ability to share code

## React

Utilizing react for component development, faster setup, tooling, and resources

## MUI

Utilizing MUI to learn and utilize its thorough component library, themeing structure, and potential for speeding up development. It is a good resource for components. It provides a clean and modern UI that gives you plenty of room to customize the look and feel while staying organized and providing a good template.

It saves a ton of time on creating reusable web components and adding complex features. It promotes good practices and material design. It sets up a structure for having a theme and using consistent spacing.

## Next.js

Utilize next.js for the documentation, routing/navigation, building and webpack/babel related things, pre-rendering, file system structure, types, error guidance support, metadata abstraction, and error display.

## Apollo GraphQL

Apollo GraphQL is used to help send graphql queries / provide wrappers and documentation. The ApolloProvider is provided through the ApplicationProvider -> ApiProvider. It also provides a convenient sandbox api tool.

## Eslint

ESLint is used to ensure that code follows the same format, structure, and logic across files, modules, and components. (Note: also using prettier for formatting) This helps make code easier to share, reuse, and extend. It can also prevent some of the conflicts and issues that can arise from different coding styles and approaches. It also saves development time on formatting, helps with error detection, and improves Development Quality of Life.

**Plugins/Parsers**

- **typescript-eslint**: Using `typescript-eslint` to enable ESLint to analyze TypeScript files effectively.

  - **@typescript-eslint/parser**: This package helps ESLint understand the new features introduced by TypeScript.
  - **@typescript-eslint/eslint-plugin**: Leveraging this plugin to incorporate TypeScript-specific linting rules provided by the `typescript-eslint` project.

- **Additional Plugins**: Using additional plugins to extend ESLint's functionality with extra linting rules tailored for specific areas such as React, accessibility (a11y), and Node.js functions.
- **eslint-config-prettier**: To ensure seamless integration between ESLint and Prettier, we employ `eslint-config-prettier`.

## Prettier

Using prettier to format code on save. The editor config is setup to do this for you and there is a plugin added for format on save and editor integration. Added an eslint plugin "eslint-config-prettier" plugin to support prettier and eslint working well together.

## Polyfills

Polyfills included by next.js or createReactApp for playground

## Exports/Index.ts files

Attempting to keep directory and imports more organized with the use of index.ts files. Avoiding importing from multiple nested directories and prefering imports from root of package module like expanse.ui/authentication

## Analytics Events / Logs

Event tracking throughout the app with registerAnalyticsEvent graphql call. Still thinking about the final implementation for this. Wanted to keep events locally logged.

Improved error handling and logging is still needed.

## Environment Variables

Next.js also provides support for environment variables
Do not commit sensitive environment variables, the backend is separated from frontend in the existing projects
Webpack / create react app makes process.env variables accessible inside the application.

## Types

WIP

## Editor Notes

Custom settings in the .vscode/settings.json, extensions listed in .vscode/extensions.com, started some snippets in .vscode/test-project-snippet.code-snippets

## Imports

- Using import statements rather than require statements and a module resolution style (specified in package.json)
- Auto import suggestions are supported by tsconfig and vscode.
- There is an enabled setting in vscode's settings.json to enable auto suggest functionality by default.

**Visual Studio Code Search**
For searching within this repository utilize the following **Ignore directories** entry when searching

`package-lock.json, node_modules/*, apps/*/.next/*, apps/*/dist/*, apps/*/_static/*, apps/*/.next/*, .git/*, apps/*/out/*`,

# Tips and Resources

<WIP>
https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script

# Other Project Notes

## Logging

Basic logging, there is event tracking and an api for those. A better logging system needs to be implemented still
API error calls are logged on the backend. Additional logging should be manual

## Errors

See the shared common repository for errors. Work in progress with custom errors

## Random & Quirks

You may have to restart the app to see theme or config related changes

## Routing

At this time using next navigation for web routing

## Web & Mobile App Support

Working towards being able to support both web and mobile. The overlap in shared code for this is in the context data, logic/business logic, validation, utilities, assets, and api calls.

# Hosting

The application is hosted on Google Cloud Platform. This is served with nginx. SSL is from lets encrypt and certbot. Previously was deploying to cdn with premium load balancing with but decided it was unnecessary. Migrated to a compute engine instance.

# Playground project specific

## Webpack is being used directly

Webpack is used to run and compile the code ( via create-react-app, or directly in playground ). It allows for easily integrating different technologies and enables beneficial features through plugins and loaders. Webpack enables hot module reloading so your code refreshes in the browser when you hit save in the source code. It also enables us to add content hashes to our file names which prevents browser caching conflicts and supports long term caching.

If you are interested in learning about webpack and setup see https://www.youtube.com/watch?v=IZGNcSuwBZs
This provides a good overview, config structure differences from live version at the time of writing but the concept explanation is on point. Also see https://webpack.js.org/guides/typescript/

**Here are some additional Webpack implementation details ( from the playground project ):**

**Plugins & Loaders**

- HtmlWebpackPlugin dev plugin is used to building the application
- Css and style loader added for importing style files
- Webpack html plugin used to build the html file and include a content hash
- Webpack is using babel loader to transpile code for older browsers and also to transpile react and jsx/tsx. To support loading typescript, @babel/preset-typescript was added. To support compiling react code @babel/preset-react was added. Webpack is also using @babel/preset-env to manage which syntax transforms (and optionally, browser polyfills) are needed by the environment(s) as defined by the browserlist query of "> 0.5%, last 2 versions, Firefox ESR, not dead" in the targets config setting.
- Babel is also running typescript compilation ( tsc ) for us in development

**Configuration**

- Source maps is enabled to map messages in dev tools console back to original source code and not the transpiled versions.
- Webpack is set to use typescript
- To make sure typescript accepts the imported assets like .svg files, we need to declare them as a module. See the @types/index.d.ts file for an example. Also this required an entry in the tsconfig.json under the "includes" in order to ignore .svgs etc.
