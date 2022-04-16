import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, feedId } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      feedId: feedId,
    },
  });
  res.json(result);
}