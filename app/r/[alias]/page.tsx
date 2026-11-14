import { redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "../../../db";

export default async function AliasPage({params,}: { params: Promise<{ alias: string }>; }) {
    const { alias } = await params;

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const links = await linksCollection.find({ alias: alias }).toArray();

    if (links.length === 0) {
        return <p>Link not found.</p>;
    }

    redirect(links[0].url);
}