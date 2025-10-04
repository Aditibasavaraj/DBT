// You will also need to re-think how you store Post and User data without MongoDB.
// For now, I'm just showing the Cloudinary part for the file upload.
// If your posts and users need to be persistent, you'll need another storage solution.

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json('No file uploaded.');
    }

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'dbt_blog_images' // Optional: organized uploads in a folder
        });

        // Remove the temporary file created by multer after upload
        fs.unlinkSync(req.file.path);

        const { token } = req.cookies;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
            if (err) throw err;
            const { title, summary, content } = req.body;
            // --- IMPORTANT ---
            // Without MongoDB, 'Post.create' will no longer work.
            // You need to decide how to store this data.
            // For example, if you had an in-memory array of posts, you'd push to it:
            const newPost = {
                title,
                summary,
                content,
                cover: result.secure_url, // Use the secure URL from Cloudinary
                author: info.id, // This author ID would also need to come from somewhere
                _id: Date.now().toString() // Simple ID generation
            };
            // posts.push(newPost); // Example: if 'posts' was a global array
            // res.json(newPost);
            // For now, I'll just return a success message with the image URL
            res.json({ message: "Post data received and image uploaded to Cloudinary", postData: newPost });
            // --- END IMPORTANT ---
        });
    } catch (e) {
        console.error('Upload error:', e);
        // Make sure to clean up the temporary file if something went wrong too
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json('Error uploading file or creating post.');
    }
});