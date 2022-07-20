/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
  
  
  
  
  const createTweetElement = function (newTweet) {
    let content = newTweet.content.text;
    let username = newTweet.user.name;
    let handle = newTweet.user.handle;
    let utc = newTweet.created_at;
    let date = new Date(0)
    date.setUTCSeconds(utc);
    const tweet = `
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
</article>`;

    return tweet;

  }

const renderTweets = function (db) { 
  for (let tweet of db) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}


renderTweets(data);



});