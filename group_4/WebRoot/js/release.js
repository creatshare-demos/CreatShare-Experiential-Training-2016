function publish() {
  function release() {
    var card = document.getElementById("card");
    var newCard = card.cloneNode(true);
    card.parentNode.insertBefore(newCard, card);
  }

  var btn = document.getElementById('btn');
  btn.onclick = release;
}




