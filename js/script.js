function sendMessage () {

  var message = $('#input-message');

  if (message.val()!="") {

    var d = new Date();
    var time = d.getHours() + ":" + d.getMinutes();
    console.log(time);
    var timeMessageUser = $('.time-message.user').html(time);
    var timeMessageInterlocutor = $('.time-message.interlocutor').html(time);

    var boxMessageUser = $('.box-message.user').clone();
    var boxMessageInterlocutor = $('.box-message.interlocutor').clone();

    console.log(message);
    console.log(message.val());
    console.log(boxMessageUser);

    var messageUser = boxMessageUser.html(message.val());
    $('.chat-thread').append(messageUser);

    setTimeout(function(){
      var messageInterlocutor = boxMessageInterlocutor.html('ok');
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

  var btnMessage = $('#btn-message');
  var inputMessage = $('#input-message');

  btnMessage.click(sendMessage);
  inputMessage.keyup(eventEnter);
}

function init () {
  inputMessage();
}

$(document).ready(init);
