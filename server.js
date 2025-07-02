const express = require('express');
const mongoose = require('mongoose');
const leadsRouter = require('./routes/leads');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/lead_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully ');
})
.catch((err) => {
    console.error('MongoDB connection failed ', err);
});

app.use('/api/leads', leadsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
});
