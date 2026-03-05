import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Student from './src/models/Student.js';
import Subject from './src/models/Subject.js';
import AttendanceRecord from './src/models/AttendanceRecord.js';
import Marks from './src/models/Marks.js';
import LeaveRequest from './src/models/LeaveRequest.js';

dotenv.config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const counts = {
            users: await User.countDocuments(),
            students: await Student.countDocuments(),
            subjects: await Subject.countDocuments(),
            attendance: await AttendanceRecord.countDocuments(),
            marks: await Marks.countDocuments(),
            leaves: await LeaveRequest.countDocuments(),
        };

        console.log('\n--- COLLECTION COUNTS ---');
        console.table(counts);

        const roles = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);
        console.log('\n--- USER ROLES ---');
        console.table(roles);

        const advisors = await User.find({ role: 'advisor' }).select('name advisorId departmentId section email');
        console.log('\n--- ADVISORS ---');
        console.table(advisors.map(a => ({
            name: a.name,
            id: a.advisorId,
            dept: a.departmentId,
            sec: a.section,
            email: a.email
        })));

        const instructors = await User.find({ role: 'teacher' }).select('name teacherId departmentId email');
        console.log('\n--- TEACHERS/INSTRUCTORS ---');
        console.table(instructors.map(t => ({
            name: t.name,
            id: t.teacherId,
            dept: t.departmentId,
            email: t.email
        })));

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

check();
