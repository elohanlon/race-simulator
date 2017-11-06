define(
  ['jquery', 'app/data/image_cache'],
function($, ImageCache) {

  function Canvas(elementId, parentElement, opts={}) {

    //Create new html element for this canvas object
    this.$el = $('<canvas class="canvas" tabIndex="1"></canvas>'); // Note: Need to add tabIndex to canvas element, otherwise focus() calls won't work on it
    this.$el.attr('id', elementId);

    //Add new element to parentElement
    $(parentElement).append(this.$el);

    this.handleResize(); //Call handleResize once manually so size is set up properly on init
  }

  Canvas.prototype.handleResize = function() {
    // Update the height and width attributes of the canvas HTML element so that we have 1:1 mapping of canvas units and on-screen pixels
    this.$el.attr('width', this.getCanvasWidth()).attr('height', this.getCanvasHeight());
  }

  Canvas.prototype.getCanvasWidth = function() {
    return parseInt(this.$el.width());
  }

  Canvas.prototype.getCanvasHeight = function() {
    return parseInt(this.$el.height());
  }

  Canvas.prototype.getContext = function() {
    return this.$el[0].getContext("2d");
  }

  Canvas.prototype.clear = function() {
    var ctx = this.getContext();

    // Reset the transform to default values in order to properly clear
    // the canvas if it has gone through a prior transformation
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }

  Canvas.prototype.render = function(racerData) {
    //Clear the canvas
    this.clear();

    var ctx = this.getContext();

    //Render the current set of racers on the canvas
    this.renderRacers(ctx, racerData);
  }

  Canvas.prototype.renderRacers = function(ctx, racerData) {

    var numberOfRacers = racerData.length;
    var canvasHeight = this.getCanvasHeight();
    var canvasWidth = this.getCanvasWidth();
    var racerSize = canvasHeight / (numberOfRacers * 2);
    var fontHeight = parseInt(racerSize/4);
    var highlightBorderSize = racerSize/15;
    var finishLinePosition = canvasWidth - racerSize;
    if(fontHeight < 12) {
      fontHeight = 12; //Don't allow font size below 10 because it will be too hard to read
    }

    //Figure out which racer or racers are in the lead so we can highlight them
    var inTheLead = [];
    var highestKnownPercentageComplete = -1;
    for(var i = 0; i < numberOfRacers; i++) {
      var racer = racerData[i];

      if(racer.percentageComplete == 0 || racer.percentageComplete < highestKnownPercentageComplete) {
        continue;
      }

      if(racer.percentageComplete > highestKnownPercentageComplete) {
        inTheLead = [i];
      } else if(racer.percentageComplete == highestKnownPercentageComplete) {
        inTheLead.push(i);
      }

      highestKnownPercentageComplete = racer.percentageComplete;
    }

    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.lineWidth = highlightBorderSize;
    ctx.font = fontHeight + "px Arial";

    for(var i = 0; i < numberOfRacers; i++) {
      var racer = racerData[i];
      var racerCanvasY = i * 2 * racerSize + racerSize/4;
      var racerCanvasX = (racer.percentageComplete * .01 * (finishLinePosition - racerSize));
      //Draw Track for this racer
      ctx.fillStyle = 'rgba(20, 50, 20, 1)';
      ctx.fillRect(0, racerCanvasY, canvasWidth, racerSize);
      //Draw Racer
      ctx.drawImage(ImageCache.horseImage, racerCanvasX, racerCanvasY, racerSize, racerSize);
      //If this racer is in the lead, highlight in yellow
      if(inTheLead.indexOf(i) > -1) {
        ctx.strokeRect(racerCanvasX + highlightBorderSize/2, racerCanvasY + highlightBorderSize/2, racerSize - highlightBorderSize, racerSize - highlightBorderSize);
      }
      //Render racer name under image
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(racer.name, racerCanvasX - 2, racerCanvasY + racerSize + fontHeight + 2); //Dark drop shadow (for readability)
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(racer.name, racerCanvasX, racerCanvasY + racerSize + fontHeight); //Light text
    }

    //Draw the finish line at canvas width - racerSize
    ctx.fillStyle = 'rgba(255, 233, 0, 1)';
    ctx.fillRect(finishLinePosition, 0, racerSize/8, canvasHeight);
    ctx.fillStyle = 'rgba(20, 50, 20, .5)';
    ctx.fillRect(finishLinePosition, 0, racerSize, canvasHeight);
  }

  return Canvas;
});
