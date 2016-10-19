function Clock(arrows) {
    var SECDEGREE = 6,
        MINDEGREE = 30,
        HOURDEGREE,
        isRunning = false,
        currentTime;

    function start() {
        currentTime = new Date();
        arrows.seconds.rotate(currentTime.getSeconds() * SECDEGREE);
        //arrows.minutes.rotate(currentTime.getMinutes() * MINDEGREE + (currentTime.getSeconds()/60) * MINDEGREE);
    }

    function stop() {

    }

    return {
        start : start
    }
}
