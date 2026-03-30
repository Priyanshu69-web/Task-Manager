require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

// connect database
connectDB();

// Middleware (CORS + JSON parsing BEFORE routes)
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

// Root route to handle GET /
app.get('/', (req, res) => {
    res.send('API is running');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve frontend static files
const frontendPath = path.join(__dirname, "..", "frontend", "Task-Manager", "dist");
app.use(express.static(frontendPath));

// // Catch-all route to serve index.html for client-side routing support
// app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
// });



//Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
