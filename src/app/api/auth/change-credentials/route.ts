import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-me';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { currentEmail, newEmail, currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'يرجى ملء جميع الحقول المطلوبة' }, { status: 400 });
        }

        // البحث عن المستخدم الحالي (أو البحث عن أي حساب مدير)
        const emailToFind = currentEmail?.trim() || undefined;
        let user;
        if (emailToFind) {
            user = await User.findOne({ email: emailToFind });
        } else {
            user = await User.findOne({ role: 'admin' });
        }

        if (!user) {
            return NextResponse.json({ error: 'لم يتم العثور على حساب المستخدم' }, { status: 404 });
        }

        // التحقق من صحة كلمة المرور الحالية
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 });
        }

        // تحديث البريد الإلكتروني إذا تم تغييره
        const updatedEmail = newEmail?.trim() || user.email;
        if (updatedEmail !== user.email) {
            const existingUser = await User.findOne({ email: updatedEmail });
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return NextResponse.json({ error: 'البريد الإلكتروني الجديد مستخدم بالفعل' }, { status: 400 });
            }
            user.email = updatedEmail;
        }

        // تشفير وتحديث كلمة المرور الجديدة
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // تجديد التوكن بالمعلومات الجديدة
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ 
            message: 'تم تغيير البريد الإلكتروني وكلمة المرور بنجاح',
            email: user.email 
        });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Error changing credentials:', error);
        return NextResponse.json({ error: 'حدث خطأ أثناء تغيير بيانات الدخول' }, { status: 500 });
    }
}
