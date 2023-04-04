import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl, checkForRequired } from '../../lib/utils.js';

export default (stationId, options) => {
  const spinner = !options.raw && !options.dryRun ? ora('Retrieving Current Weather Data').start() : undefined;

  const envVars = checkForRequired(["WEATHER_LINK_API_KEY", "WEATHER_LINK_API_SECRET", "WEATHER_LINK_BASE_API_URL"])
  if (!envVars.exist) {
    if (spinner) { 
      spinner.fail('Failed to Retrieve Current Weather Data') 
    }

    return console.log(`${chalk.red.bold(`Missing Environment Variable(s):`)} ${envVars.missing.join(", ")}`);
  }

  const API_KEY = process.env.WEATHER_LINK_API_KEY;

  const urlToQuery = buildWeatherLinkApiUrl(
    `current/${stationId}`,
    { "api-key": API_KEY, "station-id": String(stationId), "t": String(Math.round(Date.now() / 1000)) },
    { "api-key": API_KEY, "t": String(Math.round(Date.now() / 1000)) }
  );

  if (options.dryRun) {
    return console.log(urlToQuery);
  }

  axios.get(urlToQuery)
    .then((response) => {
      if (options.raw) {
        return console.log(JSON.stringify(response.data));
      }

      spinner.succeed(chalk.green.bold(`Current Weather Data Retrieved`));
      return console.dir(response.data, { depth: null })
    })
    .catch((error) => {
      if (options.raw) {
        return console.log(JSON.stringify(error.response.data));
      }

      spinner.fail('Failed to Retrieve Current Weather Data');
      return console.log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};