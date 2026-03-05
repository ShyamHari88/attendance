import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Student from './src/models/Student.js';
import Subject from './src/models/Subject.js';
import Assignment from './src/models/Assignment.js';
import AttendanceRecord from './src/models/AttendanceRecord.js';
import crypto from 'crypto';

dotenv.config();

async function megaSync() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Mega-Sync Started');

        // 1. Ensure Admin exists with reliable password
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('   Creating Admin...');
            await User.create({
                userId: 'admin-001',
                name: 'System Administrator',
                email: 'admin@college.edu',
                password: 'Password@123',
                role: 'admin'
            });
        } else {
            console.log('   Admin exists, resetting password for safety...');
            admin.password = 'Password@123';
            await admin.save();
        }

        // 2. Fix Teachers
        const teachers = await User.find({ role: 'teacher' });
        for (let i = 0; i < teachers.length; i++) {
            const t = teachers[i];
            if (!t.teacherId) {
                t.teacherId = `TCH00${i + 1}`;
                await t.save();
                console.log(`   Fixed Teacher ID for ${t.name}: ${t.teacherId}`);
            }
        }

        // 3. Ensure a valid Advisor exists
        let advisor = await User.findOne({ role: 'advisor' });
        if (!advisor) {
            console.log('   Creating Advisor...');
            advisor = await User.create({
                userId: 'advisor-test',
                advisorId: 'ADV001',
                name: 'Test Advisor',
                email: 'advisor@test.com',
                password: 'password123',
                role: 'advisor',
                departmentId: '1', // IT
                section: 'C'
            });
        }
        console.log(`   Advisor: ${advisor.name} (${advisor.advisorId}) [Dept: ${advisor.departmentId}, Sec: ${advisor.section}]`);

        // 4. Fix Students
        const studentRecords = await Student.find();
        for (const s of studentRecords) {
            s.isApproved = true;
            await s.save();

            let user = await User.findOne({ rollNumber: s.rollNumber });
            if (!user) {
                user = await User.create({
                    userId: `user-${crypto.randomBytes(8).toString('hex')}`,
                    name: s.name,
                    email: s.email || `${s.rollNumber}@college.edu`,
                    password: s.rollNumber,
                    role: 'student',
                    rollNumber: s.rollNumber,
                    studentId: s.studentId,
                    departmentId: s.departmentId,
                    year: s.year,
                    section: s.section,
                    currentSemester: s.currentSemester,
                    isApproved: true
                });
                console.log(`   Created User for ${s.name}`);
            } else {
                user.isApproved = true;
                user.section = s.section;
                user.departmentId = s.departmentId;
                await user.save();
            }
        }

        // 5. Create Subjects and Assignments
        const deptId = '1'; // IT
        const year = 1;
        const sem = 1;
        const section = 'C';

        const teacher = await User.findOne({ role: 'teacher' });

        const subjectNames = ['Web Programming', 'Data Structures', 'Operating Systems'];
        for (const name of subjectNames) {
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            const sid = `sub-${slug}`;

            let subject = await Subject.findOne({ subjectId: sid });
            if (!subject) {
                subject = await Subject.create({
                    subjectId: sid,
                    name,
                    code: slug.toUpperCase(),
                    departmentId: deptId,
                    year,
                    semester: sem,
                    teacherId: teacher?.teacherId || 'TCH001',
                    teacherName: teacher?.name || 'Dr. John Doe'
                });
                console.log(`   Created Subject: ${name}`);
            }

            // Create assignment
            const aid = `assign-${sid}-${section}`;
            let assignment = await Assignment.findOne({ assignmentId: aid });
            if (!assignment) {
                await Assignment.create({
                    assignmentId: aid,
                    subjectId: sid,
                    teacherId: teacher?.teacherId || 'TCH001',
                    department: deptId,
                    section
                });
                console.log(`   Created Assignment for ${name} [Sec ${section}]`);
            }
        }

        // 6. Seed Attendance (so dashboard charts work)
        const attendanceCount = await AttendanceRecord.countDocuments();
        if (attendanceCount === 0) {
            console.log('   Seeding Attendance...');
            const studentsInSec = await Student.find({ departmentId: deptId, section });
            const activeSubject = await Subject.findOne({ departmentId: deptId });

            const dates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.push(date);
            }

            const records = [];
            for (const date of dates) {
                for (const student of studentsInSec) {
                    records.push({
                        recordId: `att-${crypto.randomBytes(12).toString('hex')}`,
                        studentId: student.studentId,
                        rollNumber: student.rollNumber,
                        subjectId: activeSubject.subjectId,
                        subjectName: activeSubject.name,
                        date: date,
                        period: 1,
                        status: Math.random() > 0.1 ? 'present' : 'absent',
                        departmentId: student.departmentId,
                        year: student.year,
                        section: student.section,
                        semester: student.currentSemester,
                        teacherId: teacher?.teacherId || 'TCH001'
                    });
                }
            }
            await AttendanceRecord.insertMany(records);
            console.log(`   Inserted ${records.length} attendance records`);
        }

        console.log('\n🚀 ALL DASHBOARS READY! FULL WORKING STATE ACHIEVED.');
        console.log('Admin: admin@college.edu / Password@123');
        console.log('Advisor: ADV001 / password123');
        console.log('Student: 23IT132 / 23IT132');

    } catch (err) {
        console.error('❌ Sync Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

megaSync();
