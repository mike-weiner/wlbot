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

/**
 * Check that the required environmental variables are defined to complete the specific action.
 * 
 * @param {Array} envVars An array of the names of the environmental variables to check for values.
 * @return {Object} An object containing whether all 
 */
export function checkForRequired(envVars) {
  let missingEnvVars = []

  for (const envVar of envVars) {
    if (!process.env[envVar]){
      missingEnvVars.push(envVar)
    }
  }

  if (missingEnvVars.length != 0) {
    return {"exist": false, "missing": missingEnvVars};
  }

  return {"exist": true, "missing": missingEnvVars};
}

/**
 * Determines if the start and end timestamps the user provides are valid.
 * 
 * @param {Integer} startTimestamp A Unix timestamp marking the beginning of the historical period (must be earlier than end-timestamp but not more than 24 hours earlier).
 * @param {Integer} endTimestamp A Unix timestamp marking the end of the historical period (must be later than start-timestamp but not more than 24 hours later).
 */
export function dateRangeIsValid(startTimestamp, endTimestamp) {
  if (startTimestamp <= 0 || endTimestamp <= 0) {
    return {isValid: false, msg:"start-timestamp and end-timestamp must be greater than 0."};
  }
  
  if (startTimestamp >= endTimestamp) {
    return {isValid: false, msg:"start-timestamp must be less than end-timestamp."};
  }

  return {isValid: true, msg:""};
}