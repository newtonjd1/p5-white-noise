function preload(){}function setup(){vinyl=loadSound(getURL()+"/audio/Vinyl.mp3",function(){noiseDivs[6].removeClass("deactivated")}),canv=createCanvas(windowWidth,windowHeight),noStroke(),myFilter=new p5.LowPass,whiteNoise=new p5.Noise,currentNoise="white",whiteNoise.disconnect(),vinyl.disconnect(),myFilter.process(whiteNoise),myFilter.process(vinyl),(noiseFFT=new p5.FFT).setInput(myFilter);var i=.8*windowHeight>450?450:.8*windowHeight<345?345:.8*windowHeight,e=windowWidth<=980?.85*windowWidth:.55*windowWidth>750?750:.55*windowWidth;e=e<250?250:e,noiseDivs[0]=new NoiseBox,noiseDivs[0].container.size(e,i),noiseDivs[0].container.id("noise-area").parent("area-container");var n=noiseDivs[0];n.marker.init(n.getX()+n.container.width/8,n.getY()+n.container.height/2,!0,!0,mDiam),noiseDivs[0].container.touchStarted(function(){noiseDivs[0].hasAction=!0}),noiseDivs[0].container.touchEnded(function(){noiseDivs[0].hasAction=!1}),noiseDivs[0].container.mousePressed(function(){noiseDivs[0].hasAction=!0}),noiseDivs[0].container.mouseReleased(function(){noiseDivs[0].hasAction=!1}),noiseDivs[2]=new NoiseBox,noiseDivs[2].container.id("all-stop").class("noise-button fa fa-play animated tada").parent("button-container"),windowWidth<=980&&(noiseDivs[2].container.elt.classList.remove("animated"),noiseDivs[2].container.elt.classList.remove("tada")),noiseDivs[2].hasMarker=!1,noiseDivs[2].container.mouseClicked(function(){played||(played=!0,this.elt.classList.remove("animated")),noiseDivs[2].hasAction?(this.elt.classList.remove("fa-pause"),this.elt.classList.add("fa-play"),"vinyl"!=currentNoise?whiteNoise.stop():vinyl.stop()):(this.elt.classList.remove("fa-play"),this.elt.classList.add("fa-pause"),"vinyl"!=currentNoise?whiteNoise.start():vinyl.play()),noiseDivs[2].toggleAction()}),noiseDivs[4]=new NoiseBox,noiseDivs[4].container.id("brown-noise").class("noise-button").parent("button-container"),noiseDivs[4].hasMarker=!1,noiseDivs[4].container.mousePressed(function(){whiteNoise.setType("brown"),noiseDivs[2].hasAction&&(whiteNoise.start(),"vinyl"==currentNoise&&vinyl.stop()),currentNoise="brown"}),noiseDivs[3]=new NoiseBox,noiseDivs[3].container.id("pink-noise").class("noise-button").parent("button-container"),noiseDivs[3].hasMarker=!1,noiseDivs[3].container.mousePressed(function(){whiteNoise.setType("pink"),noiseDivs[2].hasAction&&(whiteNoise.start(),"vinyl"==currentNoise&&vinyl.stop()),currentNoise="pink"}),noiseDivs[5]=new NoiseBox,noiseDivs[5].container.id("white-noise").class("noise-button").parent("button-container"),noiseDivs[5].hasMarker=!1,noiseDivs[5].container.mousePressed(function(){whiteNoise.setType("white"),noiseDivs[2].hasAction&&(whiteNoise.start(),"vinyl"==currentNoise&&vinyl.stop()),currentNoise="white"}),noiseDivs[6]=new NoiseBox,noiseDivs[6].container.id("vinyl-noise").class("noise-button").parent("button-container"),vinyl.isLoaded()||noiseDivs[6].container.addClass("deactivated"),noiseDivs[6].hasMarker=!1,noiseDivs[6].container.mousePressed(function(){vinyl.isLoaded()&&(noiseDivs[2].hasAction&&(whiteNoise.stop(),vinyl.play(),vinyl.loop(35)),currentNoise="vinyl")})}function draw(){background("#ddd");var i=noiseDivs[0];filterFreq=map(noiseDivs[0].marker.x,Math.floor(noiseDivs[0].getX()+noiseDivs[0].marker.diameter/2),noiseDivs[0].getX()+noiseDivs[0].container.width-noiseDivs[0].marker.diameter/2,10,22e3),myFilter.set(filterFreq,filterWidth),whiteNoise.amp(map(noiseDivs[0].marker.y,Math.floor(noiseDivs[0].getY()+noiseDivs[0].marker.diameter/2),noiseDivs[0].getY()+noiseDivs[0].container.height-noiseDivs[0].marker.diameter/2,1,0)),vinyl.amp(map(noiseDivs[0].marker.y,Math.floor(noiseDivs[0].getY()+noiseDivs[0].marker.diameter/2),noiseDivs[0].getY()+noiseDivs[0].container.height-noiseDivs[0].marker.diameter/2,1,0));var e=noiseFFT.analyze();fill("rgba(106, 106, 106, 0.75)"),rect(i.getX(),i.getY(),i.container.width,i.container.height),fill(colors[3]);for(var n=0;n<e.length;n++){var s=map(n,0,e.length,noiseDivs[0].getX(),noiseDivs[0].getX()+noiseDivs[0].container.width),o=-noiseDivs[0].container.height+map(e[n],0,255,noiseDivs[0].container.height,noiseDivs[0].getY()-.062*i.container.height);rect(s,noiseDivs[0].container.height+noiseDivs[0].getY(),noiseDivs[0].container.width/e.length,o)}for(var n=0;n<noiseDivs.length;n++)1!==n&&(noiseDivs[n].handleAction(),noiseDivs[n].show(35))}function windowResized(){var i=noiseDivs[0];resizeCanvas(windowWidth,windowHeight),background("#ddd"),minHeight=.8*windowHeight>450?450:.8*windowHeight<345?345:.8*windowHeight,minWidth=windowWidth<=980?.85*windowWidth:.55*windowWidth>750?750:.55*windowWidth,minWidth=minWidth<250?250:minWidth,noiseDivs[0].container.size(minWidth,minHeight),i.marker.update(i.getX()+i.container.width/8,i.getY()+i.container.height/2)}var noiseFFT,whiteNoise,myFilter,filterFreq,filterWidth,currentNoise,vinyl,ambiance,noiseDivs=[],canv,colors=["#30CCC1","#709996","#55FF94","#FF95BB","#CC30B5"],mDiam=40,played=!1;