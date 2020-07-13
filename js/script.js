function sendMessage () {
  var message = $('#input-message');
  var boxMessageUser = $('.box-message.user').clone();
  var boxMessageInterlocutor = $('.box-message.interlocutor').clone();
  console.log(message.val());
  console.log(boxMessageUser);
  if (message.val()!="") {
    
    var messageUser = boxMessageUser.text(message.val());
    $('.chat-thread').append(messageUser);

    setTimeout(function(){
      var messageInterlocutor = boxMessageInterlocutor.text('ok');
      $('.chat-thread').append(messageInterlocutor);
    }, 1000)

  }
  message.val('');
}

function eventEnter () {
  var keyWhich = event.which;
  var keyCode = event.keyCode;
  if (keyWhich == 13 || keyCode == 13) {
    sendMessage();
  }
}

function inputMessage () {

  var btn = $('#btn-message');
  var inputMessage = $('#input-message');

  btn.click(sendMessage);
  inputMessage.keyup(eventEnter);
}

function init () {
  inputMessage();
}

$(document).ready(init);
