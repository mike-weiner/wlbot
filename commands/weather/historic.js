import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl, checkForRequired, dateRangeIsValid } from '../../lib/utils.js';

export default (stationId, startTimestamp, endTimestamp, options) => {
  const spinner = !options.raw ? ora('Retrieving Historical Weather Data').start() : undefined;

  const envVars = checkForRequired(["WEATHER_LINK_API_KEY", "WEATHER_LINK_API_SECRET", "WEATHER_LINK_BASE_API_URL"])
  if (!envVars.exist) {
    return console.log(`${chalk.red.bold(`Missing Environment Variable(s):`)} ${envVars.missing.join(", ")}`);
  }

  const resultsOfDateRangeCheck = dateRangeIsValid(startTimestamp, endTimestamp);

  if (!resultsOfDateRangeCheck.isValid) {
    return console.log(`${chalk.red.bold(`Error:`)} ${resultsOfDateRangeCheck.msg}`);
  }

  const API_KEY = process.env.WEATHER_LINK_API_KEY;

  axios.get(
    buildWeatherLinkApiUrl(
      `historic/${stationId}`,
      { "api-key": API_KEY, "end-timestamp": endTimestamp, "start-timestamp": startTimestamp, "station-id": String(stationId), "t": String(Math.round(Date.now() / 1000)) },
      { "api-key": API_KEY, "end-timestamp": endTimestamp, "start-timestamp": startTimestamp, "t": String(Math.round(Date.now() / 1000)) }
    )
  )
    .then((response) => {
      if (options.raw) {
        return console.log(JSON.stringify(response.data));
      }

      spinner.succeed(chalk.green.bold(`Historical Weather Data Retrieved`));
      return console.dir(response.data, { depth: null })
    })
    .catch((error) => {
      if (options.raw) {
        return console.log(JSON.stringify(error.response.data));
      }

      spinner.fail('Failed to Retrieve Historical Weather Data');
      return console.log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};