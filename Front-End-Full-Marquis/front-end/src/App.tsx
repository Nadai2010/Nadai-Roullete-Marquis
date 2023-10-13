import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAccount } from '@starknet-react/core';
import GlobalStyles from './components/GlobalStyles';
import Connect from './components/Connect';
import TokenFormComponent from './components/TokenForm';

// import Multicall from './components/Multicall';
// import Marquis from './components/Marquis';
// import Burner from './components/Burner';
// import Read from "./Read";

function App() {
  const { isConnected } = useAccount();

  return (
    <Router>
      <GlobalStyles />
      <div className="h-full p-4 flex flex-col">
        <Routes>
          <Route path="/connect" element={<Connect />} />
          {isConnected && (
            <>
              {/* Mostrar el componente TokenForm cuando el usuario está conectado */}
              <Route path="/TokenForm" element={<TokenFormComponent />} />
              {/* Agregar aquí más rutas para otros componentes */}
            </>
          )}
          {!isConnected && (
            // Redirigir al usuario a la página de conexión si no está conectado
            <Route path="/" element={<Navigate to="/connect" />} />
          )}
        </Routes>
        
        {/*<Burner isConnected={false} /> */}
        {/* Agregar otros componentes que deseas mostrar cuando el usuario está conectado */}
      </div>
    </Router>
  );
}

export default App;
