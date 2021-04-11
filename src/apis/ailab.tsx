import axios from 'axios';

export default axios.create({
    baseURL: 'http://predict-ml.carrasco.uruit.com/',
    headers: {
        Accept:'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});


        