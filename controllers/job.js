const getAllJob = async (req, res) => {
  res.send("getAllJob");
};
const getJob = async (req, res) => {
  res.send("getJob");
};
const createJob = async (req, res) => {
  res.send(req.user);
};
const updateJob = async (req, res) => {
  res.send("updateJob");
};
const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

module.exports = { getAllJob, getJob, createJob, updateJob, deleteJob };