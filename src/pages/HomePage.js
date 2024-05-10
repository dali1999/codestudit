import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./HomePage.module.css";
import { getPostsByUsername } from "../api";

function HomePage() {
  return (
    <Container className={styles.container}>
      <PostList />
    </Container>
  );
}

export default HomePage;
