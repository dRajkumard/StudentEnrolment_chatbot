import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Chatbot from './components/chatbot/chatbot';
import ConfirmationPage from './components/conformation';
import HomePage from './components/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>
          <Route path="/confirmation" element={<ConfirmationPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
