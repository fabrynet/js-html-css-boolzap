function sendMessage () {
  var message = $('#inputMessage').val();
  console.log(message);
  var btn = $('#btnMessage');
  var boxMessageUser = $('.template-box-message.user');
  var cloneBoxMessageUser = boxMessageUser.clone();
  btn.click(function(){
    var messageUser = cloneBoxMessageUser.text(message);
    console.log(messageUser);
    $('.list-chat').append(messageUser);
  });
}

function init () {
  sendMessage();
}

$(document).ready(init);
