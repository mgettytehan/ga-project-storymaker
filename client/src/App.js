import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import StoryList from './components/StoryList.js';
import StoryDisplay from './components/StoryDisplay.js';
import StoryCreator from './components/StoryCreator.js';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header>
          <div className="logo"><Link to="/">StoryTree</Link></div>
      </header>
        <main>
          <Switch>
            <Route path="/story/:storyId/edit" component={StoryCreator}/>
            <Route path="/story/:storyId" component={StoryDisplay}/>
            <Route path="/stories" component={StoryList}/>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
