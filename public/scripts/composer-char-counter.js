$(document).ready(function() {

  $('textarea').on('input', function() {
    // console.log(this.value.length)

    let counter = $(this).parent().children().children('.counter');
    let charCount = 140 - this.value.length;
    counter.text(charCount);

    if (charCount < 0) {
      counter.addClass('warn');
    } else {
      counter.removeClass('warn');
    }


  });





});