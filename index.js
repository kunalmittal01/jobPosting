import express, { urlencoded } from 'express';
import "dotenv/config"
import mongoose from 'mongoose';
import jobRouter from './routes/job.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await mongoose.connect(process.env.mongo_url);

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: "Invalid route" }); 
})
app.listen(process.env.port, () => {
    console.log(`Server is running at http://localhost:${process.env.port}`);
})