
import axios from 'axios'; 

export function getTrials( params ) {
    return axios.get('/trials', {
        params
      })
      .then(response => response.data);
}