var inpDate;
var x = 0;
var diffTime = [];

const calc = () => {         // For calculating no of days
	var now = new Date();
	var days = 0;
	var currDate = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

	if (inpDate[2] != currDate[2]) {
		{ // For counting rest days in current year
			if (currDate[1] > 2) {
				for (i = (currDate[1] + 1); i <= 12; i++) {
					days += (i % 2 == 0) ? 30 : 31;
				}
				days += ((currDate[1] % 2 == 0) ? 30 : 31) - currDate[0] + 2;

			}

			else {
				if (currDate[1] == 1)
					days += [(currDate[2] % 4 == 0) ? 29 : 28] + (31 - currDate[0]);
				else
					days += [(currDate[2] % 4 == 0) ? 29 : 28] - currDate[0];
				for (i = 3; i <= 12; i++) {
					days += (i % 2 == 0) ? 30 : 31;
				}
				days++;
			}
		}

		{ // For counting past days in input year
			if (inpDate[1] > 2) {
				days += parseInt([(inpDate[2] % 4 == 0) ? 29 : 28]) + 31;
				for (i = 3; i < inpDate[1]; i++) {
					days += (i % 2 == 0) ? 30 : 31;
				}
				days += inpDate[0];
			}
			else
				days += parseInt(inpDate[0]) + parseInt([(inpDate[1] == 1) ? 0 : 31]);
		}

		{ // For counting days in subsequent years
			for (i = currDate[2] + 1; i < inpDate[2]; i++) {
				days += (i % 4 == 0) ? 366 : 365;
			}
		}
	}
	else {
		days = [(currDate[2] % 4 == 0) ? 29 : 28] - currDate[0];
		for (i = currDate[1] + 1; i < inpDate[1]; i++) {
			days += (i % 2 == 0) ? 30 : 31;
		}
		days += inpDate[0];
	}

	return days;
}

const tym = () => {             // For calculatong no of seconds
	var now = new Date();
	let seconds = (24 * 60 * 60) - (now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 60 * 60);
	let days = calc();

	// diffTime[0] = Math.floor(days / 365);
	// diffTime[1] = Math.floor(days % 365 / 30);
	// diffTime[2] = Math.floor(days % 365 % 30);
	diffTime[0] = Math.floor(days * 0.0027379);
	diffTime[1] = Math.floor([(days * 0.0027379) - diffTime[0]] * 12);
	diffTime[2] = Math.floor([([(days * 0.0027379) - diffTime[0]] * 12) - diffTime[1]] * 30);
	diffTime[3] = Math.floor(seconds / 3600);
	diffTime[4] = Math.floor((seconds % 3600) / 60);
	diffTime[5] = Math.floor(seconds % 3600 % 60);
}

const disp = () => {          // To display the content
	tym();
	const ids = ["year", "month", "day", "hrs", "min", "sec"];
	for (i = 0; i < 6; i++) {
		document.getElementById(ids[i]).textContent = diffTime[i];
	}
}

const input = () => {          // Input the Date
	var now = new Date();
	let arr = prompt("Enter Date in \"DD/MM/YYYY\" format").split("/");
	if (/^[a-zA-Z()]+$/.test(arr[0])) {
		alert("Invalid Date Format");
		return
	}

	inpDate = arr.map(function (str) {
		return parseInt(str);
	});
	if (inpDate[0] > 31 || inpDate[1] > 12 || inpDate[0] <= 0 || inpDate[1] <= 0) {
		alert("Invalid Date Format");
		return
	}
	if ((inpDate[0] == now.getDate() && inpDate[1] == (now.getMonth() + 1) && inpDate[2] == now.getFullYear()) || (inpDate[2] == now.getFullYear() && inpDate[1] < (now.getMonth() + 1)) || (inpDate[2] == now.getFullYear() && inpDate[1] == (now.getMonth() + 1) && inpDate[0] < now.getDate())) {
		alert("Enter Future Date");
		return
	}
	else if (inpDate[2] < now.getFullYear()) {
		alert("Enter Future Date");
		return
	}
	window.setInterval(function () { disp() }, 1000);
}