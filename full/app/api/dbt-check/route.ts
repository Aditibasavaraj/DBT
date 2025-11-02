import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, aadhaar, account, bank } = await request.json();

    // Basic validation
    if (!name || !aadhaar || !account) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Simulate DBT status check (replace with actual logic later)
    const lastDigit = Number(String(aadhaar).slice(-1));
    const dbtReady = !Number.isNaN(lastDigit) && lastDigit % 2 === 0;

    return NextResponse.json({
      message: dbtReady
        ? "Your account appears to be DBT-ready. Please verify with your bank."
        : "Your account may not be DBT-enabled yet. Contact your bank to enable DBT.",
      status: dbtReady ? "ready" : "not-ready"
    });
  } catch (error) {
    console.error('DBT check error:', error);
    return NextResponse.json(
      { message: "An error occurred while checking DBT status" },
      { status: 500 }
    );
  }
}