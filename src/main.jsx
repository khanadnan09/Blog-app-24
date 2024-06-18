import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blogs from './Comp/Blogs.jsx';
import Login from './Comp/Login.jsx'
import SignUp from './Comp/SignUp.jsx';
import { Provider } from 'react-redux';
import store from './ReduxToolkit/Store.js';
import AddPost from './Comp/AddPost.jsx';
import SinglePost from './Comp/SinglePost.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' element={<Blogs />}></Route>
      <Route path='/Login' element={<Login />}></Route>
      <Route path='/Signup' element={<SignUp />}></Route>
      <Route path='/Addpost' element={<AddPost />}></Route>
      <Route path='/Addpost/:id' element={<AddPost />}></Route>
      <Route path='/posts/:id' element={<SinglePost />}></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
