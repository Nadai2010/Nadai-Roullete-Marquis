import { useAccount, useContractWrite } from "@starknet-react/core";
import { useState, useMemo, useCallback } from "react";

function Write() {
    const { address } = useAccount()
    const [count, setCount] = useState(0)
  
    const calls = useMemo(() => {
      const tx = {
        contractAddress: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
        entrypoint: 'transfer',
        calldata: [address, 1, 0]
      }
      return Array(count).fill(tx)
    }, [address, count])
  
    const { write } = useContractWrite({ calls })
  
    const inc = useCallback(
      () => setCount(c => c + 1),
      [setCount]
    )
    const dec = useCallback(
      () => setCount(c => Math.max(c - 1, 0)),
      [setCount]
    )
  
    return (
      <>
        <p>Sending {count} transactions</p>
        <p>
          <button onClick={dec}>Decrement</button>
          <button onClick={inc}>Increment</button>
        </p>
        <p>
        <button onClick={() => write()}>Write</button>
        </p>
        <hr/>
      </>
    )
  }

  export default Write;