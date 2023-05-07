import { Row, Col } from "react-bootstrap";
import { NewsArticle } from "@/models/NewsArticles";
import NewsArticlesEntry from "./NewsArticlesEntry";

interface NewsArticlesGrid {
  articles: NewsArticle[];
}

const NewsArticlesGrid = ({ articles }: NewsArticlesGrid) => {
  return (
    <Row xs={1} sm={2} x={3} className="g-4">
      {articles.map((article) => (
        <Col key={article.url}>
          <NewsArticlesEntry article={article} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsArticlesGrid;
