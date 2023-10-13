import React, { useState } from 'react';

const apiKey = 'DJQcaCKLJQ1gGtclqomTXYo6aRzeuKe5'; // Reemplaza con tu clave API de Alchemy
const url = `https://starknet-goerli.g.alchemy.com/v2/${apiKey}`;

const Call: React.FC = () => {
  const [responseData, setResponseData] = useState<any>(null);

  const fetchData = async () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'name()',
        params: [
          {
            contract_address: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
            calldata: [],
            entrypoint: '0x361458367e696363fbcc70777d07ebbd2394e89fd0adcaf147faccd1d294d60'
          },
          
        ]
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Starknet Demo</h2>
      <button onClick={fetchData}>Realizar solicitud a Starknet</button>
      {responseData && (
        <div>
          <h3>Respuesta:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Call;
