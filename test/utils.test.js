import { buildWeatherLinkApiUrl, dateRangeIsValid } from '../lib/utils.js';
import chai from 'chai';

describe('buildWeatherLinkApiUrl', () => {
  beforeEach(() => {
    // Set the environment variables
    process.env.WEATHER_LINK_API_KEY = 'sampleKey';
    process.env.WEATHER_LINK_API_SECRET = 'sampleSecret';
    process.env.WEATHER_LINK_BASE_API_URL = 'https://api.weatherlink.com/v2/';
  });

  it('Endpoint: current/13', () => {
    chai.expect(
      buildWeatherLinkApiUrl(
        `current/13`, 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 'station-id': String(13), 't': String(1660759469)}, 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759469)}
      )
    ).to.equal('https://api.weatherlink.com/v2/current/13?api-key=sampleKey&t=1660759469&api-signature=dcf2f0eafc43ec8b6d6a1a7acfc6faa44f9bc1045124d7d6416f2f486ff72e95')
  });

  it('Endpoint: stations', () => {
    chai.expect(
      buildWeatherLinkApiUrl(
        'stations', 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289)}, 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660757289)}
      )
    ).to.equal('https://api.weatherlink.com/v2/stations?api-key=sampleKey&t=1660757289&api-signature=1663a50336ae4b7d975e322ad010e297d4ec487c5d3d9d4dad1d8a4a9e53d606')
  });

  it('Endpoint: stations/13,14,15', () => {
    chai.expect(
      buildWeatherLinkApiUrl(
        `stations/13,14,15`, 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 'station-ids': '13,14,15', 't': String(1660759608)}, 
        {'api-key': process.env.WEATHER_LINK_API_KEY, 't': String(1660759608)}
      )
    ).to.equal('https://api.weatherlink.com/v2/stations/13,14,15?api-key=sampleKey&t=1660759608&api-signature=7accbcf70808449f944e5da9e3e06db0aae7362870e7ace8312d5d9e8103d274')
  });
});

describe('dateRangeIsValid', () => {

  it('Start Timestamp is Before End Timestamp', () => {
    chai.expect(
      dateRangeIsValid(1673472399, 1673494000).isValid
    ).to.equal(true)
  });

  it('Start Timestamp is the Same as End Timestamp', () => {
    chai.expect(
      dateRangeIsValid(1673494000, 1673494000).isValid
    ).to.equal(false)
  });

  it('Start Timestamp is After End Timestamp', () => {
    chai.expect(
      dateRangeIsValid(1673494010, 1673494000).isValid
    ).to.equal(false)
  });

  it('Start Timestamp is 0', () => {
    chai.expect(
      dateRangeIsValid(0, 1673494000).isValid
    ).to.equal(false)
  });

  it('Start Timestamp is Negative', () => {
    chai.expect(
      dateRangeIsValid(-10, 1673494000).isValid
    ).to.equal(false)
  });

  it('End Timestamp is 0', () => {
    chai.expect(
      dateRangeIsValid(1673494010, 0).isValid
    ).to.equal(false)
  });

  it('End Timestamp is Negative', () => {
    chai.expect(
      dateRangeIsValid(1673494010, -10).isValid
    ).to.equal(false)
  });
});