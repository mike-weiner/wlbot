#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

import current from './commands/current.js';
import mine from './commands/mine.js';
import stations from './commands/stations.js';

program.description("A CLI for the WeatherLink Live API.")
      .name("wlbot")
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
  
program.parse(process.argv);