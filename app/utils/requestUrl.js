export default function (url) {
    const APIPATH = '/api/';
    const APIVERSION = 'v1';

    let apiUrl = APIPATH + APIVERSION + '/' + url;

    return apiUrl;
};