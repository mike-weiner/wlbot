import {jest} from '@jest/globals'

const axiosGetMock = jest.fn();
jest.unstable_mockModule('axios', () => ({
  default: {
    get: axiosGetMock,
  }
}));

const { default: status } = await import('../status.js');

describe('wlbot config', () => {
  const mockSuccessfulApiCall = {
    data: {
      result: {
        status: [
          { name: 'APIs and Data Feeds', status: 'Operational' },
          { name: 'WeatherLink Website', status: 'Error' },
        ]
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
    jest.resetModules();
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful Return from WL API', () => {
    test.each([
      { filter: 'all', options: {}, expected: [{ name: 'APIs and Data Feeds', status: 'Operational' }, { name: 'WeatherLink Website', status: 'Error' },] },
      { filter: 'website', options: {}, expected: [{ name: 'WeatherLink Website', status: 'Error' },] }
    ])
    ('Returns Correct Services with Filter: $filter', async ({ filter, options, expected }) => {
      axiosGetMock.mockImplementationOnce(() => Promise.resolve(mockSuccessfulApiCall));
      const result = await status(filter, options);

      expect(axiosGetMock).toHaveBeenCalledTimes(1);
      expect(axiosGetMock).toHaveBeenCalledWith('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');
      expect(result).toEqual(expected);
    });
  });

  describe('Failed Return from WL API', () => {
    test.each([
      { filter: 'all', options: {}, expected: {'error': {'msg': 'Something went wrong.','status': "502",}} },
      { filter: 'website', options: {}, expected: {'error': {'msg': 'Something went wrong.','status': "502",}} },
    ])
    ('Returns Correct Failure with Filter: $filter', async ({ filter, options, expected }) => {
      axiosGetMock.mockImplementationOnce(() => Promise.reject(mockFailedApiCall));
      const result = await status(filter, options);

      expect(axiosGetMock).toHaveBeenCalledTimes(1);
      expect(axiosGetMock).toHaveBeenCalledWith('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');
      expect(result).toEqual(expected);
    });
  });
});
