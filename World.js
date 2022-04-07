const helpers = require('./helpers.js');
const Bugmon = require('./Bugmon.js');

module.exports = class World {
  #population;
  #intevalUpdater;
  #worldTime = 0;
  #worldName;

  #callbackMoverToAnotherWorld;

  constructor(worldName) {
    this.#population = [];

    this.#worldName = worldName ? worldName : "Default World";

    console.log(`World "${this.#worldName}" init.`);
  }

  life(years=1) {
    // взросление
    let deadPopulation = [];
    for (let creature of this.#population) {
      /*
      if (creature.grow()) {
        console.log('');
      }
      */

      creature.grow();

      if (!creature.isAlive) {
        deadPopulation.push(creature);

        // можно ли так делать внутри этого for?
        const index = this.#population.indexOf(creature);
        this.#population.splice(index, 1);
      }
    }

    /*
    for (let deadCreature of deadPopulation) {
      const index = this.#population.indexOf(deadCreature);
      this.#population.splice(index, 1);
    }
    */

    // скобки вокнуг deadPopulation.length > 0 потому что мне так
    // удобнее для чтения кода и меньше ошибок происходит в коде
    // это уже сформировавшаяся привычка

    if (this.#callbackMoverToAnotherWorld && (deadPopulation.length > 0)) {
      this.#callbackMoverToAnotherWorld(deadPopulation);
    }

  }

  addCreatures(creatures) {
    /*
    console.log('addCreatures');
    console.log(creatures);
    */
    for (let creature in creatures) {
      this.addCreature(creature);
    }
  }

  addCreature(creature) {
    this.#population.push(creature);
  }

  meet(creatureA, creatureB) {
    if (creatureA.gender == Bugmon.PHYSICAL_GENDER_FEMALE) {
      return creatureA.getBirthFrom(creatureB);
    }
    else if (creatureB.gender == Bugmon.PHYSICAL_GENDER_FEMALE) {
      return creatureB.getBirthFrom(creatureA);
    }

    return null;
  }

  populate() {
    if (this.#population.length > 1) {
      let meetCount = helpers.getRandomInt(0, this.#population.length*3);
      do {
        let creatureA = helpers.getRandomElemetFromArray(this.#population);
        let otherCreatures = [...this.#population].splice(
          this.#population.indexOf(creatureA),
          1
        );

        let creatureB = helpers.getRandomElemetFromArray(otherCreatures);

        let child = this.meet(creatureA, creatureB);
        if (child) {
          this.addCreature(child);
        }

        meetCount--;
      } while (meetCount>0);
    }
    //console.log('population');
    //console.log(this.#population);
  }

  timeStep(years=1) {
    //console.log(`World.timeStep: years = ${years}`);
    //console.log(`World.timeStep: current world year ${this.#worldTime}`);

    this.life(years);
    this.populate();

    this.#worldTime += years;

    if (this.#population.length == 0) {
      console.log('No population. World stopped.');
      this.stop();
    }

    if (this.#population.length > 1000) {
      console.log('World collapsed and stopped.');
      this.stop();
    }
  }

  run(interval = 1000) {
    let t = this;
    this.#intevalUpdater = setInterval(function() {
      t.timeStep();
    }, interval);
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

  onDeath(callback) {
    this.#callbackMoverToAnotherWorld = callback;
  }

}
