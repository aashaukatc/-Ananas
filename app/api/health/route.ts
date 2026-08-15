export async function GET() {
  return Response.json({
    service: "ananas-web",
    status: "ok",
    timestamp: new Date().toISOString(),
    runtime: process.version,
  });
}
