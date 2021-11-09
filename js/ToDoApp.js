class Task {
    constructor(title, description, startDate, dueDate, category) {
        this._title = title;
        this._description = description;
        this._startDate = startDate;
        this._dueDate = dueDate;
        this._category = category;
        this._completed = 'N';
    }

    // Get and Set for Task's Category (Work / Play / Life)
    get category() {
        return this._category;
    }
    set category(category) {
        this._category = category;
    }

    // Get and Set for Task Title (String with the task title)
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    
    // Get and Set for Task Description (String describing the task)
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    // Get and Set for Task Start Date (Date value)
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }
    
    // Get and Set for Task Due Date (Date value)
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    // Get and Set for Task completed (Boolean value Y / N)
    get completed() {
        return this._completed;
    }
    set completed(completed) {
        this._completed = completed;
    }
}

let taskArray = [];
updateDisplay();


//Get the stored TASKS from the local storage
function updateDisplay() {
    let myText = localStorage.getItem("userData");
    //If there is stored data to load
    if (myText != null) {
        taskArray = JSON.parse(myText);
        let ul = document.getElementById("myTaskList");
        ul.style.listStyle = 'none';
        ul.innerHTML = "";
        for (i = 0; i < taskArray.length; i++) {
            let myObj = taskArray[i];
            let myString = `Taak ${i + 1}: ${myObj._title} - ${myObj._description} - Completed = ${myObj._completed} - `;
            let li = document.createElement("li");
            if (myObj._completed == 'Y'){
                li.style.textDecoration = 'line-through';
            }
            else{
                li.style.textDecoration = 'none';
            }
            li.appendChild(document.createTextNode(myString));
            ul.appendChild(li);
        }

        // Create a REMOVE and COMPLETED buttons and append it to each list item
        let myNodelist = document.getElementsByTagName("li");
        for (i = 0; i < myNodelist.length; i++) {
            let myObj = taskArray[i];
            let button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'REMOVE');
            button.setAttribute('onclick', `removeTask(${i})`);
            myNodelist[i].appendChild(button);

            let button2 = document.createElement('input');
            button2.setAttribute('type', 'button');
            button2.setAttribute('value', 'COMPLETED');
            button2.setAttribute('onclick', `completeTask(${i})`);
            myNodelist[i].appendChild(button2);

        }
    }
}


function mySubmit(event) {

    event.preventDefault();

    //Get all the values from the DOM and populate the valiables
    let taskTitle = document.getElementById("taskTitle").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let taskStartDate = document.getElementById("taskStartDate").value;
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskCategory = "";
    if (document.getElementById("category1").checked == true) {
        taskCategory = "WORK";
    }
    else if (document.getElementById("category2").checked == true) {
        taskCategory = "PLAY";
    }
    else {
        taskCategory = "LIFE";
    }

    let myTask = new Task(taskTitle, taskDescription, taskStartDate, taskDueDate, taskCategory)
    taskArray.push(myTask);

    //Convert to JSON data and write to localstorage
    myData = JSON.stringify(taskArray);
    localStorage.setItem("userData", myData);
    updateDisplay();
}

function removeTask(taskNumber) {
    let myNodelist = document.getElementsByTagName("li");
    for (i = 0; i < myNodelist.length; i++) {
        if (i == taskNumber) {
            taskArray.splice(taskNumber, 1);
        }
    }
    // Save the taskArray to local storage and show the updated list
    myData = JSON.stringify(taskArray);
    localStorage.setItem("userData", myData);
    updateDisplay();
}


function completeTask(taskNumber) {
    let myNodelist = document.getElementsByTagName("li");
    for (i = 0; i < myNodelist.length; i++) {
        if (i == taskNumber) {
            let myObj = taskArray[i];
            myObj._completed = 'Y';
        }
    }
    // Save the taskArray to local storage and show the updated list
    myData = JSON.stringify(taskArray);
    localStorage.setItem("userData", myData);
    updateDisplay();
}


