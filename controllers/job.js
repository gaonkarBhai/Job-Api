const JobModel = require("../model/jobSchema");

const getAllJob = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(200).json({jobs,count:jobs.length});
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // check for valid id mongoose instance class comes here
  if (!JobModel.isValidJobId(jobId))
    return res.status(400).json({ message: "Invalid job ID", success: false });
  const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
  if (!job)
    return res
      .status(404)
      .json({ message: `No job found with id ${jobId}`, success: false });
  res.status(200).json({ job, success: true });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const {company,position,status} = req.body
  if (!company || !position || !status)
  return res.status(400).json({ message: "feilds can not be empty", success: false });
  const job = await JobModel.create(req.body)
  res.status(201).json({job,success:true});
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;
  // check for valid id mongoose instance class comes here
  if (!JobModel.isValidJobId(jobId))
    return res.status(400).json({ message: "Invalid job ID", success: false });
  if (company == "" || position == "")
    return res
      .status(400)
      .json({ message: "feilds can not be empty", success: false });
  const job = await JobModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(201).json({ job, success: true });
};

const deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
  
  // check for valid id mongoose instance class comes here
  if (!JobModel.isValidJobId(jobId))
    return res.status(400).json({ message: "Invalid job ID", success: false }); 

    const job = await JobModel.findOneAndDelete({
      _id: jobId,
      createdBy: userId,
    });
    if(job == null || !job) return res.status(201).json({ "message":"No job found", success: false });
    return res.status(201).json({ job, success: true });
  } catch (error) {
    console.log(error)
    res.status(500)
  }
};

module.exports = { getAllJob, getJob, createJob, updateJob, deleteJob };
