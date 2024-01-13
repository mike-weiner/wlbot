import axios from 'axios';

export default async function (service, _) {

  // Mapping of wlbot's shorthand for service names to Davis Instrument's official names.
  const fullServiceName = {
    'api': 'APIs and Data Feeds',
    'dataingest': 'Data Ingestion',
    'mobile': 'Mobile Applications',
    'syscomms': 'System Communication',
    'website': 'WeatherLink Website'
  };

  try {
    const response = await axios.get('https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6');

    if (!Array.isArray(response.data.result.status)) {
      throw ({ response: { data: { message: 'Hosted Status returned in an unexpected format.' }, status: 999 } })
    }

    var requestedDavisServices = service === 'all' ?
      response.data.result.status
      :
      response.data.result.status.filter(davisService => {
        return davisService.name === fullServiceName[service];
      });

    requestedDavisServices.forEach((requestedService) => {
      console.log(requestedService.name + ' is ' + requestedService.status + ' (Status Code: ' + requestedService.status_code + ')');
    });

    return requestedDavisServices;

  } catch (error) {
    console.log('Error: ' + error);

    return ({
      'error': {
        'msg': `${error.response.data.message}`,
        'status': `${error.response.status}`
      }
    });
  }
};
