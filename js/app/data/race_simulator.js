define(
  ['app/helpers/math_helper'],
function (MathHelper) {

  function RaceSimulator(raceUpdateIntervalFrequency, minMovementPerTick, maxMovementPerTick) {
    this.racerData = [];
    this.raceUpdateIntervalId = null;
    this.raceUpdateIntervalFrequency = raceUpdateIntervalFrequency;
    this.minMovementPerTick = minMovementPerTick;
    this.maxMovementPerTick = maxMovementPerTick;
  }

  /**
   * This function does nothing by default, and can be overridden. It will
   * fire whenever the race data has been updated after a simulation tick.
   */
  RaceSimulator.prototype.onUpdate = function(racerData) {}

  RaceSimulator.prototype.initialize = function(racerNames) {
    //Set up racers
    this.racerData = [];
    for(var i = 0; i < racerNames.length; i++) {
      this.racerData.push({
        name: racerNames[i],
        percentageComplete: 0
      });
    }

    //Stop any existing race
    this.stopRace();

    //Start race
    this.raceUpdateIntervalId = setInterval(this.update.bind(this), this.raceUpdateIntervalFrequency);
  }

  RaceSimulator.prototype.update = function() {
    var raceIsOver = false;

    //Update each racer's percentage by a random value
    for(var i = 0; i < this.racerData.length; i++) {
      this.racerData[i].percentageComplete += MathHelper.getRandomNumber(this.minMovementPerTick, this.maxMovementPerTick);
      // If any racer's position is >= 100, set that racer's position to 100
      // and prepare to end the race.  Don't immediately end the race though,
      // because the other racers need to get their updates in during this tick.
      if(this.racerData[i].percentageComplete >= 100) {
        this.racerData[i].percentageComplete = 100;
        raceIsOver = true;
      }
    }

    if(raceIsOver) {
      this.stopRace();
    }

    //Call the onUpdate function to run any bound event listener function
    this.onUpdate(this.getRacerData());
  }

  RaceSimulator.prototype.stopRace = function() {
    //Clear any existing raceUpdateIntervalId
    clearInterval(this.raceUpdateIntervalId);
  }

  /**
   * Returns a copy of the current racer data (in the form of an array)
   */
  RaceSimulator.prototype.getRacerData = function() {
    // Always return a COPY of the racer data so that the receiver
    // can't modify the RaceSimulator's Array instance.
    return JSON.parse(JSON.stringify(this.racerData));
  }

  return RaceSimulator;
});
