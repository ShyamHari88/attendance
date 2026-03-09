import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/auth';
import { departments, years, sections } from '@/data/mockData';
import { GraduationCap, ArrowLeft, User, Mail, Hash, Lock, Building, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StudentSignup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rollNumber: '',
        password: '',
        confirmPassword: '',
        departmentId: '1',
        year: 1,
        section: 'C'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.rollNumber || !formData.password) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await authService.studentSignup({
                name: formData.name,
                email: formData.email,
                rollNumber: formData.rollNumber,
                password: formData.password,
                departmentId: formData.departmentId,
                year: formData.year,
                section: formData.section,
                currentSemester: (formData.year * 2) - 1
            });

            toast.success('Account created successfully!');
            navigate('/student-dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-8">
            <div className="w-full max-w-xl animate-fade-in">
                {/* Logo */}
                <div className="mb-6 text-center">
                    <Link to="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
                            <img
                                src="/easy-attendance-logo.png"
                                alt="EasyAttendance Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>
                </div>

                <Card className="card-elevated">
                    <CardHeader className="text-center relative pb-2">
                        <Link to="/login" className="absolute left-6 top-6 text-muted-foreground hover:text-foreground transition-colors flex items-center text-sm">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back
                        </Link>

                        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm mt-2">
                            <GraduationCap size={28} />
                        </div>

                        <CardTitle className="font-display text-2xl">Student Sign Up</CardTitle>
                        <CardDescription>Create your student account to access the portal</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Roll Number */}
                                <div className="space-y-2">
                                    <label htmlFor="rollNumber" className="text-sm font-medium text-foreground">
                                        Roll Number *
                                    </label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="rollNumber"
                                            type="text"
                                            placeholder="23IT151"
                                            value={formData.rollNumber}
                                            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                            className="pl-10 uppercase"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">
                                        Section
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                                        <Select
                                            value={formData.section}
                                            onValueChange={(val) => setFormData({ ...formData, section: val })}
                                        >
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder="Section" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sections.map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        Section {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Details - Selects side by side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                                        <Select
                                            value={formData.departmentId}
                                            onValueChange={(val) => setFormData({ ...formData, departmentId: val })}
                                        >
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder="Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.id}>
                                                        {dept.code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">
                                        Year
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                                        <Select
                                            value={formData.year.toString()}
                                            onValueChange={(val) => setFormData({ ...formData, year: parseInt(val) })}
                                        >
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((y) => (
                                                    <SelectItem key={y.value} value={y.value.toString()}>
                                                        {y.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Password */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 pb-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                        Confirm Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground pt-4">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Login here
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
