const Bugmon = require('./Bugmon.js');

module.exports = class BugmonMale extends Bugmon {
  constructor() {
    super(Bugmon.PHYSICAL_GENDER_MALE);

  }
}
