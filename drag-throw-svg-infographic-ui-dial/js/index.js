
maxRotation = 270;
svgNode = document.getElementById('svg-node');
container = document.getElementById('container');
dialValue = document.getElementById('dial-value');
dialLineBg = document.getElementById('dial-line-bg');
info = document.getElementById('info');
nullObject = document.getElementById('null-object');
dialLine = document.getElementById('dial-line');
outline = document.getElementById('outline');

TweenMax.set(document.body, {
  userSelect:'none'
})

TweenMax.set(dialLine, {
  drawSVG:'0%',
  alpha:0.5
});
TweenMax.set([container, svgNode, dialValue, info], {
  position:'absolute',
             left:'50%',
             top:'50%',
             xPercent:-50,
             yPercent:-50
  
});

TweenMax.set(nullObject, {
  position:'absolute',
  x:0
})
TweenMax.set(dialLineBg, {
  position:'absolute',
  alpha:0.1
})

Draggable.create(container, {
  //trigger:container,
  bounds:{maxRotation:maxRotation, minRotation:0},
  type:'rotation',
  onPress:function(e){
  
    var rad = Math.atan2(e.layerY, e.layerX);
  console.log(RadiansToDegrees(rad))
  var cX = e.layerX + (285/2);
  var cPercent = (cX);
  //console.log(cPercent)
  TweenMax.to(container, 1, {
    //rotation:cPercent,
    //onUpdate:dragUpdate
  })
},
  throwProps:true,
  onDrag:dragUpdate,
  onThrowUpdate:dragUpdate
})

function dragUpdate(){
  var val = (container._gsTransform.rotation/maxRotation);
  var percent = val * 100;
  percent = (percent > 100) ? 100 : percent;
 percent = (percent < 0) ? 0 : percent;
  TweenMax.set(dialLine, {
    drawSVG:percent + '%'
  })
  
  dialValue.innerHTML = Math.floor(percent);
  
}

function RadiansToDegrees(valRad){
  return (360/(2*Math.PI)*valRad) - 45;
}