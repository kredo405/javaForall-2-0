import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import qs from 'qs';

const RefreshToken = (reqeust) => {

    const refreshToken = sessionStorage.getItem('refresh_token');
    const data = {
        'grant_type': 'refresh_token',
        'client_id': process.env.REACT_APP_CLIENTID,
        'client_secret': process.env.REACT_APP_CLIENT_SECRET,
        'refresh_token': refreshToken,
    }

    const options = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/template/protocol/openid-connect/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
    }
    axios.request(options)
        .then((response) => {
            console.log(response);
            sessionStorage.setItem('token', response.data.access_token);
            sessionStorage.setItem('refresh_token', response.data.refresh_token);
            sessionStorage.setItem('expires_in', Date.now() + (response.data.expires_in * 1000));
            sessionStorage.setItem('isAuth', true);

            reqeust();
        })
        .catch((error) => {
            console.error(error);
        });
}


export default RefreshToken;