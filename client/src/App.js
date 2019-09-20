import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StoryDisplay from './components/StoryDisplay.js';
import StoryCreator from './components/StoryCreator.js';
import NewStory from './components/NewStory.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/story/:storyId" component={StoryDisplay}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
