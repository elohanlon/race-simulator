define(function() {

  function MathHelper() {}

  /**
   * Returns a random number between min and max, inclusive.
   */
  MathHelper.getRandomNumber = function(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  }

  return MathHelper;
});
