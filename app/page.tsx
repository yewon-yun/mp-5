"use client";

import { useState } from "react";
import createLink from "./createLinks";
import styled from "styled-components";

const StyledHeading = styled.h1`
    margin: 10px auto;
`

const StyledMain = styled.main`
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    box-sizing: border-box;
`;

const StyledDiv = styled.div`
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #FFF8F9;
  color: black;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #FBDAEA;
  }
`;

export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [message, setMessage] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    return (
        <main className="short-page">
            <div className="short-card">
                <h1 className="short-heading">URL Shortener</h1>
                <form onSubmit={(event) => {
                        event.preventDefault();
                        setMessage("");
                        setShortUrl("");

                        createLink(url, alias)
                            .then((result) => {
                                if (result.error) {
                                    setMessage(result.error);
                                } else {
                                    setShortUrl(`https://mp-5-xp4n.vercel.app/r/${alias}`);
                                }
                            })
                            .catch(() => setMessage("Could not save link."));
                    }}>

                        <div className="short-input">
                            <label htmlFor="url">URL</label>
                            <input
                                id="url"
                                type="url"
                                value={url}
                                placeholder={"https://your_url.com/"}
                                onChange={(event) => setUrl(event.target.value)}
                                required
                            />
                        </div>

                        <div className="short-input">
                            <label htmlFor="alias">Custom Alias</label>
                            <input
                                id="alias"
                                type="text"
                                value={alias}
                                placeholder={"your-custom-alias"}
                                onChange={(event) => setAlias(event.target.value)}
                                required
                            />
                        </div>

                    <button className="short-button" type="submit">Shorten</button>

                </form>

                <div className="short-result">
                    <p>{message}</p>
                    <a href={shortUrl} target="_blank">{shortUrl}</a>
                </div>
            </div>



        </main>
    );
}