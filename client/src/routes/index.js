import React from "react";
import Accounts from "../pages/Accounts";
import Transactions from "../pages/Transactions";
import { Navigate } from "react-router-dom";

const UNPROTECTED_ROUTES = [
    {
        path: '/',
        element: <Navigate to='/accounts' replace = {false} />
    },
    {
        path: '/accounts',
        element: <Accounts />
    },
    {
        path: '/transactions',
        element: <Transactions />
    }
];

export { UNPROTECTED_ROUTES };