
module.exports = class World {
  #population;
  #intevalUpdater;
  #worldTime = 0;

  constructor() {
    this.#population = [];
    console.log('World init.');
  }

  life() {
    // взросление 
  }

  addCreature(creature) {
    this.#population.push(creature);
  }

  populate() {
    
  }

  timeStep(years=1) {
    //console.log(`World.timeStep: years = ${years}`);
    this.#worldTime += years;
    //console.log(`World.timeStep: current world year ${this.#worldTime}`);

    
  }

  run() {
    let t = this;
    this.#intevalUpdater = setInterval(function() {
      t.timeStep();
    }, 1000);
  }

  stop() {
    clearInterval(this.#intevalUpdater);
  }

  infoText() {
    let result = ["Info :"];

    result.push(`Current world time: ${this.#worldTime}`);
    result.push(`Current world population: ${this.#population.length}`);

    return result.join('\n');
  }

}
