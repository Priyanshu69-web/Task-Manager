const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//generate Jwt token

const generateToken = (UserId) => {
    return jwt.sign({ id: UserId }, process.env.JWT_SECRET, { expiresIn: "7d" });

};  

//@desc  Register new User
//@route  POST /api/auth/register
//@access Public

const registerUser = async (req, res) => {

    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        //check if user already exist
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exist" });
        }
        //Determine user role: Admin if correct token is provided, otherwise user
        let role = "member";
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
            profileImageUrl,
            role,
        });

        //return user with jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),

        });

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};


//@desc    Login User
//@route  POST /api/auth/login
//@access Public

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        // return user data with jwt 
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

//@desc  Get user profile
//@route  GET /api/auth/profile
//@access Private(REquires JWT)

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}


//@desc  Get user profile
//@route  PUT /api/auth/profile
//@access Private(REquires JWT)

const updateUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user.name = req.body.name || req.name;
        user.email = req.body.email || req.email;

        if(req.body.password){
            const salt =await bcrypt.genSalt(10);
            user.password =await bcrypt.hash(req.body.password,salt);   
        }

        const UpdatedUser= await user.save();
        res.json({

            _id: UpdatedUser._id,
            name: UpdatedUser.name,
            email:UpdatedUser.email,
            role: UpdatedUser.role,
            profileImageUrl: UpdatedUser.profileImageUrl,
            token: generateToken(UpdatedUser._id)
        })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };

