const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


//@desc  Get All user (Admin only)
//@route  GET /api/users/
//@access Private(Admin)
const getUsers = async (req, res) => {
    try {

        const Users = await User.find({ role: "member" }).select("-password");

        // add task counts
        const usersWithTaskCounts = await Promise.all(
            Users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Pending",
                });
                const inProgressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress",
                });

                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });

                return {
                    ...user._doc, //Include all existing user
                    pendingTasks,
                    inProgressTasks,
                    completedTasks
                };

            })
        ); res.status(200).json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

//@desc  Get  user by id
//@route  GET /api/users/:id
//@access Private

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

//@desc   delete user(Admin only)
//@route  DELETE /api/users/:id
//@access Private(Admin)


const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

module.exports = { getUsers, getUserById, deleteUser };