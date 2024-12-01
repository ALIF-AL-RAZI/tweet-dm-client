/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import TweetsyConfig from 'TweetsyConfig';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'features/constant';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import PaymentDashboard from './PaymentDashboard';

const BASE_URL = TweetsyConfig.getNodeUrl();
const plans = [
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Basic',
        type: 'Month',
        description: 'Get access to all basic Hootspy features for the whole Year',
        price: 29,
        permission: [0, 1, 2],
        plan_id: 1,
        id: 'price_1NnvJ4Cx996FZZga1WZD5s6f',
        product: 'prod_Ob7YXNhbw1zVUz'
    },
    {
        active: true,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Standard',
        type: 'Month',
        description: 'Get access to all standard Hootspy features for the whole Year',
        price: 59,
        permission: [0, 1, 2],
        plan_id: 2,
        id: 'price_1NnvNrCx996FZZgaURLvOef9',
        product: 'prod_Ob7dW5mx8llKLf'
    },
    {
        active: false,
        icon: <Avatar src="logo-only.png" sx={{ bgcolor: 'white', width: 50, height: 50 }} />,
        title: 'Premium',
        type: 'Month',
        description: 'Get access to all premium Hootspy features for the whole Year',
        price: 99,
        permission: [0, 1, 2],
        plan_id: 3,
        id: 'price_1NnvPDCx996FZZgaf8bjJuL1',
        product: 'prod_Ob7eqM9mMfr0qU'
    }
];

const planList = [
    ['29000 Monthly Sessions', 'By 24 Hours Support', '1 Months Storage'],
    ['59000 Monthly Sessions', 'By 24 Hours Support', '3 Months Storage'],
    ['99000 Monthly Sessions', 'By 24 Hours Support', '6 Months Storage'],
    ['99000 Monthly test Sessions', 'By 24 Hours test Support', '6 Months test Storage']
];

const Price1 = () => {
    const { dbUser } = useAuth();
    const [fetchSubscribeData, setFetchSubscribeData] = useState({
        status: 'success'
    });
    const createSession = async (priceId) => {
        console.log('creating session');
        try {
            const { data: response } = await axios.post(
                `${BASE_URL}api/v1/stripe/createSession`,
                {
                    priceId,
                    email: dbUser.email
                },
                {
                    headers: { Authorization: `Bearer ${dbUser.token}` }
                }
            );
            const url = response?.session?.url;
            // console.log(response.session, 123);
            window.location.href = url;
        } catch (e) {
            console.log(e);
            toast('something went wrong , please try again or contact us at hey@tweetsy.io', {
                autoClose: 5000,
                type: 'warning'
            });
        }
    };

    const theme = useTheme();
    const priceListDisable = {
        opacity: '0.4',
        '& >div> svg': {
            fill: theme.palette.secondary.light
        }
    };

    return (
        <Box sx={{ height: '100%', mt: 3 }}>
            {/* {fetchSubscribeData.status === 'loading' && (
                <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )} */}

            {fetchSubscribeData.status === 'success' && (
                <>
                    {fetchSubscribeData?.havePlan &&
                    fetchSubscribeData?.current_period_end &&
                    fetchSubscribeData?.current_period_end > new Date() ? (
                        <PaymentDashboard fetchSubscribeData={fetchSubscribeData} dbUser={dbUser} />
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', mx: 'auto' }}>
                            <Grid
                                container
                                // spacing={gridSpacing}
                                sx={
                                    {
                                        // maxWidth: '700px'
                                    }
                                }
                            >
                                <>
                                    {plans.map((plan, index) => {
                                        const darkBorder =
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.background.default
                                                : theme.palette.primary[200] + 75;
                                        return (
                                            <Grid item xs={12} sm={12} md={12} sx={{ mb: { md: 4, sm: 3, xs: 2 } }} lg={4} key={index}>
                                                <MainCard
                                                    sx={{
                                                        pt: 1.75,
                                                        border: plan.active ? '2px solid' : '1px solid',
                                                        borderColor: plan.active ? 'secondary.main' : darkBorder,
                                                        // maxWidth: '340px'
                                                        maxWidth: '90%',
                                                        mx: 'auto'
                                                    }}
                                                >
                                                    <Grid container textAlign="center" spacing={gridSpacing}>
                                                        <Grid item xs={12}>
                                                            <Box
                                                                sx={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    borderRadius: '50%',
                                                                    width: 80,
                                                                    height: 80,
                                                                    background:
                                                                        theme.palette.mode === 'dark'
                                                                            ? theme.palette.dark[800]
                                                                            : theme.palette.primary.light,
                                                                    color: theme.palette.primary.main,
                                                                    '& > svg': {
                                                                        width: 35,
                                                                        height: 35
                                                                    }
                                                                }}
                                                            >
                                                                {plan.icon}
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontSize: '1.5625rem',
                                                                    fontWeight: 500,
                                                                    position: 'relative',
                                                                    mb: 1.875,
                                                                    '&:after': {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        bottom: -15,
                                                                        left: 'calc(50% - 25px)',
                                                                        width: 50,
                                                                        height: 4,
                                                                        background: theme.palette.primary.main,
                                                                        borderRadius: '3px'
                                                                    }
                                                                }}
                                                            >
                                                                {plan.title}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body2">{plan.description}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                component="div"
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize: '2.1875rem',
                                                                    fontWeight: 700,
                                                                    '& > span': {
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: 500
                                                                    }
                                                                }}
                                                            >
                                                                <sup>$</sup>
                                                                {plan.price}
                                                                <span>/{plan.type}</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <List
                                                                sx={{
                                                                    m: 0,
                                                                    p: 0,
                                                                    '&> li': {
                                                                        px: 0,
                                                                        py: 0.625,
                                                                        '& svg': {
                                                                            fill: theme.palette.success.dark
                                                                        }
                                                                    }
                                                                }}
                                                                component="ul"
                                                            >
                                                                {planList[index].map((list, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}}>
                                                                            <ListItemIcon>
                                                                                <CheckTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={list} />
                                                                        </ListItem>
                                                                        <Divider />
                                                                    </React.Fragment>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button variant="outlined" onClick={() => createSession(plan.id)}>
                                                                Subscribe
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </MainCard>
                                            </Grid>
                                        );
                                    })}
                                </>
                            </Grid>
                        </Box>
                    )}
                </>
            )}
            {/* Toastify container */}

            <ToastContainer position="bottom-right" autoClose={2000} />
        </Box>
    );
};

export default Price1;
