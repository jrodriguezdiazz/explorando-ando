import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import MainComponent from './MainComponent';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div>This is a multicontainer application</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other page</Link>
          </nav>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={ MainComponent } />
            <Route path="/otherpage" component={ OtherPage } />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
