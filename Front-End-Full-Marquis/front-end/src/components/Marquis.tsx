import React, { CSSProperties, useState } from 'react';

const cardImages = [
  'https://via.placeholder.com/155x196',
  'https://via.placeholder.com/155x196',
  'https://via.placeholder.com/155x196',
];

const styles: { [key: string]: CSSProperties } = {
  marquisseContainer: {
    textAlign: 'center',
    color: 'white',
    fontSize: '6rem',
    fontWeight: 'bold',
    marginBottom: '10rem',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '820px', 
  },
  card: {
    width: '205px',
    height: '196px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    margin: '10px',
    overflow: 'hidden', 
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  },
};

const Marquis: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={styles.marquisseContainer}>
      
      <div style={styles.cardContainer}>
        
        {cardImages.map((image, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)', // Aplica el efecto de zoom solo a la carta sobre la que pasa el cursor
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img style={styles.cardImage} src={image} alt={`Card ${index + 1}`} />
          </div>

          
        ))}
      </div>
    </div>
  );
};

export default Marquis;
