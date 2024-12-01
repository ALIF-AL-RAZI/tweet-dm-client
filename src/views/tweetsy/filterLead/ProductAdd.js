/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250
//         }
//     },
//     chip: {
//         margin: 2
//     }
// };

// tags list & style
const leadTypes = ['followers', 'following'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const ProductAdd = ({ open, handleCloseDialog, values, setValues, handleSubmit, loading }) => {
    const theme = useTheme();

    // handle category change dropdown

    // set image upload progress
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
        return () => {
            // setValues(valueInit);
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // handle tag select
    const [personName] = useState([]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            {open && (
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Followers/Following</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic1"
                                    fullWidth
                                    label="X username"
                                    name="screenname"
                                    onChange={({ target: { value = '' } }) => setValues((p) => ({ ...p, screenname: value }))}
                                    placeholder="elonmusk"
                                    defaultValue=""
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" align="left">
                                        Lead Type
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        {leadTypes.map((name) => (
                                            <MenuItem
                                                onClick={() => setValues((p) => ({ ...p, leadType: name }))}
                                                key={name}
                                                value={name}
                                                style={{
                                                    ...getStyles(name, personName, theme),
                                                    background: values?.leadType === name ? 'skyblue' : ''
                                                }}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" type="submit" disabled={loading}>
                                Create {loading ? <CircularProgress sx={{ maxWidth: '16px', maxHeight: '16px', ml: 1 }} /> : ''}
                            </Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

ProductAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ProductAdd;
