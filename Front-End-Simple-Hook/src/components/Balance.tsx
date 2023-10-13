import { useAccount, useContractRead } from "@starknet-react/core";
import erc20ABI from '../assets/erc20.json';

function Balance() {
  const { address } = useAccount();
  const { data, isLoading, error, refetch } = useContractRead({
    address: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: false
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {JSON.stringify(error)}</span>;

  return (
    <div>
      <p>Balance:</p>
      <p>{data?data.toString(): 0}</p>
      <p><button onClick={refetch}>Refresh Balance</button></p>
      <hr/>
    </div>
  );
}
  
export default Balance;
