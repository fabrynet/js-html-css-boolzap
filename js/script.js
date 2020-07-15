// Functions Procedurali
function addListeners () {

  var messageInput = $('#input-message');
  var messageButton = $('#button-message');
  var searchInput = $('#input-search');
  var contacts = $('.contacts-list .contact');

  messageInput.keyup(sendKeyup);
  messageButton.click(sendClick);
  searchInput.keyup(searchKeyup);
  contacts.click(selectContact);
  $(document).on('click','.message-box-options', toggleMessageOptions);
  $(document).on('mouseleave','.message-box-options', hideMessageOptions);
  $(document).on('click','.message-box-options .message-delete', messageDelete);
}

function selectContact () {
  var contact = $(this);
  var contactSelected = contact.attr('data-contact');
  // console.log(contactSelected);
  var contacts = $('.contacts-list .contact');

  contacts.each(function(){
    var contact = $(this);
    contact.removeClass('active');
  });
  
  contact.addClass('active');

  showChat(contactSelected);
}

function showChat (contactSelected) {
  var chat = $('.chat-thread .message-box');
  var contacts = $('.contacts-list .contact');
  chat.each(function() {
    var message = $(this);
    if (message.attr('data-contact')==contactSelected) {
      message.show();
    } else {
      message.hide();
    }
  });
}

function messageDelete () {
  var btn = $(this);
  btn.parents('.message-box').remove();
}

function toggleMessageOptions () {
  var btn = $(this);
  var menuPanel = btn.find('.message-box-options-panel');
  // console.log(menuPanel);
  menuPanel.toggle();
}

function hideMessageOptions () {
  var btn = $(this);
  var menuPanel = btn.find('.message-box-options-panel');
  menuPanel.hide();
}

function searchKeyup() {
  // prendo le lettere inserite nella barra di ricerca
  var input = $(this);
  var query = input.val().toLowerCase();
  var contacts = $('.contacts-list .contact');
  // le confronto con le lettere presenti nei nomi dei contatti
  contacts.each(function(){
    var contact = $(this);
    var name = contact.find('.title').text().toLowerCase();

    if (name.includes(query)) {
      contact.show();
    } else {
      contact.hide();
    }
    // var resultQuery = name.search(query);
    // // se non ci sono delle corrispondenze nascondo quel nome attraverso la classe .hidden
    // if (resultQuery == -1) {
    //   console.log('trovata corrispondenza', name.search(query));
    //   $(this).addClass('hidden');
    // } else {
    //   $(this).removeClass('hidden');
    // }
    // // se la barra di ricerca è vuota rimuovo tutti gli .hidden
    // if (!query) {
    //   $(this).removeClass('hidden');
    // }
  });
}

function addSendListener(){
  var targetInput = $('#input-message');
  var targetButton = $('#button-message');
  targetInput.keyup(sendKeyup);
  targetButton.click(sendClick);
}

function sendKeyup(event) {
  var input = $(this);
  var txt = input.val();
  var keyWhich = event.which;
  var keyCode = event.keyCode;
  if ( (keyWhich == 13 || keyCode == 13) && txt) {
    sendChat(input, txt);
  }
}

function sendClick() {
  var input = $('#input-message');
  var txt = input.val();
  if (txt) {
    sendChat(input, txt);
  }
}

function sendChat(input, txt) {
  input.val('');
  sendMessage(txt, 'sent');
  setTimeout(function(){ sendMessage('ok','received')}, 1000);
}

function sendMessage(txt, type) {

  var time = getActualHour();
  var templateMessage = $('.template .message-box').clone();
  var target = $('.chat-thread');
  var contacts = $('.contacts-list .contact');
  var selectedContact = 0;

  contacts.each(function(){
    var contact = $(this);
    if (contact.hasClass('active')) {
      selectedContact = contact.attr('data-contact');
      console.log('contatto selezionato',selectedContact);
    }
  });

  templateMessage.addClass(type);
  templateMessage.attr('data-contact',selectedContact);

  templateMessage.find('.message-time').text(time);
  templateMessage.find('.message-text').text(txt);
  $('.chat-thread').append(templateMessage);

}

function init() {
  addListeners();
}

$(document).ready(init);

// Functions Utilities
function getActualHour () {
  var d = new Date();
  var time = d.getHours() + ":" + d.getMinutes();
  return time;
}
