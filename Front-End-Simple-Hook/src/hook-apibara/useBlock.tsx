import { useBlock } from "@starknet-react/core";

function HashBlock() {
    const { data, isLoading, isError } = useBlock({
        refetchInterval: 3000,
        blockIdentifier: undefined
    });
  
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error...</div>; 
    }
    return (
        <>
            <div>Hash: {data.block_hash}</div>
            <hr />
        </>
    );
}

export default HashBlock;
