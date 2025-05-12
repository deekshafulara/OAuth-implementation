const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError'); // Import AppError
require('dotenv').config();
require('./models/dbConnect'); // Ensure database connection is set up
const authRoutes = require('./routes/authRoutes'); // Import authRoutes

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Attach authRoutes middleware
app.use('/auth', authRoutes);

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});





// const express = require('express');
// const cors = require('cors');
// const app = express();
// require('dotenv').config();
// require('./models/dbConnect');
// const authRoutes = require('./routes/authRoutes');
// const PORT = process.env.PORT || 8080;

// app.use(cors());
// app.use('/auth/', authRoutes); // <- NEW LINE

// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// })