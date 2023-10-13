import { useEffect } from 'react';
import { useDojo } from '../DojoContext';
import { useComponentValue } from "@dojoengine/react";
import { Direction } from '../dojo/createSystemCalls';
import { EntityIndex, setComponent } from '@latticexyz/recs';
import { getFirstComponentByType } from '../utils';
import { Moves, Position } from '../generated/graphql';

function Burner({ isConnected }: { isConnected: boolean }) {
  const {
    setup: {
      systemCalls: { spawn, move },
      components: { Moves, Position },
      network: { graphSdk }
    },
    account: { create, list, select, account, isDeploying }
  } = useDojo();

  const entityId = account.address;
  const position = useComponentValue(Position, parseInt(entityId.toString()) as EntityIndex);
  const moves = useComponentValue(Moves, parseInt(entityId.toString()) as EntityIndex);

  useEffect(() => {

    if (!entityId) return;

    const fetchData = async () => {
      const { data } = await graphSdk.getEntities();

      if (data) {
        const remaining = getFirstComponentByType(data.entities?.edges, 'Moves') as Moves;
        const position = getFirstComponentByType(data.entities?.edges, 'Position') as Position;

        setComponent(Moves, parseInt(entityId.toString()) as EntityIndex, { remaining: remaining.remaining })
        setComponent(Position, parseInt(entityId.toString()) as EntityIndex, { x: position.x, y: position.y })
      }
    }
    fetchData();
  }, [account.address]);


  const handleCreateClick = () => {
    if (isConnected) {
      create();
    } else {
      console.log('No puedes crear el burner hasta que estés conectado.');
    }
  };

  const handleSpawnClick = () => {
    if (isConnected) {
      spawn(account);
    } else {
      console.log('No puedes hacer spawn hasta que estés conectado.');
    }
  };

  const handleMoveClick = (direction: Direction) => {
    if (isConnected) {
      move(account, direction);
    } else {
      console.log('No puedes moverte hasta que estés conectado.');
    }
  };



  return (
    <>
      <button onClick={handleCreateClick}>{isDeploying ? "deploying burner" : "create burner"}</button>
      <div className="card">
        select signer:{" "}
        <select onChange={e => select(e.target.value)}>
          {list().map((account, index) => {
            return <option value={account.address} key={index}>{account.address}</option>
          })}
        </select>
      </div>
      <div className="card">
        <button onClick={handleSpawnClick}>Spawn</button>
        <div>Moves Left: {moves ? `${moves['remaining']}` : 'Need to Spawn'}</div>
        <div>Position: {position ? `${position['x']}, ${position['y']}` : 'Need to Spawn'}</div>
      </div>
      <div className="card">
        <button onClick={() => handleMoveClick(Direction.Up)}>Move Up</button> <br />
        <button onClick={() => handleMoveClick(Direction.Left)}>Move Left</button>
        <button onClick={() => handleMoveClick(Direction.Right)}>Move Right</button> <br />
        <button onClick={() => handleMoveClick(Direction.Down)}>Move Down</button>
      </div>
    </>
  );
}

export default Burner;
