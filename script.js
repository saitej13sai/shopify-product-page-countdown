import $ from "https://esm.sh/jquery";
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Settings
var total_items = 50;
var d = new Date();
var min_items_left = 12;
var max_items_left = 20;
var remaining_items = randomIntFromInterval(min_items_left, max_items_left);
var min_of_remaining_items = 1;
var decrease_after = 1.7;
var decrease_after_first_item = 0.17;

(function($){
  $.fn.progressbar = function() {
    var a = "<p>Hurry! Only <span class='count'>" + remaining_items + "</span> left in stock.</p>" +
            "<div class='progressbar'><div style='width:100%'></div></div>";
    this.addClass('items-count');
    this.html(a + this.html());

    updateMeter(this);
    var b = this;

    setTimeout(function(){
      updateItems(b);
    }, 1000 * 60 * decrease_after_first_item);

    setInterval(function(){
      updateItems(b);
    }, 1000 * 60 * decrease_after);
  };

  function updateItems(b) {
    remaining_items--;
    if (remaining_items < min_of_remaining_items) {
      remaining_items = randomIntFromInterval(min_items_left, max_items_left);
    }
    $('.count').css({ 'background-color': '#CE0201', 'color': '#fff' });
    setTimeout(function(){
      $('.count').css({ 'background-color': '#fff', 'color': '#CE0201' });
    }, 1000 * 60 * 0.03);

    b.find(".count").text(remaining_items);
    updateMeter(b);
  }

  function updateMeter(a){
    var b = 100 * remaining_items / total_items;
    if (remaining_items < 10) {
      a.find('.progressbar div:first').addClass('less-than-ten');
    }
    a.find('.progressbar').addClass('active progress-striped');
    setTimeout(function(){
      myanimate(a.find('.progressbar div:first'), b);
      a.find('.progressbar').removeClass('active progress-striped');
    }, 1000);
  }

  function myanimate(a, b){
    var c = 0;
    var d = parseInt(a.closest('.progressbar').css('width'));
    var e = Math.floor(100 * parseInt(a.css('width')) / d);
    if (e > b) { c = e; }

    function frame(){
      if (e > b) { c--; } else { c++; }
      a.css('width', c + '%');
      if (c == b || c <= 0 || c >= 100) clearInterval(f);
    }

    var f = setInterval(frame, 40);
  }
})(jQuery);

jQuery(function($){
  $("#progress_bar").progressbar();

  var theDaysBox = $("#numdays");
  var theHoursBox = $("#numhours");
  var theMinsBox = $("#nummins");
  var theSecsBox = $("#numsecs");

  function updateCountdown() {
    var d = new Date();
    var nsec = 60 - d.getSeconds();
    var nmin = 59 - d.getMinutes();
    var nhrs = 23 - d.getHours();
    var ndat = 0;

    theSecsBox.html(nsec);
    theMinsBox.html(nmin);
    theHoursBox.html(nhrs);
    theDaysBox.html(ndat);
  }

  updateCountdown();

  setInterval(function(){
    var e = theSecsBox.text();
    var a = theMinsBox.text();
    var c = theHoursBox.text();
    var b = theDaysBox.text();

    if (e == 0 && a == 0 && c == 0 && b == 0) {
      // Timer end
    } else if (e == 0 && a == 0 && c == 0) {
      theDaysBox.html(b - 1);
      theHoursBox.html("23");
      theMinsBox.html("59");
      theSecsBox.html("59");
    } else if (e == 0 && a == 0) {
      theHoursBox.html(c - 1);
      theMinsBox.html("59");
      theSecsBox.html("59");
    } else if (e == 0) {
      theMinsBox.html(a - 1);
      theSecsBox.html("59");
    } else {
      theSecsBox.html(e - 1);
    }
  }, 1000);
});
