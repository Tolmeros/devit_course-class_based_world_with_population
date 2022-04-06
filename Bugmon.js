/*
Bugmon = Bug Monster (like Pokemon)
*/

module.exports = class Bugmon {
  static PHYSICAL_GENDER_MALE = "male";
  static PHYSICAL_GENDER_FEMALE = "female";
  static HUMAN_PHYSICAL_GENDERS = [
    Bugmon.PHYSICAL_GENDER_MALE,
    Bugmon.PHYSICAL_GENDER_FEMALE
  ];

  #age = 0;
  #physicalGender;
  #weight;
  #name;
  #eyesColor;
  #alive;
  constructor(gender) {
    console.log(`Bugmon.constructor: ${gender}`);
    // как сделать helper log - что бы он класс и метод сам писал?
  }

  grow(years=1) {

  }
}
