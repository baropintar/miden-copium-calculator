export async function GET(req, context) {
  const params = await context.params; // 👈 WAJIB!

  const handle = params.handle.replace("@", "");
  const avatarUrl = `https://unavatar.io/twitter/${handle}`;

  return Response.json({ avatar: avatarUrl });
}
