/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import TweetsyConfig from 'TweetsyConfig';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import RecordTable from './RecordTable';
import { Button, CardContent, Fab, Grid, IconButton, InputAdornment, Table, TableBody, TableContainer, TextField, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

// import { useHistory } from 'history';

const Records = () => {
    const { dbUser } = useAuth();
    const BASE_URL = TweetsyConfig.getNodeUrl();
    const [recordsData, setRecordsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('All Data');
    const handleClick = () => {
        window.location.href = '/subscription';
    };
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}api/v1/record/gel-all-records/${dbUser?._id}`, {
                headers: { Authorization: `Bearer ${dbUser?.token}` }
            })
            .then((response) => {
                console.log(response?.data?.data, 1234, response?.data.isDemo);
                setRecordsData(response?.data?.data || []);
                setIsLoading(false);
                if (response?.data.isDemo) {
                    setTitle('Demo Data (Subscribe a plan to integrate your landing page)');
                }
            });
        // console.log(response?.data?.data, 1234);
        // setRecordsData(response?.data?.data || []);
        // setIsLoading(false);
    }, []);

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
                                    // onChange={handleSearchChange}
                                    placeholder="In Bio"
                                    // value={search.description}
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
                                    // onChange={handleSearchChange}
                                    placeholder="Followers more than"
                                    // value={search.followers_count}
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
                                    // onChange={handleSearchChange}
                                    placeholder="Following more than"
                                    // value={search.friends_count}
                                    name="friends_count"
                                    size="small"
                                />
                                {/* const properties = ['_id', 'screen_name', 'description', 'website', 'followers_count', 'friends_count', 'blue_verified']; */}
                            </Grid>
                            <Grid item>
                                <Button
                                    // onClick={clearSearch}
                                    variant="outlined"
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
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

                        {/* product add & dialog */}
                        <Tooltip title="Add Product">
                            <Fab
                                color="primary"
                                size="small"
                                // onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        {/* <ProductAdd
                            open={open}
                            // handleCloseDialog={handleCloseDialog}
                            {...{ values, setValues, handleSubmit, loading, setLoading }}
                        /> */}
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    {/* <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    /> */}
                    {dbUser.token}
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default Records;
