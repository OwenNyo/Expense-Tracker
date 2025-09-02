// Base URL of the backend API server (used as a prefix when making HTTP requests)
export const BASE_URL = "http://localhost:8000";

// Grouped object holding all API endpoint paths used by the frontend to interact with the backend
export const API_PATHS = {
    
    // Authentication-related endpoints
    AUTH: {
        LOGIN: "/api/v1/auth/login",             // POST: Log in a user with email and password
        REGISTER: "/api/v1/auth/register",       // POST: Register a new user
        GET_USER_INFO: "api/v1/auth/getUser",    // GET: Get currently logged-in user's data (via token)
    },

    // Dashboard endpoint for summarized financial data
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",           // GET: Fetch dashboard data (total income, expense, balance, etc.)
    },

    // Income-related endpoints
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",                // POST: Add a new income source
        GET_ALL_INCOME: "/api/v1/income/get",            // GET: Retrieve all income records for the user
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`, // DELETE: Delete a specific income by ID (dynamic path)
        DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`, // GET: Download all income records as an Excel file
    },

    // Expense-related endpoints
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",                // POST: Add a new expense entry
        GET_ALL_EXPENSE: "/api/v1/expense/get",            // GET: Retrieve all expense records for the user
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // DELETE: Delete a specific expense by ID (dynamic path)
        DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`, // GET: Download all expense records as an Excel file
    },

    // Image upload endpoint (for profile pictures or documents)
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",         // POST: Upload an image file to the server
    },
};
