import React, { useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  modelo: string;
  estado: string;
}

interface ProductFormProps {
  agregarProducto: (producto: Producto) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ agregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [img, setImg] = useState<string | ArrayBuffer | null>(null);
  const [modelo, setModelo] = useState('');
  const [estado, setEstado] = useState('Nuevo');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Math.random(),
      nombre,
      precio: parseFloat(precio),
      img: img as string, // Assumes img is a string URL
      modelo,
      estado,
    };
    agregarProducto(newProduct);
    setNombre('');
    setPrecio('');
    setImg(null);
    setModelo('');
    setEstado('Nuevo');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <div className="img-preview">
        {img && <img src={img as string} alt="Preview" className="preview-img" />}
      </div>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        required
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
      </select>
      <button type="submit">Agregar Producto</button>
      
    </form>
  );
};

export default ProductForm;
