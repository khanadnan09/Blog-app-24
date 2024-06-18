import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmail } from '../Firebase/authService';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [errorCode, setErrorCode] = useState()
  const UserLogin = (loginData) => {
    signInWithEmail(loginData.email, loginData.password)
      .then(() => { navigate('/') })
      .catch((error) => { setErrorCode(error.code) });
  }

  return (
    <form onSubmit={handleSubmit(UserLogin)}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" className={errors.email ? "outlineDanger" : ""} placeholder="Enter your email..." autoComplete="off"{...register("email", { required: true })} />
      {
        errors.email && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
      }
      <label htmlFor="password">Password</label>
      <input type="password" id="password" className={errors.password ? "outlineDanger" : ""} placeholder="Enter your password..." autoComplete="off" {...register("password", { required: true })} />
      {
        errorCode && <h4 style={{ marginTop: "10px", color: "red" }}>*Invalid-credentials (check your form again)</h4> || errors.password && <h4 style={{ marginTop: "10px", color: "red" }}>*This field is reqired.</h4>
      }
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login