import axios from 'axios';

export const authenticate = (body: any) => {
  
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  
    return axios
      .post(body.apiRoot + '/api/token/', {
        username: body.username,
        password: body.password,
      }, {})
      .then( (response) => {
        return response.status === 200 
        ? Promise.resolve(response)
        : Promise.reject();
      })
      .catch( (error) =>{
        if (error.message === 'Network Error') return error.message;
            return error.response
      });
  };
  