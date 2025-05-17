require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const path = require('path');
const router = require('./routers/index.route');
const errorHandler = require('./middleware/error.middleware');
const http = require('http');
const models = require('./models/models');      // Для первичной синхронизации
const storage = require('./store');

const PORT = process.env.PORT || 5101;

const app = express()
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Middleware с ошибками должен регистрироваться в последнюю очередь!!!
app.use(errorHandler);

app.get(
    '/',
    (req, resp) => {
        resp.status(200).json(
            {
                message: 'chips motivator working!!!'
            }
        );
    }
)

const server = http.createServer(app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.error(err)
    }
}

start();