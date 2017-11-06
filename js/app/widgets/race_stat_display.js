export default class RaceStatDisplay {

  constructor(elementId, parentElement, numTextareaRows) {
    //Create new html element for this widget
    this.$el = $('<div class="race-data-display sidebar-widget"></div>');
    this.$el.attr('id', elementId);

    this.$el.append(`
    <div class="container">
      <h4>Race Stats</h4>
      <table class="racer-data table table-bordered table-sm">
        <tbody>
        <tr>
          <th>Racer</th>
          <th>Position</th>
        </tr>
        <tr><td colspan="2">Nothing to show yet.</td></tr>
        </tbody>
      </table>
    </div>
    `);

    //Add new element to parentElement
    $(parentElement).append(this.$el);
  }

  updateData(racerData) {
    var $racerDataTableBody = this.$el.find('table.racer-data tbody');
    $racerDataTableBody.html(
      `<tr>
        <th>Racer</th>
        <th>Position</th>
      </tr>`
    );

    //Sort racers by percentageComplete so that the higest one appears first
    racerData.sort(function(a, b){
      return a.percentageComplete < b.percentageComplete;
    });

    for(var i = 0; i < racerData.length; i++) {
      var racerData = racerData;
      $racerDataTableBody.append(
        `<tr>
          <td>` + racerData[i].name + `</td>
          <td>` + racerData[i].percentageComplete + `</td>
        </tr>`
      );
    }
  }

}
