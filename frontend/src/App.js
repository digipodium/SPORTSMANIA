import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin";
import Main from "./components/main";
import Login from "./components/main/Login";
import Register from "./components/main/Register";
import CreateGame from "./components/user/CreateGame";
import ManageTournament from "./components/user/ManageTournament";
import ManagePlayer from "./components/user/ManagePlayer";
import Home from "./components/main/Home";
import UserAuth from "./auth/UserAuth";
import User from "./components/user";
import AdminAuth from "./auth/AdminAuth";
import AdminProvider from "./context/AdminProvider";
import UserProvider from "./context/UserProvider";
import UserProfile from "./components/user/UserProfile";
import CreateTournament from "./components/user/CreateTournament";
import { useState } from "react";
import {Toaster} from 'react-hot-toast';

function App() {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [currentAdmin, setCurrentAdmin] = useState(JSON.parse(sessionStorage.getItem('admin')));

  return (
    <div>
      <BrowserRouter>
      <Toaster position="top-right" />
        <AdminProvider currentAdmin={currentAdmin}>
          <UserProvider currentUser={currentUser}>
            <Routes>
              <Route path="/" element={<Navigate to="/main/home" />} />
              <Route
                path="admin"
                element={
                  <AdminAuth>
                    <Admin />
                  </AdminAuth>
                }
              >
                {/* <Route path='managegames' element={<ManageGames />}  /> */}
              </Route>
              <Route
                path="user"
                element={
                  <UserAuth>
                    <User />
                  </UserAuth>
                }
              >
                <Route path="creategame" element={<CreateGame />} />
                <Route path="createtournament" element={<CreateTournament />} />
                <Route path="profile" element={<UserProfile />} />
                <Route
                  path="managetournament"
                  element={<ManageTournament />}
                />
                <Route path="manageplayer" element={<ManagePlayer />} />
              </Route>
              <Route path="main" element={<Main />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="home" element={<Home />} />
              </Route>
            </Routes>
          </UserProvider>
        </AdminProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
