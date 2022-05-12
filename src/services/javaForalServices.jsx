class JavaForallSevices {
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllUsers = () => {
        return this.getResource('http://localhost:8000/NB-bet-links');
    }
    // getUser = (id) => {
    //     return this.getResource(`http://localhost:8000/NB-bet-link/${id}`);
    // }
}

export default JavaForallSevices;