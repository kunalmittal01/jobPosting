import { uploadImage } from "../middleware/cloudinary.js";
import upload from "../middleware/multer.js";
import Job from "../model/job.js";

export const createJob1 = async (req, res, next) => {
  console.log(req.body);
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    upload.single("image")(req, res, next);
  } else {
    upload.none()(req, res, next);
  }
};

export const createJob2 = async (req, res) => {
    try {
      if (req.file) {
        req.body.image = await uploadImage(req.file);
      }
      req.body.skills = req.body.skills.split(",");
      const job = await Job.create(req.body);
      res.json({ message: "Job created successfully", job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating job", error });
    }
  };

export const updateJob1 = (req, res, next) => {
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
        upload.single("image")(req, res, next);
      } else {
        upload.none()(req, res, next);
      }
}

export const updateJob2 = async (req, res) => {
try {
    if(req.file) {
        req.body.image = await uploadImage(req.file); 
    }
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true
    });
    if (!job) {
    return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job updated successfully", job });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating job", error });
}
};

export const getJob = async(req,res) => {
    try {
        const jobs = await Job.find();
        res.json({
            message: 'All Jobs',
            jobs,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,

        });
    }
}

export const getSingleJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({
            message: 'Single Job',
            job,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export const deleteJob = async(req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({
            message: 'Job deleted successfully',
            job,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}