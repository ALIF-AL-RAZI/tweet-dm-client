/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { IconEye, IconTrash, IconPause, IconPlay, IconSettings } from '@tabler/icons';
import TweetsyConfig from 'TweetsyConfig';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecordTable = ({ recordsData, setRecordsData, isLoading }) => {
    const BASE_URL = TweetsyConfig.getNodeUrl();
    const { dbUser } = useAuth();
    const token = dbUser.token;

    const deleteCampaig = (id) => {
        toast('We are working on this feature!', { autoClose: 2500, type: 'warning' });
        setRecordsData(recordsData);
        // axios
        //     .delete(`${BASE_URL}api/v1/campaign/delete-campaign/${id}`, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     })
        //     .then(() => {
        //         toast('Campaign deleted successfully!', { autoClose: 2500, type: 'success' });
        //         const filteredData = campaignsData.filter((data) => data._id !== id);
        //         setCampaignsData(filteredData);
        //     })
        //     .catch(async (e) => {
        //         console.log(e);
        //         toast(e.message || 'Something went wrong.', { autoClose: 2500, type: 'error' });
        //     });
    };
    const showWorkingPopup = (id) => {
        toast(`We are working on this feature!${id}`, { autoClose: 2500, type: 'warning' });
    };

    return (
        <DataGrid
            sx={{ minHeight: { md: '70vh', sm: '50vh' } }}
            autoHeight
            rows={recordsData}
            loading={isLoading}
            columns={[
                {
                    field: 'websiteUrl',
                    minWidth: 500,
                    headerName: 'Website',
                    align: 'center',
                    headerAlign: 'center',
                    sortable: false
                },
                {
                    field: 'date',
                    minWidth: 300,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Date',
                    sortable: false
                },
                {
                    field: 'actions',
                    flex: 0.5,
                    align: 'center',
                    headerAlign: 'center',
                    headerName: 'Actions',
                    minWidth: 200,
                    sortable: false,
                    renderCell: ({ row }) => (
                        <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                            <Link to={`/record/${row._id}`} style={{}}>
                                <IconEye />
                            </Link>
                            {/* <div style={{ cursor: 'pointer' }} onClick={() => deleteCampaig(row._id)}>
                                <IconTrash />
                            </div> */}
                        </Box>
                    )
                }
            ]}
            getRowId={({ _id }) => _id}
        />
    );
};

export default RecordTable;
