export let uploadFileHandler = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file attached to request!" });
  }

  let data = {
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadPath: `/uploads/${req.file.filename}`,
  };

  return res.status(200).json({
    success: true,
    message: "File uploaded successfully!",
    data,
  });
};

export let uploadMultipleFilesHandler = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files attached to request!" });
  }

  let data = req.files.map((file) => ({
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
    uploadPath: `/uploads/${file.filename}`,
  }));

  return res.status(200).json({
    success: true,
    message: "Files uploaded successfully!",
    data,
  });
};
