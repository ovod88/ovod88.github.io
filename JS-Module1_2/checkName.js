function checkName() {
	var usersList = fillList();
	var user = prompt("Enter, please, your name --> ");

	if ( usersList.indexOf(user) == -1 ) {
		alert("No such user!!!");
	} else {
		alert(user + ", " + "entered successfully!!!");
	}
}

function fillList() {
	var QUANTITY = 5;
	var names = [];

	for ( var i = 0; i < QUANTITY; i++ ) {
		names.push( prompt("Add name to the list") );
		console.log( "list is ", names );
	} 

	return names;
}