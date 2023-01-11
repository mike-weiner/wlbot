import axios from 'axios';

export default function(service, options) {

  // Mapping of wlbot's shorthand for service names to Davis Instrument's official names.
  const fullServiceName = {
    'api'          : 'APIs and Data Feeds',
    'dataingest'   : 'Data Ingestion',
    'mobile'       : 'Mobile Applications',
    'syscomms'     : 'System Communication',
    'website'      : 'WeatherLink Website'
  };

  return (
   axios.get(
      'https://0886445102835570.hostedstatus.com/1.0/status/600712dea9c1290530967bc6'
    )
    .then((response) => {

      var requestedDavisServices = service === 'all' ? 
        response.data.result.status
        :
        response.data.result.status.filter(davisService => {
          return davisService.name === fullServiceName[service];
        });

      return requestedDavisServices;

    })
    .catch((error) => {
      return ({
        'error': {
          'msg': `${error.response.data.message}`,
          'status': `${error.response.status}`
        }
      });
    })
  );
};