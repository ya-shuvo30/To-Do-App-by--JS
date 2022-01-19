console.log("This is index.js");
// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view
// Constructor
function Task(name, priority, time) {
  this.name = name;
  this.priority = priority;
  this.time = time;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (task) {
  console.log("Adding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                        <td>${task.name}</td>
                        <td>${task.priority}</td>
                        <td>${task.time}</td>
                    </tr>`;
  tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
  let taskForm = document.getElementById("taskForm");
  taskForm.reset();
};

// Implement the validate function
Display.prototype.validate = function (task) {
  if (task.name.length < 2 || task.priority.length < 2) {
    return false;
  } else {
    return true;
  }
};
Display.prototype.show = function (time, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class= "alert alert-${time} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

// Add submit event listener to taskForm
let taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", taskFormSubmit);

function taskFormSubmit(e) {
  console.log("You have submitted library form");
  let name = document.getElementById("taskName").value;
  let priority = document.getElementById("priority").value;
  let time;
  let today = document.getElementById("today");
  let upcoming = document.getElementById("upcoming");

  if (today.checked) {
    time = today.value;
  } else if (upcoming.checked) {
    time = upcoming.value;
  }

  let task = new Task(name, priority, time);
  console.log(task);

  let display = new Display();

  if (display.validate(task)) {
    display.add(task);
    display.clear();
    display.show("success", "Your task has been successfully added");
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this task");
  }

  e.preventDefault();
}
