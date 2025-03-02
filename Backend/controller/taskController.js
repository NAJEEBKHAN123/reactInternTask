const Item = require("../model/taskModel");

// Create Item
exports.createItem = async (req, res) => {
  const { name, category, price } = req.body;
  try {
    if (!name || !category || !price || price <= 0) {
      alert("Please fill all fields correctly!");
      return;
    }
    
    const item = await Item.create({ name, category, price });
    return res.status(201).json({
      success: true,
      message: "Create Item successfully",
      data: item,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Items with Pagnation, Filtering, and Search
exports.getItems = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }, 
      ];
    }

    const items = await Item.find(query)
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      message: "Fetch Items successfully",
      data: items,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get Single Item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(201).json({
      success: true,
      message: "fetch ItemById successfully",
      data: item,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      id,
      { name, category, price },
      {
        new: true,
      }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(201).json({
      success: true,
      message: "update Item successfully",
      data: item,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(201).json({
      success: true,
      message: "delete Item successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
