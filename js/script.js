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
  var contactSelected = contact.data('contact');
  var contacts = $('.contacts-list .contact');
  var conversations = $('.chat');
  var selectConversation = $('.chat[data-contact=' + contactSelected + ']');

  contacts.removeClass('active');
  contact.addClass('active');

  conversations.removeClass('active').hide();
  selectConversation.addClass('active').show();

  contactBanner();
}

function contactBanner () {
  var contactActive = $('.contacts-list .contact.active');
  var name = contactActive.find('.name').text();
  var image = contactActive.find('.user-avatar').attr('src');

  var contactBanner = $('#contact-banner');

  contactBanner.find('.name').text(name);
  contactBanner.find('.user-avatar').attr('src',image);
}

function messageDelete () {
  var btn = $(this);
  btn.parents('.message-box').remove();
  insertLastMessage();
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
    var name = contact.find('.name').text().toLowerCase();

    if (name.includes(query)) {
      contact.show();
    } else {
      contact.hide();
    }

  });
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
  setTimeout(function(){
    sendMessage(randomReply,'received');
    insertLastMessage();
  }, 1000);
}

function sendMessage(txt, type) {

  var time = getActualHour();
  var templateMessage = $('.template .message-box').clone();
  var chatActive = $('.chat.active');

  templateMessage.addClass(type);
  templateMessage.find('.message-time').text(time);
  templateMessage.find('.message-text').text(txt);

  chatActive.append(templateMessage);
  // console.log(chatActive);

}

function insertLastMessage () {
  var contactActive = $('.contacts .contact.active');
  var lastMessage = $('.chat.active .message-box').last().find('.message-text').text();
  var lastMessageTime = $('.chat.active .message-box').last().find('.message-time').text();
  if (lastMessage.length > 30) {
    lastMessage = lastMessage.substring(0, 29) + '...';
  }
  contactActive.find('.last-message').empty().append(lastMessage);
  contactActive.find('.last-message-time').empty().append(lastMessageTime);
}

function randomReply () {
  var words = ['Ok. ','Va bene. ','Vedremo. ','Ci penso. ','Può darsi. ','Non mi interessa. ','Mi piace! ','Ciao. ','Ti devo lasciare. ','Che fai di bello? ','Ti raggiungo fra 10 minuti. ','Bye bye. ','Buona fortuna! ','In bocca al lupo! ','Congratulazioni! ','Buon appetito. ','Saluti. ','Ho capito. ','A che ora arrivi? ','Buongiorno. ','Buonanotte. ','Stasera che fai? '];
  var wordsCount = words.length - 1;
  var randomMessageLength = getRandomIntInclusive(1,3);

  var wordRandom = '';
  var messageArray = [];

  // controllo che non ci siano parole ripetute
  while (messageArray.length < randomMessageLength) {
    wordRandom = words[getRandomIntInclusive(0,wordsCount)];
    if (!inArray(messageArray,wordRandom)) {
      messageArray.push(wordRandom);
    }
  }

  var message = '';
  for (var i = 0; i < messageArray.length; i++) {
    message += messageArray[i];
  }

  return message;
}

function init() {
  addListeners();
}

$(document).ready(init);

// Functions Utilities
// funzione che restituisce l'orario attuale a due cifre
function getActualHour () {
  var d = new Date();
  var hours = ("0" + d.getHours()).slice(-2);
  var minutes = ("0" + d.getMinutes()).slice(-2)
  var time = hours + ":" + minutes;
  return time;
}

// funzione che genera un numero casuale compreso tra i due parametri min e max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

// funzione che controlla se un elemento è presente nell'array
function inArray(array, element) {
  var i = 0;
  var found = false;
  while (i < array.length && found == false) {
    if(array[i] == element) {
      found = true;
    }
    i++;
  }
  return found;
}
