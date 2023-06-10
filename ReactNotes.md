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

## 4. Component lifecycle & useEffect

### 4.1 3 phases of component lifecycle:

- Mounting: when the component is created
- Updating: when the component is updated (props or state is changed)
- Unmounting: when the component is removed

### 4.2 useEffect

The `useEffect()` function is the most important hook in React. It is used to handle the component lifecycle.

```jsx
// will be called when the component is mounted, and every time the component is updated
useEffect(() => {
  console.log("Component mounted");
});

// put an array as the second argument, the function will be called when the component is mounted, and when the value of the array is changed

useEffect(() => {
  console.log("Component mounted");
}, []); // empty array means the function will only be called when the component is mounted

//for unmounting, we can return a function within the useEffect callback function, and the function will be called when the component is unmounted

useEffect(() => {
  console.log("Component mounted");
  return () => {
    console.log("Component unmounted");
  };
}, [text]);
```

## 5. Fetch data from API in React

### 5.1 The cat fact API

Fetch data with the `fetch()` function

```jsx
fetch("https://catfact.ninja/fact")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
```

A better way to fetch data is to use the `axios` library. It is a promise-based HTTP client for the browser and node.js. It is more powerful and easier to use than the `fetch()` function.

```jsx
import Axios from "axios";

Axios.get("https://catfact.ninja/fact").then((res) => {
  setCatFact(res.data.fact);
});
```

But axios will run again every time the component is updated, so will the `fetch()` function. To prevent this, we can use the `useEffect()` function.

```jsx
useEffect(() => {
  Axios.get("https://catfact.ninja/fact").then((res) => {
    setCatFact(res.data.fact);
  });
}, []);
```

The strict mode in React will run the component twice, so we remove the strict mode in the index.js file for now.

The whole example:

```jsx
function App() {
  const [catFact, setCatFact] = useState("");
  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });
  };
  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchCatFact}>Generate Cat Fact</button>
      <p>{catFact}</p>
    </div>
  );
}
```

### 5.2 A dynamiclly-changing API

We can fetch data from an API based on user input. For example, we can fetch data from the `https://api.agify.io/?name=${name}` API, and the API will return the age of the person with the name `name`.

```jsx
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const fetchAge = () => {
    Axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
      setAge(res.data.age);
    });
  };
  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={fetchAge}>Fetch Age</button>
      <p>{age}</p>
    </div>
  );
}
```

We can also fetch the data as objects

```jsx
const FetchData = () => {
  Axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
    setAge(res.data);
  });
};

// the question marks are used to prevent the error when the data is not fetched yet, it means only if the age is not null, then we can access the name, age and count properties
      <h1>Name: {age?.name}</h1>
      <h1>Predicted Age: {age?.age}</h1>
      <h1>Count: {age?.count}</h1>
```

### 5.3 Fetch data from the excuse API

- Pass the type of the excuse to the API, and the API will return an excuse of that type
- Beware of the data type of the response, it can be an array or an object

```jsx
function App() {
  const [excuse, setExcuse] = useState("");
  const fetchData = (type) => {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${type}/`).then(
      (res) => {
        setExcuse(res.data[0]);
      }
    );
  };
  return (
    <div className="App">
      <h1>Generate An Excuse</h1>
      <button onClick={() => fetchData("party")}>Party</button>
      <button onClick={() => fetchData("family")}>Family</button>
      <button onClick={() => fetchData("office")}>Office</button>
      <p>Excuse: {excuse.excuse}</p>
    </div>
  );
}
```

## 6. Routes in React

In react, we only have one html file, so we need to use routes to navigate to different pages. We can use the `react-router-dom` library to create routes.

### 6.1 the router library & router, routes and route

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Router>;
```

### 6.2 Router for Navigation

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

<Router>
  NAVBAR
  <Link to="/">Home</Link>
  <Link to="/menu">About</Link>
  <Link to="/contact">Contact</Link>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Router>;
```

or we can isolate the navbar into a component

```jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/menu">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Router>;
```

## 7. State Management in React & Usecontext hook

### 6.1 Prop drilling: passing props from parent to child to child to child, which is not efficient.

```jsx
const TopComponent = (state) => {
  const [state, setState] = useState("");
  return (
    <div>
      <MiddleComponent />
    </div>
  );
};

const MiddleComponent = (state) => {
  return (
    <div>
      <BottomComponent />
    </div>
  );
};

const BottomComponent = (state) => {
  return <div>{state}</div>;
};
```

A more practical example: pass username from App to Profile to ChangeProfile: we are passing the `username` with props all the way down to the `ChangeProfile` component, which is not efficient.

```jsx
// in App.js
<Route
  path="/profile"
  element={<Profile username={username} setUsername={setUsername} />}
/>;

// in Profile.js
export const Profile = (props) => {
  return (
    <div>
      <h1>PROFILE</h1>
      <p>Username: {props.username}</p>
      <ChangeProfile setUsername={props.setUsername} />
    </div>
  );
};

// in ChangeProfile.js
export const ChangeProfile = (props) => {
  const [newUsername, setNewUsername] = useState("");
  return (
    <div>
      <input
        onChange={(event) => {
          setNewUsername(event.target.value);
        }}
      />
      <button onClick={() => props.setUsername(newUsername)}>
        Change Username
      </button>
    </div>
  );
};
```

### 6.2 Usecontext hook: a better way to pass props

We can pass not only the varianle, also the function to change the variable

- Import the hook

```jsx
import { createContext } from "react";
export const UserContext = createContext();
// add the <AppContext.Provider > tag outside the <Router> tag
<UserContext.Provider value={{ username, setUsername }}>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
</UserContext.Provider>;

// in Profile.js
import { useContext } from "react";
import { AppContext } from "../App";

export const Profile = () => {
  const { username } = useContext(AppContext);
  return (
    <div>
      <h1>PROFILE</h1>
      <p>Username: {username}</p>
      <ChangeProfile />
    </div>
  );
};

// in ChangeProfile.js

import { useContext, useState } from "react";
import { AppContext } from "../App";
export const ChangeProfile = () => {
  const { setUsername } = useContext(AppContext);
  const [newUsername, setNewUsername] = useState("");
  return (
    <div>
      <input
        onChange={(event) => {
          setNewUsername(event.target.value);
        }}
      />
      <button onClick={() => setUsername(newUsername)}>Change Username</button>
    </div>
  );
};
```

We only pass props when it's necessary.

## 7. Fetch data with React Query

Fetch data with useEffect is not our best choice: it will fetch the data every time the component is rendered. We can use React Query to fetch data.

### 7.1 Install React Query

```bash
npm install @tanstack/react-query
```

### 7.2 Fetch data with React Query

```jsx
// in App.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

<QueryClientProvider client={client}>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
</QueryClientProvider>;

// in Home.js (the component that needs to fetch data)
import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";

export const Home = () => {
  // useQuery takes two arguments: the first one is the key(which is the name of the query), the second one is the function that fetches and return the data
  // isLoading is a boolean that tells us if the data is loading, it's built in the useQuery hook, we can use it to handle the loading state
  // isError is a boolean that tells us if there is an error, it's built in the useQuery hook, we can use it to handle the error state
  // refetch is a function that refetches the data when it's called, we can have the data refreshed with this without having a state to store the data

  // we can also rename the data, isLoading, isError, refetch
  const {
    data: catData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["cat"], () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isLoading) {
    return <h1> Loading...</h1>;
  }
  return (
    <h1>
      Hi, <p>{catData?.fact}</p>
    </h1>
  );
};
```

By default, the data will be refetched every time we go back to the page. We can change this behavior by adding `staleTime` to the useQuery hook.

```jsx
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // disable refetch on window focus, this is by default true
    },
  },
});
```

## 8. Forms in React

Install the libraries

```bash
npm install react-hook-form yup @hookform/resolvers
```

Refer to Form.js for the code.

## 9. Custom Hooks

What is a hook? A function that starts with `use` and can only be called inside a component, which allows us to abstract the logic and reuse it.We can create our own custom hooks to reuse our code.

### 9.1 Rules

- It must start with `use` with lower case
- It can only be called inside a component, and cannot be called inside a function, aka, the highest level of the component
- It can call and be called by other hooks

### 9.2 Our own useToggle hook

```jsx
// in useToggle.js
import { useState } from "react";

export const useToggle = (initialVal = false) => {
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setValue(!value);
  };
  // export as an array, so that when you import it, you can name it whatever you want
  // if you export it as an object, you can set the name by using const{state: isVisable, toggle: setisVisable} = useToggle(), but more complicated
  return [state, toggle];
};

// in App.js

import { useToggle } from "./useToggle";

const [isVisable, setisVisable] = useToggle();

function App() {
  const [state, toggle] = useToggle();

  return (
    <div className="App">
      <button onClick={toggle}>{state ? "Hide" : "Show"}</button>
      {state && <h1>HI!</h1>}
    </div>
  );
}
```

### 9.3 A good use case of custom hook

We want to abstract Cat.js even more, so isolate the API fetch logic into a custom hook.

```jsx
// in useGetCat.js
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
export const useGetCat = () => {
  const {
    data,
    refetch,
    isLoading: isCatLoading,
    error,
  } = useQuery(["cat"], async () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  const refetchData = () => {
    alert("data refetched!");
    refetch();
  };

  return { data, refetchData, isCatLoading };
};

// in Cat.js
import { useGetCat } from "../useGetCat";
export const Cat = () => {
  const { data, isCatLoading, refetchData } = useGetCat();
  if (isCatLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>{data?.fact}</h1>
      <button onClick={refetchData}>Refetch</button>
    </div>
  );
};
```

## 9. Typescript and type safety

### 9.1 Prop-types

When we pass props to a component, we can use typescript to make sure the props are the right type.

```bash
npm install prop-types
```

```jsx
import PropTypes from "prop-types";

Person.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.number,
  isMarried: PropTypes.bool,
  friends: PropTypes.arrayOf(PropTypes.string),
};
```

When we're passing invalid props, we will get a warning in the console (instead of have our app crash), which will help us debug.

### 9.2 Integrate Typescript into React

Unlike prop-types, typescript will crash the app when we pass invalid props, so we need to make sure we pass the right props: that's why typescript is called "type safety".

```bash
npx create-react-app . --template typescript
```

In typescript, component files are .tsx files. In typescript, we should better define the type of variables. If not, we have an implicit type of `any`, which is not good.

- For a variable, we can define the type like this:

  ```tsx
  const name: string = "John";
  //or
  {
    props.friends.map((friend: string) => <h1>{friend}</h1>);
  }
  ```

- While for objects like props, we need to define an interface:

  ```tsx
  interface Props {
    name: string;
    email: string;
    age: number;
    isMarried: boolean;
    friends: string[];

  }

  export const Person = (props: Props) => {
  ```

- We can also define the type of the state:

  ```tsx
  import { useState } from "react";
  const [name, setName] = useState<string>("");
  ```

- We can make some of the props optional by adding a question mark. without it, the props are required by default

  ```tsx
  country?: string;
  ```

- We can limit the possible values of a variable with enum

  ```tsx
  // this limited the possible values of country to USA, CANADA, UK
  country: Country;

  enum Country {
    USA = "USA",
    CANADA = "CANADA",
    UK = "UK",
  }
  ```

- And we can specify type of parameter and return value in a function like this:

  ```tsx
  const add = (a: number, b: number): number => {
    return a + b;
  };
  ```
