"use server";

import getCollection, { LINKS_COLLECTION } from "../db";

export default async function createLink(url: string, alias: string) {
    const link = {
        url: url,
        alias: alias,
    };

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const res = await linksCollection.insertOne({ ...link });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...link, id: res.insertedId.toHexString() };
}