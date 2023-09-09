import axios from "axios";


const axios = require('axios');
const API_KEY = '39344884-58dfe21e72d55086ae867b0a2';
const API_URL = 'https://pixabay.com/api/';
const inputValue = document.querySelector("input[name='searchQuery']");






export function searchImages(value) { 
    return axios.get('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: value,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    });
}