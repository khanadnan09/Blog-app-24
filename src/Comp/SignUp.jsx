import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import auth from '../Firebase/Firebase'
import { useDispatch } from "react-redux";
import { setUser } from "../ReduxToolkit/Feature/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpWithEmail } from "../Firebase/authService";

const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const SignUpData = (SignUpData) => {
    signUpWithEmail(SignUpData.email, SignUpData.password)
    .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: SignUpData.name,
        })
          .then(() => {
            dispatch(setUser({
              name: userCredential.user.displayName,
              email: userCredential.user.email,
              isLoggedIn: true
            }))
            navigate('/')
          })
      })
      .catch((error) => {
        setError(error.code)
      });
  }
  return (

    <form onSubmit={handleSubmit(SignUpData)}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" className={errors.name ? "outlineDanger" : ""} placeholder="Enter your name..." autoComplete="off" {...register("name", { required: true })} />
      {
        errors.name && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
      }
      <label htmlFor="email">Email</label>
      <input type="email" id="email" className={errors.email ? "outlineDanger" : ""} placeholder="Enter your email..." autoComplete="off"
        {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
      {
        errors.email && errors.email.type == "pattern" && <h4 style={{ marginTop: "10px", color: "red" }}>*Incorrect email.</h4> || errors.email && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
      }
      <label htmlFor="password">Password</label>
      <input type="password" id="password" className={errors.password ? "outlineDanger" : ""} placeholder="Enter your password..." autoComplete="off"
        {...register("password", { required: true })} />
      {
        errors.password && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
      }
      {
        error == "auth/email-already-in-use" && <h4 style={{ marginTop: "10px", color: "red" }}>Email is allready in use.</h4> || error == "auth/weak-password" && <h4 style={{ marginTop: "10px", color: "red" }}>Weak password (Password should be at least 6 characters)</h4>
      }
      <button type="submit">Sign In</button>
    </form>
  )
}

export default SignUp