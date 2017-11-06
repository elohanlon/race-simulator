define(
  ['jquery'],
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
  }

  return RaceSetupTool;
});
