# Test project Puppeteer

This project contains UI automated tests for the web page https://devexpress.github.io/testcafe/example/ 
based on Jest testing framework (more information here: https://jestjs.io/) 
and Puppeteer - a Node library which provides a high-level API to control Chrome or Chromium (more information you can find here: https://pptr.dev/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run tests in headless mode set in index.test.js:

```
headless: true (if false - tests will be executed in browse window)
```
To manage speed of the tests execution uncomment and change the paraneter in index.test.js:

```
let browser = await puppeteer.launch({
      headless: false,
      // slowMo: 20, // slow down by 20ms
    });
```
This option slows down Puppeteer operations by the specified amount of milliseconds

### Installation

1. Clone the repository
2. Run yarn

If you don't have yarn installed, visit https://yarnpkg.com/ and follow the instructions.

## Running the tests

To run the test suite execute the following command:

```
yarn test
```
