import React, { useState } from 'react';
import StaticTree from './components/StaticTree';
import TraversalAnimation from './components/TraversalAnimation';

function App() {
  const [traversalType, setTraversalType] = useState('preorder');
  const [animate, setAnimate] = useState(false);

  const handleTraversalChange = (e) => {
    setTraversalType(e.target.value);
  };

  const startAnimation = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 0); 
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center transition-transform hover:text-blue-600">
          Binary Tree
        </h2>
        <StaticTree />
      </div>

      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center transition-transform hover:text-blue-600">
          Traversal Animation
        </h2>
        <div className="mb-4">
          <label htmlFor="traversal" className="block text-gray-700 mb-2 font-medium">Choose Traversal Type</label>
          <select
            id="traversal"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleTraversalChange}
            value={traversalType}
          >
            <option value="preorder">Preorder</option>
            <option value="inorder">Inorder</option>
            <option value="postorder">Postorder</option>
          </select>
        </div>
        <button
          onClick={startAnimation}
          className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Start Animation
        </button>
        <div className="mt-6">
          <TraversalAnimation traversalType={traversalType} animate={animate} />
        </div>
      </div>
    </div>
  );
}

export default App;