# WeatherLink Bot (wlbot)

`wlbot` is a Node.js based CLI that can be used to make *some* of the most common API calls that are possible with the [WeatherLink v2 API](https://weatherlink.github.io/v2-api/api-reference).

## Table of Contents
- [Obtaining a WeatherLink API Key](#obtaining-a-weatherlink-api-key)
- [Setting Your Environmental Variables](#setting-your-environmental-variables)
- [Installing `wlbot` via npm](#installing-wlbot-via-npm)
- [Installing `wlbot` Manually via the Github Repository](#installing-wlbot-manually-via-the-github-repository)
  - [Install Dependencies](#install-dependencies)
  - [Clone Repo](#clone-repo)
  - [Install npm Packages](#install-npm-packages)
  - [Installing CLI Globally](#installing-cli-globally)
- [Calling the CLI](#calling-the-cli)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

## Obtaining a WeatherLink API Key
No matter how you install `wlbot`, it requires that you have a WeatherLink v2 API Key and Secret. 

The WeatherLink Developer Portal outlines how to get your API key at [https://weatherlink.github.io/v2-api/tutorial](https://weatherlink.github.io/v2-api/tutorial):

> To retrieve your WeatherLink v2 API Key and API Secret you can go to WeatherLink.com and visit the Account page at [https://www.weatherlink.com/account](https://www.weatherlink.com/account).
>
> Once on the Account page you can click the Generate v2 Key button to create a new WeatherLink v2 API Key and API Secret.

**Note:** Your API Secret should ***never*** be shared with anyone.

## Setting Your Environmental Variables
No matter how you install `wlbot`, it requires several **permanent** environmental variables to be set. Before running the CLI locally for this first time, you must set the necessary environment variables. The table below specifies the name and value of the environment variables that are required.

| Environment Variable Name   | Environment Variable Value        |
| ----------------------------| --------------------------------- |
| `WEATHER_LINK_API_KEY`      | `<your_api_key>`                  |
| `WEATHER_LINK_API_SECRET`   | `<your_api_secret>`               |
| `WEATHER_LINK_BASE_API_URL` | `https://api.weatherlink.com/v2/` |

**Note:** `<your_api_key>` and `<your_api_secret>` should be replaced with the API Key and API Secret that you where given when creating your WeatherLink API as described above.

This article describes how you can [set permanent environment variables on macos or Linux](https://apple.stackexchange.com/questions/356441/how-to-add-permanent-environment-variable-in-zsh).

This article describes how you can [set permanent environment variables on Windows Operating Systems](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html#zz-2.).

## Installing `wlbot` via npm
`wlbot` is listed on the `npm` repository at [https://npmjs.com/package/wlbot](https://npmjs.com/package/wlbot). 

You can globally install the `wlbot` CLI by:
1. Opening a command line prompt on your machine and running `npm install -g wlbot`. 

This process could take a minute or two, depending on your internet connection.

## Installing `wlbot` Manually via the Github Repository
It is easy to get a copy of the `wlbot` CLI running locally.

### Install Dependencies
In order to run `wlbot` locally, the following will need to be installed on your machine:
- [Node.js](https://nodejs.dev) (required)
  - Node.js is required to run `wlbot`
  - **Installation Instructions:** [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com) (required)
  - npm is used to manage the packages needed by `wlbot` to run on top of Node.js
  - **Installation Instructions:** [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Clone Repo
Navigate to the location on your development machine where you want to place this project's directory and clone the repository by running the following command:

    git clone https://github.com/mike-weiner/wlbot.git

### Install npm Packages
`wlbot` requires several packages to run on top of Node.js. Those packages can be installed by the following command at the root of the directory for this project running:

    npm install

### Installing CLI Globally
Once you have all of the environment variables required by the CLI set, we need to globally install the CLI in npm. This will allow you to call `wlbot` on your command line without being in this project's directory.

To globally install the `wlbot` package, navigate to the project's root directory on your command line. This should be the directory where this README is found. Then run the following command:

```
npm i -g .
```

**Note:** It is not required that you install `wlbot` globally in npm. However, if it is not installed globally you will only be able to call the `wlbot` command when you are in the directory where you have this project located.

## Calling the CLI
Congrats! You should now be able to open up a new terminal window and run `wlbot`. You can run `wlbot -h` to get help understanding how to use this CLI.

`wlbot` contains a helpful command to ensure that your environmental variables are set correctly. Run `wlbot config` to print out the values of the environmental variables that are required by `wlbot`. 

You can run `wlbot config -l` to list the full values of the environmental variables. **Note:** Be careful running this command as your WeatherLink API Secret's value will be shown. You don't want to share this with ***anyone***.

### Common Commands
There are several commands that you will probably call more frequently than others. Some of the more common commands include:
- `wlbot metadata mine`: This command will return an array of `station-id` numbers for the weather station's that your WeatherLink account has permission to view data for. 
- `wlbot weather current <station-id>`: This command will return the current weather record for the station whose station id matches `<station-id>`. 

## Contributing
All contributions are welcome! First, search open issues to see if a ticket has already been created for the issue or feature request that you have. If a ticket does not already exist, open an issue to discuss what contributions you would like to make. All contributions should be developed in a `feature/` branch as a PR will be required before any changes are merged into the `main` branch.

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

## References
Below are several references that were used to help find inspiration for this project, get a starting point for the CLI, and serve as a resource for the WeatherLink API.
- [WeatherLink Developer Portal](https://weatherlink.github.io)
- [WeatherLink Portal](https://www.weatherlink.com)
- [How to Build a Command Line Interface (CLI) Using Node.js](https://cheatcode.co/tutorials/how-to-build-a-command-line-interface-cli-using-node-js)