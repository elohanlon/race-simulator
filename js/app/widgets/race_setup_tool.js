define(
  ['jquery', 'app/helpers/json_validator'],
function($, JsonValidator) {

  function RaceSetupTool(elementId, parentElement, numTextareaRows) {
    //Create new html element for this widget
    this.$el = $('<div class="race-setup-tool sidebar-widget"></div>');
    this.$el.attr('id', elementId);

    this.$el.append(`
    <div class="container">
      <h4>Race Setup</h4>
      <textarea rows="` + numTextareaRows + `" style="width:100%">[
  "Secretariat",
  "Seabiscuit",
  "Landbiscuit",
  "Mister Ed"
]</textarea>
    </div>
    `);

    //Add new element to parentElement
    $(parentElement).append(this.$el);

    // Bind keyup listener to textarea so we can validate json as we type
    $('#' + elementId).find('textarea').on('keyup', this.validate.bind(this));

    //Manually call validate() once to set proper initial highlight
    this.validate();
  }

  RaceSetupTool.prototype.textareaValueIsValid = function() {
    var textAreaValue = this.getTextareaValue();
    //Make sure the JSON is syntactically valid
    var isSyntacticallyValidJson = JsonValidator.isValidJson(textAreaValue);
    if(!isSyntacticallyValidJson) { return false; }
    //Make sure that the data is an array of string values
    var expectedArr = JSON.parse(textAreaValue);
    if(!(expectedArr instanceof Array)) { return false; }
    for(var i = 0; i < expectedArr.length; i++) {
      //Note: Weird browser quirk where ()"a" instanceof String) actually returns false
      if(typeof(expectedArr[i]) !== "string") {
        return false;
      }
    }
    return true;
  }

  RaceSetupTool.prototype.getTextareaValue = function() {
    return this.$el.find('textarea').val();
  }

  RaceSetupTool.prototype.validate = function() {
    if(this.textareaValueIsValid()) {
      //If current json is valid after a keyup, make this element's border GREEN
      this.$el.find('textarea').css('border-color', '#00ff00');
    } else {
      //If current json is valid after a keyup, make this element's border RED
      this.$el.find('textarea').css('border-color', 'red');
    }
  }

  return RaceSetupTool;
});
