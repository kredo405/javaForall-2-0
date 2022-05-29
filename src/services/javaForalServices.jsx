import axios from 'axios';
import qs from 'qs';


class JavaForallSevices {
    getResource = async (url) => {

        const options = {
            method: 'GET',
            url: `${url}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
        };

        let res = axios.request(options)

        return res;
    }

    getToken = async (reqeust) => {
        let refreshToken = localStorage.getItem("refresh_token");
        console.log(refreshToken);
        const data = {
            'grant_type': 'refresh_token',
            'client_id': 'template-service',
            'client_secret': 'IyR7LqTtbu5NiZiCBpxuG1vUQfX6klzI',
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
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("expires_in", Date.now() + (response.data.expires_in * 1000));
                reqeust();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getAllUsers = () => {
        return this.getResource(`${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer`);
    }
    refreshToken = (reqeust) => {
        return this.getToken(reqeust);
    }
}

export default JavaForallSevices;