import {
  ContactMethod,
  EmployeeRole,
  SupplierRole,
  SupplierSupplyCategory,
  ResourceCategory,
  Unit,
} from "./enum.type";

interface User {
  id?: string;
  name: string;
  email?: string;
  photo?: string;
  mobile: string;
  address?: string;
  rating?: number;
  online_contact: ContactMethod[];
}

export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  photo: string;
  mobile: string;
}

export interface IEmployee extends User {
  salary: number;
  joined_date: Date;
  role: EmployeeRole;
}

export interface ISupplier extends User {
  company: string;
  role: SupplierRole;
  type: SupplierSupplyCategory;
}

export interface ICustomer extends User {
  company: string;
  is_registered: boolean;
}

export interface IDoctor extends User {
  specality?: string;
  position?: string;
  degree: string[];
}

export interface IItem {
  id: string;
  name: string;
  description?: string;
  category: ResourceCategory;
  unit_name: Unit;
  unit_price: number;
  supplier?: {
    id: string;
    name: string;
  };
  stock_quantity: number;
  reorder_level: number;
  is_consumable: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface StockSummary {
  total_stock_value: number;
  total_items_in_stock: number;
  low_stock_alerts: number;
  total_purchases: number;
  total_sales: number;
  critical_items: number;
}