import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

import { buildWeatherLinkApiUrl } from '../lib/utils.js'

const log = console.log;

export default (options) => {
  const API_KEY = process.env.WEATHER_LINK_API_KEY;
  const spinner = !options.raw ? ora('Retrieving Sensor Catalog').start() : undefined;

  axios.get(
      buildWeatherLinkApiUrl(
        `sensor-catalog`, 
        {"api-key": API_KEY, "t": String(Math.round(Date.now() / 1000))}, 
        {"api-key": API_KEY, "t": String(Math.round(Date.now() / 1000))}
      )
    )
    .then((response) => {
      if (options.raw) {
        return log(JSON.stringify(response.data));
      }

      spinner.succeed(chalk.green.bold(`Catalog Received`));
      return console.dir(response.data,{depth:null})
    })
    .catch((error) => {
      if (options.raw) {
        return log(JSON.stringify(error.response.data));
      }

      spinner.fail('Failed to Retrieve Catalog');
      return log(`${chalk.red.bold(`Error ${error.response.status}:`)} ${error.response.data.message}`);
    })
};