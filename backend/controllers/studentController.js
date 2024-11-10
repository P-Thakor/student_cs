// studentController.js

const path = require('path');
const Student = require('../models/User');

exports.saveStudentProfile = async (req, res) => {
    try {
        const { _id, firstName, lastName, Class, parentsName, parentsPhone, address, phone } = req.body;

        // Handle photo file if provided
        let photoPath;
        if (req.file) {
            photoPath = path.join('/uploads', req.file.filename); // Save the relative path to the photo
        }

        // Check if student already exists and update, else create new student profile
        const student = await Student.findOneAndUpdate(
            { _id: _id }, // Make sure to pass the correct identifier, using `_id` from req.body or req.params
            {
                firstName,
                lastName,
                Class,
                parentsName,
                parentsPhone,
                address,
                phone,
                photo: photoPath || undefined // Only update photo if a new one is provided
            },
            { new: true, upsert: true } // Create if doesn't exist
        );

        res.status(200).json({ message: 'Student profile saved successfully', student });
    } catch (error) {
        console.error('Error saving student profile:', error);
        res.status(500).json({ message: 'Error saving student profile' });
    }
};


exports.fetchStudentProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ phone: req.body.email });
        res.status(200).json({ student });
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Error fetching student profile' });
    }
}
