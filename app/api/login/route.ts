export async function GET() {
  return Response.json(
    { message: "Login is handled by the backend auth service." },
    { status: 501 },
  );
}

export async function POST() {
  return Response.json(
    { message: "Login is handled by the backend auth service." },
    { status: 501 },
  );
}
