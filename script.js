$(document).ready(function(){

  // when page loads should have generated 11 tweets, therefore index is 10
  var index = streams.home.length - 1;
  // start index for new tweets that are being created every few seconds
  var startIndex = streams.home.length;

  $('.back-btn').hide();

  while(index >= 0){
    var tweet = streams.home[index];
    renderTweet(tweet);
    index -= 1;
  }

  $(document).on('click', '.new-tweet-btn', function() {
    var newTweets = streams.home.slice(startIndex);
    renderTweets(newTweets);
    startIndex = streams.home.length;
  });

  $(document).on('click', 'a', function(event) {
    var username = event.currentTarget.innerHTML.slice(1);
    if ($('.usernameTitle').length === 0) {
      var usernameTitle = $('<h2 class="usernameTitle">tweets by ' + username + '</h2>');
      $('header').append(usernameTitle);
    }
    $('.write-tweet-container').hide();
    $('.new-tweet-btn').hide();
    $('.back-btn').show();
    $('.tweet-feed').empty();
    var usersTweets = streams.users[username];
    renderTweets(usersTweets);
    
    $(document).on('click', '.back-btn', function(event) {
      var allTweets = streams.home;
      $('.write-tweet-container').show();
      $('.new-tweet-btn').show();
      $('.usernameTitle').remove();
      $('.back-btn').hide();
      $('.tweet-feed').empty();
      renderTweets(allTweets);
    });
  });

  $('.write-tweet').submit(function(event) {
    event.preventDefault();
    visitor = $('.username-form').val();
    writeTweet($('.write-message').val());
    renderTweet(streams.home[streams.home.length-1]);
    startIndex = streams.home.length;
    $('.write-message').val("");
  });

  function renderTweet(tweet) {
    var messageArr = tweet.message.split('#');

    if (messageArr[1] === undefined) {
      messageArr[1] = '';
    } else {
      messageArr[1] = '#' + messageArr[1];
    }

    var $tweet = $('<div class="tweet"></div>');
    $tweet.append('<p><a href="#" class="username">@' + tweet.user + '</a> &bull; <span class="date">' + tweet.created_at + '</span></p>')
    .append('<p>' + messageArr[0] + '<span class="hashtag">' + messageArr[1] + '</span></p>')
    .prependTo($('.tweet-feed'));
  };

  function renderTweets(newTweets) {
    for (var i=0; i<newTweets.length; i++) {
      renderTweet(newTweets[i]);
    }
  };

});