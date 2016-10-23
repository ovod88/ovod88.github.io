function Clock(arrows) {
    var SECDEGREE = 6,
        MINDEGREE = 6,
        HOURDEGREE = 30,
        isRunning = false,
        currentTime,
        interval;

    function toggle() {
        if(isRunning) {
            stop();
        } else {
            start();
        }
    }

    function ifIsRunning() {
        return isRunning;
    }
    function start() {
        isRunning = true;
        setArrows();
        interval = setTimeout(update, 250);
    }

    function setArrows() {
        var currentDate = new Date();
        currentTime = Date.now();
        arrows.seconds.rotate(currentDate.getSeconds() * SECDEGREE);
        arrows.minutes.rotate(currentDate.getMinutes() * MINDEGREE + (currentDate.getSeconds()/60) * MINDEGREE);
        var hours = currentDate.getHours();
        if( hours > 12) {
            hours -= 12;
        }
        arrows.hours.rotate(hours * HOURDEGREE + (currentDate.getMinutes()/60) * HOURDEGREE);
    }

    function stop() {
        isRunning = false;
        clearTimeout(interval);
    }

    function update() {
        var nextTime = Date.now();

        if( nextTime - currentTime > 1000 ) {
            setArrows();
        }
        interval = setTimeout(update, 250);
    }

    return {
        toggle: toggle,
        isRunning: ifIsRunning
    }
}
