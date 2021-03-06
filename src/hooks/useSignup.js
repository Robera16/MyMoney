import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const[isCancelled, setIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    /* 
    signup function is created to avoid automatic signup
    when useSignup hook is included in the component
    */
    const signup = async (email, password, displayName) => {
        // reset the error every time we try to signup
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res){ // bad connection
                throw new Error('Could not complete signup')
            }

            // add display name to user
            await res.user.updateProfile({ displayName: displayName})

            // dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }catch(err){ // email is already taken, password is too short
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        console.log('here', isCancelled)
        return () => setIsCancelled(true)
    },[])
    console.log('inside signup', isCancelled)

    return { error, isPending, signup } 
}