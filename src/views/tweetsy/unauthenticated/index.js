/* eslint-disable prettier/prettier */
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Unauthenticated = () => {
    const { twitterAuthentication, isTwitterAuth } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(isTwitterAuth);
    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    display: 'grid',
                    placeContent: 'center'
                }}
            >
                <Typography variant="h4">Your subscription has been expired Expired!</Typography>
                <br />
                <Button variant="contained" onClick={() => navigate('/subscription', { replace: true })}>
                    Go to Subscription Page
                </Button>
            </Box>
            <Dialog
                open={isOpen}
                // onClose={handleClose}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
            >
                <Typography sx={{ textAlign: 'right' }}>
                    <Button sx={{ color: 'red' }} onClick={() => setIsOpen((p) => !p)}>
                        <IconX />
                    </Button>
                </Typography>
                <DialogTitle id="alert-dialog-title">Authenticate with Twitter</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Kindly Authenticate With Your Twitter Account First!
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3 }}>
                    <Button onClick={twitterAuthentication}>Twitter Authentication</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Unauthenticated;
