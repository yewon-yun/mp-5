"use server";

import getCollection, { LINKS_COLLECTION } from "../db";

export default async function createLink(url: string, alias: string) {
    if (alias.includes("/") || alias.includes("?")|| alias.includes("#")) {
        return { error: "Enter a valid alias." };
    }

    try {
        const newURL = new URL(url);

        if (newURL.protocol !== "http:" && newURL.protocol !== "https:") {
            return { error: "Enter a valid URL." };
        }
    } catch {
        return { error: "Enter a valid URL." };
    }/*to do backend validation as it says in mp5*/

    const link = {
        url: url,
        alias: alias,
    };

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const existingLinks = await linksCollection.find({ alias: alias }).toArray();

    if (existingLinks.length > 0) {
        return { error: "Alias already taken." };
    }

    const res = await linksCollection.insertOne({ ...link });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...link, id: res.insertedId.toHexString() };
}