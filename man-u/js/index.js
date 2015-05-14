function fadeIn() {
  $("#football").velocity("transition.fadeIn", 1250);
}

function staggerLetters() {
  $(".letters").velocity("transition.slideLeftIn", { stagger: 700 });
}

fadeIn();
staggerLetters();