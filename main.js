function capitalizeEachWord(str) {
  if (str.length === 0) return str; // Handle empty strings
  // Split the string into words
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together
  return capitalizedWords.join(" ");
}
function capitalizeFirstLetter(str) {
  if (str.length === 0) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
class Todo {
  constructor(title = "Title", priority = 0, completed = false) {
    this.title = title;
    this.priority = priority; // 1 unimportant, 2 normal, 3 important
    this.completed = completed; // New property to track completion status
  }

  set setTitle(newTitle) {
    this.title = newTitle;
  }
  set setPriority(newPriority) {
    this.priority = newPriority;
  }
  set setCompleted(status) {
    this.completed = status;
  } // New setter for completion status

  get getTitle() {
    return this.title;
  }
  get getPriority() {
    return this.priority;
  }
  get isCompleted() {
    return this.completed;
  } // New getter for completion status
}

class TodoList {
  constructor(title = "To-do list title", todoItems = []) {
    this.title = title;
    this.todoItems = todoItems;
  }

  addNewTodoItem(todo) {
    if (
      !todo.priority ||
      isNaN(todo.priority) ||
      todo.priority < 1 ||
      todo.priority > 3
    ) {
      todo.priority = null; // Set priority to null if invalid or not provided
    }
    this.todoItems.push(todo);
  }

  removeTodoItem(todo) {
    for (let i = 0; i < this.todoItems.length; i++) {
      if (todo === this.todoItems[i]) {
        this.todoItems = this.todoItems
          .slice(0, i)
          .concat(this.todoItems.slice(i + 1));
        break; // Exit loop after removal
      }
    }
  }

  get getItems() {
    return this.todoItems;
  }
  get getTitle() {
    return this.title;
  }
}

class NavigationTodoLists {
  constructor() {
    this.todoLists = [];
  }

  addNewTodoList(todoList) {
    this.todoLists.push(todoList);
  }
  removeTodoList(todoList) {
    for (let i = 0; i < this.todoLists.length; i++) {
      if (todoList === this.todoLists[i]) {
        this.todoLists = this.todoLists
          .slice(0, i)
          .concat(this.todoLists.slice(i + 1));
        break; // Exit loop after removal
      }
    }
  }
}

class ScreenControllerTodoList {
  constructor(todoList = new TodoList()) {
    this.todoList = todoList;
    this.activeTodoList = null;
  }

  setActiveTodoList(todoList) {
    this.activeTodoList = todoList;
  }
  getActiveTodoList() {
    return this.activeTodoList;
  }

  createTodo(todo) {
    const todoWrapperButton = document.createElement("div");
    todoWrapperButton.classList.add("todoWrapperButton");
    const buttonDone = document.createElement("div");

    const updateButtonIcon = () => {
      if (todo.isCompleted)
        buttonDone.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>';
      else
        buttonDone.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
    };
    updateButtonIcon();

    buttonDone.addEventListener("click", () => {
      todo.setCompleted = !todo.isCompleted;
      todoWrapper.classList.toggle("doneTodo", todo.isCompleted);
      updateButtonIcon();
    });

    const todoWrapper = document.createElement("div");
    todoWrapper.classList.add("todoWrapper");

    if (todo.isCompleted) {
      todoWrapper.classList.add("doneTodo"); // Apply the class if completed
    }

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todo.getTitle;
    todoWrapper.appendChild(todoTitle);

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("priorityDiv");
    todoPriority.textContent = "delete";
    switch (todo.getPriority) {
      case 1:
        todoPriority.style.color = "green";
        break;
      case 2:
        todoPriority.style.color = "orange";
        break;
      case 3:
        todoPriority.style.color = "red";
        break;
      case null:
        todoPriority.style.color = "black";
        break;
    }
    todoWrapper.appendChild(todoPriority);

    todoPriority.addEventListener("click", () => {
      this.todoList.removeTodoItem(todo);
      this.createTodoList(); // Recreate the todo list to reflect the removal
    });

    todoWrapperButton.appendChild(buttonDone);
    todoWrapperButton.appendChild(todoWrapper);
    return todoWrapperButton;
  }

  // Updated code: Sort todo items by priority
  sortByPriority(todoItems) {
    return todoItems.sort((a, b) => b.getPriority - a.getPriority); // Sort by priority
  }

  createTodoList() {
    const homePage = document.querySelector("#homePage");
    homePage.textContent = "";

    const todoHeading = document.createElement("h1");
    todoHeading.textContent = capitalizeEachWord(this.todoList.getTitle);
    homePage.appendChild(todoHeading);

    const todoList = document.createElement("div");
    todoList.classList.add("todoList");

    // Updated code: Get sorted todo items
    const sortedTodoItems = this.sortByPriority(this.todoList.getItems);

    // Create and append todo items
    sortedTodoItems.forEach((todoItem) => {
      const todo = this.createTodo(todoItem);
      todoList.appendChild(todo);
    });

    const buttonAddNewTodo = document.createElement("button");
    buttonAddNewTodo.textContent = "Add new todo";
    buttonAddNewTodo.classList.add("btnAddNewTodo");

    // Recreate the todo list to include the new item
    buttonAddNewTodo.addEventListener("click", () => {
      const title = capitalizeFirstLetter(prompt("Enter title"));
      const priority = parseInt(
        prompt(
          "Enter priority (1 for Unimportant, 2 for Normal, 3 for Important, or nothing for default)",
        ),
        10,
      );

      const newTodoItem = new Todo(title, priority);
      this.todoList.addNewTodoItem(newTodoItem);
      this.createTodoList(); // Recreate the todo list to include the new item
    });

    if (sortedTodoItems.length) homePage.appendChild(todoList);
    homePage.appendChild(buttonAddNewTodo);
  }
}

class ScreenControllerNavigationTodoLists {
  constructor() {
    this.navigationTodoLists = new NavigationTodoLists();
  }

  createNewTodoList() {
    const homePage = document.querySelector("#homePage");
    homePage.textContent = "";

    const btnNewTodoList = document.querySelector("button");
    btnNewTodoList.addEventListener("click", () => {
      const newTodoList = new TodoList(prompt("Enter title"));
      this.navigationTodoLists.addNewTodoList(newTodoList);
      const screenControllerTodoList = new ScreenControllerTodoList(
        newTodoList,
      );
      screenControllerTodoList.createTodoList();
      screenControllerTodoList.setActiveTodoList(newTodoList);

      const navTodoLists = document.querySelector("#navTodoLists");
      const todoListNavWrapper = document.createElement("div");
      todoListNavWrapper.classList.add("todoListNavWrapper");
      const todoListTitle = document.createElement("h2");
      todoListNavWrapper.appendChild(todoListTitle);

      todoListTitle.textContent =
        "- " + capitalizeEachWord(newTodoList.getTitle);
      const todoListDelete = document.createElement("p");
      todoListDelete.textContent = "delete";
      todoListNavWrapper.appendChild(todoListDelete);

      navTodoLists.appendChild(todoListNavWrapper);

      todoListTitle.addEventListener("click", () => {
        screenControllerTodoList.setActiveTodoList(newTodoList);
        screenControllerTodoList.createTodoList();
      });

      todoListDelete.addEventListener("click", () => {
        this.navigationTodoLists.removeTodoList(newTodoList);
        navTodoLists.removeChild(todoListNavWrapper); // Remove the list from the navigation
        if (newTodoList === screenControllerTodoList.getActiveTodoList())
          homePage.textContent = "";
      });
    });
  }
}

// Example usage
// const screenController = new ScreenControllerTodoList();
// screenController.createTodoList();
const screenControllerNav = new ScreenControllerNavigationTodoLists();
screenControllerNav.createNewTodoList();
