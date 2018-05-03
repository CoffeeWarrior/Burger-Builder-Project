import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-project-8b0c7.firebaseio.com/"
});

export default instance;