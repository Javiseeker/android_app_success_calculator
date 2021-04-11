import axios from 'axios';

const KEY: string = '';

export default axios.create({
    baseURL: 'https://app-stores.p.rapidapi.com/',
    params: {
        part: '',
        type: '',
        key: KEY
    }
});