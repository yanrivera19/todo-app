/*
ToDo App

Step 1: Select the input box by its id name to retrieve any value that gets submitted in it, and
select the <ul> list from the HTML file by its id name. The tasks will be added to and displayed on
this <ul>.
Step 2: Call the displayOnPage function, that will display the values stored in the localstorage inside of the 
<ul>.
Step 2: Create a function called addToList that creates a set of elements on which the tasks submitted on the input 
box will be displayed. This function gets executed whenever an input is submitted, and takes in an event as its parameter.
It will first check if the input submitted has a valid value. If it doesn't have one, it will display an alert message asking the user
to enter a task. If it does have one, it will create an a <li> and a checkbox button for each of the input values submitted,
it will call a function called saveTasks that will save these input values to the localstorage, and whenever an input gets submitted,
the input box will be cleared.
Step 3: Create a function called saveTasks that takes in a task as a parameter. This task refers to the input value that was submitted
and evaluated on the addToList function. The saveTasks function is called inside the addToList function and takes in as its parapeter the
input value being evaluated. The saveTasks function first checks if the local storage is empty. If it is, it returns an empty array called "list". 
If it is not, it returns the value/s of the specified key from the storage by using the JSON.parse method, and the value gets added into the "list" 
array. In this case, the name of the localstorage key is also "list".The function will also make every task or input value that gets passed in be 
inserted inside of the "list" array by using the push method, and later they will be stored to the localstorage as a string, by using the JSON.stringify
method.
Step 5: Create a function called displayOnPage, that firstly defines a variable called "list" with the retrieval of the values in the localstorage as an array.
To this array, use the forEach method to run an annonymous function for each of the individual item in the "list" array. This function will take 
in a task as its parameter. This "task" refers to each individual item of the array. For each individual item, the same things that were created on the addToList
function will be created, and the values from the localstorage will be appended to them.
Step 6: Create a function called deleteChecked that removes from the UI and the local storage the selected list items on the UI. The list items are selected by
the checking of the checkbox next to them, and then are removed from the page and localstorage by clicking the trash bin button that is underneath the input box on the
UI. In order to do this, the checkboxes have to be looped through with a for looped. If the current checkbox being looped is checked, the localstorage values are retrieved 
as an array and, with the use of the splice method, remove the current checkbox ([i]) from the array.Then, update the localstorage by storing the modified array
into it, and finally remove the checkbox from the UI using the the remove method.
*/

let inputValue = document.getElementById("inputTask").value;
const taskList = document.getElementById("taskList");

displayOnPage();

function addToList(event) {
	event.preventDefault();
	inputValue = document.getElementById("inputTask").value;	
	if (inputValue === "" || inputValue === "null") {
    	alert("Enter a task");
    	return false;
  	} else {
		const listItm = document.createElement("LI");
		listItm.className = "list-group-item";
		taskList.appendChild(listItm);

		const inputCheckBox = document.createElement("INPUT");
		inputCheckBox.className = "delete-box form-check-input";
		inputCheckBox.type = "checkbox"
		
		inputValue = document.getElementById("inputTask").value;	
		const inputValueContent = document.createTextNode(inputValue);

	  	listItm.appendChild(inputCheckBox);
	  	listItm.appendChild(inputValueContent);

	  	saveTasks(inputValue);
	  	document.getElementById("inputTask").value = ""; 	  	
  	} 
};

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

function displayOnPage() {
	const list = JSON.parse(localStorage.getItem("list"));

	list.forEach(function(task) {
	const listItm = document.createElement("LI");
	listItm.className = "list-group-item";
	taskList.appendChild(listItm);

	const inputCheckBox = document.createElement("INPUT");
	inputCheckBox.className = "delete-box form-check-input mr-3";
	inputCheckBox.type = "checkbox"
	
	const inputValueContent = document.createTextNode(task);

  	listItm.appendChild(inputCheckBox);
  	listItm.appendChild(inputValueContent);
	});
};

function deleteChecked() {
	const checkBoxes = document.getElementsByClassName("delete-box");
	const listTexts = document.getElementsByClassName("list-group-item");
	const checkedCheckBox = checkBoxes.checked;
	for (let i = 0; i < checkBoxes.length; i++) {
		if(checkBoxes[i].checked) {
		const list = JSON.parse(localStorage.getItem("list"));
		list.splice([i], 1);
		localStorage.setItem("list", JSON.stringify(list));
		listTexts[i].remove();	
		}		
	}	 
};
