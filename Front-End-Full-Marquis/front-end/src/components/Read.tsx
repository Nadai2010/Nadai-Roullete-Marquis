import { useAccount, useContractRead } from '@starknet-react/core';
import { shortString } from 'starknet';
import compiled from '../assets/compiled/erc20.json';

const Read = () => {
  const sc_address =
    '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b';
  const { data, isLoading, error, refetch } = useContractRead({
    address: sc_address,
    abi: compiled.abi,
    functionName: 'get_name',
    args: [],
    watch: false,
  });
  

  const { address } = useAccount();
  const { data: dataBalance } = useContractRead({
    address: sc_address,
    abi: compiled.abi,
    functionName: 'balance_of',
    args: address ? [address] : undefined,
    watch: false,
  });

  const handleButtonClick = () => {
    refetch(); // Llamar a la función de refetch cuando se hace clic en el botón
  };

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {JSON.stringify(error)}</span>;
  if (data === undefined) return <></>;

  return (
    <div>
      <div>Address: {sc_address}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={handleButtonClick}>Refetch</button> {/* Botón de refetch */}
        <p className="my-auto">
          Name:{' '}
          {shortString.decodeShortString(
            '0x' + (data as unknown as bigint).toString(16)
          )}
        </p>
        {dataBalance && (
          <p className="my-auto">
            Balance: {(dataBalance as unknown as bigint).toString(10)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Read;
