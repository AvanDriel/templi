[![npm version](https://badge.fury.io/js/templi.svg)](https://badge.fury.io/js/templi)

# Templi - Test Template Cli Tool

**(Note: Templi is still in early development and testing, and not intended for use in actual projects)**

Templi is a tool made to make it easier to integrate automated testing in your project.

To get started, just run `npx templi` in the project you want to install the tests in.

## Current functionality

For now, Templi is made to support these kinds of automated testing:
* Unit tests, using Jest
* End to End tests, using Cypress

These will be de only types of automated testing I'll focus on for now, and are very incomplete.
Once these are more fleshed out, I'll take a look at more types of testing to integrate, or other ways to implement these.

## Troubleshooting

When you run your unit tests and get the error

`ReferenceError: expect is not defined`

Please check your node version, and update if needed