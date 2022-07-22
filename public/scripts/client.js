/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {
  
  
  $('.newt').on('click', function () {
    let status = $('.new-tweet-base').is(':visible');
    console.log(status);
  if (!status) {
    $('.new-tweet-base').slideDown(200) ;
    $('.new-tweet-text').focus();
    $('no-tweet-form').slideUp(1);
  } else {
    $('.new-tweet-base').slideUp(200)
    $('no-tweet-form').slideDown(1)
  }

  });

  if($(window).scrollTop() === 0) {
    $('#send-to-top').fadeOut(1);
  };


  $(document).scroll(function() { 
    if($(window).scrollTop() > 0) {
      $('#send-to-top').fadeIn(100);
    } else {
      $('#send-to-top').fadeOut(100);
    }
 });

 $('#send-to-top').on('click', function() {
  $(window).scrollTop(0)
 });


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function (newTweet) {
    let content = escape(newTweet.content.text);
    let username = newTweet.user.name;
    let handle = newTweet.user.handle;
    let date = timeago.format(newTweet.created_at);
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

  }

  const renderTweets = function (db) {
    $('#tweets-container').empty();

    for (let tweet of db) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    let userInput = event.target[0].value;

    //test input
    // console.log(userInput)
    // console.log('-----')
    // console.log($(this).serialize())
    // console.log('-------')
    // console.log($(this))
    $('#new-tweet-error').slideUp();
    //form validation
    if (!userInput) {
      $('#new-tweet-error').text('Please enter a tweet').slideDown(200)
      return;
    }

    if (userInput.length > 140) {
      $('#new-tweet-error').text('Tweet is too loooooooooong').slideDown(200)
      return;
    }



    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).then(function () {
      //reset form
      event.target[0].value = "";
      $('.counter').text(140);
      //re-load tweets
      loadTweets()
    })
  });







  const loadTweets = function () {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function (db) {
        renderTweets(db);
      },
      })


  }
  loadTweets();




});