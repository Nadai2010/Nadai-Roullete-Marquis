import { useAccount, useContractWrite } from "@starknet-react/core";
import { useState, useMemo } from "react";

function Transfer() {
    const { address } = useAccount();
    const [count] = useState(1);
    const [recipient, setRecipient] = useState('0x');
    const [amount, setAmount] = useState('1000000000000000000');
  
    const calls = useMemo(() => {
      const tx = {
        contractAddress: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
        entrypoint: 'transfer',
        calldata: [recipient, amount, 0]
      };
      return Array(count).fill(tx);
    }, [address, count, recipient, amount]);

    const { write } = useContractWrite({ calls });
  
    return (
      <>
        <p>Transfer:</p>
        <p>
          Recipient:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </p>
        <p>
          Amount (default: 1 NAI with 18 decimals):
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </p>
        <p><button onClick={() => write()}>Execute Transfer</button></p>
        <hr/>
      </>
    );
}

export default Transfer;
