/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-return */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { memo, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, useMediaQuery } from '@mui/material';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IconCopy } from '@tabler/icons';
// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { openDrawer } from 'features/menu/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { drawerWidth } from 'features/constant';
// import useAuth from 'hooks/useAuth';
import { getUser } from 'features/auth/authSlice';
import { ReactSession } from 'react-client-session';
import textHipenAdd from 'utils/textHipenAdd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import ExtensionLink from 'ui-component/extension';
// import ScheduleModal from './ScheduleModal';
// import useTweets from 'hooks/useTweets';

// ==============================|| SIDEBAR DRAWER ||============================== //

const AdminSidebar = ({ window }) => {
    const [isCoppied, setIsCoppied] = useState(false);
    // const { isModalOpen, setIsModalOpen } = useTweets();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { user } = useSelector((state) => state.auth);

    // 🛠Modified by FoysalBN

    const logo = useMemo(
        () => (
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection width={220} />
                </Box>
            </Box>
        ),
        []
    );
    useEffect(() => {
        const token = ReactSession.get('token');
        if (!token) return;
        dispatch(getUser({ token }));
    }, []);

    const drawer = useMemo(
        () => (
            <PerfectScrollbar
                component="div"
                style={{
                    height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                <MenuList />
                {/* <MenuCard /> */}
                {/* <Stack direction="row" justifyContent="center" sx={{ mb: 2, width: '100%' }}>
                    <Chip
                        label={`Left Credit(s): ${user?.credits ?? 0}`}
                        chipcolor="primary"
                        sx={{
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: 16,
                            height: '50px'
                        }}
                    />
                </Stack> */}
                {/* {(user?.extensionCode && (
                    <Stack direction="row" justifyContent="center" sx={{ mb: 2, width: '100%' }}>
                        <Chip
                            label={
                                <>
                                    {textHipenAdd(user.extensionCode)}
                                    <CopyToClipboard
                                        text={textHipenAdd(user.extensionCode)}
                                        onCopy={() => {
                                            setIsCoppied((p) => !p);
                                            setTimeout(() => {
                                                setIsCoppied((p) => !p);
                                            }, 1500);
                                        }}
                                    >
                                        <IconCopy
                                            style={{ cursor: 'pointer', marginLeft: '5px', opacity: isCoppied ? 1 : 0.5 }}
                                            size={18}
                                            color="#009dea"
                                        />
                                    </CopyToClipboard>
                                </>
                            }
                            chipcolor="primary"
                            sx={{
                                width: '100%',
                                fontSize: 12,
                                height: '50px',
                                'span.MuiChip-label': {
                                    display: 'flex',
                                    alignItems: 'center !important'
                                }
                            }}
                        />
                    </Stack>
                )) ||
                    ''} */}
            </PerfectScrollbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd, user, isCoppied]
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={() => dispatch(openDrawer(!drawerOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawerOpen && logo}
                {drawerOpen && drawer}
            </Drawer>
        </Box>
    );
};

AdminSidebar.propTypes = {
    window: PropTypes.object
};

export default memo(AdminSidebar);
