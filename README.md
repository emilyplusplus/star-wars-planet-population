# star-wars-planet-population
A Node.js command line application that uses a publicly accessible SWAPI (Star Wars API, https://swapi.co/) to get the people that are from a given planet in the Star Wars universe.


### Developer Install/Setup Instructions (How To Use) 
To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line: 

```bash
# Clone this repository
git clone https://github.com/emilyplusplus/star-wars-planet-population
# Go into the repository
cd star-wars-planet-population
# Install dependencies
npm install
# Run the app and pass in an argument with planet name
node main.js -p Coruscant
```

### Global Install (Alternative Install Option)
To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line: 

```bash
# Clone this repository
git clone https://github.com/emilyplusplus/star-wars-planet-population
# Go into the repository
cd star-wars-planet-population
# Install dependencies
npm install
# Install globally (you may need sudo depending on permissions on your computer)
npm i -g ./
# Run the app and pass in an argument with planet name
# **** This can now be done from anywhere on your computer regardless of pwd ****
swpp -p Coruscant
```

### To Do (Future Ideas)
1. Add local cache with some expiry time (i.e. 24 hrs) so we don't have to hit API everytime to speed up user results and minimize API/data usage
2. Add more arguments/make more data accessible via CLI
