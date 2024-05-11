import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./HomePage.module.css";
import { FEED_VARIANT } from "../values";

function HomePage() {
  return (
    <Container className={styles.container}>
      <PostList variant={FEED_VARIANT.HOME_FEED} showPostForm />
    </Container>
  );
}

export default HomePage;
