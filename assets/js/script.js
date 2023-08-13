// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(document).ready(function () {

  // Get a reference to now in a variable

  var today = dayjs();

  // Add code to display the current date in the header of the page

  $('#currentDay').text(today.format('MMM D, YYYY'));

  // Get reference to save buttons

  var saveButtonElements = $('.btn');

  // Manage save button clicks

  function handleSaveButtonClicked(event) {

    var btnClicked = $(event.target);

    var btnClickedAssociatedHourId = btnClicked.parent('div').attr('id');

    // Detect if icon has been clicked instead of button background and realign event chain if needed

    if (btnClickedAssociatedHourId == null) {
      btnClicked = $(event.target).parent('button');
      btnClickedAssociatedHourId = btnClicked.parent('div').attr('id');
    }

    var btnClickedAssociatedDescription = $('#top').children().eq(btnClickedAssociatedHourId).children('textarea').val();

    var scheduleDescription = {
      referenceDate: today.format('MMM D, YYYY'),
      description: btnClickedAssociatedDescription,
    }

    // Save the item associated with a save button in local storage

    localStorage.setItem(btnClickedAssociatedHourId, JSON.stringify(scheduleDescription));

  }

  // Adjust the UI according to time

  function refreshBackgroundColors() {

    var updatedToday = dayjs().format('HH');

    for (var i = 0; i < 9; i++) {

      textDescription = $('#top').children().eq(i).children('textarea');

      if (i + 9 > updatedToday) {

        textDescription.css('background-color', '#77dd77');

      }

      else if (i + 9 == updatedToday) {

        textDescription.css('background-color', '#ff6961');

      }

      else {

        textDescription.css('background-color', '#d3d3d3');

      }

    }

  }

  // Reload saved data if still relevant => today needs to be the same as the day data was typed to avoid displaying outdated information

  function loadTextFields() {

    for (var i = 0; i < 9; i++) {

      textDescription = $('#top').children().eq(i).children('textarea');

      storedData = JSON.parse(localStorage.getItem(i));

      // Validate data is still up to date otherwise discard displaying

      if (storedData != null) {
        if (storedData.referenceDate == today.format('MMM D, YYYY')) {
          textDescription.val(storedData.description);
        }

      }

    }

  }

  // Add a listener for click events on a save button

  saveButtonElements.on('click', this, handleSaveButtonClicked);

  // Trigger rendering functions when document is ready

  refreshBackgroundColors();

  loadTextFields();

});
