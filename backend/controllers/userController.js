const User = require("../models/user");

// create a user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

//update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, password } = req.body; 
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser

};