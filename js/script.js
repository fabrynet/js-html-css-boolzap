function sendMessage () {
  
  var btn = $('#btnMessage');
  var boxMessageUser = $('.box-message.user');

  btn.click(function(){
    var message = $('#inputMessage').val();
    var cloneBoxMessageUser = boxMessageUser.clone();
    console.log(message);
    if (message!="") {
      var messageUser = cloneBoxMessageUser.text(message);
      console.log(messageUser);
      $('.chat-thread').append(messageUser);
    }
  });
}

function init () {
  sendMessage();
}

$(document).ready(init);
