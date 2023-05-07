import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Container } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import NextNProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`max-h-screen min-h-screen ${inter.className}`}>
      <Head>
        <title>Free News App</title>
        <meta
          name="description"
          key="description"
          content="Articles and breaking news headlines"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextNProgress />
      <NavBar />
      <Container className="m-8">
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
