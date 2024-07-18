import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider, setPersistence, browserLocalPersistence, GithubAuthProvider } from '../../Firebase/Firebase';
import { Box, Button, Snackbar, Alert } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [loadingFB, setLoadingFB] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingGit, setLoadingGit] = useState(false);
    const [error, setError] = useState("");

    const auth = getAuth();
    const GoogleProvider = new GoogleAuthProvider();
    const FBProvider = new FacebookAuthProvider();
    const GitProvider = new GithubAuthProvider();

    GoogleProvider.setCustomParameters({ prompt: 'select_account' });
    FBProvider.setCustomParameters({ prompt: 'select_account' });

    const handleAuthError = (error) => {
        console.error("Authentication error:", error);
        switch (error.code) {
            case "auth/popup-closed-by-user":
                setError("Authentication cancelled by user.");
                break;
            case "auth/network-request-failed":
                setError("Network error. Please check your connection and try again.");
                break;
            default:
                setError("Failed to authenticate. Please try again.");
                break;
        }
    };

    const handleAuth = async (provider, setLoading) => {
        setLoading(true);
        setError("");  // Reset error message before attempting
        try {
            await setPersistence(auth, browserLocalPersistence);
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const token = await user.getIdToken();
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        } catch (error) {
            handleAuthError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate("/", { replace: true });
            }
        });
        return unsubscribe; // Clean up the subscription on unmount
    }, [auth, navigate]);

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            display: "grid",
            background: "black",
            placeContent: "center",
            color: "white"
        }}>
            <Button onClick={() => handleAuth(GoogleProvider, setLoadingGoogle)}
                sx={{
                    padding: "20px 40px !important",
                    border: "1px solid white",
                    color:"white",
                    '&:hover':{
                      background:"white",
                      color:"black"
                    }
                }} variant='outlined'>
                {loadingGoogle ? "Signing in..." : "Sign in with Google"}
            </Button>
            <Button onClick={() => handleAuth(FBProvider, setLoadingFB)}
                sx={{
                    mt: "20px !important",
                    border: "1px solid white",
                    padding: "20px 40px !important",
                    color:"white",
                    '&:hover':{
                      background:"white",
                      color:"black"
                    }
                }} variant='outlined'>
                {loadingFB ? "Signing in..." : "Sign in with Facebook"}
            </Button>
            <Button onClick={() => handleAuth(GitProvider, setLoadingGit)}
                sx={{
                    mt: "20px !important",
                    border: "1px solid white",
                    padding: "20px 40px !important",
                    color:"white",
                    '&:hover':{
                      background:"white",
                      color:"black"
                    }
                }} variant='outlined'>
                {loadingGit ? "Signing in..." : "Sign in with GitHub"}
            </Button>
            {error && <Snackbar open={true} autoHideDuration={6000} onClose={() => setError("")}>
                <Alert onClose={() => setError("")} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>}
        </Box>
    );
};

export default Login;
