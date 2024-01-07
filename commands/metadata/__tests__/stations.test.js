import { jest } from '@jest/globals';

const axiosGetMock = jest.fn();
jest.unstable_mockModule('axios', () => ({
  default: {
    get: axiosGetMock,
  }
}));

const oraFailMock = jest.fn();
const oraSucceedMock = jest.fn();
const oraStartMock = jest.fn(() => ({ fail: oraFailMock, succeed: oraSucceedMock }));
jest.unstable_mockModule('ora', () => ({
  default: () => ({
    start: oraStartMock,
  })
}));

const buildWeatherLinkApiUrlMock = jest.fn();
const checkForRequiredMock = jest.fn();
jest.unstable_mockModule('../../../lib/utils.js', () => {
  return {
    buildWeatherLinkApiUrl: buildWeatherLinkApiUrlMock,
    checkForRequired: checkForRequiredMock,
  };
});

const { default: stations } = await import('../stations.js');

const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
const dirSpy = jest.spyOn(console, "dir").mockImplementation(() => { });

describe('wlbot metadata stations', () => {

  beforeEach(() => {
    jest.resetModules();
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSuccessfulApiCall = {
    data: {
      stations: [1],
      unit: "test",
    },
  }

  const mockFailedApiCall = {
    response: {
      data: {
        message: "Unit.Test"
      },
      status: 502,
    }
  }

  it('Success: Dry Run to Display Query URL', async () => {
    buildWeatherLinkApiUrlMock.mockReturnValue('http://unit.test');
    checkForRequiredMock.mockReturnValue({ exist: true, missing: [] });

    await stations(1, { dryRun: true, });

    expect(axiosGetMock).toHaveBeenCalledTimes(0);
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(1);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('http://unit.test');
    expect(oraFailMock).toHaveBeenCalledTimes(0);
    expect(oraStartMock).toHaveBeenCalledTimes(0);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });

  it('Success: Full Output', async () => {
    axiosGetMock.mockImplementationOnce(() => Promise.resolve(mockSuccessfulApiCall));
    buildWeatherLinkApiUrlMock.mockReturnValue('http://unit.test');
    checkForRequiredMock.mockReturnValue({ exist: true, missing: [] });

    await expect(stations(1, {})).resolves.toBe(mockSuccessfulApiCall);

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveReturned();
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(1);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledWith(mockSuccessfulApiCall.data, { depth: null });
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(oraFailMock).toHaveBeenCalledTimes(0);
    expect(oraStartMock).toHaveBeenCalledTimes(1);
    expect(oraSucceedMock).toHaveBeenCalledTimes(1);
  });

  it('Success: Full Output (Raw Output, No Spinner)', async () => {
    axiosGetMock.mockImplementationOnce(() => Promise.resolve(mockSuccessfulApiCall));
    buildWeatherLinkApiUrlMock.mockReturnValue('http://unit.test');
    checkForRequiredMock.mockReturnValue({ exist: true, missing: [] });

    await expect(stations(1, { raw: true })).resolves.toBe(mockSuccessfulApiCall);

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveReturned();
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(1);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockSuccessfulApiCall.data));
    expect(oraFailMock).toHaveBeenCalledTimes(0);
    expect(oraStartMock).toHaveBeenCalledTimes(0);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });

  it('Failure: API Query Fails', async () => {
    axiosGetMock.mockImplementationOnce(() => Promise.reject(mockFailedApiCall));
    buildWeatherLinkApiUrlMock.mockReturnValue('http://unit.test');
    checkForRequiredMock.mockReturnValue({ exist: true, missing: [] });

    await expect(stations(1, {})).rejects.toEqual(mockFailedApiCall);

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveReturned();
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(1);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));
    expect(oraFailMock).toHaveBeenCalledTimes(1);
    expect(oraStartMock).toHaveBeenCalledTimes(1);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });

  it('Failure: API Query Fails (No Spinner)', async () => {
    axiosGetMock.mockImplementationOnce(() => Promise.reject(mockFailedApiCall));
    buildWeatherLinkApiUrlMock.mockReturnValue('http://unit.test');
    checkForRequiredMock.mockReturnValue({ exist: true, missing: [] });

    await expect(stations(1, { raw: true, })).rejects.toEqual(mockFailedApiCall);

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveReturned();
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(1);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockFailedApiCall.response.data));
    expect(oraFailMock).toHaveBeenCalledTimes(0);
    expect(oraStartMock).toHaveBeenCalledTimes(0);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });

  it('Failure: Missing Environment Variables', async () => {
    checkForRequiredMock.mockReturnValue({ exist: false, missing: ['WEATHER_LINK_BASE_API_URL'] });

    await stations(1, {});

    expect(axiosGetMock).toHaveBeenCalledTimes(0);
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(0);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Missing Environment Variable'));
    expect(oraFailMock).toHaveBeenCalledTimes(1);
    expect(oraFailMock).toHaveBeenCalledWith(expect.stringContaining('Failed to Retrieve'));
    expect(oraStartMock).toHaveBeenCalledTimes(1);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });

  it('Failure: Missing Environment Variables (No Spinner)', async () => {
    checkForRequiredMock.mockReturnValue({ exist: false, missing: ['WEATHER_LINK_BASE_API_URL'] });

    await stations(1, { dryRun: true, raw: true });

    expect(axiosGetMock).toHaveBeenCalledTimes(0);
    expect(buildWeatherLinkApiUrlMock).toHaveBeenCalledTimes(0);
    expect(checkForRequiredMock).toHaveBeenCalledTimes(1);
    expect(dirSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Missing Environment Variable'));
    expect(oraFailMock).toHaveBeenCalledTimes(0);
    expect(oraStartMock).toHaveBeenCalledTimes(0);
    expect(oraSucceedMock).toHaveBeenCalledTimes(0);
  });
});
