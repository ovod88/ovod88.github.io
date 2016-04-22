var start = document.querySelector('.start');
var clear = document.querySelector('.clear');
var milisecondsBox = document.querySelector('.miliseconds');
var secondsBox = document.querySelector('.sec');
var minutesBox = document.querySelector('.minute');
var hoursBox = document.querySelector('.hour');
var interval;
var isRunning = false;


var clock = {
	hour: 0,
	min: 0,
	sec: 0,
	milisec: 0
}

var	changeStyleStart = function() {
	if(isRunning) {
		this.classList.add('pause');
		this.innerHTML = "Pause";
	} else {
		this.classList.remove('pause');
		this.innerHTML = "Cont..";
	}
}

var updateMiliseconds = function() {
	milisecondsBox.innerHTML = clock.milisec;
	clock.milisec += 4;
	if (clock.milisec >= 1000) {
		clock.milisec = 0;
		updateSeconds();
	}
}

var updateSeconds = function() {
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

var updateMinutes = function() {
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

var updateHours = function() {
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

function reset() {
	clock.sec = 0;
	clock.min = 0;
	clock.hour = 0;
	milisecondsBox.innerHTML = 0;
	secondsBox.innerHTML = '00';
	minutesBox.innerHTML = '00';
	hoursBox.innerHTML = '00';
}

var pauseTimer = function() {
	clearInterval(interval);
	interval = null;
	isRunning = false;
}

var stopTimer = function() {
	console.log("------>", "stopCalled");
	clearInterval(interval);
	interval = null;
	start.classList.remove('pause');
	start.innerHTML = 'Start';
}

var startTimer = function() {
	if (!interval) {
		isRunning = true;
		console.log("------>", "startCalled");
		interval = setInterval( updateMiliseconds, 4);
		updateMiliseconds();
	} else {
		pauseTimer();
	}
}



// console.log(clock); 
// console.log("----> ", clock.test);
start.addEventListener('click', startTimer);
start.addEventListener('click', changeStyleStart);
clear.addEventListener('click', reset);
clear.addEventListener('click', stopTimer);

// clear.addListener();




