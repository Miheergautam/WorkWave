const consultancyModel = require("../models/consultancyModel");
const {
  consultancyValidationSchema,
} = require("../middleware/schemaValidator");
const fs = require("fs");

const parseISODate = (isoDateString) => {
  const dateParts = isoDateString.split("T")[0]; // Split at 'T' and take the date part
  return new Date(dateParts);
};

// Create a new consultancy
const createConsultancy = async (req, res) => {
  try {
    req.body.contractStartDate = parseISODate(req.body.contractStartDate);
    req.body.contractEndDate = parseISODate(req.body.contractEndDate);

    const { success, data, error } = consultancyValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Check if consultancy with the same email already exists
    const existingConsultancy = await consultancyModel.findOne({
      email: data.email,
    });
    if (existingConsultancy) {
      return res.status(400).json({
        success: false,
        message: "Consultancy already exists with this email",
      });
    }

    // Create directories if they don't exist
    const uploadDir = process.cwd() + "/public";
    const agreementUploadDir = uploadDir + "/consultancy/agreements/";
    if (!fs.existsSync(agreementUploadDir)) {
      fs.mkdirSync(agreementUploadDir, { recursive: true });
    }

    // Function to process file upload
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

      try {
        await fs.promises.writeFile(
          uploadDir + finalname,
          base64Data,
          "base64"
        );
        return { status: "true", finalname, fileExt: extension };
      } catch (error) {
        console.error("Error writing file:", error);
        return { status: "false", finalname: "", fileExt: "" };
      }
    };

    // Process contract agreement file upload
    const contractAgreement = await processFileUpload(
      data.contractAgreement,
      req.body.contractAgreementName,
      agreementUploadDir
    );

    // Handle invalid file format
    if (contractAgreement.status === "false") {
      return res.status(400).json({
        success: false,
        message: "Invalid file format",
      });
    }

    // Save the consultancy to the database
    const contractAgreementUrl = contractAgreement.finalname
      ? `/consultancy/agreements/${contractAgreement.finalname}`
      : "";
    const consultancy = new consultancyModel({
      ...data,
      contractAgreement: contractAgreementUrl,
    });

    await consultancy.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Consultancy created successfully",
      data: consultancy,
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error creating consultancy:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get all consultancies

const listConsultancies = async (req, res) => {
  try {
    const consultancies = await consultancyModel.find();
    res.status(200).json({
      success: true,
      data: consultancies,
    });
  } catch (error) {
    console.error("Error listing consultancies:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get consultancy by id
const getConsultancyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Consultancy ID is required",
      });
    }

    const consultancy = await consultancyModel.findById(id);
    if (!consultancy) {
      return res.status(404).json({
        success: false,
        message: "Consultancy not found",
      });
    }
    res.status(200).json({
      success: true,
      data: consultancy,
    });
  } catch (error) {
    console.error("Error getting consultancy by id:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// update consultancy
const updateConsultancy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Consultancy ID is required",
      });
    }

    const { success, data, error } = consultancyValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Create directories if they don't exist
    const uploadDir = process.cwd() + "/public";
    const agreementUploadDir = uploadDir + "/consultancy/agreements/";
    if (!fs.existsSync(agreementUploadDir)) {
      fs.mkdirSync(agreementUploadDir, { recursive: true });
    }

    // Function to process file upload
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

    // Process contract agreement file upload
    const contractAgreement = await processFileUpload(
      data.contractAgreement,
      req.body.contractAgreementPdfName,
      agreementUploadDir
    );

    // Handle invalid file format
    if (contractAgreement.status === "false") {
      return res.status(400).json({
        success: false,
        message: "Invalid file format",
      });
    }

    // Save the consultancy to the database
    const contractAgreementUrl = contractAgreement.finalname
      ? `/consultancy/agreements/${contractAgreement.finalname}`
      : "";

    const consultancy = await consultancyModel.findByIdAndUpdate(
      id,
      {
        ...data,
        contractAgreement: contractAgreementUrl,
      },
      { new: true }
    );

    if (!consultancy) {
      return res.status(404).json({
        success: false,
        message: "Consultancy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultancy updated successfully",
      data: consultancy,
    });
  } catch (error) {
    console.error("Error updating consultancy:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete consultancy
const deleteConsultancy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Consultancy ID is required",
      });
    }

    const consultancy = await consultancyModel.findByIdAndDelete(id);
    if (!consultancy) {
      return res.status(404).json({
        success: false,
        message: "Consultancy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultancy deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting consultancy:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createConsultancy,
  listConsultancies,
  getConsultancyById,
  updateConsultancy,
  deleteConsultancy,
};
