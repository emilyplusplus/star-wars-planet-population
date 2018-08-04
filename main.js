#!/usr/bin/env node

const program = require('commander');
const swapi = require('./lib/swapi')

program
  .version('0.9.0', '-v, --version')
  .option('-p, --planet [planet]', 'Planet to list populus from')
  .parse(process.argv);

if(!program.planet) {
    console.error('No planet entered, please enter a planet (exiting now)')
    process.exit()
}

console.log('Getting data for the planet ' + program.planet + '...');

//Step 1 - Planets and people will be stored as arrays of objects
let planets = people = []

//Step 2 - Fire two async functions (see SWAPI lib file) to get data and store it in main thread
let planetsPromise = swapi.getPagedResource('/planets').then(data => {
    planets = data
})

let peoplePromise = swapi.getPagedResource('/people').then(data => {
    people = data
})

Promise.all([planetsPromise, peoplePromise]).then(function(values) {

    //Step 3 - When data is avialable from Step 2, print meaningful data (number and names of planets/people) in a readable manner
    console.log('\nTotal indexed planets found: ' + planets.length)
    console.log('Planet names: ' + planets.map( planet => { return planet.name }).join(', ') + '\n')
    console.log('Total indexed people found: ' + people.length)
    console.log('People names: ' + people.map( person => { return person.name }).join(', ') + '\n')

    //Step 4 - Createa a population object to hold key/value pairs containing names of native ppl on each planet and populate usuing js Array filter, map, and join
    let population = {}

    planets.forEach((planet) => {
        let names = people.filter(
            person => person.homeworld == planet.url
        ).map(
            person => { return person.name }
        ).join(', ')

        population[planet.name] = names
    })

    //Step 5 - Print names of native people for chosen planet, or display appropriate message if no-one is found or planet doesn't exist
    if(!population[program.planet] || population[program.planet].length == 0) {
        console.error('No native people found :(')
    } else {
        console.log('Native people: ' + population[program.planet])
    }
})
