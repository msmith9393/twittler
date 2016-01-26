/*
Creates two global variables, users and streams.
users is an array of strings -- all the usernames that you're following.
streams is an object with two properties, users and home.
streams.home is an array of all tweets from all the users you're following.
streams.users is an object with properties for each user. streams.users.shawndrost has all of shawndrost's tweets.
Kicks off a periodic process that puts more data in streams.
You'll mostly be working in the javascript block of index.html. Note: The generated tweets will be displayed in reverse chronological order.

Basic Requirements:

Allow the user to click on a username to see that user's timeline.

Allow the user to tweet. (This is going to require you to understand a little more about data_generator.js, but you shouldn't need to modify anything.)
*/

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
    startIndex = newTweets.length;
  });

  $(document).on('click', 'a', function(event) {
    var username = event.currentTarget.innerHTML.slice(1);
    if ($('.usernameTitle').length === 0) {
      var usernameTitle = $('<h2 class="usernameTitle"> Tweets by: ' + username + '</h2>');
      $('header').append(usernameTitle);
    }
    $('.new-tweet-btn').hide();
    $('.back-btn').show();
    $('.tweet-feed').empty();
    var usersTweets = streams.users[username];
    renderTweets(usersTweets);
    
    $(document).on('click', '.back-btn', function(event) {
      var allTweets = streams.home;
      $('.new-tweet-btn').show();
      $('.usernameTitle').remove();
      $('.back-btn').hide();
      $('.tweet-feed').empty();
      renderTweets(allTweets);
    });
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











