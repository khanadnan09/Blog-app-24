import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import { getDocuments } from "../Firebase/firestoreService";

const SinglePost = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            try {
                const arrayOfPposts = await getDocuments()
                console.log(arrayOfPposts)
                const selectedPost = arrayOfPposts.filter((post) => post.id === id);
                setPosts(selectedPost);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };
        fetchDataFromFirestore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        posts.map((post) => {
            return <div className="post_conainer" key={post.id}>
                <img src={post.imageUrl} alt="img" />
                <div className="title">{post.title}</div>
                <div className="content">
                    {parse(post.postContent)}</div>
            </div>
        })


    )
}

export default SinglePost