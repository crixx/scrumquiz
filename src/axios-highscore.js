import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://scrumquizz.firebaseio.com/'
});

export default instance;