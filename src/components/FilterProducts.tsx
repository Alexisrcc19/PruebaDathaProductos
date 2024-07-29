import React, { useState } from 'react';

interface FilterProductsProps {
  filtrarProductos: (nombre: string) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({ filtrarProductos }) => {
  const [filtro, setFiltro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFiltro(value);
    filtrarProductos(value);
  };

  return (
    <div className="filter">
      <input type="text" value={filtro} onChange={handleChange} placeholder="Buscar por nombre" />
    </div>
  );
};

export default FilterProducts;
