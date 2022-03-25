import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import './App.css';
import {IBigInterface, ISubInterface} from "../../interfaces/example";

function App() {
  const usefulSubConstant: ISubInterface = {
    subProperty1: 1,
    subProperty2: "A test string",
    subProperty3: "this can be any type of variable"
  };
  const usefulConstant: IBigInterface = {
    property1: usefulSubConstant,
    property2: []
  };

  useEffect(() => {
    console.log(usefulConstant?.property1?.subProperty2);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
