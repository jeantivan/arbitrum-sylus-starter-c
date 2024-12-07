import { client } from "../../../lib/contract";

export async function GET() {
  const readed = await client({ function: "hello_world" });

  return Response.json({
    readed
  });
}
