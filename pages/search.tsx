import React, { FormEvent, useState } from "react";
import Head from "next/head";
import { NewsArticle } from "@/models/NewsArticles";
import { Button, Form, Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";

const SearchNewsPage = () => {
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);

        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.log(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News - Trust News App</title>
      </Head>
      <main>
        <h1 className="h1">Search News</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="E.g. Politics, sports, ..."
            />
          </Form.Group>
          <Button
            className="mb-3"
            type="submit"
            disabled={searchResultsLoading}
          >
            Submit
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {searchResultsLoading && <Spinner animation="border" />}
          {searchResultsLoadingIsError && (
            <Alert key="Warning" variant="Warning">
              Something went wrong. Please try again
            </Alert>
          )}
          {searchResults?.length === 0 && (
            <Alert key="Warning" variant="Warning">
              Nothing found. Try a different query
            </Alert>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
};

export default SearchNewsPage;
