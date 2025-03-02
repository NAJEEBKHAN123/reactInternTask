import React, { useState } from 'react';

function ItemForm({ fetchItemData }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, category, price };

    try {
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });

      const jsonData = await response.json();
      if (jsonData.success) {
        alert('Item Created Successfully ✅');
        fetchItemData(); // Ye wala magic call 😎
        setName('');
        setCategory('');
        setPrice('');
      }
    } catch (error) {
      console.log('Error in creating item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Create Item</button>
    </form>
  );
}

export default ItemForm;
