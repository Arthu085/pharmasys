export enum AuthRoutesEnum {
	LOGIN = "/auth/login",
	REGISTER = "/auth/register",
}

export enum DashboardRoutesEnum {
	HOME = "/",
}

export enum UserRoutesEnum {
	USERS = "/users",
	PROFILE = "/users/profile",
}

export enum CompanyRoutesEnum {
	COMPANIES = "/companies",
}

export enum PatientRoutesEnum {
	PATIENTS = "/patients",
}

export enum BatchRoutesEnum {
	BATCHES = "/batches",
}

export enum PrescriptorRoutesEnum {
	PRESCRIPTORS = "/prescriptors",
}

export enum ItemRoutesEnum {
	ITEMS = "/items",
}

export enum StockLocationRoutesEnum {
	STOCK_LOCATIONS = "/stock/locations",
}

export enum MovementRoutesEnum {
	MOVEMENT = "/movement",
	STOCK_BALANCE = "/movement/stock/balance",
	INVENTORY_ENTRY = "/movement/inventory/entry",
	INVENTORY_EXIT = "/movement/inventory/exit",
	ITEM_DISPENSATION = "/movement/item/dispensation",
	STOCK_TRANSFER = "/movement/stock/transfer",
	TRANSFER_REQUEST = "/movement/transfer/request",
}

export enum NotFoundRoutesEnum {
	NOT_FOUND = "*",
}
