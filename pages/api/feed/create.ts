import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/feed/create
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, tags } = req.body;
    const session = await getSession({ req });

    const result = await prisma.feed.create({
        data: {
            title: title,
            tags: tags,
            // @ts-ignore
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result)
}