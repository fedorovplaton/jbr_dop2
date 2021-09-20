const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./src/router/authRouter');
const contentRouter = require('./src/router/contentRouter');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/', contentRouter);

const run = async () =>  {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin@cluster0.v5t0c.mongodb.net/JBR_DOP2_DATABASE?retryWrites=true&w=majority'
        );
        app.listen(PORT, () => console.info(`Started on port ${PORT}`));
    } catch (e) {
        console.info(e);
    }
};

run();
