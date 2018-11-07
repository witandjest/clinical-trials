
import axios from 'axios';

export function testGet() {
    axios.get('/user', {
        params: {
          ID: 12345
        }
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