import { useState } from "react";
import "./App.css";
import { Posts } from "./components/Posts";
import { PostById } from "./components/PostsById";
import { CreatePost } from "./components/CreatePost";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <>
      {/* <button onClick={() => setIsMounted((prev) => !prev)}> Toggle</button>
      {isMounted && <Posts />} */}
      {/* <PostById id={3} /> */}
      <CreatePost />
      <Posts />
    </>
  );
}

export default App;
