let todoitemscontainerelement = document.getElementById('todoItemsContainer'); // ul container
let ADDbtn = document.getElementById("addButton");
let savebtn = document.getElementById("savebutton");
let ClearAllEl = document.getElementById("ClearAll");


ClearAllEl.addEventListener('click', function() {
    localStorage.clear();
    todoitemscontainerelement.textContent = "";
})

function gettodolistfromlocalstorage() {
    let stringifiedtodolist = localStorage.getItem("todolist");
    let parsedtodolist = JSON.parse(stringifiedtodolist);
    if (parsedtodolist === null) {
        return [];
    } else {
        return parsedtodolist;
    }
    console.log(parsedtodolist);
}
let myarray = gettodolistfromlocalstorage();

savebtn.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(myarray));
};

function onTodoStatusChange(checkboxid, labelid, todoid) {
    let labelElement = document.getElementById(labelid);
    labelElement.classList.toggle("checked");

    let objectIndex = myarray.findIndex(function(eachobj) {
        let eachid = "todo" + eachobj.uniqueNo;
        if (eachid === todoid) {
            return true;
        } else {
            return false;
        }
    });

    let todoobj = myarray[objectIndex];
    if (todoobj.ischecked === true) {
        todoobj.ischecked = false;
    } else {
        todoobj.ischecked = true;
    }
}

function DeleteTodoContainer(todoid) {
    let deleteContainer = document.getElementById(todoid);
    todoitemscontainerelement.removeChild(deleteContainer);
    let deleteindex = myarray.findIndex(function(eachobj) {
        eachobj = "todo" + myarray.uniqueNo;
        if (eachobj === todoid) {
            return true;
        } else {
            return false;
        }
    });
    myarray.splice(deleteindex, 1);
}

function CreateandAppendtodo(todo) {
    let checkboxid = "checkbox" + todo.uniqueNo;
    let labelid = "label" + todo.uniqueNo;
    let todoid = "todo" + todo.uniqueNo;

    let todocontainer = document.createElement('li'); // li container 
    todocontainer.classList.add('todo-item-container', 'd-flex', 'flex-row'); // li class values applied
    todocontainer.id = todoid;

    todoitemscontainerelement.appendChild(todocontainer); // li append to ul

    let inputelement = document.createElement('input'); //checkbox created using input element
    inputelement.type = 'checkbox';
    inputelement.id = checkboxid;
    inputelement.classList.add('checkbox-input');
    inputelement.checked = todo.ischecked;
    inputelement.onclick = function() {
        onTodoStatusChange(checkboxid, labelid, todoid);
    };

    todocontainer.appendChild(inputelement); // input element append to li 

    let labelcontainer = document.createElement('div'); // created label container 
    labelcontainer.classList.add('d-flex', 'flex-row', 'label-container');

    todocontainer.appendChild(labelcontainer); // label container append to li

    let labelelement = document.createElement('label'); //created label element for text 
    labelelement.setAttribute('for', checkboxid);
    labelelement.textContent = todo.text;
    labelelement.id = labelid;
    labelelement.classList.add('checkbox-label');
    if (todo.ischecked === true) {
        labelelement.classList.add("checked");
    }

    labelcontainer.appendChild(labelelement); // label element append to label container

    let deletecontainer = document.createElement('div'); //created delete container
    deletecontainer.classList.add('delete-icon-container');


    labelcontainer.appendChild(deletecontainer); // delete container append to label container

    let deleteicon = document.createElement('i'); // delete icon 
    deleteicon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteicon.onclick = function() {
        DeleteTodoContainer(todoid);
    };
    deletecontainer.appendChild(deleteicon); // delete icon append to delete container
}
let UserInputElement = document.getElementById("todoUserInput");

function Addtodo() {
    let UserInputValue = UserInputElement.value;
    if (UserInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    let arraycount = myarray.length;
    arraycount = arraycount + 1;
    let newarray = {
        text: UserInputValue,
        uniqueNo: arraycount,
        ischecked: false
    };
    myarray.push(newarray);
    CreateandAppendtodo(newarray);
    UserInputElement.value = "";

}

ADDbtn.onclick = function() {
    Addtodo();
};

function AddTodoTask(Event) {
    if (Event.key === 'Enter' && UserInputElement.value === "") {
        alert("Enter Valid Text");
        return;
    } else if (Event.key === 'Enter' && UserInputElement.value !== "") {
        Addtodo();
    }
}
UserInputElement.addEventListener('keyup', AddTodoTask);


for (let eachItem of myarray) {
    CreateandAppendtodo(eachItem);
}