import { signJwt, verifyPassword } from '@/lib/auth';
import { usersDb } from '@/lib/users-db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 422 },
      );
    }

    const user = usersDb.get(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid login credentials' },
        { status: 401 },
      );
    }

    const isValid = verifyPassword(password, user.hash, user.salt);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid login credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = signJwt({ sub: user.id, email: user.email });

    return NextResponse.json({
      token,
      user: { email: user.email },
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
