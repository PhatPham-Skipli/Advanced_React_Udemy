import { verifyJwt } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized: Missing or invalid token' },
      { status: 401 },
    );
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Unauthorized: Token is expired or invalid' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    message: '🎉 This is secret feature data only accessible to authenticated users!',
    user: payload.email,
    timestamp: new Date().toISOString(),
  });
}
