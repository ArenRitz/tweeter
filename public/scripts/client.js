/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Makes new tweet form visible when clicking on "Write a new tweet"
  $('.newt').on('click', function() {
    let status = $('.new-tweet-base').is(':visible');
    if (!status) {
      $('.new-tweet-base').slideDown(200);
      $('.new-tweet-text').focus(); //focuses textbox when form is shown
      $('no-tweet-form').slideUp(1); //hides whitespace
    } else {
      $('.new-tweet-base').slideUp(200);
      $('no-tweet-form').slideDown(1); //adds whitespace
    }

  });

  if ($(window).scrollTop() === 0) {
    $('#send-to-top').fadeOut(1); // Ensures back to top is hidden on load if at the top.
  }

  // shows back to top button at bottom right of screen when user scrolls down past nav size (120px)
  $(document).scroll(function() {
    if ($(window).scrollTop() > 120) {
      $('#send-to-top').fadeIn(100);
    } else {
      $('#send-to-top').fadeOut(100);
    }
  });

  //Sends back to top when button is clicked
  $('#send-to-top').on('click', function() {
    $(window).scrollTop(0);
  });

  //prevents users from inputting and running HTML in tweet content
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // creates new tweet from data inputted in form
  const createTweetElement = function(newTweet) {
    let content = escape(newTweet.content.text);
    let username = newTweet.user.name;
    let handle = newTweet.user.handle;
    let date = timeago.format(newTweet.created_at);  //Shows time since posted
    const tweet = $(`
                  <article class="tweet-base">
                    <header>
                      <div class="user">
                        <p> <i class="fa-brands fa-bilibili"></i> &nbsp;${username} </p>
                      </div>
                      <h4>${handle}</h4>
                    </header>
                    <div class="tweet-content">
                      <p >${content}</p>
                    </div>  
                    <footer>
                      <span>${date}</span>
                      <div class='tweet-reactions'>
                        <i class="fas fa-flag icon-flag"></i>
                        <i class="fas fa-retweet icon-retweet"></i>
                        <i class="fas fa-heart icon-heart"></i>
                      </div>
                    </footer>
                  </article>`);

    return tweet;

  };
  // Appends all tweets from DB to container from newest to oldest.
  const renderTweets = function(db) {
    $('#tweets-container').empty();

    for (let tweet of db) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


  // Handles form submission with ajax
  $(".new-tweet-form").submit(function(event) {
    event.preventDefault(); //prevents default submit to take place
    let userInput = event.target[0].value;
    $('#new-tweet-error').slideUp(); // Makes sure errors are not shown
    //form validation
    if (!userInput) {
      $('#new-tweet-error').text('Please enter a tweet').slideDown(200); //Error if form is left empty
      return;
    }
    if (userInput.length > 140) {
      $('#new-tweet-error').text('Tweet is too loooooooooong').slideDown(200); //Error if over character limit
      return;
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize() //Data sent back to server
    }).then(function() {
      //reset form
      event.target[0].value = "";
      $('.counter').text(140);
      //re-load tweets
      loadTweets();
    });
  });

  //Loads tweets from DB
  const loadTweets = function() {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(db) {
        renderTweets(db);
      },
    });
  };

  //loads tweets on page load
  loadTweets();

});