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

//Step 1
let planets = people = []

//Step 2
let planetsPromise = swapi.getPagedResource('/planets').then(data => {
    planets = data
})

let peoplePromise = swapi.getPagedResource('/people').then(data => {
    people = data
})

Promise.all([planetsPromise, peoplePromise]).then(function(values) {

    //Step 3
    console.log('Total indexed planets found: ' + planets.length)
    console.log('Total indexed people found: ' + people.length)

    //Step 4
    let population = {}

    planets.forEach((planet) => {
        population[planet.name] = people.filter(person => person.homeworld == planet.url).map(person => { return person.name }).join(', ')
    })

    //Step 5
    if(population[program.planet].length == 0) {
        console.error('No native people found :(')
    } else {
        console.log('Native people: ' + population[program.planet])
    }
})
