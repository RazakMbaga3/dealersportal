'use client'

import { useActionState, useState } from 'react'
import { createPortalOrder, OrderActionState } from '@/actions/orders'
import { CEMENT_TYPES } from '@/lib/schemas/order-portal'
import type { Dealer } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'

interface ProductRow {
  cementType: string
  quantityMT: string
}

const DEFAULT_PRODUCT: ProductRow = { cementType: CEMENT_TYPES[0], quantityMT: '' }

interface NewOrderFormProps {
  dealer: Dealer
}

export default function NewOrderForm({ dealer }: NewOrderFormProps) {
  const [state, formAction, pending] = useActionState<OrderActionState, FormData>(
    createPortalOrder,
    {}
  )
  const [products, setProducts] = useState<ProductRow[]>([{ ...DEFAULT_PRODUCT }])
  const [useCustomAddress, setUseCustomAddress] = useState(false)

  function addProduct() {
    setProducts((prev) => [...prev, { ...DEFAULT_PRODUCT }])
  }

  function removeProduct(index: number) {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  function updateProduct(index: number, field: keyof ProductRow, value: string) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))
  }

  function handleSubmit(formData: FormData) {
    // Inject product rows into formData (they're managed in state, not native inputs)
    products.forEach((p, i) => {
      formData.set(`products[${i}][cementType]`, p.cementType)
      formData.set(`products[${i}][quantityMT]`, p.quantityMT)
    })
    formAction(formData)
  }

  const defaultAddress = dealer.addresses.find((a) => a.isDefault) ?? dealer.addresses[0]

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Dealer info banner */}
      <Card>
        <div className="grid grid-cols-2 gap-3 text-sm font-body">
          <div>
            <p className="text-xs text-gray-500">Dealer</p>
            <p className="font-bold text-gray-900">{dealer.companyName}</p>
            <p className="text-xs text-gray-400">{dealer.region}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 col-span-1">
            <div>
              <p className="text-xs text-gray-500">Credit Limit</p>
              <p className="font-semibold text-gray-800">TZS {dealer.creditLimit.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Outstanding</p>
              <p className="font-semibold text-brand-orange">TZS {dealer.outstandingBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Global form error */}
      {state.message && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-body">
          {state.message}
        </div>
      )}

      {/* Products */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-brand-blue font-display">Products</h2>
          <button
            type="button"
            onClick={addProduct}
            className="text-sm text-brand-blue hover:underline font-body font-semibold"
          >
            + Add Product
          </button>
        </div>

        {state.errors?.products && (
          <p className="text-xs text-red-600 font-body mb-2">{state.errors.products[0]}</p>
        )}

        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={index} className="flex gap-3 items-end rounded-lg bg-gray-50 p-3">
              <div className="flex-1">
                <Label htmlFor={`cement-${index}`}>Cement Type</Label>
                <Select
                  id={`cement-${index}`}
                  value={product.cementType}
                  onChange={(e) => updateProduct(index, 'cementType', e.target.value)}
                >
                  {CEMENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </div>
              <div className="w-28">
                <Label htmlFor={`qty-${index}`} required>Qty (MT)</Label>
                <Input
                  id={`qty-${index}`}
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="0"
                  value={product.quantityMT}
                  onChange={(e) => updateProduct(index, 'quantityMT', e.target.value)}
                />
              </div>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove product"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Retailer */}
      <Card>
        <h2 className="text-base font-bold text-brand-blue font-display mb-4">Retailer (Optional)</h2>
        <div>
          <Label htmlFor="retailerName">Retailer / End Customer Name</Label>
          <Input id="retailerName" name="retailerName" placeholder="e.g. JUMA HARDWARE" />
        </div>
      </Card>

      {/* Delivery */}
      <Card>
        <h2 className="text-base font-bold text-brand-blue font-display mb-4">Delivery</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="deliveryAddress" required>Ship To</Label>
            {dealer.addresses.length > 0 && !useCustomAddress ? (
              <>
                <Select name="deliveryAddress" defaultValue={defaultAddress?.fullAddress ?? ''}>
                  {dealer.addresses.map((addr) => (
                    <option key={addr.id} value={addr.fullAddress}>
                      {addr.label} — {addr.fullAddress}
                    </option>
                  ))}
                </Select>
                <button
                  type="button"
                  onClick={() => setUseCustomAddress(true)}
                  className="mt-1 text-xs text-brand-blue hover:underline font-body"
                >
                  Use a different address
                </button>
              </>
            ) : (
              <>
                <Input
                  id="deliveryAddress"
                  name="deliveryAddress"
                  placeholder="Full delivery address"
                  error={!!state.errors?.deliveryAddress}
                />
                {dealer.addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setUseCustomAddress(false)}
                    className="mt-1 text-xs text-brand-blue hover:underline font-body"
                  >
                    Use saved address
                  </button>
                )}
              </>
            )}
            {state.errors?.deliveryAddress && (
              <p className="mt-1 text-xs text-red-600 font-body">{state.errors.deliveryAddress[0]}</p>
            )}
          </div>

          <div>
            <Label htmlFor="deliveryPriority">Delivery Priority</Label>
            <Select id="deliveryPriority" name="deliveryPriority" defaultValue="standard">
              <option value="standard">Standard</option>
              <option value="urgent">Urgent</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Special instructions, delivery time preferences…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue resize-none"
        />
      </Card>

      <Button type="submit" size="lg" className="w-full" loading={pending}>
        {pending ? 'Placing Order…' : 'Place Order'}
      </Button>
    </form>
  )
}
