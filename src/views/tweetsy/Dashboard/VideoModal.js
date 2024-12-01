/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { Dialog } from '@mui/material';
// import { Box } from '@mui/system';
// import { Modal } from 'react-images';

const VideoModal = ({ isModalOpen, setIsModalOpen }) => {
    return (
        <Dialog onClose={() => setIsModalOpen(false)} open={isModalOpen}>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/fJxIcP5eTgI"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </Dialog>
    );
};

export default VideoModal;
