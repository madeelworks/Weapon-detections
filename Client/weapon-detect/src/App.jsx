import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import Header from './components/Header/Header';  // Header component
import Home from './components/Home/Home';  // Home page
import Services from './components/services/services';
import Contact from './components/Contact/contact';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Header stays fixed at the top */}
        <Header />

        {/* Main content area */}
        <main className="flex-grow overflow-y-auto ">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page route */}
          
            <Route path="/Services" element={<Services />} /> {/* Contact page route */}
            <Route path="/contact" element={<Contact />} /> {/* Home page route */}

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
