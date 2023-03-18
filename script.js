// -------------------------- what are the init settings? ---------------------------------- //
var audioState = 0;
var lane = 0;
var audioOnDeck = document.getElementById('b1p1');
isPlaying = [document.getElementById('b1p1'), document.getElementById('b1p2')];
var isAudioPlaying = 0;
var pitchOnDeck = 1;
var bankOnDeck = 1;

var fadeInLength = 4025;
var fadeOutLength = 4025;
var intLength = 20; // interval length
var expBase = 1.00160032328;
var logBase = 1.35566926788;

var volumes = []; 
var VAM = .5; // Volume, According to the Master
// ----------------------------- who's who of HTML input ----------------------------------- //
var master = document.getElementById('masterdata');
var fISlider = document.getElementById('fadeindata');
var fOSlider = document.getElementById('fadeoutdata');
// ------------------------------------ css script ----------------------------------------- //
// --------------------------------- set-up functions -------------------------------------- //
master.oninput = function newVolume(){
    VAM = (Math.log (master.value) / Math.log (100));
    // log base 100 of master.value = the new volume -- slider input is converted to a logarithmic scale of volume output //
    isPlaying.volume = VAM;
    audioOnDeck.volume = VAM;
}
fISlider.oninput = function fadeInTime(){
    x = (fISlider.value * 75.75) + 425.25; // slider input is translated to a value between .5 and 8 seconds
    fadeInLength = x;
}
fOSlider.oninput = function fadeOutTime(){
    x = (fOSlider.value * 75.75) + 425.25; // slider input is translated to a value between .5 and 8 seconds
    fadeOutLength = x;
}
// ---------------------------------------- play/pause ------------------------------------- //
function playPause(){
    switch(audioState){
        case 0: playAudio(); console.log('zero');
            break;// nothing is playing --> play audio --> case 1
        case 1: pauseAudio(); console.log('uno'); audioState = 2;
            break;// audio is playing --> pause audio --> case 0
        case 2: switchLane(); playAudio(); 
            break;// audio is fading out --> start new pad --> (case 3 -->) case 1
        case 3: console.log("you're doing too much"); 
            break;//audio is fading out + fading in --> app does nothing --> case 1
        default: console.log(isPlaying[lane]);
    }
}
function playAudio(){
    shiftLength = fadeInLength;
    fadeMath();
    fadeCalc(); 
    isPlaying[lane] = audioOnDeck;
    isPlaying[lane].volume = 0;
    audioOnDeck.play();
    fadeInFader();
    console.log('play');
    audioState = 1;
}
function pauseAudio(){
    shiftLength = fadeOutLength;
    fadeMath();
    setTimeout(function(){isPlaying[lane].pause();}, shiftLength);
    zerostate = setTimeout(function(){audioState = 0;}, shiftLength);
}
function switchLane(){
    switch(lane){
        case 0: lane = 1; console.log("why'd you switchup?"); audioState = 3; clearTimeout(zerostate); break;
        case 1: lane = 0; console.log("why'd you switchup?"); audioState = 3; clearTimeout(zerotate); break;
        default: console.log("..erm"); break;
    }
}
// ------------------------------------- fade i/o methods ---------------------------------- //
function fadeMath(){
    // y = a^x ---> a = y^(1/x) -- "x" is time elapsed since the fade began, "y" is resultant volume, "a" defines the curve
    x = shiftLength/2;
    y = (VAM/2)*100; 
    // the x and y are cut in half to compensate for my makeshift s-curve; its makeup: an exponential function until the halfway point then a logarithmic function for the remainder (or vice versa) 
    a = Math.pow (y, (1/x)); // this variable plugs in the values of the final position of "x" and "y", then returns "a" which is needed for the exponential function
    b = Math.pow (x, (1/y)); // this variable does the same thing but for the logarithmic function
    expBase = a; 
    logBase = b;
    intLength = (shiftLength/1000);
  }
  function fadeCalc(){
    
    console.log('check');

    for(let i=0; i<=499; i++){
        y = Math.pow(expBase, (intLength*i));  
        volumes[i] = y/100;   
    }
    for(let i=500; i<=999; i++){
        y = Math.log(intLength*i) / Math.log(logBase);  
        volumes[i] = (VAM/2) + (y/100);
    }
    console.log(volumes);
    console.log(shiftLength);
    console.log(intLength);
    console.log(expBase);
    console.log(logBase);
    document.getElementById('test').append(volumes);
  }
  function fadeInFader(){
    i=0;
    setInterval(function(){
        if (i<=999){
        isPlaying[lane].volume = volumes[i];
        i++;
    }
        else{
            // call clear interval function
        }
    }, intLength)
  }
  function fadeOutFader(){
    i=999;
    setInterval(function(){
        if (i>=0){
        isPlaying[lane].volume = volumes[i];
        i--;
    }
        else{
            // call clear interval function
        }
    }, intLength)
  }
// ---------------------------- what's the file name? -------------------------------------- //
function declareBank1(){
    bankOnDeck = 1;
    if (pitchOnDeck == 1) {audioOnDeck = document.getElementById('b1p1');}
    else if (pitchOnDeck == 2) {audioOnDeck = document.getElementById('b1p2');}
    else if (pitchOnDeck == 3) {audioOnDeck = document.getElementById('b1p3');}
    else if (pitchOnDeck == 4) {audioOnDeck = document.getElementById('b1p4');}
    else if (pitchOnDeck == 5) {audioOnDeck = document.getElementById('b1p5');}
    else if (pitchOnDeck == 6) {audioOnDeck = document.getElementById('b1p6');}
    else if (pitchOnDeck == 7) {audioOnDeck = document.getElementById('b1p7');}
    else if (pitchOnDeck == 8) {audioOnDeck = document.getElementById('b1p8');}
    else if (pitchOnDeck == 9) {audioOnDeck = document.getElementById('b1p9');}
    else if (pitchOnDeck == 10) {audioOnDeck = document.getElementById('b1p10');}
    else if (pitchOnDeck == 11) {audioOnDeck = document.getElementById('b1p11');}
    else if (pitchOnDeck == 12) {audioOnDeck = document.getElementById('b1p12');}
}
function declareBank2(){
    bankOnDeck = 2;
    if (pitchOnDeck == 1) {audioOnDeck = document.getElementById('b2p1');}
    else if (pitchOnDeck == 2) {audioOnDeck = document.getElementById('b2p2');}
    else if (pitchOnDeck == 3) {audioOnDeck = document.getElementById('b2p3');}
    else if (pitchOnDeck == 4) {audioOnDeck = document.getElementById('b2p4');}
    else if (pitchOnDeck == 5) {audioOnDeck = document.getElementById('b2p5');}
    else if (pitchOnDeck == 6) {audioOnDeck = document.getElementById('b2p6');}
    else if (pitchOnDeck == 7) {audioOnDeck = document.getElementById('b2p7');}
    else if (pitchOnDeck == 8) {audioOnDeck = document.getElementById('b2p8');}
    else if (pitchOnDeck == 9) {audioOnDeck = document.getElementById('b2p9');}
    else if (pitchOnDeck == 10) {audioOnDeck = document.getElementById('b2p10');}
    else if (pitchOnDeck == 11) {audioOnDeck = document.getElementById('b2p11');}
    else if (pitchOnDeck == 12) {audioOnDeck = document.getElementById('b2p12');}
}
function declareBank3(){
    bankOnDeck = 3;
    if (pitchOnDeck == 1) {audioOnDeck = document.getElementById('b3p1');}
    else if (pitchOnDeck == 2) {audioOnDeck = document.getElementById('b3p2');}
    else if (pitchOnDeck == 3) {audioOnDeck = document.getElementById('b3p3');}
    else if (pitchOnDeck == 4) {audioOnDeck = document.getElementById('b3p4');}
    else if (pitchOnDeck == 5) {audioOnDeck = document.getElementById('b3p5');}
    else if (pitchOnDeck == 6) {audioOnDeck = document.getElementById('b3p6');}
    else if (pitchOnDeck == 7) {audioOnDeck = document.getElementById('b3p7');}
    else if (pitchOnDeck == 8) {audioOnDeck = document.getElementById('b3p8');}
    else if (pitchOnDeck == 9) {audioOnDeck = document.getElementById('b3p9');}
    else if (pitchOnDeck == 10) {audioOnDeck = document.getElementById('b3p10');}
    else if (pitchOnDeck == 11) {audioOnDeck = document.getElementById('b3p11');}
    else if (pitchOnDeck == 12) {audioOnDeck = document.getElementById('b3p12');}
}
function declarePitch1(){
    pitchOnDeck = 1;
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p1');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p1');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p1');}
}
function declarePitch2(){
    pitchOnDeck = 2;
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p2');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p2');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p2');} 
}
function declarePitch3(){
    pitchOnDeck = 3; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p3');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p3');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p3');}
}
function declarePitch4(){
    pitchOnDeck = 4; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p4');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p4');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p4');}
}
function declarePitch5(){
    pitchOnDeck = 5; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p5');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p5');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p5');}
}
function declarePitch6(){
    pitchOnDeck = 6; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p6');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p6');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p6');}
}
function declarePitch7(){
    pitchOnDeck = 7; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p7');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p7');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p7');}
}
function declarePitch8(){
    pitchOnDeck = 8; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p8');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p8');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p8');}
}
function declarePitch9(){
    pitchOnDeck = 9; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p9');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p9');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p9');}
}
function declarePitch10(){
    pitchOnDeck = 10; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p10');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p10');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p10');}
}
function declarePitch11(){
    pitchOnDeck = 11; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p11');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p11');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p11');}
}
function declarePitch12(){
    pitchOnDeck = 12; 
    if (bankOnDeck == 1) {audioOnDeck = document.getElementById('b1p12');}
    else if (bankOnDeck == 2) {audioOnDeck = document.getElementById('b2p12');}
    else if (bankOnDeck == 3) {audioOnDeck = document.getElementById('b3p12');}
}