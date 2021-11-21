
let inputValue = document.getElementById("inputTask").value;
const taskList = document.getElementById("taskList");
const deleteBtn = document.getElementById("deleteBtn");

//calls function that displays the saved data from localstorage in browser
displayOnPage();


//Creates items for list with input value whenever the Add button is clicked
function addToList(event) {
	event.preventDefault();
	
	const listItm = document.createElement("LI");
	listItm.className = "list-group-item";
	taskList.appendChild(listItm);

	let inputCheckBox = document.createElement("INPUT");
	inputCheckBox.className = "delete-box form-check-input mr-3";
	inputCheckBox.type = "checkbox"
	inputCheckBox.style.marginRight = "10px";
	
	inputValue = document.getElementById("inputTask").value;	
	let inputValueContent = document.createTextNode(inputValue);

  	listItm.appendChild(inputCheckBox);
  	listItm.appendChild(inputValueContent);

  	saveTasks(inputValue);

  	document.getElementById("inputTask").value = "";  
};

function saveTasks(task) {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	}

	list.push(task);
	localStorage.setItem("list", JSON.stringify(list));
}


function displayOnPage() {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	}

	//Have same elements remain on page even if it gets closed or reloaded. Used 
	//same variable names but added disp at the beginning.
	list.forEach(function(task) {
	let dispListItm = document.createElement("LI");
	dispListItm.className = "list-group-item";
	taskList.appendChild(dispListItm);

	let dispInputCheckBox = document.createElement("INPUT");
	dispInputCheckBox.className = "delete-box form-check-input mr-3";
	dispInputCheckBox.type = "checkbox"
	dispInputCheckBox.style.marginRight = "10px";
	
	let dispInputValueContent = document.createTextNode(task);

  	dispListItm.appendChild(dispInputCheckBox);
  	dispListItm.appendChild(dispInputValueContent);
	});
};

console.log(localStorage);
function deleteChecked() {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	};

	const checkBoxes = document.getElementsByClassName("delete-box");
	const listTexts = document.getElementsByClassName("list-group-item");
	let checkedCheckBox = checkBoxes.checked;
	for (let i = 0; i < checkBoxes.length; i++) {
		if(checkBoxes[i].checked) {
		let rmv = listTexts[i];	
		rmv.remove();
		removeFromStorage(rmv);
		}		
	};	 
};

//function indended to remove elements from localstorage (Don't know how to remove
//individual items that I select from localstorage). 
function removeFromStorage(task) {
	let list;
	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
		console.log(list)
	};
	
	list.splice(list.indexOf(task), 1);
	localStorage.setItem("list", JSON.stringify(list));
}


