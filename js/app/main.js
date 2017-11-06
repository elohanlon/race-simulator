define(
  ['jquery', 'app/data/image_cache', 'app/widgets/race_setup_tool', 'app/widgets/race_stat_display', 'app/data/race_simulator'],
function($, ImageCache, RaceSetupTool, RaceStatDisplay, RaceSimulator) {

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
      var raceStatDisplay = new RaceStatDisplay('race-simulator', $('#right-toolbar-container'), 7);

      //Set up event handlers
      raceSimulator.onUpdate = function(racerData){
        raceStatDisplay.updateData(racerData);
      };

      // When a user clicks on the race start button, use data from the
      // race setup tool to initialize the race simulator
      raceSetupTool.onStartRace = function(racerNames) {
        raceSimulator.initialize(racerNames);
        raceStatDisplay.updateData(raceSimulator.getRacerData());
      }
    }

  }
);
