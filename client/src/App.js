import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import home from './components/Home.js'
import StoryDisplay from './components/StoryDisplay.js';
import StoryCreator from './components/StoryCreator.js';
import NewStory from './components/NewStory.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
          <div>[Logo]</div>
      </header>
      <Router>
        <Switch>
        <Route path="/story/:storyId/edit" component={StoryCreator}/>
          <Route path="/story/:storyId" component={StoryDisplay}/>
          <Route exact path="/" component={NewStory} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
