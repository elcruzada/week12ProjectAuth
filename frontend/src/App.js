import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal/SignupFormModal";
import SpotsHomePage from "./components/SpotsPages/SpotsHomePage";
import SpotsDetails from "./components/SpotsPages/SpotsDetails";
import ManageSpots from "./components/SpotsPages/ManageSpots";
import CreateSpot from "./components/SpotsPages/CreateSpot";
import UpdateSpot from "./components/SpotsPages/UpdateSpot";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <h1>Mybnb rules</h1>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path='/'>
            <SpotsHomePage />
          </Route>
          <Route exact path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotsDetails />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route exact path='/login'>
            <LoginFormModal />
          </Route>
          <Route exact path="/signup">
            <SignupFormModal />
          </Route>
        </Switch>
      </>
    )
  )
}

export default App;
