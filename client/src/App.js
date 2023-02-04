import React, { useMemo, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getMode } from "./store";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import HomePage from "./scenes/homepage/Index";
import AuthOptions from "./scenes/Auth/AuthOptions";
import ManualAuth from "./scenes/Auth/ManualAuth";
import ProfilePage from "./scenes/profilePage/Index";
import MyProfile from "./scenes/profilePage/MyProfile";
import Success from "./scenes/Auth/AfterAuth/Success";
import { setLogin } from "./store/index";

function App() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const state = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));
  useEffect(() => {
    fetch("http://localhost:8000/isAuth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuth) {
          return setIsAuth(state.user && state.token ? true : false);
        }
        setIsAuth(data.isAuth);
        dispatch(setLogin({ user: data.user, token: null }));
        console.log(data, "........data.....");
      });
  }, [isAuth]);

  const mode = useSelector(getMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/auth"
            element={!isAuth ? <AuthOptions /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
          />

          <Route
            path="/auth/manual"
            element={isAuth ? <Navigate to="/" /> : <ManualAuth />}
          />
          <Route
            path="/my-profile/"
            element={isAuth ? <MyProfile /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />}
          />
          <Route path="/auth/success" element={<Success />} />
          <Route />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
