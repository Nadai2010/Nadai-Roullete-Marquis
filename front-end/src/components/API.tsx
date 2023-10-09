import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'DJQcaCKLJQ1gGtclqomTXYo6aRzeuKe5'; // Reemplaza con tu clave API de Alchemy
const url = `https://starknet-goerli.g.alchemy.com/v2/${apiKey}`;

const API: React.FC = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  const fetchData = async () => {
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'starknet_blockNumber',
      params: []
    };

    try {
      const response = await axios.post(url, payload);
      setBlockNumber(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Starknet Block Number</h2>
      <button onClick={fetchData}>Obtener número de bloque</button>
      {blockNumber !== null && <p>Número de bloque: {blockNumber}</p>}
    </div>
  );
};

export default API;
