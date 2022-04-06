
module.exports = class World {
  #population;

  constructor() {
    this.#population = [];
    console.log('World init.');
  }

  life() {
    // взросление 
  }

  addHuman(human) {
    this.#population.push(human);
  }

  populate() {
    
  }

}
