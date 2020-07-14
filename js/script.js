// Functions Procedurali
function addSendListener(){
  var targetInput = $('#input-message');
  var targetButton = $('#button-message');
  targetInput.keyup(sendKeyup);
  targetButton.click(sendClick);
}

function sendKeyup(event) {
  var target = $(this);
  var txt = target.val();
  var keyWhich = event.which;
  var keyCode = event.keyCode;
  if ( (keyWhich == 13 || keyCode == 13) && txt) {
    sendMessage(txt);
    receiveMessage();
  }
}

function sendClick () {
  var target = $('#input-message');
  var txt = target.val();
  if (txt) {
    sendMessage(txt);
    receiveMessage();
  }
}

function sendMessage (txt) {

  var time = getActualHour();
  var templateSent = $('.template .message-box.sent').clone();

  templateSent.find('.message-time').text(time);
  templateSent.find('.message-text').text(txt);
  $('.chat-thread').append(templateSent);

  $('#input-message').val('');
}

function receiveMessage () {

  var time = getActualHour();
  var templateReceived = $('.template .message-box.received').clone();

  setTimeout(function(){
    templateReceived.find('.message-time').text(time);
    templateReceived.find('.message-text').text('ok');
    $('.chat-thread').append(templateReceived);
  }, 1000);
}

function init () {
  addSendListener();
}

$(document).ready(init);

// Functions Utilities
function getActualHour () {
  var d = new Date();
  var time = d.getHours() + ":" + d.getMinutes();
  return time;
}
