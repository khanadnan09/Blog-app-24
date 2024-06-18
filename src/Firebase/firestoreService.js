import { addDoc, collection, deleteDoc, doc, getDocs, } from "firebase/firestore";
import { db } from "./Firebase";


export const addDocument = async (userName,post,title,downloadURL,userEmial) => {
    await addDoc(collection(db, "Posts"), {
        userName: userName,
        postContent: post,
        title: title,
        imageUrl: downloadURL,
        email: userEmial
      });
}
export const getDocuments = async () => {
  const snapshot = await getDocs(collection(db, "Posts"));
  const postsArray = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsArray;
};
export const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "Posts", id));
}

