export async function POST(request: Request) {
  void request;
  return Response.json(
    { error: "This tournament registration page has been removed." },
    { status: 410 },
  );
}
