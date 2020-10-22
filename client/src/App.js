import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import FavoriteApartments from './Pages/FavoriteApartments/FavoriteApartments';
import Homepage from './Pages/Homepage/Homepage';
import NewAd from './Pages/NewAd/NewAd';
import Search from './Pages/Search/Search';
import SearchResult from './Pages/SearchResult/SearchResult';
import SearchResultContext, { extractData } from './providers/SearchResultContext';

function App() {
  const [searchResult, setSearchResult] = useState({
    data: extractData()
  })

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
            <Route path="/favorite" component={FavoriteApartments} />
            <Route path="/new_ad" component={NewAd} />
          </Switch>
        </SearchResultContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
