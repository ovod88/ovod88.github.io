function pow() {
	var number = prompt("Enter number to pow --> ");
	var degree = prompt("Enter degree --> ");
	var result;

	if ( number == 0 && degree >= 0 ) {
		result = 0;
	} else if ( number == 0 && degree < 0 ) {
		alert("Wrong combination!!!");
		return;
	} else if ( degree == 0 ) {
		result = 1;
	} else if ( degree > 0 ) {
		result = loopDegree(number, degree);
	} else {
		result = 1/loopDegree(number, degree);
	}

	alert("Result is " + result);
}

function loopDegree(number, degree) {
	var result = number;

	for (var i = 1; i < degree; i++) {
		result *= number;
	}

	return result;
}