const request = require('request-promise')

const api_prefix = 'https://swapi.co/api'

let SWAPI = function() {}

SWAPI.prototype.getPagedResource = async function (resource) {
    let resources = []
    let next = api_prefix + resource
    let total

    while(next) {
        await request(next, {json: true}).then(data => {
            resources = resources.concat(data.results)
            next = data.next
            total = data.count
        }).catch(err => {
            console.error(err)
        })

        console.log('[' + ((resources.length / total) * 100).toFixed(0) + ' %] ' + resource)
    }

    return resources
}

module.exports = new SWAPI()