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
import CurrentBookings from "./components/BookingsPages/CurrentBookings";
import CreateBooking from "./components/BookingsPages/CreateBooking";
// import SpotsDetailsReviewsState from "./components/StateHandling/SpotsDetailsReviewsState";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          {/* <Route exact path='/spots/:spotId/reviews'>
          <SpotsDetailsReviewsState />
          </Route> */}
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
          <Route exact path='/bookings/current'>
            <CurrentBookings />
          </Route>
          <Route exact path='/bookings/reserve/:spotId'>
            <CreateBooking />
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
