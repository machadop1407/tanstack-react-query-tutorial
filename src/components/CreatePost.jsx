import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const createPost = async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return response.json();
};

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old) => [
        ...old,
        { id: Date.now(), ...newPost },
      ]);

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, body: "This is a new post" });
  };

  return (
    <>
      {" "}
      <form>
        <input
          type="text"
          placeholder="Post title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSubmit}> Create </button>
      </form>
    </>
  );
};
