define(
  ['jquery', 'app/data/image_cache'],
function($, ImageCache) {

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
      console.log("setup was called!");
    }

  }
);
