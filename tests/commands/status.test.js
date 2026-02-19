import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

const axiosGetMock = vi.fn();
vi.mock('axios', () => ({
  default: {
    get: axiosGetMock,
  }
}));

const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });

const { default: status } = await import('../../commands/status.js');

describe('wlbot config', () => {
  const mockSuccessfulApiCall = {
    data: {
      result: {
        status: [
          { name: 'APIs and Data Feeds', status: 'Operational', status_code: 100 },
          { name: 'WeatherLink Website', status: 'Error', status_code: 501 },
        ]
      }
    }
  };

  const mockMalformedApiCall = {
    data: {
      result: {
        status: 'Malformed Statuses'
      }
    }
  };

  const mockFailedApiCall = {
    response: {
      data: {
        message: 'Something went wrong.'
      },
      status: 502
    }
  };

  beforeEach(() => {
    vi.resetModules();
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Successful Return from HostedStatus API', () => {
    test.each([
      { filter: 'all', options: {}, expected: [{ name: 'APIs and Data Feeds', status: 'Operational', status_code: 100 }, { name: 'WeatherLink Website', status: 'Error', status_code: 501 },] },
      { filter: 'website', options: {}, expected: [{ name: 'WeatherLink Website', status: 'Error', status_code: 501 },] }
    ])
      ('Returns Correct Services with Filter: $filter', async ({ filter, options, expected }) => {
        axiosGetMock.mockImplementationOnce(() => Promise.resolve(mockSuccessfulApiCall));
        const result = await status(filter, options);

        expect(axiosGetMock).toHaveBeenCalledTimes(1);
        expect(axiosGetMock).toHaveBeenCalledWith('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');
        expect(logSpy).toHaveBeenCalledTimes(expected.length);
        expect(result).toEqual(expected);
      });
  });

  describe('Failed Return from HostedStatus API', () => {
    test.each([
      { filter: 'all', options: {}, expected: { 'error': { 'msg': 'Something went wrong.', 'status': "502", } } },
      { filter: 'website', options: {}, expected: { 'error': { 'msg': 'Something went wrong.', 'status': "502", } } },
    ])
      ('Returns Correct Failure with Filter: $filter', async ({ filter, options, expected }) => {
        axiosGetMock.mockImplementationOnce(() => Promise.reject(mockFailedApiCall));
        const result = await status(filter, options);

        expect(axiosGetMock).toHaveBeenCalledTimes(1);
        expect(axiosGetMock).toHaveBeenCalledWith('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
      });
  });

  describe('Malformed Return from HostedStatus API', () => {
    test.each([
      { filter: 'all', options: {}, expected: { 'error': { 'msg': 'Hosted Status returned in an unexpected format.', 'status': "999", } } },
      { filter: 'website', options: {}, expected: { 'error': { 'msg': 'Hosted Status returned in an unexpected format.', 'status': "999", } } },
    ])
      ('Returns Correct Failure with Filter: $filter', async ({ filter, options, expected }) => {
        axiosGetMock.mockImplementationOnce(() => Promise.resolve(mockMalformedApiCall));
        const result = await status(filter, options);

        expect(axiosGetMock).toHaveBeenCalledTimes(1);
        expect(axiosGetMock).toHaveBeenCalledWith('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
      });
  });
});
