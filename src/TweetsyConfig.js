/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
const NODE_BASE_URL_LOCAL = 'http://localhost:5000/'; //localhost
const NODE_BASE_URL = 'https://tweeter-hootspy.onrender.com/'; //live
// const NODE_BASE_URL = 'https://rrweb-server.onrender.com/'; //live
const NODE_DEV_URL = 'https://n/a.n/a.n/a/'; //dev

class TweetsyConfig {
    getNodeUrl() {
        // return NODE_BASE_URL;
        // return process.env.NODE_ENV === 'development' ? NODE_BASE_URL_LOCAL : NODE_DEV_URL;
        return process.env.NODE_ENV === 'development' ? NODE_BASE_URL_LOCAL : NODE_BASE_URL;
    }

    tweetPerPage = 30;
}

export default new TweetsyConfig();
