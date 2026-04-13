import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const CEMENT_TYPES = [
  "Nyati Super 42 (CEM II A-L 42.5R)",
  "Nyati Duramax 42 (CEM II B-M 42.5N)",
  "Nyati Premium OPC (CEM I OPC 42.5N)",
  "Nyati Max 32 (CEM II B-L 32.5N)",
] as const;

export const QUANTITY_UNITS = ["Bags", "Tonnes"] as const;

export const orderSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  contactPhone: z
    .string()
    .min(7, "Phone number is required")
    .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
  contactEmail: z.string().email("Enter a valid email address"),
  projectName: z.string().min(2, "Project name is required"),
  projectLocation: z.string().min(5, "Project location is required"),
  cementType: z.enum(CEMENT_TYPES, { message: "Please select a cement type" }),
  quantity: z
    .number({ message: "Quantity must be a number" })
    .positive("Quantity must be greater than 0"),
  quantityUnit: z.enum(QUANTITY_UNITS),
  deliveryDate: z
    .string()
    .min(1, "Delivery date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date >= today;
    }, "Delivery date must be today or in the future"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  pricePerUnit: z
    .number({ message: "Enter a valid price" })
    .positive("Price must be greater than 0")
    .optional(),
  proformaRefNumber: z.string().trim().optional(),
  notes: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;
