import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl, dateRangeIsValid } from '../lib/utils.js'

const log = console.log;

export default (stationId, startTimestamp, endTimestamp, options) => {
  const API_KEY = process.env.WEATHER_LINK_API_KEY;
  const spinner = !options.raw ? ora('Retrieving Historical Weather Data').start() : undefined;

  const resultsOfDateRangeCheck = dateRangeIsValid(startTimestamp, endTimestamp);

  if (!resultsOfDateRangeCheck.isValid) {
    spinner.fail('Failed to Retrieve Historical Weather Data');
    return log(`${chalk.red.bold(`Error:`)} ${resultsOfDateRangeCheck.msg}`);
  }

  axios.get(
      buildWeatherLinkApiUrl(
        `historic/${stationId}`, 
        {"api-key": API_KEY, "end-timestamp": endTimestamp, "start-timestamp": startTimestamp, "station-id": String(stationId), "t": String(Math.round(Date.now() / 1000))}, 
        {"api-key": API_KEY, "end-timestamp": endTimestamp, "start-timestamp": startTimestamp, "t": String(Math.round(Date.now() / 1000))}
      )
    )
    .then((response) => {
      if (options.raw) {
        return log(JSON.stringify(response.data));
      }

      spinner.succeed(chalk.green.bold(`Historical Weather Data Received`));
      return console.dir(response.data,{depth:null})
    })
    .catch((error) => {
      if (options.raw) {
        return log(JSON.stringify(error.response.data));
      }

      spinner.fail('Failed to Retrieve Historical Weather Data');
      return log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};