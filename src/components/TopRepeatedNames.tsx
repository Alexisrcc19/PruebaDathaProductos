import React from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  modelo: string;
  estado: string;
}

interface TopRepeatedNamesProps {
  productos: Producto[];
}

const TopRepeatedNames: React.FC<TopRepeatedNamesProps> = ({ productos }) => {
  const nameCount = productos.reduce((acc, producto) => {
    acc[producto.nombre] = (acc[producto.nombre] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const sortedNames = Object.keys(nameCount).sort((a, b) => nameCount[b] - nameCount[a]);

  return (
    <div className="top-repeated">
      <h3>Ranking de Telefonos</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Existencias</th>
          </tr>
        </thead>
        <tbody>
          {sortedNames.slice(0, 5).map((nombre) => (
            <tr key={nombre}>
              <td>{nombre}</td>
              <td>{nameCount[nombre]} u.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopRepeatedNames;
