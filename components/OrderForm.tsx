"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderFormData, CEMENT_TYPES, QUANTITY_UNITS } from "@/lib/schema";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-brand-blue mb-1">
      {children}
      {required && <span className="text-brand-orange ml-1">*</span>}
    </label>
  );
}

const inputClass =
  "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:bg-gray-100";

const errorInputClass =
  "block w-full rounded-md border border-red-400 px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-blue">
        {children}
      </h2>
      <div className="mt-1.5 flex h-px">
        <div className="flex-3 bg-brand-orange" />
        <div className="flex-1 bg-gray-200" />
      </div>
    </div>
  );
}

export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { quantityUnit: "Bags" },
  });

  const todayStr = new Date().toISOString().split("T")[0];

  async function onSubmit(data: OrderFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Unable to submit your request. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-brand-green/30 bg-brand-green/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15">
          <svg
            className="h-7 w-7 text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display mb-2 text-xl font-bold uppercase tracking-wide text-brand-blue">
          Order Request Submitted
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Thank you. Your cement order request has been received. Our project coordinator will
          review it and contact you shortly. A confirmation has been sent to your email address.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {serverError && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Customer Information */}
      <section>
        <SectionHeading>Customer Information</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="companyName" required>
              Company / Customer Name
            </Label>
            <input
              id="companyName"
              type="text"
              autoComplete="organization"
              placeholder="e.g. ABC Construction Ltd"
              className={errors.companyName ? errorInputClass : inputClass}
              {...register("companyName")}
            />
            <FieldError message={errors.companyName?.message} />
          </div>

          <div>
            <Label htmlFor="contactPerson" required>
              Contact Person
            </Label>
            <input
              id="contactPerson"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              className={errors.contactPerson ? errorInputClass : inputClass}
              {...register("contactPerson")}
            />
            <FieldError message={errors.contactPerson?.message} />
          </div>

          <div>
            <Label htmlFor="contactPhone" required>
              Phone Number
            </Label>
            <input
              id="contactPhone"
              type="tel"
              autoComplete="tel"
              placeholder="+255 7XX XXX XXX"
              className={errors.contactPhone ? errorInputClass : inputClass}
              {...register("contactPhone")}
            />
            <FieldError message={errors.contactPhone?.message} />
          </div>

          <div>
            <Label htmlFor="contactEmail" required>
              Email Address
            </Label>
            <input
              id="contactEmail"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className={errors.contactEmail ? errorInputClass : inputClass}
              {...register("contactEmail")}
            />
            <FieldError message={errors.contactEmail?.message} />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section>
        <SectionHeading>Project Details</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="projectName" required>
              Project Name
            </Label>
            <input
              id="projectName"
              type="text"
              placeholder="e.g. Mwanakwerekwe Residential Complex"
              className={errors.projectName ? errorInputClass : inputClass}
              {...register("projectName")}
            />
            <FieldError message={errors.projectName?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="projectLocation" required>
              Project Location / Site Address
            </Label>
            <textarea
              id="projectLocation"
              rows={2}
              placeholder="Street, area, city"
              className={errors.projectLocation ? errorInputClass : inputClass}
              {...register("projectLocation")}
            />
            <FieldError message={errors.projectLocation?.message} />
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section>
        <SectionHeading>Order Details</SectionHeading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="cementType" required>
              Cement Type
            </Label>
            <select
              id="cementType"
              className={errors.cementType ? errorInputClass : inputClass}
              {...register("cementType")}
            >
              <option value="">— Select cement type —</option>
              {CEMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FieldError message={errors.cementType?.message} />
          </div>

          <div>
            <Label htmlFor="quantity" required>
              Quantity
            </Label>
            <div className="flex gap-2">
              <input
                id="quantity"
                type="number"
                min={1}
                step={1}
                placeholder="0"
                className={`min-w-0 flex-[2] ${errors.quantity ? errorInputClass : inputClass}`}
                {...register("quantity", { valueAsNumber: true })}
              />
              <select
                className={`flex-1 ${inputClass}`}
                {...register("quantityUnit")}
                aria-label="Unit"
              >
                {QUANTITY_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <FieldError message={errors.quantity?.message} />
          </div>

          <div>
            <Label htmlFor="deliveryDate" required>
              Requested Delivery Date
            </Label>
            <input
              id="deliveryDate"
              type="date"
              min={todayStr}
              className={errors.deliveryDate ? errorInputClass : inputClass}
              {...register("deliveryDate")}
            />
            <FieldError message={errors.deliveryDate?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="deliveryAddress" required>
              Delivery Address
            </Label>
            <textarea
              id="deliveryAddress"
              rows={2}
              placeholder="Street, area, city — where cement should be delivered"
              className={errors.deliveryAddress ? errorInputClass : inputClass}
              {...register("deliveryAddress")}
            />
            <FieldError message={errors.deliveryAddress?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="notes">Additional Notes / Special Requirements</Label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Any special delivery instructions or additional information..."
              className={inputClass}
              {...register("notes")}
            />
          </div>
        </div>
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-display w-full rounded-md bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-widest text-brand-blue shadow transition hover:bg-[#e07e30] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting Order Request…" : "Submit Order Request"}
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          Fields marked <span className="text-brand-orange font-semibold">*</span> are required. Our
          team will contact you within 1 business day.
        </p>
      </div>
    </form>
  );
}
