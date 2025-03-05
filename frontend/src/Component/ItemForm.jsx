import React, { useState } from "react";
import axios from "axios";

function ItemForm({ fetchItemData }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, category, price };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/items",
        itemData,
        {
          Headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("Item Created Successfully ✅");
        fetchItemData(); // Fetch updated list
        setName("");
        setCategory("");
        setPrice("");
      }
    } catch (error) {
      console.log(
        "Error in creating item:",
        error.response?.data?.message || error.message
      );
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
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Item
      </button>
    </form>
  );
}

export default ItemForm;
