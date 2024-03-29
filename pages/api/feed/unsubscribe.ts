import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// PATCH /api/feed/subscribe
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    const session = await getSession({ req });

    const feed = await prisma.feed.findUnique({
        where: {
            id: id.toString()
        },
        include: {
            subscribers: {
                select: { email: true }
            }
        }
    })

    // @ts-ignore
    let subscribers = feed.subscribers.filter(u => u.email !== session?.user?.email)

    const result = await prisma.feed.update({
        where: {
            id: id.toString()
        },
        data: {
            subscribers: {
                set: subscribers
            }
        }
    })

    res.status(200)
    res.json({
        'Unsubscribed from feed': id
    })
}