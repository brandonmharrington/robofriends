import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import './App.css';

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchfield: '',
  //   };
  // }

  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [count, setCount] = useState(0);

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ robots: users }));
  // }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
    console.log(count);
  }, [count]); // only run if count changes

  const onSearchChange = e => {
    setSearchField(e.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f2">RoboFriends</h1>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
      <SearchBox searchchange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
