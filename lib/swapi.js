const request = require('request-promise')

const api_prefix = 'https://swapi.co/api'

var SWAPI = function () {}

SWAPI.prototype.getPagedResource = async function (resource) {
    let resources = []
    let next = api_prefix + resource

    while(next) {
        await request(next, {json: true}).then(data => {
            resources = resources.concat(data.results)
            next = data.next
        }).catch(err => {
            console.error(err)
        })
    }

    return resources
}

module.exports = new SWAPI()