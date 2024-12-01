/* eslint-disable react/prop-types */
import { useState, createContext } from 'react';

export const macrodmContext = createContext();

const MacrodmProvider = ({ children }) => {
    // for Search &  page------------------
    const [selectedExportId, setSelectedExportId] = useState('');
    const [selectedExport, setSelectedExport] = useState({});
    const [listedFollowers, setListedFollowers] = useState([]);
    // for CAMPAIGN PAGE
    const [campaignNames, setCampaignNames] = useState([]);
    const [templateNames, setTemplateNames] = useState([]);
    const [leadNames, setLeadNames] = useState([]);

    const allContext = {
        // for Search1
        selectedExport,
        setSelectedExport,
        selectedExportId,
        setSelectedExportId,
        listedFollowers,
        setListedFollowers,
        // for CAMPAIGN PAGE
        campaignNames,
        setCampaignNames,
        templateNames,
        setTemplateNames,
        leadNames,
        setLeadNames
    };

    return <macrodmContext.Provider value={allContext}>{children}</macrodmContext.Provider>;
};

export default MacrodmProvider;
