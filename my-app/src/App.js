import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/" to="homepage" />
          <Route path="/homepage" component={Homepage} />
          <Route path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
