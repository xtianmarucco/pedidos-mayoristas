// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the App</h1>
      <div className="space-x-4">
        <Link to="/customer" className="px-4 py-2 bg-blue-500 text-white rounded">
          Customer Page
        </Link>
        <Link to="/admin" className="px-4 py-2 bg-green-500 text-white rounded">
          Admin Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
