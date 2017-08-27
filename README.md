# Mediaparty :tada:

[![license](https://img.shields.io/github/license/m4dz/mediaparty.svg)]()


A Firefox extension to link page contents to Mediapart articles.


## Description

This project aims to be a POC that uses the Mediapart API to get contents. It takes the form of a Firefox extension that can be called by user to parse the current page's content and insert links to Mediapart articles.

## Pre-requisites

Install needed modules by running `npm install` (or `yarn install` if you prefer yarn utility) prior to any action.

You must have a valid version of Mozilla Firefox installed to run the extension.
By default, the `web-ext` extension tries to load the stable Firefox release. You can use another version by specifying the `WEB_EXT_FIREFOX` env param (e.g. `WEB_EXT_FIREFOX=$(which forefox-developer) npm run watch`).

## Test

To test the development of the extension, we rely on the `web-ext` tool. There's a simple `watch` task you can run to build the extension in watch mode and test it in the bowser: `npm run watch`.

To display logging messages, hit `CTRL-SHIFT-J` to open the _browser console_.


<!-- TODO: add BUILD section -->

<!-- TODO: add DEPLOY section -->

## Technical way

To achieve this POC, we need several parts:

- a WebExtension that allow to deploy the POC in a browser
- a local search / indexing engine that consumes the Mediapart API
- a UI that insert links / popup to article(s) when a relevant erm is found in page's content
- maybe a WebComponent to sandbox the aforementioned popup
- automated tests


## Why

We need to find new way to explore the Mediapart API with creativity in mind. This pet project demonstrate a possible use. It's also a pretext to deal with technologies like WebExtensions and [Lunrjs](https://lunrjs.com/).
