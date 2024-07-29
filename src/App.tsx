import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import TopRepeatedNames from './components/TopRepeatedNames';
import FilterProducts from './components/FilterProducts';
import './App.css';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  modelo: string;
  estado: string;
}

const App: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [showForm, setShowForm] = useState(false);

  const agregarProducto = (producto: Producto) => {
    setProductos([...productos, producto]);
    setProductosFiltrados([...productos, producto]);
  };

  const editarProducto = (producto: Producto) => {
    const updatedProducts = productos.map((p) =>
      p.id === producto.id ? producto : p
    );
    setProductos(updatedProducts);
    setProductosFiltrados(updatedProducts);
  };

  const filtrarProductos = (nombre: string) => {
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
  };

  return (
    <div className="App">
      <h1>CRUD de Productos</h1>
      
      <div className="container">
        <div className="left-panel">
          <div className="filter-container">
            <FilterProducts filtrarProductos={filtrarProductos} />
            <button onClick={() => setShowForm(true)} className="open-form-btn">
              Agregar Producto
            </button>
          </div>
          <div className="bottom-panel">
            <div className="product-list-container">
              <ProductList productos={productosFiltrados} editarProducto={editarProducto} />
            </div>
            <div className="top-repeated-names-container">
              <TopRepeatedNames productos={productos} />
            </div>
          </div>
        </div>
        
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowForm(false)}>
                &times;
              </span>
              <ProductForm agregarProducto={agregarProducto} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
