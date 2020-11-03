import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import FavoriteApartments from './Pages/FavoriteApartments/FavoriteApartments';
import Homepage from './Pages/Homepage/Homepage';
import MyAds from './Pages/MyAds/MyAds';
import NewAd from './Pages/NewAd/NewAd';
import Profile from './Pages/Profile/Profile';
import Search from './Pages/Search/Search';
import SearchResult from './Pages/SearchResult/SearchResult';
import SingleApartment from './Pages/SingleApartment/SingleApartment';
import ActiveRegisterOrLogInContext from './providers/ActiveRegisterOrLogInContext';
import AuthContext, { extractUser, getToken } from './providers/AuthContext';
import SearchResultContext, { extractData } from './providers/SearchResultContext';
import SingleApartmentContext, { extractApartmentID } from './providers/SingleApartmentContext';

function App() {
  const [searchResult, setSearchResult] = useState({
    data: extractData()
  })

  const [activeCredentialsField, setActiveCredentialsField] = useState({
    active: ''
  })

  const [singleApartmentId, setSingleApartmentId] = useState({
    apartmentId: extractApartmentID()
  })

  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken())
  });

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}>
          <SearchResultContext.Provider value={{ ...searchResult, setDataState: setSearchResult }}>
            <ActiveRegisterOrLogInContext.Provider value={{ ...activeCredentialsField, setActiveState: setActiveCredentialsField }}>
              <SingleApartmentContext.Provider value={{ ...singleApartmentId, setApartmentId: setSingleApartmentId }}>
                <Header />
                <Switch>
                  <Redirect exact from="/" to="homepage" />
                  <Route path="/homepage" component={Homepage} />
                  <Route path="/search" component={Search} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/apartment" component={SingleApartment} />
                  <Route path="/apartments" component={SearchResult} />
                  <Route path="/favorite" component={FavoriteApartments} />
                  <Route path="/new_ad" component={NewAd} />
                  <Route path="/my_ads" component={MyAds} />
                </Switch>
              </SingleApartmentContext.Provider>
            </ActiveRegisterOrLogInContext.Provider>
          </SearchResultContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
