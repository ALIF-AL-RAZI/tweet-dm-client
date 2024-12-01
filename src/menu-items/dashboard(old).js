// third-party
import { FormattedMessage } from 'react-intl';

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
        {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/analytics',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        // {
        //     id: 'inbox',
        //     title: 'Inbox',
        //     type: 'item',
        //     url: '/inbox',
        //     icon: icons.IconInbox,
        //     breadcrumbs: false
        // },
        {
            id: 'welcome-message',
            title: 'Welcome Message',
            type: 'item',
            url: '/welcome-message',
            icon: icons.IconMessage2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
