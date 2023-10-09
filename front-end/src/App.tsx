import { useState } from 'react';
import Burner from './components/Burner';
import Connect from './connect/Connect';
import Marquis from './components/Marquis';
import API from './components/API';
import Call from './connect/Call';
import Events from './connect/Events';

// import Simple from './connect/Simple';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  
  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
  };

  return (
    <div className="App">
      <h1>The Marquis</h1>
      
        <Connect onConnect={handleConnect} />
        <Marquis />
        <Burner isConnected={isConnected} />
        <API />
        <Call />
        <Events />    
 
    </div>
  );
}

export default App;
