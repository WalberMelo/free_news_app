import { Card } from "react-bootstrap";
import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import placeholderImage from "@/assets/images/newsarticle_placeholder.jpg";

interface NewsArticlesProps {
  article: NewsArticle;
}

const NewsArticlesEntry = ({ article }: NewsArticlesProps) => {
  const { title, description, url, urlToImage } = article;
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  //TODO: Pagination
  return (
    <a href={url}>
      <Card className="h-100 text-gray-800 bg-gray-200 hover:bg-grey-700 pointer-events-none">
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt="News article image"
          className="card-img-top"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticlesEntry;
