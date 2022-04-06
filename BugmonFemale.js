const Bugmon = require('./Bugmon.js');

module.exports = class BugmonFemale extends Bugmon {
  constructor() {
    super(Bugmon.PHYSICAL_GENDER_FEMALE);

  }
}
