import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <h1>URL Shortener</h1>

      <form>
        <div>
          <label htmlFor="url">URL</label>
          <input id="url" name="url" type="url" placeholder="https://example.com/long/url" required/>
        </div>

        <div>
          <label htmlFor="alias">Custom Alias</label>
          <input id="alias" name="alias" type="text" placeholder="your-custom alias" required/>
        </div>

        <button type="button">Shorten</button>
      </form>
    </main>
  );
}
