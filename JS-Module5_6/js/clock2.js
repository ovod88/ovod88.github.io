var wrapperBox = document.querySelector('.wrapper');
var start = document.querySelector('.start');
var reset = document.querySelector('.reset');
var split = document.querySelector('.split');
var milisecondsBox = document.querySelector('.miliseconds');
var secondsBox = document.querySelector('.sec');
var minutesBox = document.querySelector('.minute');
var hoursBox = document.querySelector('.hour');
var textBox = document.querySelector('.output');
var interval;
var isRunning = false;
var messageCounter = 0;
var textBoxInitialPosition;
var BROWSER_DELAY = 4;

var clock = {
	hour: 0,
	min: 0,
	sec: 0,
	milisec: 0
}

var clockSnapshot = {
	hour: 0,
	min: 0,
	sec: 0,
	milisec: BROWSER_DELAY,
	update: function() {
		this.hour = clock.hour;
		this.min = clock.min;
		this.sec = clock.sec;
		this.milisec = clock.milisec;
	}
}

function timeObjectToMiliseconds(object) {
	return object.milisec + object.sec * 1000 + object.min * 60 * 1000 + object.hour * 60 * 60 * 1000;
}

function milisecondsToString(miliseconds) {
	var localMilisec, localSec, localMin, localHour;

	localMilisec = miliseconds % 1000;
	localSec = Math.floor(miliseconds / 1000);
	localMin = Math.floor(localSec / 60);
	localSec = localSec - localMin * 60;
	localHour = Math.floor(localMin / 60);
	localMin = localMin - localHour * 60;


	if(localHour < 10) {
		localHour = '0' + localHour;
	}
	if(localMin < 10) {
		localMin = '0' + localMin;
	}
	if(localSec < 10) {
		localSec = '0' + localSec;
	}
	if(localMilisec < 10) {
		localMilisec = '00' + localMilisec;
	} else if(localMilisec < 100) {
		localMilisec = '0' + localMilisec;
	}

	return localHour + ':' + localMin + ':' + localSec + '.' + localMilisec; 
}

function updateMiliseconds() {
	if(clock.milisec < 10) {
		milisecondsBox.innerHTML = '00' + clock.milisec;
	} else if(clock.milisec < 100) {
		milisecondsBox.innerHTML = '0' + clock.milisec;
	} else {
		milisecondsBox.innerHTML = clock.milisec;
	}

	clock.milisec += BROWSER_DELAY;
	if (clock.milisec >= 1000) {
		clock.milisec = 0;
		updateSeconds();
	}
}

function updateSeconds() {
	clock.sec++;
	if(clock.sec == 60) {
		clock.sec = 0;
		updateMinutes();
	}

	if( clock.sec < 10) {
		secondsBox.innerHTML = '0' + clock.sec;
	} else {
		secondsBox.innerHTML = clock.sec;
	}
}

function updateMinutes() {
	clock.min++;

	if(clock.min == 60) {
		clock.min = 0;
		updateHours();
	}

	if( clock.min < 10) {
		minutesBox.innerHTML = '0' + clock.min;
	} else {
		minutesBox.innerHTML = clock.min;
	}
}

function updateHours() {
	clock.hour++;

	if(clock.hour == 24) {
		reset();
	}

	if( clock.hour < 10) {
		hoursBox.innerHTML = '0' + clock.hour;
	} else {
		hoursBox.innerHTML = clock.hour;
	}
}

function changeStyleStart() {
	if(isRunning) {
		start.innerHTML = "Stop";
	} else {
		start.innerHTML = "Start";
	}
}

function printLogMessage(text) {
	var timeDifference = timeObjectToMiliseconds(clock) - timeObjectToMiliseconds(clockSnapshot);
	
	messageCounter++;

	textBox.innerHTML += "<span>" + messageCounter + " " + text + ":" + " " 
	+ milisecondsToString(timeDifference) + "</span>";

	if(messageCounter <= 7) {
		changeClockPosition();
	}
}

function changeClockPosition() {
	var style = window.getComputedStyle(wrapperBox);
	var margin = parseInt(style.getPropertyValue('margin-top'));

	if(!textBoxInitialPosition) {
		textBoxInitialPosition = margin;
	}

	margin -= 15;
	wrapperBox.setAttribute('style', 'margin-top:' + margin + 'px');
}

function stopTimer() {
	clearInterval(interval);
	interval = null;
	isRunning = false;
}

function startTimer() {
	if (!interval) {
		isRunning = true;
		interval = setInterval( updateMiliseconds, 4);
		updateMiliseconds();
	} else {
		stopTimer();
		printLogMessage('Stop');
		clockSnapshot.update();
	}
}

function clear() {
	clock.sec = 0;
	clock.min = 0;
	clock.hour = 0;
	clock.milisec = BROWSER_DELAY;
	clockSnapshot.sec = 0;
	clockSnapshot.milisec = BROWSER_DELAY;
	clockSnapshot.min = 0;
	clockSnapshot.hour = 0;
	textBox.innerHTML = '';
	stopTimer();
	wrapperBox.setAttribute('style', 'margin-top:' + textBoxInitialPosition + 'px');
	console.log("RUNNING --> ", isRunning);
	changeStyleStart();
	milisecondsBox.innerHTML = '000';
	secondsBox.innerHTML = '00';
	minutesBox.innerHTML = '00';
	hoursBox.innerHTML = '00';
	messageCounter = 0;
}

function splitLog() {
	if(isRunning) {
		printLogMessage('Split');
	}
}


start.addEventListener('click', startTimer);
start.addEventListener('click', changeStyleStart);
reset.addEventListener('click', clear);
split.addEventListener('click', splitLog);