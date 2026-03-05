import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Student from './src/models/Student.js';

dotenv.config();

async function check() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI?.replace(/:([^@]+)@/, ':****@'));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected');

        const advisors = await User.find({ role: 'advisor' }).select('-password');
        console.log(`\n--- ADVISORS (${advisors.length}) ---`);
        advisors.forEach(a => console.log(`- ${a.name} (${a.advisorId}) Dept: ${a.departmentId}, Sec: ${a.section}`));

        const studentsInUser = await User.find({ role: 'student' });
        console.log(`\n--- STUDENTS IN USER TABLE (${studentsInUser.length}) ---`);
        studentsInUser.forEach(s => console.log(`- ${s.name} (${s.rollNumber}) Dept: ${s.departmentId}, Sec: ${s.section}, Approved: ${s.isApproved}`));

        const studentsInStudent = await Student.find();
        console.log(`\n--- STUDENT RECORDS (${studentsInStudent.length}) ---`);
        studentsInStudent.forEach(s => console.log(`- ${s.name} (${s.rollNumber}) Dept: ${s.departmentId}, Sec: ${s.section}`));

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

check();
