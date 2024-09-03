const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, subject, marks } = req.body;
    
    // Check for duplicate student by name and subject
    const existingStudent = await Student.findOne({ name, subject });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student with the same name and subject already exists' });
    }

    const newStudent = new Student({ name, subject, marks });
    await newStudent.save();
    res.status(201).json({ success: true, message: 'Student created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating student', error });
  }
};


// Get all student
exports.getAllStudent = async (req, res) => {
  try {
    
    // Check for duplicate student by name and subject
    const students = await Student.find({});


    res.status(200).json({ success: true,students, message: 'Student created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating student', error });
  }
};

// Edit an existing student
exports.editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating student', error });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error deleting student', error });
  }
};
