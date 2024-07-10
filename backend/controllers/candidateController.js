const candidateModel = require("../models/candidateModel");
const { candidateValidationSchema } = require("../middleware/schemaValidator");
const fs = require("fs");
const path = require("path");

// Create a new candidate
const createCandidate = async (req, res) => {
  try {
    const { success, data, error } = candidateValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({ error: error.errors });
    }
    const existingCandidate = await candidateModel.findOne({
      email: data.email,
    });
    if (existingCandidate) {
      return res.status(400).json({ error: "Candidate already exists" });
    }

    /* const uploadDir = process.cwd() + "/public/";
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
      : ""; */

    const newCandidate = new candidateModel(data);
    await newCandidate.save();


    return res.status(201).json({ message: "Candidate created successfully" });
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

    return res.status(200).json({
      message: "Candidates fetched successfully",
      data: candidates,
    });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const candidate = await candidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({
      message: "Candidate fetched successfully",
      data: {
        candidateId: candidate.candidateId,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        mobile: candidate.mobile,
        gender: candidate.gender,
        linkedIn: candidate.linkedIn,
        resume: candidate.resume,
        skills: candidate.skills,
        experience: candidate.experience,
        appliedPosition: candidate.appliedPosition,
        status: candidate.status,
        idProof: candidate.idProof,
      },
    });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a candidate

const updateCandidate = async (req, res) => {
  try {
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
    const candidate = await candidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    /* const uploadDir = process.cwd() + "/public/";
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
 */
    const updatedCandidate = await candidateModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({ message: "Candidate updated successfully" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a candidate

const deleteCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const candidate = await candidateModel.findOneAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchCandidate = async (req, res) => {
  try {
    const { search: query } = req.query;

    // Validate the search query
    if (!query) {
      return res.status(400).json({ error: "No search query provided" });
    }

    // Construct the search query
    const searchQuery = {
      $or: [
        { firstName: { $regex: new RegExp(query, "i") } },
        { lastName: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
        { gender: { $regex: new RegExp(query, "i") } },
        { state: { $regex: new RegExp(query, "i") } },
        { mobile: { $regex: new RegExp(query, "i") } },
        { status: { $regex: new RegExp(query, "i") } },
        { appliedPosition: { $regex: new RegExp(query, "i") } },
        { experience: { $regex: new RegExp(query, "i") } },
      ],
    };

    // Check if the query contains both first and last names
    if (query.includes(" ")) {
      const [firstName, lastName] = query.split(" ");

      // Update search query to match both first and last names together
      searchQuery.$or.push({
        $and: [
          { firstName: { $regex: new RegExp(firstName, "i") } },
          { lastName: { $regex: new RegExp(lastName, "i") } },
        ],
      });
    }

    // Perform search using Mongoose's find method
    const results = await candidateModel.find(searchQuery);

    // Return the search results
    res.status(200).json({
      message: "Searching candidates successful",
      data: results,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error occurred during search:", err);

    // Return a 500 status code with a generic error message
    res
      .status(500)
      .json({ success: false, status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,
  searchCandidate,
};
