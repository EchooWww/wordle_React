import React from "react";
import "./App.css";
import { Country, Person } from "./components/Person";
function App() {
  const getAge = (name: string): number => {
    return 99;
  };
  return (
    <div className="App">
      <Person
        name="Echo"
        email="echoooo1996@gmail.com"
        age={27}
        isMarried={false}
        friends={["Dapang", "ermao"]}
        country={Country.China}
      />
    </div>
  );
}

export default App;
