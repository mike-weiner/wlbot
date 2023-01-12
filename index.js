#!/usr/bin/env node

import { Command, Argument } from 'commander';
const program = new Command();

import catalog from './commands/catalog.js';
import current from './commands/current.js';
import historic from './commands/historic.js';
import mine from './commands/mine.js';
import stations from './commands/stations.js';
import status from './commands/status.js'

program.description("A CLI for the WeatherLink Live API.")
      .name("wlbot")
      .version('1.0.1')
      .usage('<command>');

program.command("catalog")
      .description("Get a catalog of all available sensor types and the data reported by each sensor.")
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(catalog);

program.command("current")
      .description("Get the current weather data for 1 weather station associated with your WeatherLink API Key.")
      .argument('<station-id>', 'The Station ID of the weather station that you want current weather data for.')
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(current);

program.command("historic")
      .description("Get the historical weather data for 1 weather station associated with your WeatherLink API Key within a given time range.")
      .argument('<station-id>', 'The Station ID of the weather station that you want current weather data for.')
      .argument('<start-timestamp>', 'A Unix timestamp marking the beginning of the historical period (must be earlier than end-timestamp but not more than 24 hours earlier).')
      .argument('<end-timestamp>', 'A Unix timestamp marking the end of the historical period (must be later than start-timestamp but not more than 24 hours later).')
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(historic);

program.command("mine")
      .description("Returns an array of Weather Station Id(s) that are associated with your WeatherLink API Key.")
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(mine);

program.command("stations")
      .description("Returns all available information about 1 or more weather stations associated with your WeatherLink API Key.")
      .argument('<station-ids>', 'A comma-separated list of Weather Station Id(s) that you want information about.')
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(stations);

program.command("status")
      .description("Retrieves the operational status(es) of Davis Instrument's services.")
      .addArgument(new Argument('[service]', 'The Davis Instrument service that you want to obtain the operational status of.').choices(['all', 'api', 'dataingest', 'mobile', 'syscomms', 'website']).default('all'))
      .option("-r, --raw", "Display the raw response from the Status.io API.")
      .action((service, options) => {
            status(service, options).then((result) => {
                  if (!Array.isArray(result)) {
                        console.log('Error: ' + result.error.msg);
                  } else {
                        result.forEach((requestedService) => {
                              console.log(requestedService.name + ' is ' + requestedService.status + ' (Status Code: ' + requestedService.status_code + ')');
                        });
                  }
            });
      });
  
program.parse(process.argv);