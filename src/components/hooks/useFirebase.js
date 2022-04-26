import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import FirebaseInitialize from '../firebase/firebase.init';
FirebaseInitialize();
const googleProvider = new GoogleAuthProvider();
const useFirebase = () => {
    // Store Logged in user here
    const [user, setUser] = useState({});
    //Store Error here
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // const [admin, setAdmin] = useState(false)
    const auth = getAuth();
    // Handle Google Sign in
    const signInUsingGoogle = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider)
    };

    // Email Register
    const emailRegister = (email, password, name, navigate, redirect_uri) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setError('')
                const newUser = { email: email, displayName: name }
                setUser(newUser)
                // send name email to db function
                saveUser(email, name)

                // save name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {
                        // profile Updated
                    })
                    .catch(error => {
                        setError(error.message)
                    })
                    navigate(redirect_uri)
            })
            .then(error => {
                // setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };



    // Email Login



    const loginWithEmail = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };


    

    // post email reg data to Database


    const saveUser = (email, name) => {
        const user = { email: email, displayName: name }
        axios.post('http://localhost:5000/users', user)
            .then(data => {
                // send data to Database
            }
            );
    };



    // Post Google Sign in User info to DB


    const googleSaveUser = (email, displayName) => {
        const user = { email, displayName }
        axios.put('http://localhost:5000/users', user)
            .then(data => {
                // Send Data to Database
            }
            );
    };


    // Cheched Logged User information

    
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (loggedUser) => {
            if (loggedUser) {
                setUser(loggedUser)
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);


    // for admin check


    // useEffect(() => {
    //     axios.get(`https://young-inlet-90443.herokuapp.com/user/${user?.email}`)
    //         .then(data => {
    //             setAdmin(data?.data?.admin)
    //         })
    // }, [user?.email])


    //SignOut
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };


    return {
        user,
        error,
        // admin,
        isLoading,
        setUser,
        setError,
        setIsLoading,
        signInUsingGoogle,
        emailRegister,
        loginWithEmail,
        googleSaveUser,
        logOut

    }

};
export default useFirebase;