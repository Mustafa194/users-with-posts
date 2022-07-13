const express = require('express');
const { sequelize: db } = require('./models');
const dotenv = require('dotenv');

const mainRoute = require('./routes/mainRoute');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', mainRoute);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);

    try {
        // await db.sync({ force: true });
        await db.authenticate();

        console.log('Database connected');
    }
    catch (error) {
        throw error;
    }
});
