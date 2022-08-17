import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl } from '../lib/utils.js'

const log = console.log;

export default (options) => {
  const API_KEY = process.env.WEATHER_LINK_API_KEY;
  const spinner = !options.raw ? ora('Searching for Stations').start() : undefined;

  axios.get(
      buildWeatherLinkApiUrl(
        'stations', 
        {"api-key": API_KEY, "t": String(Math.round(Date.now() / 1000))}, 
        {"api-key": API_KEY, "t": String(Math.round(Date.now() / 1000))}
      )
    )
    .then((response) => {

      if (options.raw) {
        return log(JSON.stringify(response.data));
      }

      let stationIdList = [];
      response.data.stations.forEach(station => {
        stationIdList.push(station.station_id);
      });

      spinner.succeed(chalk.green.bold(`${stationIdList.length} Station(s) Found`));
      return log(stationIdList);
    })
    .catch((error) => {
      if (options.raw) {
        return log(JSON.stringify(error.response.data));
      }

      spinner.fail('Unable to Find Stations');
      return log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};