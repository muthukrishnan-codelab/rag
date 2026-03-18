import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email=$1 AND password=$2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        user: result.rows[0],
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}