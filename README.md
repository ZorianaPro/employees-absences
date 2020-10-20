[Employees absences application](https://github.com/ZorianaPro/employees-absences)<br/>
See [Task](/TASK.md)<br/>
Developed by [Zoriana Lesyk](https://github.com/ZorianaPro) <br/>
[Check build](https://github.com/ZorianaPro/employees-absences/actions) <br/>
React SPA.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of contents
* [Prerequisites](#prerequisites)
* [Local development](#dev)
  * [Running the Node.js app locally](#dev-local)
* [Available NPM scripts](#npm-scripts)
  * [`build`](#npm-build)
  * [`coverage:ci`](#npm-coverageci)
  * [`lint`](#npm-lint)
  * [`lint:ci`](#npm-lintci)
  * [`install`](#npm-install)
  * [`start`](#npm-start)
  * [`test`](#npm-test)
  * [`test:ci`](#npm-testci)
* [Actions](#actions)  
* [Changelog](CHANGELOG.md)

## Prerequisites<a name="prerequisites"></a>

* Up-to-date LTS [Node.js](https://nodejs.org)

## Local development<a name="dev"></a>

### Running the [Node.js](https://nodejs.org) app locally<a name="dev-local"></a>

1. Clone this repository.
2. `cd` into the repository.
3. Install the node module dependencies: `npm install`
4. Start the development server: `npm start`
5. Run the unit tests for TDD: `npm test`
6. Navigate to `http://localhost:3000` in your browser to reach the app.

## Available NPM Scripts<a name="npm-scripts"></a>

Locally in the project directory, you can run the following npm scripts.

Invoking these scripts in a [local Node.js setting](#dev-local) just means typing `npm <command>` into your terminal.

`<command>` can be one of the following:

  * [`run build`](#npm-build)
  * [`run coverage:ci`](#npm-coverageci)
  * [`run lint`](#npm-lint)
  * [`run lint:ci`](#npm-lintci)
  * [`install`](#npm-install)
  * [`start`](#npm-start)
  * [`test`](#npm-test)
  * [`run test:ci`](#npm-testci)

### `run build`<a name="npm-build"></a>

Builds the app for production to the `build` folder.<br/>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `run coverage:ci`<a name="npm-coverageci"></a>

Runs the test coverage reporter in continuous integration mode.

### `run lint`<a name="npm-lint"></a>

Lints all project files via [eslint](https://eslint.org).

### `run lint:ci`<a name="npm-lintci"></a>

Launches the linter in continuous integration mode, i.e. there is less verbose output and test results are written to XML files in JUnit format. The results files are written to the `test-results/eslint` directory.

### `install`<a name="npm-install"></a>

Installs the project's dependencies. See [npm install](https://docs.npmjs.com/cli/install).

### `start`<a name="npm-start"></a>

Runs the app.

Distinguishes between development and production mode via `NODE_ENV` environment variable:

  * `NODE_ENV`: `development` _(default)_

    Runs the app in the development mode.<br />
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    The page will reload if you make edits.<br />
    You will also see any lint errors in the console.

    Uses [webpack dev server](https://webpack.js.org/configuration/dev-server/) under the hood.

  * `NODE_ENV`: `production`

    Runs the app in production mode.

### `test`<a name="npm-test"></a>

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) in the official React documentation for more information on this topic.

### `run test:ci`<a name="npm-testci"></a>

Launches the test runner in continuous integration mode, i.e. there is less verbose output and test results are written to XML files in JUnit format. The results files are written to the `test-results/jest` directory.
