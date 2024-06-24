const candidateModel = require("../models/candidateModel");
const { candidateValidationSchema } = require("../middleware/schemaValidator");
const fs = require("fs");
const path = require("path");
const { Console } = require("console");

// Create a new candidate
const createCandidate = async (req, res) => {
  const { success, data, error } = candidateValidationSchema.safeParse(
    req.body
  );
  if (!success) {
    return res.status(400).json({ error: error.errors });
  }

  try {
    const existingCandidate = await candidateModel.findOne({
      email: data.email,
    });
    if (existingCandidate) {
      return res.status(400).json({ error: "Candidate already exists" });
    }

    const uploadDir = process.cwd() + "/public/";
    const resumeUploadDir = uploadDir + "candidates/resumes/";

    if (!fs.existsSync(resumeUploadDir)) {
      fs.mkdirSync(resumeUploadDir, { recursive: true });
    }
    console.log(resumeUploadDir);

    // File upload processing
    const processFileUpload = async (fileData, fileName, uploadDir) => {
      if (!fileData) {
        return { status: "false", finalname: "", fileExt: "" };
      }

      const current_time = new Date().getTime();
      const extension = fileName.split(".").pop().toLowerCase();
      const finalname = `${current_time}.${extension}`;

      if (extension !== "pdf") {
        return { status: "false", finalname: "", fileExt: "" };
      }

      const base64Data = fileData.replace(/^data:application\/pdf;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        return { status: "false", finalname: "", fileExt: "" };
      }
      console.log(buffer);

      await fs.promises.writeFile(path.join(uploadDir, finalname), buffer);
      console.log("done");
      return { status: "true", finalname, fileExt: extension };
    };

    const resumePromise = await processFileUpload(
      data.resume,
      req.body.resumeName,
      resumeUploadDir
    );

    if (resumePromise.status === "false") {
      return res.status(400).json({ error: "Invalid resume file" });
    }

    // Construct URLs
    const resumeFullPdfUrl = resumePromise.finalname
      ? `/candidates/resumes/${resumePromise.finalname}`
      : "";

    const candidate = new candidateModel({
      ...data,
      resume: resumeFullPdfUrl,
    });

    await candidate.save();

    return res
      .status(201)
      .json({ success: true, message: "Candidate created successfully" });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//gets all the candidates

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await candidateModel.find();
    const candidateData = candidates.map((candidate) => {
      return {
        candidateId: candidate.candidateId,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        mobile: candidate.mobile,
        status: candidate.status,
        linkedIn: candidate.linkedIn,
      };
    });

    return res.status(200).json({ success: true, data: candidateData });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getCandidate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Candidate ID is required" });
  }

  try {
    const candidate = await candidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const candidateData = {
      candidateId: candidate.candidateId,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      mobile: candidate.mobile,
      status: candidate.status,
      linkedIn: candidate.linkedIn,
    };

    return res.status(200).json({ success: true, data: candidateData });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a candidate

const updateCandidate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Candidate ID is required" });
  }
  const { success, data, error } = candidateValidationSchema.safeParse(
    req.body
  );

  if (!success) {
    return res.status(400).json({ error: error.errors });
  }

  try {
    const candidate = await candidateModel.findOne({ _id: id });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const uploadDir = process.cwd() + "/public/";
    const resumeUploadDir = uploadDir + "candidates/resumes/";

    [resumeUploadDir].forEach((dir) => {
      if (fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }
    });

    const processFileUpload = async (fileData, fileName, uploadDir) => {
      if (!fileData) {
        return { status: "false", finalname: "", fileExt: "" };
      }

      const current_time = new Date().getTime();
      const extension = fileName.split(".").pop().toLowerCase();
      const finalname = `${current_time}.${extension}`;

      if (extension !== "pdf") {
        return { status: "false", finalname: "", fileExt: "" };
      }

      const base64Data = fileData.replace(/^data:application\/pdf;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        return { status: "false", finalname: "", fileExt: "" };
      }

      await fs.promises.writeFile(uploadDir + finalname, base64Data, "base64");
      return { status: "true", finalname, fileExt: extension };
    };

    const resumePromise = await processFileUpload(
      data.resume,
      req.body.resumeName,
      resumeUploadDir
    );

    if (resumePromise.status === "false") {
      return res.status(400).json({ error: "Invalid resume file" });
    }

    const resumeFullPdfUrl = resumePromise.finalname
      ? `/candidates/resumes/${resumePromise.finalname}`
      : "";

    const updatedCandidate = await candidateModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
        resume: resumeFullPdfUrl,
      },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Candidate updated successfully" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a candidate

const deleteCandidate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Candidate ID is required" });
  }

  try {
    const candidate = await candidateModel.findOne({ _id: id });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    await candidateModel.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ success: true, message: "Candidate deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,
};
