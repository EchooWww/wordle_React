import "./App.css";
import { Person } from "./components/Person";
function App() {
  return (
    <div className="App">
      <Person
        name={9}
        email="echoooo1996@gmail.com"
        age={27}
        isMarrie={false}
        friends={["Dapang", "ermao"]}
      />
    </div>
  );
}

export default App;
