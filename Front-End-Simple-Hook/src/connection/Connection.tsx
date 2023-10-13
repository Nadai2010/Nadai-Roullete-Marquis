import { useAccount, useConnectors } from '@starknet-react/core'
import { useMemo } from 'react'
import Balance from '../components/Balance'
import Transfer from '../components/Transfer'
import Multicall from '../components/Multicall'
import Read from '../components/Read'
import Call from '../components/Call'
import Write from '../hook-apibara/useContractWrite'
import HashBlock from '../hook-apibara/useBlock'
import StarkName from '../hook-apibara/useStarkName'



function WalletConnected() {
  const { address } = useAccount();
  const { disconnect } = useConnectors();

  const shortenedAddress = useMemo(() => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      <p><button onClick={disconnect}>Disconnect</button></p>
      <hr/>
      <Balance />
      <Transfer />
      <Write />
      <HashBlock />
      <StarkName />

      <Read />
      <Call/>
   
      <Multicall />
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnectors();

  return (
    <div>
      <span>Select a wallet:</span>
      <p>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect(connector)}>
          {connector.id}
        </button>
      ))}
      </p>
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
