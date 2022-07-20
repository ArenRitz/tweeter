/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {
  //
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
                        <i class="fas fa-flag" id="icon-flag"></i>
                        <i class="fas fa-retweet" id="icon-retweet"></i>
                        <i class="fas fa-heart" id="icon-heart"></i>
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
    
    //form validation
    if (!userInput) {
      alert("Please enter a tweet");
      return;
    }

    if (userInput.length > 140) {
      alert("Tweet is too long");
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
    })
      .then(function (tweet) {
        renderTweets(tweet);
      });

  }
  loadTweets();




});