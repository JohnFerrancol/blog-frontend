import { useState } from 'react';
import './styles/App.css';
import Component from './components/Component';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex justify-center">
      <h1 className="text-3xl font-bold">{count}</h1>
      <Component handleClick={handleClick} />
    </div>
  );
}

export default App;
