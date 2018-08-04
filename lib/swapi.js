const request = require('request-promise')

const api_prefix = 'https://swapi.co/api'

let SWAPI = function() {}

SWAPI.prototype.getPagedResource = async function (resource) {
    let resources = []
    let next = api_prefix + resource
    let total

    //page through each API results until no more results then return data
    while(next) {
        //Deserialization is automatic because of the json option used in request function
        await request(next, {json: true}).then(data => {
            resources = resources.concat(data.results)
            next = data.next
            total = data.count
        }).catch(err => {
            console.error(err)
        })

        //give user some feedback a to progress so they don't think app is hanging or frozen
        console.log('[' + ((resources.length / total) * 100).toFixed(0) + ' %] ' + resource)
    }

    return resources
}

//export anonymous object
module.exports = new SWAPI()