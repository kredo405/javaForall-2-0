import axios from 'axios';

class JavaForallSevices {
    getResource = async (url) => {

        const options = {
            method: 'GET',
            url: `${url}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };

        let res = axios.request(options)

        return res;
    }

    getAllUsers = () => {
        return this.getResource(`${process.env.REACT_APP_BASE_URL_DATA}/api/front/developer`);
    }
}

export default JavaForallSevices;