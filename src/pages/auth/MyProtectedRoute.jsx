import { Navigate } from 'react-router-dom';


const MyProtectedRoute = ({children}) => {
    const accessToken=sessionStorage.getItem("accessToken");
     
    if(!accessToken){
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default MyProtectedRoute;
