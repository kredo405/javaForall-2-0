import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import qs from 'qs';

const RefreshToken = (reqeust) => {
console.log('sdfgsdgsd')
    // const { token } = useSelector(state => state);
    // const dispatch = useDispatch()
    // const data = {
    //     'grant_type': 'refresh_token',
    //     'client_id': process.env.REACT_APP_CLIENTID,
    //     'client_secret': process.env.REACT_APP_CLIENT_SECRET,
    //     'refresh_token': token.refresh_token,
    // }

    // const options = {
    //     method: 'post',
    //     url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/template/protocol/openid-connect/token`,
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     data: qs.stringify(data),
    // }
    // axios.request(options)
    //     .then((response) => {
    //         console.log(response);
    //         dispatch({
    //             type: 'Auth',
    //             payload: {
    //                 token: response.data.access_token,
    //                 refresh_token: response.data.refresh_token,
    //                 expires_in: Date.now() + (response.data.expires_in * 1000)
    //             }
    //         })

    //         reqeust();
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
}


export default RefreshToken;