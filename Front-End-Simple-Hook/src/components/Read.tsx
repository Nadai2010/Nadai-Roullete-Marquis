import styled from 'styled-components';
import { useAccount, useContractRead } from '@starknet-react/core';
import { shortString } from 'starknet';
import compiled from '../assets/compiled/erc20.json';
import { Button } from './ui/button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ItemContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const ItemField = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; 
  align-items: center;
  margin-bottom: 2rem;
  border: 2px solid #ffffff;
  background-color: #DCDCDC;
  border-radius: 10px;
`;

const Read = () => {
  const sc_address =
    '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b';
  const { data, isLoading, refetch } = useContractRead({
    address: sc_address,
    abi: compiled,
    functionName: 'name',
    args: [],
    watch: false,
  });

  const { address } = useAccount();
  const { data: dataBalance } = useContractRead({
    address: sc_address,
    abi: compiled,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    watch: false,
  });

  const { data: dataTotalSupply } = useContractRead({
    address: sc_address,
    abi: compiled,
    functionName: 'total_supply',
    args: [],
    watch: false,
  });

  return (
    <Container>
      <div>Address Contract NAI: {sc_address}</div>
      <ItemContainer>
        <Button onClick={refetch}>Refetch</Button>
        <ItemField>
          <Label>Name: </Label>
          {isLoading ? 'Loading...' : shortString.decodeShortString('0x' + (data as unknown as bigint).toString(16))}
        </ItemField>
      </ItemContainer>
      <ItemContainer>
        <Button onClick={refetch}>Refetch</Button>
        {dataBalance && (
          <ItemField>
            <Label>Balance: </Label>
            {(dataBalance as unknown as bigint).toString(10)}
          </ItemField>
        )}
      </ItemContainer>
      <ItemContainer>
        <Button onClick={refetch}>Refetch</Button>
        {dataTotalSupply && (
          <ItemField>
            <Label>Total Supply: </Label>
            {(dataTotalSupply as unknown as bigint).toString(10)}
          </ItemField>
        )}
      </ItemContainer>
    </Container>
  );
};

export default Read;
