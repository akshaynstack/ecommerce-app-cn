import React from 'react';

const AddProductButton = ({ handleAdd }) => {
  return (
    <button onClick={handleAdd}>Add Product</button>
  );
};

export default AddProductButton;