/* eslint-disable prettier/prettier */
// import { lazy } from 'react';

// project imports
import AdminLayout from 'layout/AdminLayout';
// import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
// import Search from 'views/tweetsy/Search';
// import Collection from 'views/tweetsy/Collection';
// import Templates from 'views/tweetsy/Templates';
// import Campaigns from 'views/tweetsy/Campaigns';
// import Search1 from 'views/tweetsy/Search1';
// import Settings from 'views/tweetsy/Settings';
// import Dashboard from 'views/tweetsy/Dashboard';
import UsersList from 'views/tweetsy/Admin/UsersList';
// import MacroInbox from 'views/tweetsy/MacroInbox';
// import Export from 'views/tweetsy/Export';
// import FollowingExport from 'views/tweetsy/FollowingExport';
// import LikeExport from 'views/tweetsy/LikeExport';
// import EmptyPage from 'views/tweetsy/EmptyPage';
// import CampaignsNew from 'views/tweetsy/CampaignsNew';
import AdminAnalytics from 'views/tweetsy/Admin/AdminAnalytics';
import SingleUser from 'views/tweetsy/Admin/SingleUser';
// import ReTweet from 'views/tweetsy/ReTweet';

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// const Subscription = Loadable(lazy(() => import('views/tweetsy/subscription')));

// tweetsy custom routing
// TODO: Remove all unnecessaru route.

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <AdminLayout />
        </AuthGuard>
    ),
    children: [
        // 🛠Modified by FoysalBN
        // tweetsy custom routes statt ===================

        {
            path: '/admin-dashboard',
            // element: <Dashboard />
            element: <AdminAnalytics />
        },
        // {
        //     path: '/analytics',
        //     element: <Analytics />
        // },

        {
            path: '/admin-dashboard-users',
            // element: <MacroInbox />
            element: <UsersList />
        },
        {
            path: '/admin-dashboard-user-edit/:id',
            element: <SingleUser />
            // element: <EmptyPage />
        }
        // eslint-disable-next-line prettier/prettier
    ]
};

export default AdminRoutes;
