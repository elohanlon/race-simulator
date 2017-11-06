define(
  ['jquery', 'app/data/image_cache', 'app/widgets/race_setup_tool'],
function($, ImageCache, RaceSetupTool) {

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
      var raceSetupTool = new RaceSetupTool('race-setup-tool', $('#right-toolbar-container'), 7);
    }

  }
);
