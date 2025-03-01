const Item = require('../model/taskModel');

// Create Item
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    return res.status(201).json({
        success: true,
        message: "Create Item successfully",
        data: item
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Items with Pagination, Filtering, and Search
exports.getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const items = await Item.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

      return res.status(201).json({
        success: true,
        message: "Fetch Items successfully",
        data: items
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(201).json({
        success: true,
        message: "fetch single Item successfully",
        data: item
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(201).json({
        success: true,
        message: "update Item successfully",
        data: item
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
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(201).json({
        success: true,
        message: "delete Item successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
