import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Console from "./components/console"
import LoginPage from "./components/login";
import ExplorePage from "./components/explore";
import Terms from "./components/terms";
import Policy from "./components/policy";
import Contact from "./components/contact";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Content with Routing */}
        <main className="pt-20 p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/console" element={<Console />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
