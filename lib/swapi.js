const request = require('request-promise')

const api_prefix = 'https://swapi.co/api'

var SWAPI = function () {}

SWAPI.prototype.getPlanets = async function () {
    let planets = []
    let next = api_prefix + '/planets'

    while(next) {
        await request(next, {json: true}).then(data => {
            planets = planets.concat(data.results)
            next = data.next
        }).catch(err => {
            console.error(err)
        })
    }

    return planets

    //console.log(planets)
}

SWAPI.prototype.getPeople = async function () {
    let people = []
    let next = api_prefix + '/people'

    while(next) {
        await request(next, {json: true}).then(data => {
            people = people.concat(data.results)
            next = data.next
        }).catch(err => {
            console.error(err)
        })
    }

    return people
}

module.exports = new SWAPI()