import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl, checkForRequired } from '../../lib/utils.js';

export default async (stationIds, options) => {
  const spinner = !options.raw && !options.dryRun ? ora('Searching for Stations').start() : undefined;

  const envVars = checkForRequired(["WEATHER_LINK_API_KEY", "WEATHER_LINK_API_SECRET", "WEATHER_LINK_BASE_API_URL"])
  if (!envVars.exist) {
    if (spinner) { 
      spinner.fail('Failed to Retrieve Stations');
    }

    console.log(`${chalk.red.bold(`Missing Environment Variable(s):`)} ${envVars.missing.join(", ")}`);
    return;
  }

  const API_KEY = process.env.WEATHER_LINK_API_KEY;

  const urlToQuery = buildWeatherLinkApiUrl(
    `stations/${stationIds}`,
    { "api-key": API_KEY, "station-ids": String(stationIds), "t": String(Math.round(Date.now() / 1000)) },
    { "api-key": API_KEY, "t": String(Math.round(Date.now() / 1000)) }
  );

  if (options.dryRun) {
    console.log(urlToQuery);
    return;
  }

  try {
    const response = await axios.get(urlToQuery);

    if (options.raw) {
      console.log(JSON.stringify(response.data));
      return response;
    }

    spinner.succeed(chalk.green.bold(`${response.data.stations.length} Station(s) Found`));
    console.dir(response.data, { depth: null });
    return response;
    
  } catch (error) {

    if (options.raw) {
      console.log(JSON.stringify(error.response.data));
      throw(error);
    }

    spinner.fail('Unable to Find Stations');
    console.log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    throw (error);
  }
};
