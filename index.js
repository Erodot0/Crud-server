// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import user and blog API routes
const loginRoutes = require('./routes/signUp_Api/login_user');
const createUserRoutes = require('./routes/signUp_Api/create_user');
const viewUserRoutes = require('./routes/user_Api/view_user');
const getUserRoutes = require('./routes/user_Api/get_user');
const getUserIdRoutes = require('./routes/user_Api/get_user_ById');
const updateUserRoutes = require('./routes/user_Api/update_user');
const deleteUserRoutes = require('./routes/user_Api/delete_user');
const createBlogRoutes = require('./routes/blog_Api/create_blog');
const getBlogRoutes = require('./routes/blog_Api/get_blogs');
const getBlogIdRoutes = require('./routes/blog_Api/get_blog_ById');
const updateBlogRoutes = require('./routes/blog_Api/update_blog');
const deleteBlogRoutes = require('./routes/blog_Api/delete_blog');

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Login/Register API routes
app.use('/login', loginRoutes);
app.use('/api/user/post', createUserRoutes);

// User API routes
app.use('/api/user/view', viewUserRoutes);
app.use('/api/user', getUserRoutes);
app.use('/api/user/get', getUserIdRoutes);
app.use('/api/user/update', updateUserRoutes);
app.use('/api/user/remove', deleteUserRoutes);

// Blog API routes
app.use('/api/blog/post', createBlogRoutes);
app.use('/api/blog', getBlogRoutes);
app.use('/api/blog/get', getBlogIdRoutes);
app.use('/api/blog/update', updateBlogRoutes);
app.use('/api/blog/remove', deleteBlogRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
