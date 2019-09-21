import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import home from './components/Home.js'
import StoryDisplay from './components/StoryDisplay.js';
import StoryCreator from './components/StoryCreator.js';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header>
          <div class="logo"><Link to="/">StoryTree</Link></div>
      </header>
        <main>
          <Switch>
            <Route path="/story/:storyId/edit" component={StoryCreator}/>
            <Route path="/story/:storyId" component={StoryDisplay}/>
            <Route exact path="/" component={home} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
