import { useStarkName } from "@starknet-react/core";

function StarkName() {
    const address = '0x03f878c94de81906ba1a016ab0e228d361753536681a776dda29674ffebb3cb0';
    const { data, isLoading, isError } = useStarkName({ address });
  
    if (isLoading) {
        return (
          <>
          <div>Loading...</div>
        <hr />
        </>
        );
    }
    if (isError) {
        return (
          <>
        <div>Error fetching Stark Name...</div>
        <hr />
        </>
        );
    }
    return (
        <>
            <div>StarkName: {data}</div>
            <hr />
        </>
    );
}

export default StarkName;
