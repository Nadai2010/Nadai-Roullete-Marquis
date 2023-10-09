import React, { useState, CSSProperties } from "react";
import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { stark, uint256 } from "starknet";
import Roullete from "../components/Roullete";
import styled from "styled-components";

const factor = 1000000; // Factor para multiplicar y dividir

const GlobalStyles: CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const Title = styled.h1`
  font-size: 5em;
  margin-bottom: -5rem;
  color: grey;
  margin-top: 5rem

  @media (max-width: 40em) {
    font-size: 4em;
    text-align: center;
  }
`;

const DepositoButtonStyles: CSSProperties = {
  background: 'linear-gradient(to right, #ff6a00, black)', // Colores degradados
  color: 'white',
  border: 'none',
  width: '100px',
  height: '40px',
  margin: '10px',
  cursor: 'pointer',
  borderRadius: '10px',
  fontSize: '1.2em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
};



const Simple: React.FC<{ wallet: ConnectedStarknetWindowObject }> = ({
  wallet,
}) => {
  const [txHash] = useState<string | null>(null);
  const [depositValue, setDepositValue] = useState<number>(0);




  const handleDeposit = async () => {
    if (depositValue > 0 && wallet) {
      const depositAmount = depositValue * factor; // Calcular el monto del depósito
      try {
        const tx = await wallet.account.execute({
          contractAddress: "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426",
          entrypoint: "transfer", // Entry point para depósito
          calldata: stark.compileCalldata({
            to: wallet.account.address,
            value: {
              type: "struct",
              ...uint256.bnToUint256(depositAmount),
            },
          }),
        });
        console.log("Depósito realizado:", depositAmount);
        console.log("Transaction hash:", tx.transaction_hash);
      } catch (error) {
        console.error("Error al realizar el depósito:", error);
      }
    } else {
      console.log("Ingrese una cantidad válida para depositar o asegúrese de estar conectado a la billetera");
    }
  };


  return (
    <div style={GlobalStyles}>
      <Title>Starknet Roulette</Title>
      <p style={{ fontSize: '1.2em', marginBottom: '-120px' }}>Address: {wallet.account.address}</p>

      {/* Depósito y Retiro */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-80px' }}>
        <Roullete />
        <div style={{ marginRight: '10px' }}>
          <input
            type="number"
            placeholder="Cantidad a depositar"
            value={depositValue}
            onChange={(e) => setDepositValue(parseInt(e.target.value, 10))}
            style={{ width: '100px', height: '40px', fontSize: '1.2em' }}
          />
          <button
            onClick={handleDeposit}
            style={DepositoButtonStyles}
          >
            Depositar
          </button>
        </div>

      </div>


      {txHash && (
        <p style={{ fontSize: '1.2em', marginTop: '20px' }}>
          Transacción enviada:{" "}
          <a
            href={`https://testnet.starkscan.co/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ff4343' }}
          >
            {txHash}
          </a>
        </p>
      )}

    </div>

  );
};

export default Simple;