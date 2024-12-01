/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import ProductAdd from './ProductAdd';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { createLeads, getLeads } from 'store/slices/customer';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';


import { useNavigate } from "react-router-dom";




// auth
import useAuth from 'hooks/useAuth';
import axios from 'api/axios';








// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}








const headCells = [

    // {
    //     id: 'name',
    //     numeric: true,
    //     label: 'Name',
    //     align: 'left'
    // },
    {
        id: 'screen_name',
        numeric: false,
        label: 'Username',
        align: 'left'
    },

    {
        id: 'lead_type',
        numeric: false,
        label: 'Lead Type',
        align: 'left'
    },

    {
        id: 'created_at',
        numeric: false,
        label: 'Created At',
        align: 'left'
    },


    // {
    //     id: 'description',
    //     numeric: true,
    //     label: 'Bio',
    //     align: 'center'
    // },
    // {
    //     id: 'website',
    //     numeric: false,
    //     label: 'Website',
    //     align: 'center'
    // },
    // {
    //     id: 'followers_count',
    //     numeric: true,
    //     label: 'Followers',
    //     align: 'left'
    // },
    // {
    //     id: 'friends_count',
    //     numeric: true,
    //     label: 'Following',
    //     align: 'right'
    // },
    // {
    //     id: 'blue_verified',
    //     numeric: true,
    //     label: 'Blue Verified',
    //     align: 'center'
    // }
];








// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell> */}
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell?.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};










// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};








// ==============================|| PRODUCT LIST ||============================== //

const ProductList = () => {
    const { dbUser } = useAuth();
    const theme = useTheme();
    const dispatch = useDispatch();
    const valueInit = { screenname: '', leadType: 'followers' };
    const [values, setValues] = React.useState(valueInit);
    const [loading, setLoading] = React.useState(false);
    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setValues(valueInit);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const initSearch = { description: '', followers_count: '', friends_count: '', blue_verified: '' };
    const [search, setSearch] = React.useState(initSearch);
    const [rows, setRows] = React.useState([]);
    const [products, setProducts] = React.useState([]);

    const navigate = useNavigate();
    // const { products = [] } = useSelector((state) => state.customer || {});

    // const customer = useSelector((state) => state);

    // console.log("customer:",customer)

    function getAllLeads() {
        return async () => {
            try {
                const response = await axios.get('allleads', {
                    headers: { Authorization: `Bearer ${dbUser?.token}` },
                });
                // console.log(response.data?.items, 'response.data?.items'); // Check if data is coming here
                // dispatch(slice.actions.getProductsSuccess(response.data.items));
                setProducts(response.data.items)
            } catch (error) {
                console.log(error)
            }
        };
    }
    

    React.useEffect(() => {
        getAllLeads()()
    },[])



    // React.useEffect(() => {

    //     console.log("Dispatching getLeads");
    //     dispatch(getLeads(dbUser.token));
    // }, [dispatch, dbUser?.token]);



    React.useEffect(() => { 
        // console.log("Updated products:", products);
        setRows(products);
    }, [products]);



    const clearSearch = () => setSearch(initSearch);


    const handleSearch = () => {
        if (!products) return; // Prevent handling if products is undefined
    
        const { description = '', followers_count = '', friends_count = '', blue_verified = '' } = search;
        let datas = products;
        
        if (description) {
            datas = datas.filter((row) =>
                row.description?.toString()?.toLowerCase()?.includes(description?.toString()?.toLowerCase())
            );
        }
        if (followers_count) {
            datas = datas.filter((row) => row.followers_count > Number(followers_count));
        }
        if (friends_count) {
            datas = datas.filter((row) => row.friends_count > Number(friends_count));
        }
        
        setRows(datas);
    };
    








    React.useEffect(() => {
        handleSearch();
    }, [search?.description, search?.followers_count, search?.friends_count]);


    
    const handleSearchChange = ({ target: { name, value = '' } }) => setSearch((p) => ({ ...p, [name]: value }));





    function createLeads({ data = {} }) {
        return async () => {
            try {
                const response = await axios.post('leads', data, {
                    headers: { Authorization: `Bearer ${dbUser?.token}` },
                });
                console.log(response.data?.items, 'response.data?.items');
                return response.data.items; // Return the fetched data
            } catch (error) {
                console.error('Error creating leads:', error);
                throw error; // Re-throw the error to handle it in `handleSubmit`
            }
        };
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createLeadsFunction = createLeads({ data: values });
            const fetchedLeads = await createLeadsFunction();
            console.log(fetchedLeads);
            setRows(fetchedLeads)
        } catch (e) {
            console.log(e);
        }
    };



    const handleLead = ( exportSaveId) =>{
        console.log(exportSaveId)
        navigate(`/product/${exportSaveId}`);
    }




    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    return (
        <MainCard title="Lead List" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Grid container justifyContent="" alignItems="center" spacing={1}>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleSearchChange}
                                    placeholder="In Bio"
                                    value={search.description}
                                    name="description"
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleSearchChange}
                                    placeholder="Followers more than"
                                    value={search.followers_count}
                                    name="followers_count"
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleSearchChange}
                                    placeholder="Following more than"
                                    value={search.friends_count}
                                    name="friends_count"
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <Button onClick={clearSearch} variant="outlined">
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>


                        
                    </Grid>
                    {/* <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>


                        <Tooltip title="Add Product">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <ProductAdd
                            open={open}
                            handleCloseDialog={handleCloseDialog}
                            {...{ values, setValues, handleSubmit, loading, setLoading }}
                        />
                    </Grid> */}
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        {/* <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.name)}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell> */}
                                        {/* <TableCell
                                            align="center"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.user_id}
                                            </Typography>
                                        </TableCell> */}
                                        {/* <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.name}
                                            </Typography>
                                        </TableCell> */}
                                        <TableCell>{row.screen_name}</TableCell>
                                        <TableCell>{row.lead_type}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                        {/* <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="center">{row.website}</TableCell>
                                        <TableCell align="right">{row.followers_count}</TableCell>
                                        <TableCell align="right">{row.friends_count}</TableCell>
                                        <TableCell align="right">{row.blue_verified ? 'Verified' : 'Unverified'}</TableCell> */}
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Button size="small" onClick={() => handleLead(row._id)}>
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ProductList;
