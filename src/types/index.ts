import { ContactMethod, EmployeeRole, SupplierType } from "./enum.type";

interface User {
    id?: string;
    name: string;
    email?:string;
    photo?: string;
    mobile: string;
    address?: string;
    rating?: number;
    online_contact: ContactMethod[]
}

export interface IAdmin {
    id?: string;
    name: string;
    email:string;
    photo: string;
    mobile: string;
}

export interface IEmployee extends User{
    salary: number;
    joined_date: Date;
    role: EmployeeRole
}


export interface ISupplier extends User {
    company: string;
    role: "SALES_MAN"
        | "OWNER"
        | "DISTRIBUTOR"
        | "DEALER"
        | "WHOLESALER"
        | "RETAILER"
        | "MANUFACTURER"
        | "IMPORTER"
        | "REPRESENTATIVE",
    type: SupplierType
}

export interface ICustomer extends User {
    company: string;
    is_registered: boolean;
}

export interface IDoctor extends User {
    specality?: string;
    position?: string;
    degree: string[]
}