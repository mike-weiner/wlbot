import { buildWeatherLinkApiUrl, checkForRequired, dateRangeIsValid } from '../../lib/utils.js';

describe('buildWeatherLinkApiUrl(...)', () => {
  describe('Correctly Builds WeatherLink API URL', () => {
    test.each([
      {
        endpoint: 'current/13',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 'station-id': String(13), 't': String(1660759469) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759469) },
        expected: 'https://api.weatherlink.com/v2/current/13?api-key=sampleKey&t=1660759469&api-signature=dcf2f0eafc43ec8b6d6a1a7acfc6faa44f9bc1045124d7d6416f2f486ff72e95',
      },
      {
        endpoint: 'stations',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289) },
        expected: 'https://api.weatherlink.com/v2/stations?api-key=sampleKey&t=1660757289&api-signature=1663a50336ae4b7d975e322ad010e297d4ec487c5d3d9d4dad1d8a4a9e53d606',
      },
      {
        endpoint: 'stations/13,14,15',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 'station-ids': '13,14,15', 't': String(1660759608) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759608) },
        expected: 'https://api.weatherlink.com/v2/stations/13,14,15?api-key=sampleKey&t=1660759608&api-signature=7accbcf70808449f944e5da9e3e06db0aae7362870e7ace8312d5d9e8103d274',
      }
    ])
      ('Returns Correct Services for Endpoint: $endpoint', async ({ endpoint, sigParams, uriParams, expected }) => {
        expect(buildWeatherLinkApiUrl(endpoint, sigParams, uriParams)).toEqual(expected);
      });
  });
});

describe('buildWeatherLinkApiUrl(...)', () => {
  describe('Correctly Builds WeatherLink API URL', () => {
    test.each([
      {
        endpoint: 'current/13',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 'station-id': String(13), 't': String(1660759469) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759469) },
        expected: 'https://api.weatherlink.com/v2/current/13?api-key=sampleKey&t=1660759469&api-signature=dcf2f0eafc43ec8b6d6a1a7acfc6faa44f9bc1045124d7d6416f2f486ff72e95',
      },
      {
        endpoint: 'stations',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289) },
        expected: 'https://api.weatherlink.com/v2/stations?api-key=sampleKey&t=1660757289&api-signature=1663a50336ae4b7d975e322ad010e297d4ec487c5d3d9d4dad1d8a4a9e53d606',
      },
      {
        endpoint: 'stations/13,14,15',
        sigParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 'station-ids': '13,14,15', 't': String(1660759608) },
        uriParams: { 'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759608) },
        expected: 'https://api.weatherlink.com/v2/stations/13,14,15?api-key=sampleKey&t=1660759608&api-signature=7accbcf70808449f944e5da9e3e06db0aae7362870e7ace8312d5d9e8103d274',
      }
    ])
      ('Returns Correct Services for Endpoint: $endpoint', async ({ endpoint, sigParams, uriParams, expected }) => {
        expect(buildWeatherLinkApiUrl(endpoint, sigParams, uriParams)).toEqual(expected);
      });
  });
});

describe('checkForRequired(...)', () => {
  it('Correctly Reports Missing Environment Variables', () => {
    expect(checkForRequired(["WEATHER_LINK_VERY_FAKE_NONEXISTENT"])).toEqual({ "exist": false, "missing": ["WEATHER_LINK_VERY_FAKE_NONEXISTENT"] });
  });

  it('Correctly Finds All Required Environment Variables Defined', () => {
    expect(checkForRequired(["WEATHER_LINK_API_KEY", "WEATHER_LINK_API_SECRET", "WEATHER_LINK_BASE_API_URL"])).toEqual({ "exist": true, "missing": [] });
  });
});


describe('dateRangeIsValid(...)', () => {
  describe('Validation of Correct Datetime Ranges', () => {
    test.each([
      {
        test: 'Start Timestamp is Before End Timestamp',
        start: 1673472399,
        end: 1673494000,
        expected: { isValid: true, msg: "" },
      },
    ])
      ('$test', async ({ start, end, expected }) => {
        expect(dateRangeIsValid(start, end)).toEqual(expected);
      });
  });

  describe('Invalidation of Broken Datetime Ranges', () => {
    test.each([
      {
        test: 'Start Timestamp is the Same as End Timestamp',
        start: 1673494000,
        end: 1673494000,
        expected: { isValid: false, msg: "start-timestamp must be less than end-timestamp." },
      },
      {
        test: 'Start Timestamp is After End Timestamp',
        start: 1673494010,
        end: 1673494000,
        expected: { isValid: false, msg: "start-timestamp must be less than end-timestamp." },
      },
      {
        test: 'Start Timestamp is 0',
        start: 0,
        end: 1673494000,
        expected: { isValid: false, msg: "start-timestamp and end-timestamp must be greater than 0." },
      },
      {
        test: 'Start Timestamp is Negative',
        start: -10,
        end: 1673494000,
        expected: { isValid: false, msg: "start-timestamp and end-timestamp must be greater than 0." },
      },
      {
        test: 'End Timestamp is 0',
        start: 1673494010,
        end: 0,
        expected: { isValid: false, msg: "start-timestamp and end-timestamp must be greater than 0." },
      },
      {
        test: 'End Timestamp is Negative',
        start: 1673494010,
        end: -10,
        expected: { isValid: false, msg: "start-timestamp and end-timestamp must be greater than 0." },
      },
    ])
      ('$test', async ({ start, end, expected }) => {
        expect(dateRangeIsValid(start, end)).toEqual(expected);
      });
  });
});
