import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newResponse: NewsResponse = await res.json();

  return {
    props: {
      newsArticles: newResponse.articles,
    },
  };
  // let error go to 500 page
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News</title>
      </Head>
      <main className="container mx-auto">
        <h1 className="h1">Breaking News</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
