const express = require('express');
const cors = require('cors'); // Import the cors package
const multer = require('multer'); // For handling file uploads
const cloudinary = require('cloudinary').v2; // Cloudinary for image storage
const jwt = require('jsonwebtoken'); // For JWT authentication
const fs = require('fs'); // For file system operations (deleting temp files)

// Initialize Express app
const app = express();

// --- CORS Configuration ---
// This allows your frontend (e.g., your local React dev server or deployed Vercel frontend)
// to make requests to this backend without security errors.
app.use(cors({
    credentials: true, // Allow sending cookies/auth headers
    origin: 'http://localhost:3000' // During local development, your React app runs on 3000
    // For production on Vercel, you might want to dynamically set this,
    // or specifically list your Vercel frontend domain, e.g.:
    // origin: 'https://your-frontend-domain.vercel.app'
    // A less secure but easy-for-testing option (allows all origins):
    // origin: '*'
}));

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies (if you're sending form data other than files)
app.use(express.urlencoded({ extended: true }));

// --- Multer Configuration for File Uploads ---
// 'dest' specifies where temporary files are stored. In Vercel, /tmp is writable.
const uploadMiddleware = multer({ dest: '/tmp' });

// --- Cloudinary Configuration ---
// Cloudinary credentials will be loaded from process.env (Vercel Environment Variables)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- JWT Secret (for authentication) ---
// This secret needs to be set as an Environment Variable in Vercel
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("JWT_SECRET is not defined. JWT verification will fail.");
    // In a real app, you might want to exit or throw an error here.
}


// --- API Routes ---

// Example: Simple health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});


// Route for creating a post (including file upload to Cloudinary)
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json('No file uploaded.');
    }

    try {
        // 1. Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'dbt_blog_images' // Optional: organizes uploads in a specific folder
        });

        // 2. Remove the temporary file created by multer after successful upload
        //    It's critical to clean up /tmp to avoid running out of space in serverless functions
        fs.unlinkSync(req.file.path);

        // 3. Verify JWT token (authentication)
        const { token } = req.cookies; // Assuming token is in a cookie
        if (!token) {
            return res.status(401).json({ message: 'Authentication token missing.' });
        }

        jwt.verify(token, jwtSecret, {}, async (err, info) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return res.status(401).json({ message: 'Invalid or expired token.' });
            }

            // If token is valid, proceed with post data
            const { title, summary, content } = req.body;

            // --- IMPORTANT: Placeholder for data storage ---
            // As discussed, this part DOES NOT actually save your post data persistently.
            // You NEED a database connection (e.g., MongoDB Atlas, PostgreSQL, etc.) here
            // to store 'title', 'summary', 'content', 'cover', and 'author' permanently.
            const newPost = {
                title,
                summary,
                content,
                cover: result.secure_url, // Use the secure URL from Cloudinary
                author: info.id, // Author ID from JWT payload
                _id: Date.now().toString() // A simple, non-persistent ID
            };

            // Example of what you would do if you had a database:
            // const createdPost = await Post.create({ ...newPost, author: info.id });
            // res.json(createdPost);

            // For now, we'll just return a success message with the data we processed
            res.json({
                message: "Post data received and image uploaded to Cloudinary (data not saved persistently)",
                postData: newPost
            });
            // --- END IMPORTANT ---
        });

    } catch (e) {
        console.error('API Post Route Error:', e);
        // Ensure temporary file is cleaned up even if there's an error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json('Error processing post or uploading file: ' + e.message);
    }
});


// Example: A simple route to test JWT info (requires token in cookie)
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing.' });
    }

    jwt.verify(token, jwtSecret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        res.json({ message: "Profile data fetched successfully", user: info });
    });
});


// --- Vercel Serverless Function Export ---
// IMPORTANT: Export the Express app as the default handler.
// Vercel will wrap this app to run as a serverless function.
module.exports = app;