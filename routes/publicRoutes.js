const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorSchema');
const Review = require('../models/review');
const { Signupdetail } = require('../models/signupSchema');
const { AppointmentSchema } = require('../models/appintmentSchema');

/**
 * GET /api/public/top-doctors
 * Returns top doctors sorted by experience
 */
router.get('/top-doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: true })
      .select('firstName lastName title specialty workInfo.experience workInfo.hospital availability')
      .sort({ 'workInfo.experience': -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: doctors.map(doc => ({
        _id: doc._id,
        name: `${doc.firstName} ${doc.lastName}`,
        title: doc.title,
        specialty: doc.specialty,
        experience: doc.workInfo?.experience || 0,
        hospital: doc.workInfo?.hospital || 'City General Hospital',
        availability: doc.availability?.days || 'Mon-Fri'
      }))
    });
  } catch (error) {
    console.error('Error fetching top doctors:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/public/testimonials
 * Returns recent patient reviews
 */
router.get('/testimonials', async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('doctorId', 'firstName lastName specialty')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: reviews.map(review => ({
        _id: review._id,
        content: review.content,
        patientName: review.createdBy ? 
          `${review.createdBy.firstName || ''} ${review.createdBy.lastName || ''}`.trim() || 'Anonymous' 
          : 'Anonymous',
        doctorId: review.doctorId?._id,
        doctorName: review.doctorId ? 
          `Dr. ${review.doctorId.firstName} ${review.doctorId.lastName}` 
          : 'Unknown Doctor',
        doctorSpecialty: review.doctorId?.specialty || 'General'
      }))
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/public/stats
 * Returns hospital statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const [doctorCount, patientCount, appointmentCount] = await Promise.all([
      Doctor.countDocuments({ status: true }),
      Signupdetail.countDocuments({ userType: 'patient' }),
      AppointmentSchema.countDocuments({})
    ]);
    
    res.json({
      success: true,
      data: {
        doctors: doctorCount,
        patients: patientCount,
        appointments: appointmentCount,
        yearsOfService: 15 // Static for now
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/public/departments
 * Returns unique specialties/departments
 */
router.get('/departments', async (req, res) => {
  try {
    const departments = await Doctor.distinct('specialty', { status: true });
    
    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
