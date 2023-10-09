import React from 'react';
import { connect, disconnect, ConnectedStarknetWindowObject } from '@argent/get-starknet';

const WW_URL = 'https://web.argent.xyz';

const Connect = ({ onConnect }: { onConnect: (isConnected: boolean) => void }) => {
  const [connection, setConnection] = React.useState<ConnectedStarknetWindowObject | undefined>();

  const handleConnectWallet = async () => {
    const connection = await connect({
      webWalletUrl: WW_URL,
    });

    if (connection && connection.isConnected) {
      setConnection(connection);
      onConnect(true); 
    }
  };

  const handleDisconnectWallet = async () => {
    await disconnect();
    setConnection(undefined);
    onConnect(false); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      {!connection && (
        <button
          onClick={handleConnectWallet}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect wallet
        </button>
      )}
      {connection && (
        <button
          onClick={handleDisconnectWallet}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect wallet
        </button>
      )}
    </div>
  );
};

export default Connect;
