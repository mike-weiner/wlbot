import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl, checkForRequired } from '../../lib/utils.js';

export default (options) => {
  const spinner = !options.raw ? ora('Searching for Stations').start() : undefined;

  const envVars = checkForRequired(["WEATHER_LINK_API_KEY", "WEATHER_LINK_API_SECRET", "WEATHER_LINK_BASE_API_URL"])
  if (!envVars.exist) {
    return console.log(`${chalk.red.bold(`Missing Environment Variable(s):`)} ${envVars.missing.join(", ")}`);
  }

  const API_KEY = process.env.WEATHER_LINK_API_KEY;

  axios.get(
    buildWeatherLinkApiUrl(
      'stations',
      { "api-key": API_KEY, "t": String(Math.round(Date.now() / 1000)) },
      { "api-key": API_KEY, "t": String(Math.round(Date.now() / 1000)) }
    )
  )
    .then((response) => {

      if (options.raw) {
        return console.log(JSON.stringify(response.data));
      }

      let stationIdList = [];
      response.data.stations.forEach(station => {
        stationIdList.push(station.station_id);
      });

      spinner.succeed(chalk.green.bold(`${stationIdList.length} Station(s) Found`));
      return console.log(stationIdList);
    })
    .catch((error) => {
      if (options.raw) {
        return console.log(JSON.stringify(error.response.data));
      }

      spinner.fail('Unable to Find Stations');
      return console.log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};