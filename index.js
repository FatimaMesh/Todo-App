const inputField = document.getElementById("input_field");
const todoList = document.getElementById("list");
const searchList = document.getElementById("search_btn");
const addList = document.getElementById("add_btn");
const refreshList = document.getElementById("back_btn");
const updateList = document.getElementById("update_btn");
let messageContent;

//direct start function
showList();
countList();

//message function
function messageNotification(messageContent) {
  const message = document.getElementById("message");
  message.style.display = "block";
  message.textContent = messageContent;
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

//Add function
function addTodo() {
  if (!inputField.value) {
    alert("please write somethings ..!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `${inputField.value.trim()}<span aria-label="edit" class="fa fa-edit edit"></span><span aria-label="delete" class="fa fa-trash delete"></span>`;
    todoList.appendChild(li);
    messageContent = "Your item added successfully";
    messageNotification(messageContent);
    countList();
    saveDate();
  }
  inputField.value = "";
}
addList.addEventListener("click", addTodo);

//modify function
todoList.addEventListener("click", function (e) {
  //1- check todo
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveDate();
  }
  //2- delete todo
  else if (
    e.target.tagName === "SPAN" &&
    e.target.classList.contains("delete")
  ) {
    e.target.parentElement.remove();
    messageContent = "Your item deleted successfully";
    messageNotification(messageContent);
    countList();
    saveDate();
  }
  //3- edit todo
  else if (e.target.tagName === "SPAN" && e.target.classList.contains("edit")) {
    //let updateTodoItem = e.target.parentElement.firstChild.nodeValue;
    inputField.value = e.target.parentElement.firstChild.nodeValue;
    searchList.style.display = "none";
    addList.style.display = "none";
    updateList.style.display = "inline";
    document.getElementById("update_btn").onclick = function () {
      if (!inputField.value) {
        alert("please write somethings ..!");
      } else {
        e.target.parentElement.firstChild.nodeValue = inputField.value.trim();
        searchList.style.display = "";
        addList.style.display = "";
        if (refreshList.style.display == "inline") {
          searchList.style.display = "none";
          addList.style.display = "none";
        }
        updateList.style.display = "none";
        messageContent = "Your item updated successfully";
        messageNotification(messageContent);
        inputField.value = "";
        saveDate();
      }
    };
  }
});

//count todo list function
function countList() {
  let listCount = todoList.querySelectorAll("li").length;
  document.getElementById("count_list").innerText =
    "Tasks' number is " + listCount;
}

//Persistent Storage function
function saveDate() {
  localStorage.setItem("data", todoList.innerHTML);
}

//show the Storage function
function showList() {
  todoList.innerHTML = localStorage.getItem("data");
}

//search function
searchList.addEventListener("click", function () {
  if (!inputField.value) {
    alert("please write something..!");
  } else {
    searchList.style.display = "none";
    addList.style.display = "none";
    refreshList.style.display = "inline";
    let searchKey, liElement, index, li, liText;
    searchKey = inputField.value.toLowerCase().trim();
    liElement = todoList.querySelectorAll("li");
    for (index = 0; index < liElement.length; index++) {
      li = liElement[index];
      liText = li.textContent;
      if (liText.toLowerCase().indexOf(searchKey) > -1) {
        continue;
      } else {
        liElement[index].style.display = "none";
      }
    }
    inputField.value = "";
  }
});

refreshList.addEventListener("click", back);
// refresh function
function back() {
  const allTodoList = document.querySelectorAll("li");
  let index;
  for (index = 0; index < allTodoList.length; index++) {
    allTodoList[index].style.display = "inline";
    saveDate();
  }
  location.reload();
}
