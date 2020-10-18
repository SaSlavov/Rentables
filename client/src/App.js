import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import Search from './Pages/Search/Search';
import SearchResult from './Pages/SearchResult/SearchResult';
import SearchResultContext from './providers/SearchResultContext';

function App() {
  const [searchResult, setSearchResult] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <SearchResultContext.Provider value={{...searchResult, setDataState: setSearchResult}}>
          <Header />
          <Switch>
            <Redirect exact from="/" to="homepage" />
            <Route path="/homepage" component={Homepage} />
            <Route path="/search" component={Search} />
            <Route path="/apartments" component={SearchResult} />
          </Switch>
        </SearchResultContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
