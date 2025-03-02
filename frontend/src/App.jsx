import React, { useState, useEffect } from 'react';
import ItemForm from './Component/ItemForm';
import ItemList from './Component/ItemList';



function App() {
  const [items, setItems] = useState([]);

  const fetchItemData = async (page = 1, search = "", category = "") => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/items?page=${page}&search=${search}&category=${category}`
      );
      const jsonData = await response.json();
      setItems(jsonData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    fetchItemData(); // Automatically Fetch Data on Page Load
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-4 bg-blue-300">Task Management System</h1>
      <ItemForm fetchItemData={fetchItemData} />
      <ItemList items={items} fetchItemData={fetchItemData} />
    </div>
  );
}

export default App;


