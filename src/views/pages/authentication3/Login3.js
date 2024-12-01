import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Divider,
    Grid,
    // Stack,
    Typography
    // useMediaQuery
} from '@mui/material';

// project imports
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './AuthLogin';
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* AuthWrapper1 */}
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <>
                                {/* AuthCardWrapper */}
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12} style={{ textAlign: 'center' }} sx={{ m: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>

                                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                                        <Typography color={theme.palette.secondary.main} gutterBottom variant="h2">
                                            Sign In
                                        </Typography>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                style={{ color: 'red', marginTop: '5px' }}
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/ForgotPassword3' : '/forgot-password'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Forgot password?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid> */}
            </Grid>
        </>
    );
};

export default Login;
