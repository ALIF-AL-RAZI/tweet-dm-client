/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import CodeSnippet from './CodeSnippet ';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { dbUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (dbUser.selectedPlan === 'none' || dbUser.selectedPlan === 'trial' || dbUser.credit === 0) {
            navigate('/expired');
        } else if (['basic', 'standard', 'premium'].includes(dbUser.selectedPlan) && new Date(dbUser.endDate) <= new Date()) {
            navigate('/expired');
        }
    }, []);
    console.log(' dlihfh');
    // const script = `<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>`;
    const script = `<script src="https://rr-web.netlify.app/hootspy.min.js"></script>`;
    return (
        <div>
            <h1>Get Code</h1>
            {/* <h3>Step 1: </h3>
            <p>add this script at your index.html </p>
            <p>{script}</p>
            <h3>Step 2: </h3> */}
            <p>Copy and paste this code at your codebase</p>
            <CodeSnippet userIdDataValue={dbUser?._id} />
        </div>
    );
};

export default Index;
