// Functions Procedurali
function addSearchListener () {
  // scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
  // confronto le lettere inserite nell'input di ricerca con i nomi presenti nella lista dei nomi
  var searchInput = $('#input-search');
  searchInput.keyup(searchKeyup);
}

function searchKeyup() {
  // prendo le lettere inserite nella barra di ricerca
  var query = $(this).val();
  console.log(query);
  // le confronto con le lettere presenti nei nomi dei contatti
  $('.contacts-list .contact').each(function(){
    var name = $(this).find('.title').html();
    console.log(name);
    var resultQuery = name.search(query);
    console.log('result Query',resultQuery);
    // se non ci sono delle corrispondenze nascondo quel nome attraverso la classe .hidden
    if (resultQuery == -1) {
      console.log('trovata corrispondenza', name.search(query));
      $(this).addClass('hidden');
    } else {
      $(this).removeClass('hidden');
    }
    // se la barra di ricerca è vuota rimuovo tutti gli .hidden
    if (!query) {
      $(this).removeClass('hidden');
    }
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
    input.val('');
    sendMessage(txt);
    receiveMessage();
  }
}

function sendClick() {
  var input = $('#input-message');
  var txt = input.val();
  if (txt) {
    input.val('');
    sendMessage(txt);
    receiveMessage();
  }
}

function sendMessage(txt) {

  var time = getActualHour();
  var templateSent = $('.template .message-box.sent').clone();

  templateSent.find('.message-time').text(time);
  templateSent.find('.message-text').text(txt);
  $('.chat-thread').append(templateSent);

}

function receiveMessage() {

  var time = getActualHour();
  var templateReceived = $('.template .message-box.received').clone();

  setTimeout(function(){
    templateReceived.find('.message-time').text(time);
    templateReceived.find('.message-text').text('ok');
    $('.chat-thread').append(templateReceived);
  }, 1000);
}

function init() {
  addSendListener();
  addSearchListener();
}

$(document).ready(init);

// Functions Utilities
function getActualHour () {
  var d = new Date();
  var time = d.getHours() + ":" + d.getMinutes();
  return time;
}
