/*
ToDo App

Step 1: Select the input box by its id name to retrieve any value that gets submitted in it, and
select the <ul> list from the HTML file by its id name. The tasks will be added to and displayed on
this <ul>.
Step 2: Create a function called addToList that creates a set of elements on which the tasks submitted on the input 
box will be displayed. This function gets executed whenever an input is submitted, and takes in an event as its parameter.
It will first check if the input submitted has a valid value. If it doesn't have one, it will display an alert message asking the user
to enter a task. If it does have one, it will create an a <li> and a checkbox button for each of the input values submitted,
it will call a function called saveTasks that will save these input values to the localstorage, and whenever an input gets submitted,
the input box will be cleared.
Step 3:
*/





let inputValue = document.getElementById("inputTask").value;
const taskList = document.getElementById("taskList");

//Calls function to display previously added tasks to list whenever the page either
//gets reloaded or reopened.
displayOnPage();


//Creates items for list with input value whenever the input is submitted
function addToList(event) {
	event.preventDefault();
	inputValue = document.getElementById("inputTask").value;	
	if (inputValue == "" || inputValue == "null") {
    	alert("Enter a task");
    	return false;
  	} else {
		const listItm = document.createElement("LI");
		listItm.className = "list-group-item";
		listItm.style.marginBottom = "10px";
		taskList.appendChild(listItm);

		let inputCheckBox = document.createElement("INPUT");
		inputCheckBox.className = "delete-box form-check-input";
		inputCheckBox.type = "checkbox"
		inputCheckBox.style.marginRight = "10px";
		
		inputValue = document.getElementById("inputTask").value;	
		let inputValueContent = document.createTextNode(inputValue);

	  	listItm.appendChild(inputCheckBox);
	  	listItm.appendChild(inputValueContent);

	  	saveTasks(inputValue);
	  	document.getElementById("inputTask").value = ""; 	  	
  	} 
};

//Saves to the localstorage whatever task is submitted
function saveTasks(task) {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	};

	list.push(task);
	localStorage.setItem("list", JSON.stringify(list));
};

//Displays on page content from localstorage
function displayOnPage() {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	};

	list.forEach(function(task) {
	let listItm = document.createElement("LI");
	listItm.className = "list-group-item";
	taskList.appendChild(listItm);

	let inputCheckBox = document.createElement("INPUT");
	inputCheckBox.className = "delete-box form-check-input mr-3";
	inputCheckBox.type = "checkbox"
	inputCheckBox.style.marginRight = "10px";
	
	let inputValueContent = document.createTextNode(task);

  	listItm.appendChild(inputCheckBox);
  	listItm.appendChild(inputValueContent);
	});
};

//When an item on the page gets selected by checking the checkbox next to it and the trash bin button is clicked, 
//the item gets deleted from page and localstorage.
function deleteChecked() {
	const checkBoxes = document.getElementsByClassName("delete-box");
	const listTexts = document.getElementsByClassName("list-group-item");
	const checkedCheckBox = checkBoxes.checked;
	for (let i = 0; i < checkBoxes.length; i++) {
		if(checkBoxes[i].checked) {
		let list = JSON.parse(localStorage.getItem("list"));
		list.splice([i], 1);
		localStorage.setItem("list", JSON.stringify(list));
		listTexts[i].remove();	
		}		
	}	 
};
