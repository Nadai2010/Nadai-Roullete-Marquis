import React, { useState, useEffect } from "react";
import ruletteImage from "../../src/assets/react.svg";

const rouletteContainerStyle = {
  backgroundImage: `url(${ruletteImage})`,
  backgroundSize: "cover",
  position: "relative" as "relative",
  width: "300px",
  height: "300px",
  transition: "transform 4s ease-in-out",
  margin: "10px ",
  
};

const ballStyle = {
  backgroundColor: "red",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  position: "absolute" as "absolute",
  top: "calc(25% - 10px)",
  left: "calc(35% - 10px)",
  transition: "transform 3s ease-in-out",
  
};

const Roulette: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [ballRotationAngle, setBallRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | number = 10;
    let rotationSpeed = 100;
    const maxRotationSpeed = 500;
    const acceleration = 2;
    const spinDuration = 1000;
  
    if (isSpinning) {
      let elapsed = 0;
  
      interval = setInterval(() => {
        setRotationAngle((prevAngle) => prevAngle + rotationSpeed);
        setBallRotationAngle((prevAngle) => prevAngle - rotationSpeed * 2); // Cambiado a resta
  
        if (rotationSpeed < maxRotationSpeed) {
          rotationSpeed += acceleration;
        }
  
        elapsed += 10;
  
        if (elapsed >= spinDuration) {
          clearInterval(interval as NodeJS.Timeout);
          setIsSpinning(false); // Detener la animación después del tiempo especificado
        }
      }, 50);
    }
  
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isSpinning]);
  
  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
        <div style={{ ...rouletteContainerStyle, transform: `rotate(${rotationAngle}deg)` }}>
        <div style={{ ...ballStyle, transform: `rotate(${ballRotationAngle}deg)` }}></div>
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        style={{ margin: "5px" }}  // Ajusta el margen del botón según sea necesario
        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        Spin Roulette
      </button>
    </div>
  );
};

export default Roulette;