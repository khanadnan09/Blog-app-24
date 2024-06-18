import { NavLink } from "react-router-dom"
import User from "./User"
import { useEffect } from 'react';
import { firebaseOnAuthStateChanged } from "../Firebase/authService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../ReduxToolkit/Feature/UserSlice";


const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.UserSignIn)
    useEffect(() => {
        firebaseOnAuthStateChanged((user) => {
            user && dispatch(setUser({
                name: user.displayName,
                email: user.email,
                isLoggedIn: true
            }))
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="navbar">
            <h1>Logo</h1>
            <div className="links">
                <NavLink to={"/"}><span>Home</span></NavLink>
                {user.name === "" ? <>
                    <NavLink to={"/Login"}><span>Login</span></NavLink>
                    <NavLink to={"/Signup"}><span>Signup</span></NavLink>
                </>
                    : <>
                        <NavLink to={"/Addpost"}><span>Add post</span></NavLink>
                        <User />
                    </>}


            </div>
        </div>
    )
}

export default Navbar