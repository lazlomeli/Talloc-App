const axios = require('axios')

module.exports = (url) => {
    return axios.create({
        url: url
    })
}