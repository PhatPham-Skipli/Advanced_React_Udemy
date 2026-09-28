import { hashPassword, signJwt } from '@/lib/auth';
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

    if (password.length < 4) {
      return NextResponse.json(
        { error: 'Password must be at least 4 characters' },
        { status: 422 },
      );
    }

    // Check if email already in use (Section 5 pattern)
    if (usersDb.has(email)) {
      return NextResponse.json(
        { error: 'Email is in use' },
        { status: 422 },
      );
    }

    // Hash password and store user
    const { hash, salt } = hashPassword(password);
    const userId = Date.now().toString();
    usersDb.set(email, {
      id: userId,
      email,
      hash,
      salt,
    });

    // Generate JWT token
    const token = signJwt({ sub: userId, email });

    return NextResponse.json({
      token,
      user: { email },
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
