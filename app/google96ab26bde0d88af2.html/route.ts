export async function GET() {
  return new Response(
    "google-site-verification: google96ab26bde0d88af2.html",
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  )
}
