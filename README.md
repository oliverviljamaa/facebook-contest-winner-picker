# Facebook Contest Winner Picker

A simple web app with a form to get random commenters or users with most comments under a Facebook post.

[![GitHub release](https://img.shields.io/github/release/oliverviljamaa/facebook-contest-winner-picker.svg)](https://github.com/oliverviljamaa/facebook-contest-winner-picker/releases)

[![CircleCI](https://img.shields.io/circleci/project/github/oliverviljamaa/facebook-contest-winner-picker/master.svg)](https://circleci.com/gh/oliverviljamaa/facebook-contest-winner-picker)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/oliverviljamaa/facebook-contest-winner-picker.svg)](https://codeclimate.com/github/oliverviljamaa/facebook-contest-winner-picker/coverage)
[![npm](https://img.shields.io/github/license/oliverviljamaa/facebook-contest-winner-picker.svg)](https://github.com/oliverviljamaa/facebook-contest-winner-picker/blob/master/LICENSE)


## Usage

### Start server

`yarn start`  
or  
`npm start`

The server will run on port 3000.


## Features

At the moment, it works with photo post ID-s. Future versions should include previews of posts, URL parsing, styles, other post types, etc.

For features and bugs, feel free to [add issues](https://github.com/oliverviljamaa/facebook-contest-winner-picker/issues) or contribute.

## Contributing

1. Run tests in watch mode with `yarn test:watch` or `npm run test:watch` and ensure every line is tested. For a run-once check with ESLint, run `yarn test` or `npm test`.
1. Bump version number according to [semver](http://semver.org/) and add an item that a release will be based on to `CHANGELOG.md`.
1. Submit your pull request from a feature branch and get code reviewed.
1. If the pull request is approved, coverage stays high and CircleCI build passes, you will be able to merge.
1. Code will automatically be released to GitHub.
