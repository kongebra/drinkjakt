import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  recipes: Array<any>;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .setHeader("Allow", ["GET"])
      .json({ statusCode: 405, message: "method not allowed" });
  }

  return res.status(200).json({ recipes: [] });
}
