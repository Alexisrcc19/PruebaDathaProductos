import React, { useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  modelo: string;
  estado: string;
}

interface ProductListProps {
  productos: Producto[];
  editarProducto: (producto: Producto) => void;
}

const ProductList: React.FC<ProductListProps> = ({ productos, editarProducto }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Producto | null>(null);

  const handleEditClick = (producto: Producto) => {
    setIsEditing(producto.id);
    setEditedProduct({ ...producto });
  };

  const handleSaveClick = () => {
    if (editedProduct) {
      editarProducto(editedProduct);
      setIsEditing(null);
      setEditedProduct(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = e.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  return (
    <div className="product-list">
      {productos.map((producto) => (
        <div className="card" key={producto.id}>
          {isEditing === producto.id ? (
            <>
              <img src={editedProduct?.img} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <input
                type="number"
                name="precio"
                value={editedProduct?.precio}
                onChange={handleInputChange}
                placeholder="Precio"
              />
              <input
                type="text"
                name="modelo"
                value={editedProduct?.modelo}
                onChange={handleInputChange}
                placeholder="Modelo"
              />
              <input
                type="text"
                name="estado"
                value={editedProduct?.estado}
                onChange={handleInputChange}
                placeholder="Estado"
              />
              <button onClick={handleSaveClick}>Guardar</button>
            </>
          ) : (
            <>
              <img src={producto.img} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Modelo: {producto.modelo}</p>
              <p>Estado: {producto.estado}</p>
              <button onClick={() => handleEditClick(producto)}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
