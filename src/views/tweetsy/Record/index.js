/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
// external imports
import { Button, Typography } from '@mui/material';
import { Box, textAlign } from '@mui/system';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { IconFileDownload } from '@tabler/icons';
import Replayer from 'rrweb-player';

// internal imports
import useAuth from 'hooks/useAuth';
import TweetsyConfig from 'TweetsyConfig';

const Record = () => {
    const { dbUser } = useAuth();
    const [record, setRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    console.log(id, 1234);
    const playerElRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        // console.log(`${TweetsyConfig.getNodeUrl()}api/v1/record/getSingleCampaign/${id}`);
        axios
            .get(`${TweetsyConfig.getNodeUrl()}api/v1/record/get-record-by-id/${id}`, {
                headers: { Authorization: `Bearer ${dbUser.token}` }
            })
            .then((data) => {
                console.log(1234, data?.data?.data);
                console.log(1234, data?.data?.data?.data);
                setRecord(data?.data?.data);
                const linkEl = document.createElement('link');
                linkEl.href = 'https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css';
                linkEl.rel = 'stylesheet';
                document.head.appendChild(linkEl);
                console.log({ linkEl }, 1234);
                playerRef.current = new Replayer({
                    target: playerElRef.current,
                    props: {
                        events: data?.data?.data?.data,
                        autoPlay: true
                    }
                });
            })
            .catch((err) => {
                console.log('🚀 ~ file: index.js ~ line 29 ~ useEffect ~ err', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    console.log(dbUser.token);

    return (
        <Box style={{ textAlign: 'center' }}>
            <Typography variant="h2">User Activity</Typography>
            <br />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
                ref={playerElRef}
            />
        </Box>
    );
};

export default Record;
