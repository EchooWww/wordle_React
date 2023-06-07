# React Beginner Course

## 1. Introduction to React

### 1.0 Create a React App

Inside the project folder, run the following commands:

```bash
npx create-react-app # project name or dot after it
```

To run the project:

```bash
npm start
```

### 1.1 Folder structure:

- public folder: static files including an html file (we're not creating html files when creating react apps, our app will exist inside the div with id root)
- src folder: all the code we write will be inside this folder
  - index.js: the entry point of our app
  - App.js: the main component of our app
- Create new file for components: add the `export` keyword before the function name, and import the component in the App.js file like `import { User } from "./User";`

### 1.2 index.js and JSX Syntax

Looks like a JavaScript function returns a div with a class of App. This is the JSX syntax, it allows us to render HTML elements inside JavaScript.

```jsx
function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
```

With jsx, we can actually write JavaScript inside the html tags. For example, we can write a variable inside the h1 tag, with the {}:

```jsx
function App() {
  const greeting = "Hello World";
  return (
    <div className="App">
      <h1>{greeting}</h1>
    </div>
  );
}
```

or we can include the element tags inside a variable:

```jsx
function App() {
  const greeting = <h1> Hello World </h1>;
  return <div className="App">{greeting}</div>;
}
```

If the div takes up more than one line, we need to wrap it in parentheses:

```jsx
const user = (
  <div>
    {name}
    {age}
    {email}
  </div>
);
return <div className="App">{user}</div>;
```

The difference between plain JavaScript and JSX is that we can only return UI element in JSX:

```jsx
const GetName = () => {
  return "Echo";
};

const GetNameComponent = () => {
  return <h1>Echo</h1>;
};
```

### 1.3 How to "call" a component?

We can call a component by using the component name as a self-closing tag:

```jsx
function App() {
  return (
    <div className="App">
      <User />
    </div>
  ); // Instead of using {User}
}

const User = () => {
  return (
    <div>
      <h1>Echo</h1>
      <h2>27</h2>
      <h2>ywang623@my.bcit.ca</h2>
    </div>
  );
};
```

### 1.4 Props in React

- In React, we don't user arguments as JS to pass data to the components, we use props instead. Props are like attributes in HTML, we can pass data when calling the component.

- Also, when passing info with props, we need to use {} to wrap the props (except for strings):

```jsx
function App() {
  return (
    <div className="App">
      <User name="Echo" age={27} email="ywang623@my.bcit.ca" />
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.age}</h2>
      <h2>{props.email}</h2>
    </div>
  );
};
```

### 1.5 Import css to React

CSS module stylesheet: can be imported with the code `import styles from "./App.module.css";` and used with the code `className={styles.App}`

#### Inline CSS syntax

- We can also use inline CSS syntax in React, but we need to use the camelCase instead of the dash-case. E.g., `background-color` becomes `backgroundColor`
- And we need to wrap the style in double curly braces
- Also, for the value of the style, we need to use double quotes.

```jsx
<h1 style={{ color: "red" }}>THIS HAS COLOR</h1>
```

### 1.6 Conditional rendering in React

#### Ternary operator

remember to include the whole statement within {}, instead of just the variable name:

```jsx
function App() {
  const age = 15;
  return (
    <div className="App">
      {age >= 18 ? <h1>Over age</h1> : <h1>Under age</h1>}
    </div>
  );
}
```

No more brakets added to inline css if using ternary operator:

```jsx
<h1 style={{ color: isGreen ? "green" : "red" }}>THIS HAS COLOR</h1>
```

#### && operator (short circuit evaluation can be used as if statement)

```jsx
{
  isGreen && <button>Green</button>;
}
```

Another example (note that the JS syntax allows us to omit the return keyword and the bracket of function body if we only have one line of code in the function):

```jsx
function App() {
  const planets = [
    { name: "Mars", isGasPlanet: false },
    { name: "Earth", isGasPlanet: false },
    { name: "Jupiter", isGasPlanet: true },
    { name: "Venus", isGasPlanet: false },
    { name: "Neptune", isGasPlanet: true },
    { name: "Uranus", isGasPlanet: true },
  ];
  return (
    <div className="App">
      {planets.map(
        (planet, key) => planet.isGasPlanet && <h1 key={key}>{planet.name}</h1>
      )}
    </div>
  );
}
```

### 1.7 Lists in React

#### Loop through the array

- We can use the map function to loops through the array and return a list of elements.
- The map function: takes a callback as an argument, and the callback takes two arguments: the element and the index(key) of the element(value)
- One thing to note is that we need to add a key attribute to the element, otherwise React will throw an error.

```jsx
function App() {
  const names = ["Echo", "Dapang", "Ermao", "Pyj"];
  return (
    <div className="App">
      {names.map((value, key) => {
        return <h1 key={key}>{value} </h1>;
      })}
    </div>
  );
}
```

#### Access the fields of objects in an array

```jsx
unction App() {
  const users = [
    { name: "Echo", age: 27 },
    { name: "Pyj", age: 30 },
  ];
  return (
    <div className="App">
      {users.map((user, key) => {
        return (
            <h1 key={key}>{user.name} {user.age}</h1>
        );
      })}
    </div>
  );
}

//can isolate User as a component:

function App() {
  const users = [
    { name: "Echo", age: 27 },
    { name: "Pyj", age: 30 },
  ];
  return (
    <div className="App">
      {users.map((user, key) => {
        return <User name={user.name} age={user.age} />;
      })}
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      {props.name} {props.age}
    </div>
  );
};
```

## 2. State in React

## 2.1 Basics of state

We start to deal with events in react.

- The event names are camelCase, instead of lowercase in HTML, like `onClick` instead of `onclick`

- React will only render the UI components once: we need to use state to update the UI.

```jsx
import { useState } from "react";

function App() {
  const [age, setAge] = useState(0);
  //useState returns an array with two elements: the state and the function to update the state, the initial value is 0
  // useState will check if the state has been changed, and if it has been changed, it will re-render the UI
  const increaseAge = () => {
    setAge(age + 1); //we need to use the function to update the state, instead of using age = age + 1
  };

  return (
    <div className="App">
      {age}
      <button onClick={increaseAge}>Increase Age</button>
    </div>
  );
}
```

### 2.2 useState with events

Another example to use state: to grab the input from `event.target.value` and display it on the screen. In this case, the `event` is the `onChange` event of the input element.

```jsx
import { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="App">
      <input type="text" onChange={handleInputChange} />
      {inputValue}
    </div>
  );
}
```

### 2.3 useState to toggle the state

```jsx
import { useState } from "react";
function App() {
  const [showStatus, setShowStatus] = useState(true);

  return (
    <div className="App">
      <button
        onClick={() => {
          if (!showStatus) setShowStatus(true);
          else setShowStatus(false);
        }} // can be written as anonymous function here
      >
        Show/Hide
      </button>
      {showStatus && <h1>MY NAME IS ECHO</h1>}
    </div>
  );
}
```

### 2.4 useState as the value of attribute

```jsx
import { useState } from "react";
function App() {
  const [textColor, setTextColor] = useState("black");

  return (
    <div className="App">
      <button
        onClick={() => {
          setTextColor(textColor == "black" ? "green" : "black");
        }}
      >
        Show/Hide
      </button>
      <h1 style={{ color: textColor }}>MY NAME IS ECHO</h1>
    </div>
  );
}
```

## 3. CRUD in React: build a simple todo list

### 3.1 Manipulate the array

- Array.push() doesn't work with states, because it just mutate the array, instead of the state. Instead, we should set the state to a new array, which is the old array plus the new element.

  ```jsx
  <button
    onClick={() => {
      setTodoList([...todoList, newTask]);
    }}
  >
  ```

- Special syntax: when passing a parameter to a function called within an element, we should use the arrow function to pass the parameter, instead of using the function name directly. For example, we can use `onClick={() => deleteTask(task)}` instead of `onClick={deleteTask(task)}`

- The filter() function: takes a callback as an argument, and the callback takes an element as an argument. If the callback returns true, the element will be kept in the new array, otherwise it will be removed from the new array.

  ```jsx
  const deleteTask = (task) => {
    setTodoList(todoList.filter((element) => element !== task));
  };
  ```

- The issue is, we delete the task by comparing the task name, which is not a good idea, because the task name can be the same. So we modify the array to be an array of objects, and each object has a unique id.

  ```jsx
  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
    };
    setTodoList([...todoList, task]);
  };

  const handleDelete = (itemToDelete) => {
    setTodoList(todoList.filter((item) => item.id !== itemToDelete.id));
  };
  ```

### 3.2 Isolate the components

When isolating the components, we can even pass functions as props to the child component.

```jsx
<div className="list">
  {todoList.map((item) => {
    return (
      <Task taskName={item.taskName} id={item.id} handleDelete={handleDelete} />
    );
  })}
</div>;

export const Task = (props) => {
  <div className="items">
    <label>
      <input type="checkbox" />
      {props.taskName}
    </label>
    <button onClick={() => props.handleDelete(props.id)}>X</button>
  </div>;
};
```

### 3.3 Change the background color of the task based on complete status

Even if we don't have a separate usestate for the complete status, as we use the `setTodoList()` function to update the todoList, the UI will be updated automatically.

```jsx
const updateTask = (id) => {
  setTodoList(
    todoList.map((task) => {
      if (task.id === id) return { ...task, completed: true };
      else {
        return task;
      }
    })
  );
};
```
