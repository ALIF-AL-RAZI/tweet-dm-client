/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useState, createContext, useEffect, useReducer } from 'react';
import { initializeApp } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    // GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    // signInWithPopup,
    signOut
} from 'firebase/auth';
import { ReactSession } from 'react-client-session';
// action - state management
import { LOGIN, LOGOUT } from 'features/actions';
import accountReducer from 'features/accountReducer';
// project imports
import Loader from 'ui-component/Loader';
import { FIREBASE_API, DASHBOARD_PATH, EXPIRED_PATH, SUBSCRIPTION_PATH } from 'config';
import TweetsyConfig from 'TweetsyConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

ReactSession.setStoreType('localStorage');

// firebase initialize
// if (!firebase.apps.length) {
//     firebase.initializeApp(FIREBASE_API);
// }
initializeApp(FIREBASE_API);

const auth = getAuth();

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const BASE_URL = TweetsyConfig.getNodeUrl();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [dbUser, setDbUser] = useState({});
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [accessToken, setAccessToken] = useState(ReactSession.get('token') || '');

    // executes when logged in user comes to the website
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const token = user.accessToken;
                    const email = user.email;
                    const uid = user.uid;

                    axios
                        .get(`${BASE_URL}api/v1/user/get-user-by-email-and-uid/${email}/${uid}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        .then(async ({ data }) => {
                            data.user.token = token;
                            console.log(data.user);
                            setDbUser(data.user);
                            dispatch({
                                type: LOGIN,
                                payload: {
                                    isLoggedIn: true,
                                    user: {
                                        id: user.uid,
                                        email: user.email,
                                        name: user.displayName,
                                        image: user.photoURL
                                    }
                                }
                            });
                        })
                        .catch(async (e) => {
                            if (e.response.status !== 404) {
                                localStorage.clear();
                                await logout();
                                toast(e.message || `Something went wrong`, {
                                    autoClose: 2500,
                                    type: 'error'
                                });
                            }
                        });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                    localStorage.clear();
                    signOut(auth);
                }
            }),
        []
    );

    // useEffect(()=>{
    //     console.log("db user updaed 1234", dbUser)
    // },[dbUser])

    const logout = () => {
        const logedOut = signOut(auth);
        setDbUser({});
        return logedOut;
    };

    // using this function to login by firebase, and fetch logged in users data from database.
    const firebaseEmailPasswordSignIn = ({ email, password }) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const token = await result._tokenResponse.idToken;
                const UID = result.user.uid;
                const user = {
                    UID,
                    email
                };
                console.log({ token, user });

                axios
                    .get(`${BASE_URL}api/v1/user/get-user-by-email-and-uid/${user.email}/${user.UID}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(async ({ data }) => {
                        data.user.token = token;
                        setDbUser(data.user);
                        return navigate(DASHBOARD_PATH);
                    })
                    .catch(async (e) => {
                        await logout();
                        toast(e.message || 'Something went wrong', {
                            autoClose: 2500,
                            type: 'error'
                        });
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch((e1) => {
                console.log(JSON.stringify(e1), '===');
                const { code, message } = e1;
                const msg = code === 'auth/user-not-found' || code === 'auth/wrong-password' ? `Credentials doesn't match` : message;
                toast(msg, {
                    autoClose: 2500,
                    type: 'error'
                });
                setIsLoading(false);
            });
    };

    const firebaseGoogleLoginOrSignup = async () => {
        setIsLoading(true);
        console.log('hjhj');
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        const body = {
            email: data?.user?.email,
            name: data?.user?.displayName,
            UID: data?.user?.uid
        };
        const token = data?.user?.accessToken;

        console.log(data?.user, body, token);

        axios
            .post(`${BASE_URL}api/v1/user/create-user-or-get-user`, body, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({ data }) => {
                console.log(data?.user);
                data.user.token = token;
                // console.log({ data, user: data.user });
                setDbUser(data.user);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            id: data.user.uid,
                            email: data.user.email,
                            name: data.user.name,
                            image: data.user.photoURL || ''
                        }
                    }
                });
                return navigate(DASHBOARD_PATH);
            })
            .catch(async (eRR) => {
                localStorage.clear();
                // if (UID) {
                //     await auth.currentUser.delete();
                // }
                await logout();
                setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
            })
            .finally(() => setIsLoading(false));
    };

    // using this function to register user at firsbase and create user at out database.
    const firebaseRegisterWithOTP = (values) => {
        setIsLoading(true);
        const { email, name, password } = values;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const token = await result._tokenResponse.idToken;
                const UID = result.user.uid;
                const body = {
                    UID,
                    email,
                    name
                };

                axios
                    .post(`${BASE_URL}api/v1/user/create-user`, body, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(({ data }) => {
                        data.user.token = token;
                        console.log({ data, user: data.user });
                        setDbUser(data.user);
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: result.user.uid,
                                    email: result.user.email,
                                    name: result.user.displayName,
                                    image: result.user.photoURL
                                }
                            }
                        });
                        return navigate(DASHBOARD_PATH);
                    })
                    .catch(async (eRR) => {
                        localStorage.clear();
                        if (UID) {
                            await auth.currentUser.delete();
                        }
                        await logout();
                        setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch((error) => {
                let msg = 'Something wont wrong';
                if (error.code === 'auth/email-already-in-use') msg = 'User already registerd';
                setGeneralError(msg);
            })
            .finally(() => setIsLoading(false));
    };

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(email);
    };

    const updateProfile = () => {};
    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseEmailPasswordSignIn,
                logout,
                resetPassword,
                updateProfile,
                dbUser,
                setDbUser,
                isExpired,
                accessToken,
                setAccessToken,
                isLoading,
                generalError,
                setGeneralError,
                firebaseRegisterWithOTP,
                auth,
                firebaseGoogleLoginOrSignup
            }}
        >
            <ToastContainer position="bottom-right" autoClose={2000} />
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node
};

export default FirebaseContext;
