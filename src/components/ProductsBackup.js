import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    transition: 'opacity 300ms',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
  },
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    href: '',
    imageSrc: '',
    imageAlt: '',
    price: '$',
    color: '',
  });

const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts([]); // Set an empty array as the initial state if no products are found in localStorage
    }
  }, []);

  const fetchData = async () => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        const response = await fetch(
          'https://my-json-server.typicode.com/akshaynstack/dummy-ecommerce/products'
        );
        const data = await response.json();
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      }
      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    resetNewProduct();
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsAdding(true);
    setIsEditing(true);
    setNewProduct({
      name: product.name,
      href: product.href,
      imageSrc: product.imageSrc,
      imageAlt: product.imageAlt,
      price: product.price,
      color: product.color,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditProduct(null);
    resetNewProduct();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/akshaynstack/dummy-ecommerce/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newProduct,
            id: Math.floor(Math.random() * 1000) + 1,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts((prevProducts) => [...prevProducts, data]);
        setIsAdding(false);
        resetNewProduct();
  
        // Save the products to localStorage
        localStorage.setItem(
          'products',
          JSON.stringify([...products, data])
        );
      } else {
        console.log('Error adding product');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      href: '',
      imageSrc: '',
      imageAlt: '',
      price: '$',
      color: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension === 'jpg' || extension === 'jpeg') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            imageSrc: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // Display an error or show a message about the file extension not being allowed
        console.log('Only JPG or JPEG files are allowed.');
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <button onClick={handleAdd} type="button" class="text-white bg-blue-900 hover:bg-sky-950 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Product
          <svg className="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14m-7-7h14" />
        </svg>
      </button>
      {/* Render loading skeleton or actual product cards based on isLoading state */}
      {isLoading ? (
          // Render loading skeleton
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: isLoading ? 4 : products.length }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 rounded-md" />
                <div className="mt-4 space-y-2">
                <div class="flex items-center justify-center w-65 h-80 mb-4 bg-gray-200 rounded dark:bg-gray-200"></div>
                <div className="h-2 bg-gray-200 rounded w-100" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Render actual product cards
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        )}

        <Modal
          isOpen={isAdding}
          onRequestClose={handleCancel}
          style={customModalStyles}
          contentLabel="Add Product Modal"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
                Product Name
              </label>
              <input
                value={newProduct.name}
                onChange={handleInputChange}
                name="name" // Add name attribute for identification in the event handler
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="product-name"
                type="text"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-url">
                Product URL
              </label>
              <input
                value={newProduct.href}
                onChange={handleInputChange}
                name="href" // Add name attribute for identification in the event handler
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="product-href"
                type="text"
                placeholder="Product URL"
                required
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-image">
              Product Image
            </label>
            <input
              onChange={handleImageChange}
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product-image"
              type="file"
              accept=".jpg, .jpeg"
              required
            />
          </div>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-imageAlt">
                Product Image Alt
              </label>
              <input
                value={newProduct.imageAlt}
                onChange={handleInputChange}
                name="imageAlt" // Add name attribute for identification in the event handler
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="product-imageAlt"
                type="text"
                placeholder="Product Image Alt"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-price">
                Product Price
              </label>
              <input
                value={newProduct.price}
                onChange={handleInputChange}
                name="price" // Add name attribute for identification in the event handler
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="product-price"
                type="number"
                placeholder="Product Price"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-color">
                Product Color
              </label>
              <input
                value={newProduct.color}
                onChange={handleInputChange}
                name="color" // Add name attribute for identification in the event handler
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="product-color"
                type="text"
                placeholder="Product Color"
                required
              />
            </div>
            <div className="flex items-center justify-between">
            <button type="submit" class="text-white bg-sky-950 hover:bg-sky-950 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Product
      </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Products;
