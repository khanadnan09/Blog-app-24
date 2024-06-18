import { useSelector } from "react-redux";
import Blog from "./Blog";
import { useEffect, useState } from "react";
import { deleteDocument, getDocuments } from "../Firebase/firestoreService";

const Blogs = () => {
  const [posts, setPosts] = useState([]); // State to hold the posts
  const userEmail = useSelector((state)=> state.UserSignIn.email)
  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const arrayOfPosts = await getDocuments()
        setPosts(arrayOfPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchDataFromFirestore();
  }, []); 

  const handleDelete = async (id) => {
    try {
      deleteDocument(id)
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };
  const isLoggedIn = useSelector((state) => state.UserSignIn.isLoggedIn);
  
  return (
    <div className="container_blogs">
      {isLoggedIn ? (
        posts.map((post) => (
          <Blog
            key={post.id}
            id={post.id}
            uploadedBy={post.userName}
            title={post.title}
            postContent={post.postContent}
            featuredImage={post.imageUrl}
            currentEmail={post.email}
            userEmail={userEmail}
            onDelete={() => handleDelete(post.id)}
          /> 
        ))
      ) : (
        <h1 style={{ marginTop: "200px" }}>You have to login first 😄😃😁.</h1>
      )}
    </div>
  );
};

export default Blogs;
