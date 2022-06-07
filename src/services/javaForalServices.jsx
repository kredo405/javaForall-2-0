import axios from 'axios';

class JavaForallSevices {
    getResource = async (url) => {

        const options = {
            method: 'GET',
            url: `${url}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // 'Access-Control-Allow-Origin': '*',
            },
        };

        let res = axios.request(options)

        return res;
    }

    getAllUsers = () => {
        return this.getResource(`${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer`);
    }
    refreshToken = (reqeust) => {
        return this.getToken(reqeust);
    }
}

export default JavaForallSevices;