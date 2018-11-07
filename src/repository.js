
import axios from 'axios'; 

export function getTrials( params ) {
    console.log('client - getTrials()');
    console.log(params);
    axios.get('/trials', {
        params
      })
      .then(function (response) {
          console.log('success');
          console.log(response);
      })
      .catch(function (error) {
          console.log('error');
        console.log(error);
      });
}