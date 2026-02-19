import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

const oraSucceedMock = vi.fn();
const oraStartMock = vi.fn(() => ({ succeed: oraSucceedMock }));

vi.mock('ora', () => ({
  default: () => ({
    start: oraStartMock,
  })
}));

const { default: config } = await import('../../commands/config.js');

describe('wlbot config', () => {

  const logMock = vi.spyOn(console, "log").mockImplementation(() => { });
  const backupEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
  })

  afterEach(() => {
    vi.clearAllMocks();
    process.env = backupEnv;
  });

  test.each([
    {
      name: 'Env Vars Correctly Protected without List Option',
      options: {},
      wipeEnvs: false,
      expected: {
        WEATHER_LINK_API_KEY: "sam******",
        WEATHER_LINK_API_SECRET: "sam*********",
        WEATHER_LINK_BASE_API_URL: "htt****************************"
      },
    },
    {
      name: 'Env Vars Correctly Exposed with List Option',
      options: { list: true },
      wipeEnvs: false,
      expected: {
        WEATHER_LINK_API_KEY: "sampleKey",
        WEATHER_LINK_API_SECRET: "sampleSecret",
        WEATHER_LINK_BASE_API_URL: "https://api.weatherlink.com/v2/"
      },
    },
    {
      name: 'Correctly Handle Missing Environment Variables',
      options: {},
      wipeEnvs: true,
      expected: {
        WEATHER_LINK_API_KEY: "",
        WEATHER_LINK_API_SECRET: "",
        WEATHER_LINK_BASE_API_URL: ""
      },
    },
  ])
    ('$name', async ({ options, wipeEnvs, expected }) => {
      if (wipeEnvs) { process.env = {}; }

      config(options);

      expect(oraStartMock).toHaveBeenCalledTimes(1);
      expect(logMock).toHaveBeenCalled();
      expect(oraSucceedMock).toHaveBeenCalledTimes(1);
      expect(logMock).toHaveBeenCalledWith(JSON.stringify(expected, undefined, 2));
    });
});
