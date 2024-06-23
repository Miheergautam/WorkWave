const employeeModel = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { employeeValidationSchema } = require("../middleware/schemaValidator");

/// Create Employee
const createEmployee = async (req, res) => {
  // Validate input data against the schema
  const { success, data, error } = employeeValidationSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ success: false, errors: error.errors });
  }

  try {
    // Check if employee already exists
    const employeeExists = await employeeModel.findOne({ email: data.email });
    if (employeeExists) {
      return res
        .status(400)
        .json({ success: false, error: "Employee already exists" });
    }

    // Directory setup
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
      : "";

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new employee
    const employee = new employeeModel({
      ...data,
      password: hashedPassword,
      resume: resumeFullPdfUrl,
      idProof: proofFullPdfUrl,
      panCard: panFullPdfUrl,
      marksheet: marksheetFullPdfUrl,
    });

    // Save employee to database
    await employee.save();

    return res.status(201).json({
      success: true,
      message: "Employee created successfully!",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// List Employees
const listEmployees = async (req, res) => {
  try {
    // Fetch all employee data from the database
    const employees = await employeeModel.find();

    // Map the employee data to include only the required fields
    const employeesData = employees.map((employee) => {
      return {
        employeeId: employee.employeeId,
        userId: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
      };
    });

    return res.status(200).json({ success: true, data: employeesData });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get Employee by ID
const getEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    // Fetch employee data by ID from the database
    const employee = await employeeModel.findById(id);

    // Return error response if employee not found
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const employeeData = {
      employeeId: employee.employeeId,
      userId: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
    };

    return res.status(200).json({ success: true, data: employeeData });
  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  const id = req.params.id; // Use req.params.id
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Employee ID is required" });
  }

  const { success, data, error } = employeeValidationSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ success: false, errors: error.errors });
  }

  try {
    if (data.email !== undefined) {
      res
        .status(400)
        .json({ success: false, error: "Email cannot be updated" });
    }

    // Directory setup
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
      : data.marksheet;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        ...data,
        resume: resumeFullPdfUrl,
        idProof: proofFullPdfUrl,
        panCard: panFullPdfUrl,
        marksheet: marksheetFullPdfUrl,
        password: hashedPassword,
      },
      { new: true, runValidators: true }
    );

    if (updatedEmployee) {
      return res.status(200).json({
        success: true,
        message: "Employee updated successfully!",
        data: updatedEmployee,
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
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Employee ID is required" });
  }

  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);

    if (deletedEmployee) {
      return res
        .status(200)
        .json({ success: true, message: "Employee deleted successfully!" });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
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
