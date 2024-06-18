import { useForm, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from '../Firebase/Firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import { addDocument, getDocuments } from '../Firebase/firestoreService';
const AddPost = () => {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      post: '',
      image: '',
    }
  })
  const userName = useSelector((state) => state.UserSignIn.name)
  const userEmial = useSelector((state) => state.UserSignIn.email)
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const submitPost = async (data) => {
    setProcessing(true)
    const file = data.image[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(data)
    console.log(file)
    try {
      if (id) {
        await updatePost({
          id,
          title: data.title,
          postContent: data.post,
          imageUrl: downloadURL,
          file
        });
      } else {
        await addDocument(userName, data.post, data.title, downloadURL, userEmial)
      }

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setProcessing(false)
    navigate('/')
  }

  const updatePost = async (postData) => {
    const currentDoc = doc(db, "Posts", id);
    console.log(postData.imageUrl)
    console.log(postData.file)
    try {
      console.log(posts[0].imageUrl)
      await updateDoc(currentDoc, {
        title: postData.title,
        postContent: postData.postContent,
        imageUrl: typeof (postData.file) == "string" ? posts[0].imageUrl : postData.imageUrl,
      });
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  }

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const arrayOfPosts = await getDocuments()
        const selectedPost = arrayOfPosts.filter((post) => post.id === id);
        setPosts(selectedPost);
        if (selectedPost[0]) { // Check if there is a selected post
          reset({
            title: selectedPost[0].title,
            post: selectedPost[0].postContent,
            image: selectedPost[0].imageUrl,
          });
        }
        console.log(selectedPost[0].postContent)
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchDataFromFirestore();
  }, [id, reset])


  console.log(posts[0])

  return (
    <>
      <form style={{ width: "700px" }} onSubmit={handleSubmit(submitPost)}>
        <h1 style={{ textAlign: "center" }}>Add post</h1>
        <label htmlFor="Title">Title</label>
        <input type="text" id='Title' {...register("title", { required: true })} />
        {
          errors.title && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
        }
        <label htmlFor="image">Featured Image</label>
        <input type="file" id='image' style={{ marginBottom: "10px", padding: "0" }}
          {...register("image", !posts[0] && { required: true })}
        />
        {posts[0] && <span className='default_post_img'>default :<img src={posts[0] ? posts[0].imageUrl : ""} alt="no_image" /></span>}
        {
          errors.image && <h4 style={{ margin: "10px 0 20px 0", color: "red" }}>*This field is reqired.</h4>
        }
        <Controller
          name="post"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              onEditorChange={onChange}
              value={value}
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              init={{
                height: 500,
                width: 640,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | ' +
                  'forecolor backcolor emoticons | help',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              initialValue="Add your post here..."
            />)}
        />
        <button type='submit'>Submit</button>
      </form>
      {processing && <Loading />}
    </>
  )
}

export default AddPost