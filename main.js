#!/usr/bin/env node

const program = require('commander');
const swapi = require('./lib/swapi')

program
  .version('0.9.0', '-v, --version')
  .option('-p, --planet [planet]', 'Planet to list populus from')
  .parse(process.argv);

if(!program.planet) {
    console.error('No planet entered')
    process.exit()
}

console.log('Searching ' + program.planet + '...');


/*swapi.getPagedResource('/planets').then(data => {
    console.log(data)
})*/

swapi.getPagedResource('/planets').then(data => {
    console.log(data)
})
