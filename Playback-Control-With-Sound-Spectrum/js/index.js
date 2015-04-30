var sound = new Audio('mp3/ThriftShop.mp3');

sound
	.isPlayed = false
	.volume = 1;


$('#butt').on('click',function(){
	if (!sound.isPlayed) {
		sound.play(); // Play sound
		$(this)
			.removeClass('btn-succes glyphicon-play')
			.addClass('btn-danger glyphicon-pause');
	} else {
		sound.pause(); // Pause sound
		$(this)
			.removeClass('btn-danger glyphicon-pause')
			.addClass('btn-success glyphicon-play');
	}
	sound.isPlayed = !sound.isPlayed;
});

$('#vol-value').css({'width': sound.volume * 100 + "%"});
$('#vol-dec').on('click', function(){
	sound.volume -= 0.05;
	$('#vol-value').css({'width': sound.volume * 100 + "%"});
});


$('#vol-inc').on('click', function(){
	sound.volume += 0.05;
	$('#vol-value').css({'width': sound.volume * 100 + "%"});
});

var audioElement = sound; 
audioElement.addEventListener('play', draw);

var context = new AudioContext(),
		analyser = context.createAnalyser(),
		source,
		bars = [];

window.onload = function() {
	source = context.createMediaElementSource(audioElement);

	source.connect(analyser);
	analyser.connect(context.destination);

	prepareElements();
};

function prepareElements() {
	var el = document.getElementById("spectrum"),
			width = 20;

	for (var i=0; i<50; i++) {
		var bar = document.createElement("div");
		bar.style.left = (width + 5) * i + "px";
		el.appendChild(bar);
		bars.push(bar);
	}
}

function draw() {
	requestAnimationFrame(draw);

	var freqData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqData);

	for (var i=0; i<bars.length; i++) {
		var freq = Math.round(i*freqData.length/bars.length);
		bars[i].style.height = freqData[freq]+"px";
	}
}

