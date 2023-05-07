import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";

/*
The category you want to get headlines for. Possible options: business, entertainment, general, health, science, sports, technology
*/

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    // this could be coming from an API
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({
    params: { category: slug },
  }));

  return {
    paths,
    fallback: false, // show error if category is not found
  };
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=` +
      process.env.NEWS_API_KEY
  );

  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60, //update static date in production in every 5 minutes
  };
  // let error go to 500 page
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();
  const title = "Category: " + categoryName;
  return (
    <>
      <Head>
        <title key="title">{`${title} - News app`}</title>
      </Head>
      <main>
        <h1 className="h1">{title}</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CategoryNewsPage;
