import chalk from 'chalk';
import ora from 'ora';

export default (options) => {
  const spinner = !options.raw ? ora('Reading Environment Variables').start() : undefined;

  let evValues = {
    "WEATHER_LINK_API_KEY": process.env.WEATHER_LINK_API_KEY || "",
    "WEATHER_LINK_API_SECRET": process.env.WEATHER_LINK_API_SECRET || "",
    "WEATHER_LINK_BASE_API_URL": process.env.WEATHER_LINK_BASE_API_URL || "",
  }

  if (!options.list) {
    for (const [key, value] of Object.entries(evValues)) {
      evValues[key] = evValues[key].slice(0, 3) + "*".repeat(value.length - evValues[key].slice(0, 3).length);
    }
  }

  spinner.succeed(chalk.green.bold(`Environment Variables Retrieved`));
  return console.log(JSON.stringify(evValues, undefined, 2))
};