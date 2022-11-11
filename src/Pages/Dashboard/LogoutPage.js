import React, {useEffect} from 'react'
import { logoutUser } from "../../api/Auth";

function LogoutPage() {
    console.log('Inside logout page');
    useEffect(async () => {
       await logoutUser();
       window.location.replace('/');
    })
    return (
        <div>
            
        </div>
    )
}

export default LogoutPage
