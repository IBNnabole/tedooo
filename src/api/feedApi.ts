import axios from 'axios';

export const fetchFeedData = (skip: number) => {
    return axios.get(`https://backend.tedooo.com/hw/feed.json?skip=${skip}`);
};
