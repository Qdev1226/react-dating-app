import React from "react";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chat from "./page/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./page/Profile";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route
              exact
              path='/signup'
              element={<AuthRoute Component={Signup} />}
            />
            <Route
              exact
              path='/login'
              element={<AuthRoute Component={Login} />}
            />
            <Route
              exact
              path='/profile'
              element={<ProtectedRoute Component={Profile} />}
            />
            <Route
              exact
              path='/'
              element={<ProtectedRoute Component={Chat} />}
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
