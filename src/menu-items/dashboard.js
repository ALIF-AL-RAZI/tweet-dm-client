// third-party

// assets
import {
    IconUserSearch,
    IconVaccineBottle,
    IconTestPipe,
    IconBook2,
    IconTemplate,
    Icon3dCubeSphere,
    IconSettings,
    IconInbox,
    IconDashboard,
    IconDatabaseExport,
    IconAward,
    IconReportAnalytics,
    IconDeviceAnalytics,
    IconList,
    IconAlien,
    IconHeart,
    IconMessage2
} from '@tabler/icons';

// constant
const icons = {
    IconUserSearch,
    IconTestPipe,
    IconBook2,
    IconTemplate,
    Icon3dCubeSphere,
    IconSettings,
    IconInbox,
    IconDashboard,
    IconDatabaseExport,
    IconAward,
    IconReportAnalytics,
    IconDeviceAnalytics,
    IconAlien,
    IconHeart,
    IconList,
    IconVaccineBottle,
    IconMessage2
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        // {
        //     id: 'records',
        //     title: 'Records',
        //     type: 'item',
        //     url: '/records',
        //     icon: icons.IconList,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'get-code',
        //     title: 'Get Code',
        //     type: 'item',
        //     url: '/get-code',
        //     icon: icons.IconDatabaseExport,
        //     breadcrumbs: false
        // },
        {
            id: 'lead',
            title: 'Lead',
            type: 'item',
            url: '/product',
            icon: icons.IconDatabaseExport,
            breadcrumbs: false
        },
        {
            id: 'allLead',
            title: 'All Leads',
            type: 'item',
            url: '/allproducts',
            icon: icons.IconDatabaseExport,
            breadcrumbs: false
        },
        {
            id: 'FilteredLead',
            title: 'Filtered Leads',
            type: 'item',
            url: '/filteredlead',
            icon: icons.IconDatabaseExport,
            breadcrumbs: false
        }
        // ,{
        //     id: 'export',
        //     // title: 'Export',
        //     title: 'Follower Import',
        //     type: 'item',
        //     url: '/export',
        //     icon: icons.IconDatabaseExport,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'following',
        //     // title: 'Export',
        //     title: 'Following Import',
        //     type: 'item',
        //     url: '/following',
        //     icon: icons.IconAlien,
        //     breadcrumbs: false
        // },
    ]
};

export default dashboard;
