/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Record = Loadable(lazy(() => import('views/tweetsy/Record')));
const GetCode = Loadable(lazy(() => import('views/tweetsy/GetCode')));
const Records = Loadable(lazy(() => import('views/tweetsy/Records')));
const Product = Loadable(lazy(() => import('views/tweetsy/Product')));
const AllProducts = Loadable(lazy(() => import('views/tweetsy/AllProducts')));
const FilteredLead = Loadable(lazy(() => import('views/tweetsy/filterLead')));
const Subscription = Loadable(lazy(() => import('views/tweetsy/subscription')));
const Settings = Loadable(lazy(() => import('views/tweetsy/Settings')));
const Expired = Loadable(lazy(() => import('views/tweetsy/expired')));
const Unauthenticated = Loadable(lazy(() => import('views/tweetsy/unauthenticated')));
const NotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/unauthenticated',
            element: <Unauthenticated />
        },
        {
            path: '/expired',
            element: <Expired />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/subscription',
            element: <Subscription />
        },
        // {
        //     path: '/records',
        //     element: <Records />
        // },
        {
            path: '/product',
            element: <Product />
        },
        {
            path: '/product/:exportSaveId',
            element: <Product />
        },
        {
            path: '/product/:FilteredCollectionId',
            element: <Product />
        },
        {
            path: '/allproducts',
            element: <AllProducts />
        },
        {
            path: '/filteredlead',
            element: <FilteredLead />
        },
        {
            path: '/record/:id',
            element: <Record />
        },
        {
            path: '/get-code',
            element: <GetCode />
        },
        {
            path: '/*',
            element: <NotFound />
        },
    ]
};

export default MainRoutes;
