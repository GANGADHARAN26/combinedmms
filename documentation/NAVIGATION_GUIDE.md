# Military Asset Management - Navigation Guide

## Available Pages

The Military Asset Management system has the following pages:

1. **Login Page**
   - URL: `/login`
   - Description: Authentication page for users to sign in

2. **Development Login (For Testing Only)**
   - URL: `/dev-login`
   - Description: Automatically logs in with a mock admin user - use this if you're having authentication issues

3. **Dashboard**
   - URL: `/dashboard`
   - Description: Main overview page with summary metrics and recent activity

4. **Assets Management**
   - **Assets List**
     - URL: `/assets`
     - Description: List of all assets with filtering, sorting, and pagination
   - **Asset Details**
     - URL: `/assets/[id]`
     - Example: `/assets/1` or `/assets/2`
     - Description: Detailed view of a specific asset with tabs for transfers, purchases, assignments, and expenditures
   - **Create New Asset**
     - URL: `/assets/new`
     - Description: Form to create a new asset

5. **Transfers Management**
   - **Transfers List**
     - URL: `/transfers`
     - Description: List of all transfers with filtering, sorting, and pagination
   - **Transfer Details**
     - URL: `/transfers/[id]`
     - Example: `/transfers/1` or `/transfers/2`
     - Description: Detailed view of a specific transfer with approval options
   - **Create New Transfer**
     - URL: `/transfers/new`
     - Description: Form to create a new transfer
     - Can also be accessed with a pre-selected asset: `/transfers/new?asset=1`

6. **Purchases Management**
   - **Purchases List**
     - URL: `/purchases`
     - Description: List of all purchases with filtering, sorting, and pagination
   - **Purchase Details**
     - URL: `/purchases/[id]`
     - Example: `/purchases/1` or `/purchases/2`
     - Description: Detailed view of a specific purchase with delivery status options
   - **Create New Purchase**
     - URL: `/purchases/new`
     - Description: Form to create a new purchase
     - Can also be accessed with a pre-selected asset: `/purchases/new?asset=1`

7. **Assignments Management**
   - **Assignments List**
     - URL: `/assignments`
     - Description: List of all assignments with filtering, sorting, and pagination
   - **Assignment Details**
     - URL: `/assignments/[id]`
     - Example: `/assignments/1` or `/assignments/2`
     - Description: Detailed view of a specific assignment with return options
   - **Return Assignment**
     - URL: `/assignments/[id]/return`
     - Description: Form to return assigned assets

8. **Expenditures Management**
   - **Expenditures List**
     - URL: `/expenditures`
     - Description: List of all expenditures with filtering, sorting, and pagination
   - **Expenditure Details**
     - URL: `/expenditures/[id]`
     - Example: `/expenditures/1` or `/expenditures/2`
     - Description: Detailed view of a specific expenditure

9. **Reports**
   - URL: `/reports`
   - Description: Generate various reports on assets, transfers, purchases, etc.
   - Features:
     - Asset Inventory Report
     - Asset Movement Report
     - Transfers Report
     - Purchases Report
     - Assignments Report
     - Expenditures Report
     - Base Report
     - Custom Report

10. **Users Management**
    - **Users List**
      - URL: `/users`
      - Description: Manage system users and their permissions
      - Features:
        - View all users
        - Filter by role, base, and status
        - Activate/deactivate users
        - Edit user details

11. **Settings**
    - URL: `/settings`
    - Description: System-wide settings and configurations
    - Features:
      - General Settings (system name, organization, date formats)
      - Asset Types Management
      - Bases Management
      - System Settings (maintenance mode, system information)

12. **Error Pages**
    - 404 Page: `/404`
    - 500 Page: `/500`

## How to Navigate

1. **Starting the Application**
   - When you first load the application, you'll be automatically redirected to the login page
   - For development purposes, the authentication is mocked, so you can use any username/password
   - If you're having trouble with the login page, use `/dev-login` to bypass authentication

2. **After Login**
   - You'll be redirected to the dashboard
   - The sidebar provides navigation to all main sections
   - The top navbar shows your user information and has a logout button

3. **Assets Management**
   - From the dashboard, click on "Assets" in the sidebar
   - The assets list page allows you to:
     - Filter assets by type, base, and search term
     - Sort by clicking on column headers
     - Paginate through results
     - Click on an asset name to view details
   - To create a new asset, click the "Add Asset" button

4. **Transfers Management**
   - From the dashboard, click on "Transfers" in the sidebar
   - The transfers list page allows you to:
     - Filter transfers by base, status, and search term
     - Sort by clicking on column headers
     - Paginate through results
     - Click on a transfer to view details
   - To create a new transfer, click the "New Transfer" button
   - Base commanders can approve or cancel pending transfers

5. **Purchases Management**
   - From the dashboard, click on "Purchases" in the sidebar
   - The purchases list page allows you to:
     - Filter purchases by base, supplier, status, and search term
     - Sort by clicking on column headers
     - Paginate through results
     - Click on a purchase to view details
   - To create a new purchase, click the "New Purchase" button
   - Authorized users can mark purchases as delivered or cancel them

6. **Sample Data for Testing**
   - Assets: IDs 1-5 (M4 Carbine, Humvee, Ammunition, Night Vision Goggles, Combat Boots)
   - Transfers: IDs 1-5 (various transfers between bases)
   - Purchases: IDs 1-5 (various purchases from different suppliers)

## Troubleshooting

If you're seeing only loading screens:

1. **Use the Development Login**
   - Navigate directly to `/dev-login` which will bypass the normal authentication flow
   - This will automatically log you in with a mock admin user

2. **Check Authentication State**
   - The application might be stuck in the authentication check
   - Try clearing your browser's local storage and refreshing

3. **Direct Navigation**
   - Try navigating directly to a specific page like `/dashboard` or `/assets`

4. **Login Again**
   - Navigate to `/login` and try logging in again with any credentials

5. **Browser Console**
   - Check the browser console for any errors that might indicate the issue
   - Look for console logs that show the authentication state

## Development Notes

- The application uses mock data for development
- Authentication is simulated with a mock user
- All forms submit to mock endpoints
- The UI is fully functional with simulated API responses
- Sample IDs for testing are provided in the "Sample Data for Testing" section