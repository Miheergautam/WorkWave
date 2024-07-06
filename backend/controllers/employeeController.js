const employeeModel = require("../models/employeeModel");
const { employeeValidationSchema } = require("../middleware/schemaValidator");

const fs = require("fs");
const User = require("../models/userModel");

/// Create Employee
const createEmployee = async (req, res) => {
  // Validate input data against the schema

  try {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    req.body.dateOfJoining = new Date(req.body.dateOfJoining);

    const { success, data, error } = employeeValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    // Check if employee already exists
    const employeeExists = await employeeModel.findOne({ email: data.email });
    if (employeeExists) {
      return res
        .status(400)
        .json({ success: false, error: "Employee already exists" });
    }

    /* // Directory setup
    const uploadDir = process.cwd() + "/public/";
    const resumePdfUploadDir = uploadDir + "employee/resume_pdf/";
    const idProofPdfUploadDir = uploadDir + "employee/proof_pdf/";
    const panCardPdfUploadDir = uploadDir + "employee/pan_card_pdf/";
    const marksheetPdfUploadDir = uploadDir + "employee/marksheet_pdf/";

    // Ensure directories exist
    [
      resumePdfUploadDir,
      idProofPdfUploadDir,
      panCardPdfUploadDir,
      marksheetPdfUploadDir,
    ].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

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

      await fs.promises.writeFile(uploadDir + finalname, base64Data, "base64");
      return { status: "true", finalname, fileExt: extension };
    };

    // Process all files
    const resumePromise = await processFileUpload(
      data.resume,
      req.body.resumePdfName,
      resumePdfUploadDir
    );
    const proofPromise = await processFileUpload(
      data.idProof,
      req.body.proofPdfName,
      idProofPdfUploadDir
    );
    const panPromise = await processFileUpload(
      data.panCard,
      req.body.panPdfName,
      panCardPdfUploadDir
    );
    const marksheetPromise = await processFileUpload(
      data.marksheet,
      req.body.marksheetPdfName,
      marksheetPdfUploadDir
    );

    // Construct URLs
    const resumeFullPdfUrl = resumePromise.finalname
      ? `employee/resume_pdf/${resumePromise.finalname}`
      : "";
    const proofFullPdfUrl = proofPromise.finalname
      ? `employee/proof_pdf/${proofPromise.finalname}`
      : "";
    const panFullPdfUrl = panPromise.finalname
      ? `employee/pan_card_pdf/${panPromise.finalname}`
      : "";
    const marksheetFullPdfUrl = marksheetPromise.finalname
      ? `employee/marksheet_pdf/${marksheetPromise.finalname}`
      : ""; */

    // Create new employee
    const newEmployee = new employeeModel({
      ...data,
      /* resume: resumeFullPdfUrl,
      idProof: proofFullPdfUrl,
      panCard: panFullPdfUrl,
      marksheet: marksheetFullPdfUrl, */
    });

    // Save employee to database
    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully!",
      UserId: newEmployee._id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// List Employees
const listEmployees = async (req, res) => {
  try {
    // Fetch all employee data from the database
    const employees = await employeeModel.find().select("-password");

    return res.status(200).json({
      messsage: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get Employee by ID
const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Employee ID is required" });
    }

    // Fetch employee data by ID from the database
    const employee = await employeeModel.findById(id).select("-password");

    // Return error response if employee not found
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Employee ID is required" });
    }

    const { success, data, error } = employeeValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    if (data.email !== undefined) {
      res
        .status(400)
        .json({ success: false, error: "Email cannot be updated" });
    }

    /* // Directory setup
    const uploadDir = process.cwd() + "/public/";
    const resumePdfUploadDir = uploadDir + "employee/resume_pdf/";
    const idProofPdfUploadDir = uploadDir + "employee/proof_pdf/";
    const panCardPdfUploadDir = uploadDir + "employee/pan_card_pdf/";
    const marksheetPdfUploadDir = uploadDir + "employee/marksheet_pdf/";

    // Ensure directories exist
    [
      resumePdfUploadDir,
      idProofPdfUploadDir,
      panCardPdfUploadDir,
      marksheetPdfUploadDir,
    ].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

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

      await fs.promises.writeFile(uploadDir + finalname, base64Data, "base64");
      return { status: "true", finalname, fileExt: extension };
    };

    // Process all files
    const resumePromise = await processFileUpload(
      data.resume,
      req.body.resumePdfName,
      resumePdfUploadDir
    );
    const proofPromise = await processFileUpload(
      data.idProof,
      req.body.proofPdfName,
      idProofPdfUploadDir
    );
    const panPromise = await processFileUpload(
      data.panCard,
      req.body.panPdfName,
      panCardPdfUploadDir
    );
    const marksheetPromise = await processFileUpload(
      data.marksheet,
      req.body.marksheetPdfName,
      marksheetPdfUploadDir
    );

    // Construct URLs
    const resumeFullPdfUrl = resumePromise.finalname
      ? `employee/resume_pdf/${resumePromise.finalname}`
      : data.resume;
    const proofFullPdfUrl = proofPromise.finalname
      ? `employee/proof_pdf/${proofPromise.finalname}`
      : data.idProof;
    const panFullPdfUrl = panPromise.finalname
      ? `employee/pan_card_pdf/${panPromise.finalname}`
      : data.panCard;
    const marksheetFullPdfUrl = marksheetPromise.finalname
      ? `employee/marksheet_pdf/${marksheetPromise.finalname}`
      : data.marksheet; */

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        ...data,
        /* resume: resumeFullPdfUrl,
        idProof: proofFullPdfUrl,
        panCard: panFullPdfUrl,
        marksheet: marksheetFullPdfUrl, */
      },
      { new: true, runValidators: true }
    );

    if (updatedEmployee) {
      return res.status(200).json({
        message: "Employee updated successfully!",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Employee ID is required" });
    }
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
