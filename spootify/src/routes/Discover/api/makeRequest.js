import axios from 'axios';
import qs from 'querystring';

async function getAccessToken() {
  const { data: { access_token: token, expires_in: expiration } } = await axios.post(
    process.env.REACT_APP_ACCESS_TOKEN_URL,
    // qs.strringify transforms { 'grant_type': 'client_credentials' } into 'grant_type=client_credentials'
    qs.stringify({ 'grant_type': 'client_credentials' }),
    {
      headers: {
        /* 
            application/x-www-form-urlencoded, the body of the HTTP message sent to the server is essentially one giant query string. E.g. MyVariableOne=ValueOne&MyVariableTwo=ValueTwo
        */
        'Content-Type': 'application/x-www-form-urlencoded',
        /* 
            Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic <base64 encoded client_id:client_secret

            Addendum: The btoa() method (window object) encodes a string in base-64.
        */
        Authorization: `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
      }
    }
  );

  return {token, expiration};
}


export default async function makeRequest(path, resourceType) {
  let user = JSON.parse(localStorage.getItem('user'));
  const now = new Date();
  const nowInMs = now.getTime();

  if(!user || nowInMs > user.expiration){
    localStorage.removeItem('user');

    user = await getAccessToken();
    user.expiration = (user.expiration * 1000) + nowInMs;

    localStorage.setItem('user', JSON.stringify(user));
  }

  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/browse/${path}`,
    {  headers: { Authorization: `Bearer ${user.token}` } }
  );

  return res.data[resourceType].items;
}