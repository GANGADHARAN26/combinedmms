# API Implementation Guide

## Overview

This document outlines the API services implemented for the Military Asset Management system. Each service provides methods for interacting with the backend API endpoints.

## API Services

### 1. Base API Service (`api.ts`)

The base API service provides generic HTTP methods for making requests to the backend:

- `get<T>(url: string, config?: AxiosRequestConfig): Promise<T>`
- `post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>`
- `put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>`
- `del<T>(url: string, config?: AxiosRequestConfig): Promise<T>`

It also includes:
- Request interceptor for adding authentication tokens
- Response interceptor for handling errors
- Automatic error toasts for different HTTP status codes

### 2. Asset Service (`assetService.ts`)

Methods for managing assets:

- `getAssets(params?: any): Promise<AssetResponse>`
- `getAssetById(id: string): Promise<Asset>`
- `createAsset(assetData: Partial<Asset>): Promise<Asset>`
- `updateAsset(id: string, assetData: Partial<Asset>): Promise<Asset>`
- `deleteAsset(id: string): Promise<void>`
- `getAssetsByBase(base: string): Promise<Asset[]>`
- `getAssetsByType(type: string): Promise<Asset[]>`

### 3. Transfer Service (`transferService.ts`)

Methods for managing asset transfers:

- `getTransfers(params?: any): Promise<TransferResponse>`
- `getTransferById(id: string): Promise<Transfer>`
- `createTransfer(transferData: Partial<Transfer>): Promise<Transfer>`
- `approveTransfer(id: string): Promise<Transfer>`
- `cancelTransfer(id: string): Promise<Transfer>`

### 4. Purchase Service (`purchaseService.ts`)

Methods for managing asset purchases:

- `getPurchases(params?: any): Promise<PurchaseResponse>`
- `getPurchaseById(id: string): Promise<Purchase>`
- `createPurchase(purchaseData: Partial<Purchase>): Promise<Purchase>`
- `updatePurchase(id: string, purchaseData: Partial<Purchase>): Promise<Purchase>`
- `markAsDelivered(id: string): Promise<Purchase>`
- `cancelPurchase(id: string): Promise<Purchase>`
- `getPurchasesByAsset(assetId: string): Promise<Purchase[]>`

### 5. Assignment Service (`assignmentService.ts`)

Methods for managing asset assignments:

- `getAssignments(params?: any): Promise<AssignmentResponse>`
- `getAssignmentById(id: string): Promise<Assignment>`
- `createAssignment(assignmentData: Partial<Assignment>): Promise<Assignment>`
- `updateAssignment(id: string, assignmentData: Partial<Assignment>): Promise<Assignment>`
- `returnAssignment(id: string, returnData: { returnedQuantity: number, notes?: string }): Promise<Assignment>`
- `cancelAssignment(id: string): Promise<Assignment>`
- `getAssignmentsByAsset(assetId: string): Promise<Assignment[]>`
- `getAssignmentsByPerson(personId: string): Promise<Assignment[]>`

### 6. Expenditure Service (`expenditureService.ts`)

Methods for managing asset expenditures:

- `getExpenditures(params?: any): Promise<ExpenditureResponse>`
- `getExpenditureById(id: string): Promise<Expenditure>`
- `createExpenditure(expenditureData: Partial<Expenditure>): Promise<Expenditure>`
- `updateExpenditure(id: string, expenditureData: Partial<Expenditure>): Promise<Expenditure>`
- `getExpendituresByAsset(assetId: string): Promise<Expenditure[]>`
- `getExpendituresByOperation(operationId: string): Promise<Expenditure[]>`

### 7. User Service (`userService.ts`)

Methods for managing users:

- `getUsers(params?: any): Promise<UserResponse>`
- `getUserById(id: string): Promise<User>`
- `createUser(userData: Partial<User>): Promise<User>`
- `updateUser(id: string, userData: Partial<User>): Promise<User>`
- `deleteUser(id: string): Promise<void>`
- `activateUser(id: string): Promise<User>`
- `deactivateUser(id: string): Promise<User>`
- `changePassword(id: string, passwordData: { currentPassword: string, newPassword: string }): Promise<void>`
- `getUsersByRole(role: string): Promise<User[]>`

### 8. Report Service (`reportService.ts`)

Methods for generating reports:

- `getAssetInventoryReport(params?: ReportParams): Promise<any>`
- `getAssetMovementReport(params?: ReportParams): Promise<any>`
- `getTransferReport(params?: ReportParams): Promise<any>`
- `getPurchaseReport(params?: ReportParams): Promise<any>`
- `getAssignmentReport(params?: ReportParams): Promise<any>`
- `getExpenditureReport(params?: ReportParams): Promise<any>`
- `getBaseReport(baseId: string, params?: ReportParams): Promise<any>`
- `getAssetReport(assetId: string, params?: ReportParams): Promise<any>`
- `getCustomReport(reportConfig: any): Promise<any>`

### 9. Settings Service (`settingsService.ts`)

Methods for managing system settings:

- `getSettings(): Promise<SystemSettings>`
- `updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings>`
- `getAssetTypes(): Promise<string[]>`
- `getBases(): Promise<string[]>`
- `addAssetType(type: string): Promise<string[]>`
- `addBase(base: string): Promise<string[]>`
- `toggleMaintenanceMode(enabled: boolean): Promise<{ maintenanceMode: boolean }>`

## Mock Data Implementation

For development purposes, we've implemented mock data for:

1. **Assets**: Various military assets with different types and quantities
2. **Transfers**: Asset movements between bases
3. **Purchases**: Asset acquisitions from suppliers
4. **Assignments**: Asset assignments to personnel
5. **Expenditures**: Asset consumption records

The mock data is used in the UI components to simulate API responses without requiring a backend connection.

## API Integration

To switch from mock data to real API integration:

1. Ensure the backend API is running and accessible
2. Set the `NEXT_PUBLIC_API_URL` environment variable to the backend URL
3. Remove the mock data implementations in the pages
4. Uncomment the API calls in the service methods
5. Update the authentication context to use real API endpoints

## Error Handling

The API services include comprehensive error handling:

- HTTP status code-specific error messages
- Toast notifications for user feedback
- Console logging for debugging
- Authentication error handling (token expiration, etc.)

## Pagination and Filtering

All list endpoints support:

- Pagination with `skip` and `limit` parameters
- Sorting with `sortBy` and `sortOrder` parameters
- Filtering with various field-specific parameters
- Search functionality with the `search` parameter