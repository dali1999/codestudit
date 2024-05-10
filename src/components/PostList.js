import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "../api";
import Post from "./Post";
import { FEED_VARIANT } from "../values";
import styles from "./PostList.module.css";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = ["posts"];
    postsQueryFn = getPosts;
  } else if (variant === FEED_VARIANT.MY_FEED) {
    const username = "codeit";
    postsQueryKey = ["posts", username];
    postsQueryFn = () => getPostsByUsername(username);
  } else {
    console.warn("Invalid feed request.");
  }

  const {
    data: postsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,
    retry: 0,
  });

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  return (
    <div className={styles.postList}>
      {isPending && <div>Loading</div>}
      {isError && <div>ERROR!</div>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;