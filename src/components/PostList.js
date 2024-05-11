import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api";
import Post from "./Post";
import { FEED_VARIANT } from "../values";
import styles from "./PostList.module.css";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import PostForm from "./PostForm";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PAGE_LIMIT = 5;

function PostList({ variant = FEED_VARIANT.HOME_FEED, showPostForm }) {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = ["posts", page];
    postsQueryFn = () => getPosts(page, PAGE_LIMIT);
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
    isPlaceholderData,
  } = useQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,

    //매번 pending 상태가 되지 않고, 이전 데이터를 유지해서 보여주다가
    //새로운 데이터 fetch가 완료 시 새로운 데이터로 바꿔서 보여줌
    placeholderData: keepPreviousData,
  });

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleUploadPost = (newPost) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        toast("포스트가 성공적으로 업로드 되었습니다!");
      },
    });
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  // useEffect(() => {
  //   if (!isPlaceholderData && postsData?.hasMore) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["posts", page + 1],
  //       queryFn: () => getPosts(page + 1, PAGE_LIMIT),
  //     });
  //   }
  // }, [isPlaceholderData, postsData, queryClient, page]);

  return (
    <div className={styles.postList}>
      {showPostForm ? (
        <PostForm
          onSubmit={handleUploadPost}
          buttonDisabled={uploadPostMutation.isPending}
        />
      ) : (
        ""
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div>
        <button
          disabled={page === 0}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          &lt;
        </button>
        <button
          disabled={isPlaceholderData || !postsData?.hasMore}
          onClick={() => setPage((old) => old + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PostList;
