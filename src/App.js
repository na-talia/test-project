import React, { useState } from "react";
import Counter from "./components/Counter";

function App() {
  const [value, setValue] = useState("Text in input");

  return (
    <div className="App">
      <Counter />
      <h2>{value}</h2>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default App;
