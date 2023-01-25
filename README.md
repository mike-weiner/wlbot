# WeatherLink Bot (wlbot)

`wlbot` is a Node.js based CLI that can be used to make *some* of the most common API calls that are possible with the [WeatherLink v2 API](https://weatherlink.github.io/v2-api/api-reference).

## Table of Contents
- [Built Using](#built-using)
- [Running `wlbot` Locally](#running-wlbot-locally)
  - [Install Dependencies](#install-dependencies)
  - [Obtain WeatherLink API Key](#obtain-weatherlink-api-key)
  - [Clone Repo](#clone-repo)
  - [Install npm Packages](#install-npm-packages)
  - [Setting Environmental Variables Required by the Project](#setting-environmental-variables-required-by-the-project)
  - [Installing CLI Globally](#installing-cli-globally)
  - [Calling the CLI](#calling-the-cli)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

## Built Using
`wlbot` is built using:
- [Node.js](https://nodejs.dev) (v18+)

## Running `wlbot` Locally
It is easy to get a copy of the `wlbot` CLI running locally.

### Install Dependencies
In order to run `wlbot` locally, the following will need to be installed on your machine:
- [Node.js](https://nodejs.dev) (required)
  - Node.js is required to run `wlbot`
  - **Installation Instructions:** [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com) (required)
  - npm is used to manage the packages needed by `wlbot` to run on top of Node.js
  - **Installation Instructions:** [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Obtain WeatherLink API Key
This project requires that you have a WeatherLink v2 API Key and Secret. 

The WeatherLink Developer Portal outlines how to get your API key at [https://weatherlink.github.io/v2-api/tutorial](https://weatherlink.github.io/v2-api/tutorial):

> To retrieve your WeatherLink v2 API Key and API Secret you can go to WeatherLink.com and visit the Account page at [https://www.weatherlink.com/account](https://www.weatherlink.com/account).
>
> Once on the Account page you can click the Generate v2 Key button to create a new WeatherLink v2 API Key and API Secret.

**Note:** Your API Key and API Secret should ***never*** be shared with anyone.

### Clone Repo
Navigate to the location on your development machine where you want to place this project's directory and clone the repository by running the following command:

    git clone https://github.com/mike-weiner/wlbot.git

### Install npm Packages
`wlbot` requires several packages to run on top of Node.js. Those packages can be installed by the following command at the root of the directory for this project running:

    npm install

### Setting Environmental Variables Required by the Project
This project requires several environmental variables to be set. Before running the CLI locally for this first time, you must set the necessary environment variables. The table below specifies the name and value of the environment variables that are required.

| Environment Variable Name   | Environment Variable Value        |
| ----------------------------| --------------------------------- |
| `WEATHER_LINK_API_KEY`      | `<your_api_key>`                  |
| `WEATHER_LINK_API_SECRET`   | `<your_api_secret>`               |
| `WEATHER_LINK_BASE_API_URL` | `https://api.weatherlink.com/v2/` |

**Note:** `<your_api_key>` and `<your_api_secret>` should be replaced with the API Key and API Secret that you where given when creating your WeatherLink API as described above.

To set your environment variables on macOS or a Linux distribution, you will need to add the following env. variables that are listed below to either your `.bash_profile` or `.zshrc` file. 

This article describes how you can [set environment variables on Windows Operating Systems](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html#zz-2.).

### Installing CLI Globally
Once you have all of the environment variables required by the CLI set, we need to globally install the CLI in npm. This will allow you to call `wlbot` on your command line without being in this project's directory.

To globally install the `wlbot` package, navigate to the project's root directory on your command line. This should be the directory where this README is found. Then run the following command:

```
npm i -g .
```

**Note:** It is not required that you install `wlbot` globally in npm. However, if it is not installed globally you will only be able to call the `wlbot` command when you are in the directory where you have this project located.

### Calling the CLI
Congrats! You should now be able to open up a new terminal window and run `wlbot`. You can run `wlbot -h` to get help understanding how to use this CLI.

## Contributing
All contributions are welcome! First, search open issues to see if a ticket has already been created for the issue or feature request that you have. If a ticket does not already exist, open an issue to discuss what contributions you would like to make. All contributions should be developed in a `feature/` branch as a PR will be required before any changes are merged into the `main` branch.

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

## References
Below are several references that were used to help find inspiration for this project, get a starting point for the CLI, and serve as a resource for the WeatherLink API.
- [WeatherLink Developer Portal](https://weatherlink.github.io)
- [WeatherLink Portal](https://www.weatherlink.com)
- [How to Build a Command Line Interface (CLI) Using Node.js](https://cheatcode.co/tutorials/how-to-build-a-command-line-interface-cli-using-node-js)