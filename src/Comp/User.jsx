import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import auth from '../Firebase/Firebase'
import { setUser } from '../ReduxToolkit/Feature/UserSlice'
import { useNavigate } from "react-router-dom";


const User = () => {
    const name = useSelector((state) => state.UserSignIn.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogOut = () => {
        signOut(auth).then(() => {
            dispatch(setUser({
                name: "",
                email: "",
                isLoggedIn:false
            }))
            navigate('/')
        }).catch((error) => {alert("there is something wrong 🤔. " , error)});
    }
    return (
        <div className="UserName" title="Log Out" onClick={LogOut}>{name}</div>
    );
};

export default User;
