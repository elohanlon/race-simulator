define(
  ['jquery', 'app/helpers/math_helper', 'app/helpers/json_validator'],
function($, MathHelper, JsonValidator) {

    $(document).ready(function(){
      console.log("The DOM has loaded!");
      console.log("Here's a random number between 1 and 10: " + MathHelper.getRandomNumber(1, 10));

      var validJson = '{"key" : "value"}';
      var invalidJson = '{"key" !!! "value"}';

      console.log("Here's the valid JSON: " + validJson);
      console.log("Valid? " + JsonValidator.isValidJson(validJson));
      console.log("Here's the invalid JSON: " + invalidJson);
      console.log("Valid? " + JsonValidator.isValidJson(invalidJson));
    });

  }
);
