/*
ToDo App

Step 1: Select the input box by its id name to retrieve any value that gets submitted in it, and
select the <ul> list from the HTML file by its id name. The todos will be added to and displayed on
this <ul>.
Step 2: Create a function expression called createList that takes in "todos" as its parameter. 
This function will create a set of elements for each "todo" in the API (JSON Placeholder) that will be fetched in the next function. The parameter 
"todos" refers to the response data that you receive when fetching the API if there are no errors in the request. When this function gets executed, it will 
display on the page load these elements with the response data in them.
Step 3: Create a function called getTodos that will fetch the API using axios if the array in the localstorage is null or empty. What this means is that, on page load,
if the array in the localstorage is null or empty, it will fetch the API to get the "todos" resources from it, and if there are no errors, the response of the "get" method 
used will call the createList function previously defined with the response date in its parameter. If the previous condition is not met, the function will call the 
displayOnPage function, that will display the values stored in the localstorage inside of the <ul>. Then, call this function (getTodos).
Step 4: Create a function called addToList that creates a set of elements on which the todos submitted on the input 
box will be displayed. This function gets executed whenever an input is submitted, and takes in an event as its parameter.
It will first check if the input submitted has a valid value. If it doesn't have one, it will display an alert message asking the user
to enter a todo. If it does have one, it will create an a <li> and a checkbox button for each of the input values submitted,
it will call a function called savetodos that will save these input values to the localstorage, and whenever an input gets submitted,
the input box will be cleared.
Step 5: Create a function called saveTodosLocalstorage that takes in a todo as a parameter. This todo refers to the input value that was submitted
and evaluated on the addToList function. The savetodos function is called inside the addToList function and takes in as its parapeter the
input value being evaluated. The savetodos function first checks if the local storage is empty. If it is, it returns an empty array called "list". 
If it is not, it returns the value/s of the specified key from the storage by using the JSON.parse method, and the value gets added into the "list" 
array. In this case, the name of the localstorage key is also "list".The function will also make every todo or input value that gets passed in be 
inserted inside of the "list" array by using the push method, and later they will be stored to the localstorage as a string, by using the JSON.stringify
method.
Step 6: Create a function called displayOnPage, that firstly defines a variable called "list" with the retrieval of the values in the localstorage as an array.
To this array, use the forEach method to run an annonymous function for each of the individual item in the "list" array. This function will take 
in a todo as its parameter. This "todo" refers to each individual item of the array. For each individual item, the same things that were created on the addToList
function will be created, and the values from the localstorage will be appended to them.
Step 7: Create a function called deleteChecked that removes from the UI and the local storage the selected list items on the UI. The list items are selected by
the checking of the checkbox next to them, and then are removed from the page and localstorage by clicking the trash bin button that is underneath the input box on the
UI. In order to do this, the checkboxes have to be looped through with a for looped. If the current checkbox being looped is checked, the localstorage values are retrieved 
as an array and, with the use of the splice method, remove the current checkbox ([i]) from the array.Then, update the localstorage by storing the modified array
into it, and finally remove the checkbox from the UI using the the remove method.
*/

let inputValue = document.getElementById("inputTodo").value;
let todoList = document.getElementById("todoList");

const createList = (todos) => {
    todos.forEach(todo => {        
	    const listItm = document.createElement("LI");
		listItm.className = "list-group-item";		
		const inputCheckBox = document.createElement("INPUT");
		inputCheckBox.className = "delete-box form-check-input mr-3";
		inputCheckBox.type = "checkbox"
		const inputValueContent = document.createTextNode(todo.title);
		listItm.appendChild(inputCheckBox);
		listItm.appendChild(inputValueContent);
	    todoList.appendChild(listItm);
    });
};

const getTodos = () => {
	let arrayTodos = JSON.parse(localStorage.getItem("list"));

	if(arrayTodos === null || arrayTodos.length === 0) {
	    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
	        .then(response => {
	        	console.log(response);
	            const todos = response.data;
	            console.log(`GET list todos`, todos);
	            createList(todos);
	        })
	        .catch(error => console.error(error));
    } else {
    	displayOnPage();
    }
};

getTodos();

function addToList(event) {
	event.preventDefault();
	
	inputValue = document.getElementById("inputTodo").value;	
	
	if(inputValue === "" || inputValue === null) {
    	alert("Enter a todo");
    	return false;
  	} else {
		const listItm = document.createElement("LI");
		listItm.className = "list-group-item";
		todoList.appendChild(listItm);
		const inputCheckBox = document.createElement("INPUT");
		inputCheckBox.className = "delete-box form-check-input";
		inputCheckBox.type = "checkbox"
		inputValue = document.getElementById("inputTodo").value;	
		const inputValueContent = document.createTextNode(inputValue);
	  	listItm.appendChild(inputCheckBox);
	  	listItm.appendChild(inputValueContent);
	  	saveTodosLocalstorage(inputValue);
	  	document.getElementById("inputTodo").value = ""; 	  	
  	} 
};

function saveTodosLocalstorage(todo) {
	let list;

	if(localStorage.getItem("list") === null) {
		list = [];
	} else {
		list = JSON.parse(localStorage.getItem("list"));
	};	

	list.push(todo);
	localStorage.setItem("list", JSON.stringify(list));
};

function displayOnPage() {
	let list = JSON.parse(localStorage.getItem("list"));
	
	list.forEach(function(todo) {
		const listItm = document.createElement("LI");
		listItm.className = "list-group-item";
		todoList.appendChild(listItm);
		const inputCheckBox = document.createElement("INPUT");
		inputCheckBox.className = "delete-box form-check-input mr-3";
		inputCheckBox.type = "checkbox"
		const inputValueContent = document.createTextNode(todo);
	  	listItm.appendChild(inputCheckBox);
	  	listItm.appendChild(inputValueContent);
	});

};

function deleteChecked() {
	const checkBoxes = document.getElementsByClassName("delete-box");
	const listTexts = document.getElementsByClassName("list-group-item");

	for (let i = 0; i < checkBoxes.length; i++) {
		if(checkBoxes[i].checked) {
			const list = JSON.parse(localStorage.getItem("list"));
			list.splice([i], 1);
			localStorage.setItem("list", JSON.stringify(list));
			listTexts[i].remove();	
		}
	}
};



