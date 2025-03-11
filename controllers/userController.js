const { User } = require("../database"); 

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


async function createUser(req, res) {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required" });

        const newUser = await User.create({ name, email, phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
}
async function updateUser(req, res) {
  try {
      const { name, email, phone } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) return res.status(404).json({ error: "User not found" });

      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      await user.save();
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: "Error updating user" });
  }
}

module.exports = { createUser, getUsers, deleteUser,getUserById,updateUser };
