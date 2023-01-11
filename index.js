#!/usr/bin/env node

import { Command, Argument } from 'commander';
const program = new Command();

import current from './commands/current.js';
import mine from './commands/mine.js';
import stations from './commands/stations.js';
import status from './commands/status.js'

program.description("A CLI for the WeatherLink Live API.")
      .name("wlbot")
      .version('1.0.1')
      .usage('<command>');

program.command("mine")
      .description("Returns an array of Weather Station Id(s) that are associated with your WeatherLink API Key.")
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(mine);

program.command("stations")
      .description("Returns all available information about 1 or more weather stations associated with your WeatherLink API Key.")
      .argument('<station-ids>', 'A comma-separated list of Weather Station Id(s) that you want information about.')
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(stations);

program.command("current")
      .description("Get the current weather data for 1 weather station associated with your WeatherLink API Key.")
      .argument('<station-id>', 'The Station ID of the weather station that you want current weather data for.')
      .option("-r, --raw", "Display the raw response from the WeatherLink API.")
      .action(current);

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