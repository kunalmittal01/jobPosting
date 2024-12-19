import express from 'express';
import { createJob1, createJob2, deleteJob, getJob, getSingleJob, updateJob1, updateJob2 } from '../controller/job.js';
import upload from '../middleware/multer.js';
const jobRouter = express.Router();

jobRouter.post('/create', createJob1, createJob2);

jobRouter.get('/getall', getJob)

jobRouter.get('/get/:id', getSingleJob)

jobRouter.put('/update/:id', updateJob1, updateJob2);

jobRouter.delete('/delete/:id', deleteJob)

export default jobRouter;