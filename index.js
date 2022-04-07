const process = require('process');

const World = require('./World.js');
const BugmonMale = require('./BugmonMale.js');
const BugmonFemale = require('./BugmonFemale.js');

const firstWorld = new World('Bugmon World');

const secondWorld = new World('New Bugmon World');
firstWorld.onDeath((creatures) => {
  secondWorld.addCreatures(creatures)
});

const firstBugmonMale = new BugmonMale();
const firstBugmonFemale = new BugmonFemale();

firstWorld.addCreature(firstBugmonMale);
firstWorld.addCreature(firstBugmonFemale);

firstWorld.run(500);


intervalInfoPrint = setInterval(function() {
  console.log(firstWorld.infoText());
}, 1000);


process.on('SIGINT', () => {
  firstWorld.stop();
  clearInterval(intervalInfoPrint);
});


