# Node.js Native Test Runner Template

[![CI Status](https://github.com/tryb3l/node-testrunner/actions/workflows/nodetest.yml/badge.svg)](https://github.com/tryb3l/node-testrunner/actions)

## Table of Contents

- [Introduction](#introduction)
  - [Best Practices and Design Decisions](#best-practices-and-design-decisions)
- [Project Structure](#project-structure)
- Features
  - [Native Node.js Test Runner](#native-nodejs-test-runner)
  - [Minimal Dependencies](#minimal-dependencies)
  - [Modular and Scalable Structure](#modular-and-scalable-structure)
  - [Undici HTTP Client](#undici-http-client)
  - [Continuous Integration and Continuous Deployment (CI/CD)](#continuous-integration-and-continuous-deployment-cicd)
  - [Future Enhancements](#future-enhancements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Tests](#running-the-tests)
- [Project Details](#project-details)
  - [Important Files and Directories](#important-files-and-directories)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a template for demonstrating the capabilities and features of the native Node.js test runner with minimal dependencies. It leverages the latest features of Node.js to provide a modular, scalable, and efficient testing framework suitable for modern JavaScript applications.

### Best Practices and Design Decisions

- **Modular Architecture**: The project is structured in a modular way to improve readability and maintainability. Each module is responsible for a specific functionality, making the codebase easier to understand and extend.
- **Scalability**: The project structure is designed to be easily scalable. New features and tests can be added without disrupting the existing codebase.
- **Separation of Concerns**: The project separates unit tests and integration tests to ensure that each type of test is focused on its specific purpose.
- **Efficient HTTP Client**: The project uses [`undici`](https://github.com/nodejs/undici 'Go to definition') for HTTP requests due to its speed and memory efficiency. [`undici`](https://github.com/nodejs/undici 'Go to definition') is maintained by the Node.js development team, ensuring compatibility and performance.
- **Continuous Integration**: The project includes a CI/CD pipeline using GitHub Actions to automatically run tests on each push or pull request, ensuring code quality and reliability.

## Project Structure

```
node-testrunner/
├── .env
├── .eslintrc.json
├── .github/
│   └── workflows/
│       └── nodetest.yml
├── .gitignore
├── .prettierrc
├── logger.cjs
├── Makefile
├── package.json
├── README.md
├── test-settings.json
├── tests/
│   ├── integration/
│   │   └── auth/
│   │       ├── login.test.cjs
│   │       └── register.test.cjs
│   ├── unit/
│   │   ├── data-generators.test.cjs
│   │   ├── http-utils.test.cjs
│   │   └── user-utils.test.cjs
│   └── utils/
│       ├── crypto/
│       │   └── crypto.cjs
│       ├── data/
│       │   └── data-generators.cjs
│       ├── env.cjs
│       ├── http/
│       │   └── http-utils.cjs
│       └── user/
│           └── user-utils.cjs
```

## Features

### Native Node.js Test Runner

- Utilizes the **native Node.js test runner** introduced in recent versions of Node.js, eliminating the need for external testing libraries.
- Provides a simple and efficient way to write and run tests using the built-in `node:test` module.
- Demonstrates the capabilities of the Node.js test runner for both **unit tests** and **integration tests**.

### Minimal Dependencies

- Focuses on minimizing external dependencies to reduce overhead and simplify the project.
- Relies mainly on Node.js core modules and a few carefully selected packages.

### Modular and Scalable Structure

- Employs a **modular project structure** to improve the readability and maintainability of tests.
- Easily **scalable** to accommodate additional tests and features as the project grows.

### Undici HTTP Client

- Uses [`undici`](https://github.com/nodejs/undici) as the HTTP client for its **exceptional speed** and **memory efficiency**.
- [`undici`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fbohdan%2FDocuments%2Fprojects%2Fnode-testrunner%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A226%2C%22character%22%3A43%7D%7D%5D%2C%22950925b3-d226-43ae-bf14-7582f6085a12%22%5D 'Go to definition') is maintained by the Node.js development team, ensuring compatibility and performance.
- Simplifies HTTP request handling in tests with modern APIs.

### Continuous Integration and Continuous Deployment (CI/CD)

- Includes a **CI/CD pipeline** using GitHub Actions.
- Automatically runs tests on each **push** or **pull request**, ensuring code quality and reliability.

### Future Enhancements

- Plans to add **Docker support** to run tests inside an isolated, containerized environment.
- Aims to improve portability and ease of deployment across different systems.

## Getting Started

### Prerequisites

- **Node.js v23 or later** is required to utilize the latest features.
- **npm** is needed for package management.

### Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/yourusername/node-testrunner.git
cd node-testrunner
make install-dependencies
```

### Running the Tests

Run all tests using the makefile:

```sh
make run-all-tests
```

Or run specific tests:

- **Unit Tests**:

  ```sh
  make run-unit-tests
  ```

- **Integration Tests**:

  ```sh
  make run-integration-tests
  ```

## Project Details

### Important Files and Directories

- **tests/**: Contains all test files organized into unit and integration tests.
  - **unit/**: Holds unit tests for individual modules.
    - **data-generators.test.cjs**: Tests for data generation utilities.
    - **http-utils.test.cjs**: Tests for HTTP utility functions.
    - **user-utils.test.cjs**: Tests for user-related utilities.
  - **integration/**: Contains integration tests that test the interaction between different modules and external APIs.
    - **auth/**:
      - **login.test.cjs**: Integration tests for the login functionality.
      - **register.test.cjs**: Integration tests for the user registration functionality.
  - **utils/**: Includes utility modules used across tests.
    - **crypto/**:
      - **crypto.cjs**: Cryptographic utility functions.
    - **data/**:
      - **data-generators.cjs**: Functions to generate random test data.
    - **env.cjs**: Environment configuration loader.
    - **http/**:
      - **http-utils.cjs**: HTTP request utility functions using [`undici`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fbohdan%2FDocuments%2Fprojects%2Fnode-testrunner%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A226%2C%22character%22%3A43%7D%7D%5D%2C%22950925b3-d226-43ae-bf14-7582f6085a12%22%5D 'Go to definition').
    - **user/**:
      - **user-utils.cjs**: Utility functions for user operations in tests.
- **Makefile**: Provides convenient commands for installing dependencies and running tests.
- **package.json**: Manages project metadata and scripts.
- **.github/workflows/nodetest.yml**: Defines the GitHub Actions workflow for CI/CD.
- **logger.cjs**: Sets up application logging using [`pino`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fbohdan%2FDocuments%2Fprojects%2Fnode-testrunner%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A168%2C%22character%22%3A40%7D%7D%5D%2C%22950925b3-d226-43ae-bf14-7582f6085a12%22%5D 'Go to definition') and `pino-pretty` for readable console output.
- **test-settings.json**: Stores configuration settings for tests, such as test user data.
- **.env**: Loads environment variables from the

.env

file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

## License

This project is licensed under the MIT License.
