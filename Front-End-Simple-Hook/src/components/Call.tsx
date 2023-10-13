import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const apiKey = 'DJQcaCKLJQ1gGtclqomTXYo6aRzeuKe5'; // Reemplaza con tu clave API de Alchemy
const url = `https://starknet-goerli.g.alchemy.com/v2/${apiKey}`;

const Call: React.FC = () => {
    const [responseData, setResponseData] = useState<any>(null);
    const [to, setTransferTo] = useState('');
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTransferTo(event.target.value);
    };

  const fetchData = async () => {
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'starknet_call',
          params: [
            {
              contract_address: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
              calldata: [to,],
              entry_point_selector: '0x02e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e'
            },
            'latest'
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
    <Container>
    <div>
      <h2>Starknet Demo</h2>
      <input type="text" value={to} onChange={handleInputChange} placeholder="Dirección a la que transferir" />
      <button onClick={fetchData}>Realizar solicitud a Starknet</button>
      {responseData && (
        <div>
          <h3>Respuesta:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
    </Container>
  );
};

export default Call;
