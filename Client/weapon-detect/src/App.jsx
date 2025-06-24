import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import React Router
import Header from "./components/Header/Header"; // Your header component
import Home from "./components/Home/Home"; // Your home page
import Services from "./components/services/services"; // Your services page
import Contact from "./components/Contact/contact"; // Your contact page
import About from "./components/About/About"; // Your about page
import Footer from "./components/Footer/Footer"; // Your footer component
import Login from "./components/Login/login"; // Your login page
import SignUp from "./components/SignUp/SignUp"; // Your sign-up page
import Dashboard from "./components/Dashboard/Dashboard"; // Admin dashboard component
import UserDashboard from "./components/UserDashboard/UserDashboard"; // User dashboard component

const App = () => {
  // Manage authentication state and role
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow overflow-y-auto">
          <Routes>
            {/* Default route for everything except /login and /signup */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Services />
                  <Contact />
                </>
              }
            />

            {/* Route for /login */}
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />

            {/* Route for /signup */}
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Route for /dashboard */}
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard/>
                ) : (
                  <Navigate to="/login" replace /> // Redirect to login if not logged in
                )
              }
            />

            <Route
              path="/user-dashboard"
              element={
                isLoggedIn ? (
                  <UserDashboard/>
                ) : (
                  <Navigate to="/login" replace /> // Redirect to login if not logged in
                )
              }
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
