#!/usr/bin/env node

import { Command, Argument } from 'commander';

import catalog from './commands/metadata/catalog.js';
import mine from './commands/metadata/mine.js';
import stations from './commands/metadata/stations.js';

import current from './commands/weather/current.js';
import historic from './commands/weather/historic.js';

import config from './commands/config.js';

import status from './commands/status.js';

const program = new Command();

program
  .description("A CLI for the WeatherLink Live API.")
  .name("wlbot")
  .version('1.2.13')
  .usage('<command>');

const metadata = program.command("metadata")
  .description("Subcommand for accessing all metadata routes from the WeatherLink v2 API.");

metadata.command("catalog")
  .description("Get a catalog of all available sensor types and the data reported by each sensor.")
  .option("-d, --dry-run", "Checks for the necessary environmental variables and outputs the URL that would be queried.")
  .option("-r, --raw", "Display the raw response from the WeatherLink API.")
  .action(catalog);

metadata.command("mine")
  .description("Returns an array of Weather Station Id(s) that are associated with your WeatherLink API Key.")
  .option("-d, --dry-run", "Checks for the necessary environmental variables and outputs the URL that would be queried.")
  .option("-r, --raw", "Display the raw response from the WeatherLink API.")
  .action(mine);

metadata.command("stations")
  .description("Returns all available information about 1 or more weather stations associated with your WeatherLink API Key.")
  .argument('<station-ids>', 'A comma-separated list of Weather Station Id(s) that you want information about.')
  .option("-d, --dry-run", "Checks for the necessary environmental variables and outputs the URL that would be queried.")
  .option("-r, --raw", "Display the raw response from the WeatherLink API.")
  .action(stations);

const weather = program.command("weather")
  .description("Subcommand for accessing all weather routes from the WeatherLink v2 API.");

weather.command("current")
  .description("Get the current weather data for 1 weather station associated with your WeatherLink API Key.")
  .argument('<station-id>', 'The Station ID of the weather station that you want current weather data for.')
  .option("-d, --dry-run", "Checks for the necessary environmental variables and outputs the URL that would be queried.")
  .option("-r, --raw", "Display the raw response from the WeatherLink API.")
  .action(current);

weather.command("historic")
  .description("Get the historical weather data for 1 weather station associated with your WeatherLink API Key within a 24hr period.")
  .argument('<station-id>', 'The Station ID of the weather station that you want current weather data for.')
  .argument('<start-timestamp>', 'A Unix timestamp marking the beginning of the historical period (must be earlier than end-timestamp but not more than 24 hours earlier).')
  .argument('<end-timestamp>', 'A Unix timestamp marking the end of the historical period (must be later than start-timestamp but not more than 24 hours later).')
  .option("-d, --dry-run", "Checks for the necessary environmental variables and outputs the URL that would be queried.")
  .option("-r, --raw", "Display the raw response from the WeatherLink API.")
  .action(historic);

program.command("config")
  .description("Display the value(s) of the environment variable(s) being consumed.")
  .option("-l, --list", "List the complete values of the environment variables.")
  .action(config);

program.command("status")
  .description("Retrieves the operational status(es) of Davis Instrument's services.")
  .addArgument(new Argument('[service]', 'The Davis Instrument service that you want to obtain the operational status of.').choices(['all', 'api', 'dataingest', 'mobile', 'syscomms', 'website']).default('all'))
  .action(status);

program.commands.sort((a, b) => a._name.localeCompare(b._name));
program.parse(process.argv);
