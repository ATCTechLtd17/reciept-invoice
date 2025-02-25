
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReceiptForm from './components/ReceiptForm';
import ReceiptHistory from './components/ReceiptHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ReceiptForm />} />
            <Route path="/history" element={<ReceiptHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;