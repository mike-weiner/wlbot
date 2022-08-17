import crypto from 'crypto';

/**
 * Build and return the URL to query the WeatherLink Live API with.
 * 
 * @param {String} endpoint The endpoint in the WeatherLink Live API that you want to query.
 * @param {Object} signature_parameters An object containing the required information to build the API Signature for each request.
 * @param {Object} uri_parameters An object containing the required query parameters for the requested endpoint to query.
 * @return {String} The string to make the API call with to retrieve the requested data.
 */
export function buildWeatherLinkApiUrl(endpoint, signature_parameters, uri_parameters) {
  const BASE_URL = process.env.WEATHER_LINK_BASE_API_URL;
  const API_SECRET = process.env.WEATHER_LINK_API_SECRET;

  var apiSignature = "";
  for (const key in signature_parameters) {
    apiSignature = apiSignature + key + signature_parameters[key]
  }

  var hmac = crypto.createHmac('sha256', API_SECRET);
  var hashedData = hmac.update(apiSignature).digest('hex');

  var apiRequestURL = BASE_URL + endpoint + "?";
  Object.keys(uri_parameters).forEach((key, index) => {
    if (index === 0) {
      apiRequestURL = apiRequestURL + key + "=" + uri_parameters[key];
    } else {
      apiRequestURL = apiRequestURL + "&" + key + "=" + uri_parameters[key];
    }
  });
  
  apiRequestURL = apiRequestURL + "&api-signature=" + hashedData;
  return apiRequestURL;
}