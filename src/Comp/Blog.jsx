import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Blog = ({ uploadedBy, title, postContent, featuredImage, currentEmail, onDelete, userEmail, id }) => {
    return (
        <div className="blog">
            <img src={featuredImage} alt="blog_image" />
            <div className="blog_title">
                {title}
            </div>
            <div className="blog_text">
                {parse(`${postContent}`)}
            </div>
            <div className="user_posted">
                <h4><span>(posted by)</span> {uploadedBy} </h4>
            </div>
            <div className="btn-group">
                {
                    currentEmail == userEmail && <>
                        <Link to={`/Addpost/${id}`}><button>Update</button></Link>
                        <button onClick={onDelete}>Delete</button>
                    </>
                }
                <Link to={`/posts/${id}`}><button>Read full post</button></Link>
            </div>
        </div >
    )
}

export default Blog