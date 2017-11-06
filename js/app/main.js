define(
  ['jquery', 'app/data/image_cache', 'app/widgets/canvas', 'app/widgets/race_setup_tool', 'app/widgets/race_stat_display', 'app/data/race_simulator'],
function($, ImageCache, Canvas, RaceSetupTool, RaceStatDisplay, RaceSimulator) {

    $(document).ready(function(){
      //Pre-load horse image so we can access it at any time
      ImageCache.horseImage = new Image;
      ImageCache.horseImage.onload = function(){
        //Start app AFTER horse image has loaded
        setupWidgets();
      };
      ImageCache.horseImage.src = 'img/horse.png';
    });

    function setupWidgets() {
      var raceSimulator = new RaceSimulator(500, 1, 5);
      var raceSetupTool = new RaceSetupTool('race-setup-tool', $('#right-toolbar-container'), 7);
      var canvas = new Canvas('canvas', $('#canvas-container'));
      var raceStatDisplay = new RaceStatDisplay('race-simulator', $('#right-toolbar-container'), 7);

      //Do initial render call for canvas
      canvas.render(raceSimulator.getRacerData());

      //Set up event handlers
      raceSimulator.onUpdate = function(racerData){
        canvas.render(racerData);
        raceStatDisplay.updateData(racerData);
      };

      // When a user clicks on the race start button, use data from the
      // race setup tool to initialize the race simulator, and then
      // immediately render the raceSimulator's data on the canvas.
      raceSetupTool.onStartRace = function(racerNames) {
        raceSimulator.initialize(racerNames);
        canvas.render(raceSimulator.getRacerData());
        raceStatDisplay.updateData(raceSimulator.getRacerData());
      }

      // When window changes size, resize the canvas (which will automatically
      // clear it) and pass current raceData for re-render
      $(window).on('resize', function(){
        canvas.handleResize();
        // Render the latest data onto the canvas after the resize
        canvas.render(raceSimulator.getRacerData());
      });

    }

  }
);
