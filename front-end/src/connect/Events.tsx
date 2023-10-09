import React, { useState } from 'react';

const apiKey = 'DJQcaCKLJQ1gGtclqomTXYo6aRzeuKe5';
const url = `https://starknet-goerli.g.alchemy.com/v2/${apiKey}`;

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({
                    id: 1,
                    jsonrpc: '2.0',
                    method: 'starknet_getEvents',
                    params: [
                        {
                            from_block: 'latest',
                            to_block: 'latest',
                            address: '0x03F878C94De81906ba1A016aB0E228D361753536681a776ddA29674FfeBB3CB0',
                            chunk_size: 10 // Agrega el campo chunk_size aquí
                        }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.result)) {
                    setEvents(data.result);
                } else {
                    console.error('No se encontraron eventos o los datos no están en el formato esperado.');
                }
            } else {
                console.error('Error al obtener eventos. Código de estado:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener eventos:', error);
        }
    };

    return (
        <div>
            <h2>StarkNet Events</h2>
            <button onClick={fetchData}>Obtener Eventos</button>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>{JSON.stringify(event)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
