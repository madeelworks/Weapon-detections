import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom"; // Import useLocation
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Services from "./components/services/services";
import Contact from "./components/Contact/contact";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard"; 
import AdminDashboard from "./components/AdminDashboard/Dashboard"; // Admin dashboard
import UserDashboard from "./components/UserDashboard/UserDashboard"; // User dashboard
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Users from "./components/Users/Users";
import Alerts from "./components/Alerts/Alerts";
import EditProfile from "./components/EditProfile/EditProfile";
import UserDash from "./components/UserDash/UserDash";
import Streaming from "./components/Streaming/Streaming";
import Acknowledge from "./components/Acknowledge/Acknowledge";
import History from "./components/History/History";
import SuspiciousActivity from "./components/SuspiciousActivity/SuspiciousActivity";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

// Wrapper component to use useLocation
const AppWrapper = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);
  const handleAdminLogout = () => setIsAdminLoggedIn(false);

  // Determine if header/footer should be hidden (for both dashboards)
  const hideHeaderFooter = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/UserDashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally hide Header and Footer for /Dashboard and /UserDashboard */}
      {!hideHeaderFooter && <Header />}

      <main className="flex-grow overflow-y-auto">
        <Routes>
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
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:id/:token" element={<ResetPassword />} />

          {/* Protected User Dashboard with nested routes for EditProfile and Alerts */}
    

              <Route
            path="/UserDashboard"
            element={isLoggedIn ? <UserDashboard handleLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route path="/UserDashboard/UserDash" element={<UserDash />} />
            <Route path="/UserDashboard/EditProfile" element={<EditProfile />} />
            <Route path="/UserDashboard/Streaming" element={<Streaming />} />
            <Route path="/UserDashboard/alerts" element={<Alerts />} />
            <Route path="/UserDashboard/acknowledge" element={<Acknowledge />} />
            <Route path="/UserDashboard/history" element={<History />} />
            <Route path="/UserDashboard/report" element={<SuspiciousActivity />} />

          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />

          {/* Protected Admin Dashboard */}
          <Route
            path="/dashboard"
            element={isAdminLoggedIn ? <Dashboard handleLogout={handleAdminLogout} /> : <Navigate to="/admin/login" replace />}
          >
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/alerts" element={<Alerts />} />
            {/* Default Route */}
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>

      {/* Conditionally hide Footer for /Dashboard and /UserDashboard */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
























// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import React Router
// import Header from "./components/Header/Header"; // Your header component
// import Home from "./components/Home/Home"; // Your home page
// import Services from "./components/services/services"; // Your services page
// import Contact from "./components/Contact/contact"; // Your contact page
// import About from "./components/About/About"; // Your about page
// import Footer from "./components/Footer/Footer"; // Your footer component
// import Login from "./components/Login/login"; // Your login page
// import SignUp from "./components/SignUp/SignUp"; // Your sign-up page
// import Dashboard from "./components/Dashboard/Dashboard"; // Admin dashboard component
// import UserDashboard from "./components/UserDashboard/UserDashboard"; // User dashboard component
// import AdminLogin from "./components/AdminLogin/AdminLogin"; // Admin login page
// // import AdminDashboard from "./components/Dashboard/Dashboard"; // Admin dashboard component



// const App = () => {
//   // Manage authentication state and role
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // State for admin login

// const handleLogout = () => {
//   setIsLoggedIn(false);
//   console.log("logout");

// };


//   const handleAdminLogout = () => {
//     setIsAdminLoggedIn(false);
//   };
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />

//         <main className="flex-grow overflow-y-auto">
//           <Routes>
//             {/* Default route for everything except /login and /signup */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Home />
//                   <About />
//                   <Services />
//                   <Contact />
//                 </>
//               }
//             />

//             {/* Route for /login */}
//             <Route
//               path="/login"
//               element={<Login setIsLoggedIn={setIsLoggedIn} />} // Passing setIsLoggedIn to Login component
//             />

//             {/* Route for /signup */}
//             <Route path="/signup" element={<SignUp />} />

//             {/* Protected Route for /dashboard */}
//             <Route
//             path="/UserDashboard"
//               element={
//                 isLoggedIn ? (
//                   <UserDashboard handleLogout={handleLogout}/>
//                 ) : (
//                   <Navigate to="/login" replace /> // Redirect to login if not logged in
//                 )
//               }
//             />




//   <Route
//               path="/admin/login"
//               element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
//             />

// <Route
//               path="/Dashboard"
//               element={
//                 isAdminLoggedIn ? (
//                   <Dashboard handleLogout={handleAdminLogout} />
                  
//                 ) : (
//                   <Navigate to="/admin/login" replace />
//                 )
//               }
//             />


            
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;


















// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import React Router
// import Header from "./components/Header/Header"; // Your header component
// import Home from "./components/Home/Home"; // Your home page
// import About from "./components/About/About"; // Your about page
// import Services from "./components/Services/Services"; // Your services page
// import Contact from "./components/Contact/Contact"; // Your contact page
// import Footer from "./components/Footer/Footer"; // Your footer component
// import Login from "./components/Login/Login"; // Your login page
// import SignUp from "./components/SignUp/SignUp"; // Your sign-up page
// import UserDashboard from "./components/UserDashboard/UserDashboard"; // User dashboard component
// import AdminLogin from "./components/AdminLogin/AdminLogin"; // Admin login page
// import AdminDashboard from "./components/Dashboard/Dashboard"; // Admin dashboard component

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // State for admin login

//   const handleUserLogout = () => {
//     setIsLoggedIn(false);
//   };

//   const handleAdminLogout = () => {
//     setIsAdminLoggedIn(false);
//   };

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />

//         <main className="flex-grow overflow-y-auto">
//           <Routes>
//             {/* Route for /home */}
//             <Route path="/" element={<Home />} />

//             {/* Route for /about */}
//             <Route path="/about" element={<About />} />

//             {/* Route for /services */}
//             <Route path="/services" element={<Services />} />

//             {/* Route for /contact */}
//             <Route path="/contact" element={<Contact />} />

//             {/* Route for /login */}
//             <Route
//               path="/login"
//               element={<Login setIsLoggedIn={setIsLoggedIn} />}
//             />

//             {/* Route for /signup */}
//             <Route path="/signup" element={<SignUp />} />

//             {/* Protected Route for User Dashboard */}
//             <Route
//               path="/user-dashboard"
//               element={
//                 isLoggedIn ? (
//                   <UserDashboard handleLogout={handleUserLogout} />
//                 ) : (
//                   <Navigate to="/login" replace />
//                 )
//               }
//             />

//             {/* Admin Login Route */}
//             <Route
//               path="/admin/login"
//               element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
//             />

//             {/* Protected Route for Admin Dashboard */}
//             <Route
//               path="/admin/dashboard"
//               element={
//                 isAdminLoggedIn ? (
//                   <AdminDashboard handleLogout={handleAdminLogout} />
//                 ) : (
//                   <Navigate to="/admin/login" replace />
//                 )
//               }
//             />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;













