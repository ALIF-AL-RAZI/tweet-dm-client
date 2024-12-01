/* eslint-disable prettier/prettier */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axiosUtils from '../../utils/axios';

import { dispatch } from '../index';
import axios from 'api/axios';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    customers: [],
    orders: [],
    products: [],
    productreviews: []
};

const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getCustomersSuccess(state, action) {
            state.customers = action.payload;
        },

        // GET ORDERS
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            console.log("Dispatching getProductsSuccess with payload:", action.payload); // Add this line
            state.products = action.payload;
        },
        
        

        // GET PRODUCT REVIEWS
        getProductReviewsSuccess(state, action) {
            state.productreviews = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCustomers() {
    return async () => {
        try {
            const response = await axiosUtils.get('/api/customer/list');
            dispatch(slice.actions.getCustomersSuccess(response.data.customers));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrders() {
    return async () => {
        try {
            const response = await axiosUtils.get('/api/customer/order/list');
            // const response = await axiosUtils.get('/api/customer/order/list');
            dispatch(slice.actions.getOrdersSuccess(response.data.items));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getAllLeads(token) {
    return async () => {
        try {
            const response = await axios.get('allLeads', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // const response = await axiosUtils.get('/api/customer/order/list');
            console.log(response.data?.items, 'response.data?.items');
            dispatch(slice.actions.getProductsSuccess(response.data.items));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getLeads(token) {
    return async () => {
        try {
            const response = await axios.get('leads', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data?.items, 'response.data?.items'); // Check if data is coming here
            dispatch(slice.actions.getProductsSuccess(response.data.items));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function createLeads({ token, data = {} }) {
    return async () => {
        try {
            const response = await axios.post('leads', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // const response = await axiosUtils.get('/api/customer/order/list');
            console.log(response.data?.items, 'response.data?.items');
            dispatch(slice.actions.getProductsSuccess(response.data.items));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function getProducts() {
    return async () => {
        try {
            const response = await axiosUtils.get('/api/customer/product/list');
            dispatch(slice.actions.getProductsSuccess(response.data.products));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProductReviews() {
    return async () => {
        try {
            const response = await axiosUtils.get('/api/customer/product/reviews');
            dispatch(slice.actions.getProductReviewsSuccess(response.data.productreviews));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
