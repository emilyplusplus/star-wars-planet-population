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

let planets = people = []

let planetsPromise = swapi.getPagedResource('/planets').then(data => {
    planets = data
})

let peoplePromise = swapi.getPagedResource('/people').then(data => {
    people = data
})

Promise.all([planetsPromise, peoplePromise]).then(function(values) {
    console.log('Total indexed planets found: ' + planets.length)
    console.log('Total indexed people found: ' + people.length)
})
