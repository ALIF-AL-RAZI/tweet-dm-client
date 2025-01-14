/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import useConfig from 'hooks/useConfig';
import axios from 'axios';
import TweetsyConfig from 'TweetsyConfig';
import { toast } from 'react-toastify';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user, dbUser } = useAuth();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    // Send Feedback
    const [feedback, setFeedback] = useState('');
    const [isSending, setIsSending] = useState(false);
    const BASE_URL = TweetsyConfig.getNodeUrl();

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const sendFeedback = () => {
        setIsSending(true);
        if (!feedback) {
            toast("You can't submit an empty feedback", { autoClose: 2500, type: 'warning' });
            return;
        }

        if (!dbUser.email) {
            toast('Something went wrong!', { autoClose: 2500, type: 'error' });
            return;
        }

        const body = {
            feedback,
            userEmail: dbUser.email
        };
        axios
            .post(`${BASE_URL}api/v1/feedback/add-feedback`, body, {
                headers: { Authorization: `Bearer ${dbUser.token}` }
            })
            .then((data) => {
                setFeedback('');
                setIsSending(false);
                toast('Feedback added successfully.Thanks for your feedback.', { autoClose: 3000, type: 'success' });
                handleToggle();
            })
            .catch(async (err) => {
                setIsSending(false);
                const errorMessage = err.response.data.message || err.msg || err.message || 'Something went wrong.';
                toast(errorMessage, { autoClose: 2500, type: 'error' });
            });
    };

    const openVideoInNewTab = () => {
        const videoUrl = 'https://www.youtube.com/watch?v=TtVZXMm-G-Q';
        window.open(videoUrl, '_blank');
    };

    return (
        <>
            <Button onClick={openVideoInNewTab} variant="contained" sx={{ mr: 3 }}>
                Watch Demo
            </Button>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={
                            dbUser?.profileIMG
                                ? dbUser?.profileIMG
                                : user?.image || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
                        }
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={
                    <>
                        <IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />
                    </>
                }
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">Good Morning,</Typography>
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {user?.name}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="subtitle2">{dbUser?.name} 😎</Typography>
                                            </Stack>
                                            <Divider />
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <Divider />
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/settings')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>

                                                    <Divider sx={{ my: 2 }} />

                                                    <TextField
                                                        fullWidth
                                                        label="Write feedback"
                                                        size="small"
                                                        multiline
                                                        minRows={6}
                                                        value={feedback}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                    />
                                                    <br />
                                                    <Button
                                                        sx={{ mt: 1 }}
                                                        size="small"
                                                        variant="contained"
                                                        onClick={sendFeedback}
                                                        disabled={isSending}
                                                    >
                                                        {/* Send Feedback */}
                                                        {isSending ? 'Sending...' : 'Send Feedback'}
                                                    </Button>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
