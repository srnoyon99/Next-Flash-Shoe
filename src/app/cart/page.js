'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const INITIAL_ITEMS = [
  { id: 1, name: 'Black Seed Honey 1kg', image: '/images/products/black-seed-honey.jpg', price: 1600, qty: 1 },
  { id: 2, name: 'Black Seed Honey 1kg', image: '/images/products/black-seed-honey.jpg', price: 1600, qty: 1 },
];

const DELIVERY_COST = 70;

// ---------------------------------------------------------------------------
// Bangladesh Divisions and Districts (English + Bangla names)
// ---------------------------------------------------------------------------
const DIVISIONS = [
  { en: 'Dhaka', bn: 'ঢাকা' },
  { en: 'Chattogram', bn: 'চট্টগ্রাম' },
  { en: 'Rajshahi', bn: 'রাজশাহী' },
  { en: 'Khulna', bn: 'খুলনা' },
  { en: 'Barishal', bn: 'বরিশাল' },
  { en: 'Sylhet', bn: 'সিলেট' },
  { en: 'Rangpur', bn: 'রংপুর' },
  { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
];

const DISTRICTS_BY_DIVISION = {
  Dhaka: [
    { en: 'Dhaka', bn: 'ঢাকা' },
    { en: 'Faridpur', bn: 'ফরিদপুর' },
    { en: 'Gazipur', bn: 'গাজীপুর' },
    { en: 'Gopalganj', bn: 'গোপালগঞ্জ' },
    { en: 'Kishoreganj', bn: 'কিশোরগঞ্জ' },
    { en: 'Madaripur', bn: 'মাদারীপুর' },
    { en: 'Manikganj', bn: 'মানিকগঞ্জ' },
    { en: 'Munshiganj', bn: 'মুন্সিগঞ্জ' },
    { en: 'Narayanganj', bn: 'নারায়ণগঞ্জ' },
    { en: 'Narsingdi', bn: 'নরসিংদী' },
    { en: 'Rajbari', bn: 'রাজবাড়ী' },
    { en: 'Shariatpur', bn: 'শরীয়তপুর' },
    { en: 'Tangail', bn: 'টাঙ্গাইল' },
  ],
  Chattogram: [
    { en: 'Bandarban', bn: 'বান্দরবান' },
    { en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া' },
    { en: 'Chandpur', bn: 'চাঁদপুর' },
    { en: 'Chattogram', bn: 'চট্টগ্রাম' },
    { en: 'Cumilla', bn: 'কুমিল্লা' },
    { en: "Cox's Bazar", bn: 'কক্সবাজার' },
    { en: 'Feni', bn: 'ফেনী' },
    { en: 'Khagrachari', bn: 'খাগড়াছড়ি' },
    { en: 'Lakshmipur', bn: 'লক্ষ্মীপুর' },
    { en: 'Noakhali', bn: 'নোয়াখালী' },
    { en: 'Rangamati', bn: 'রাঙ্গামাটি' },
  ],
  Rajshahi: [
    { en: 'Bogura', bn: 'বগুড়া' },
    { en: 'Joypurhat', bn: 'জয়পুরহাট' },
    { en: 'Naogaon', bn: 'নওগাঁ' },
    { en: 'Natore', bn: 'নাটোর' },
    { en: 'Chapainawabganj', bn: 'চাঁপাইনবাবগঞ্জ' },
    { en: 'Pabna', bn: 'পাবনা' },
    { en: 'Rajshahi', bn: 'রাজশাহী' },
    { en: 'Sirajganj', bn: 'সিরাজগঞ্জ' },
  ],
  Khulna: [
    { en: 'Bagerhat', bn: 'বাগেরহাট' },
    { en: 'Chuadanga', bn: 'চুয়াডাঙ্গা' },
    { en: 'Jashore', bn: 'যশোর' },
    { en: 'Jhenaidah', bn: 'ঝিনাইদহ' },
    { en: 'Khulna', bn: 'খুলনা' },
    { en: 'Kushtia', bn: 'কুষ্টিয়া' },
    { en: 'Magura', bn: 'মাগুরা' },
    { en: 'Meherpur', bn: 'মেহেরপুর' },
    { en: 'Narail', bn: 'নড়াইল' },
    { en: 'Satkhira', bn: 'সাতক্ষীরা' },
  ],
  Barishal: [
    { en: 'Barguna', bn: 'বরগুনা' },
    { en: 'Barishal', bn: 'বরিশাল' },
    { en: 'Bhola', bn: 'ভোলা' },
    { en: 'Jhalokati', bn: 'ঝালকাঠি' },
    { en: 'Patuakhali', bn: 'পটুয়াখালী' },
    { en: 'Pirojpur', bn: 'পিরোজপুর' },
  ],
  Sylhet: [
    { en: 'Habiganj', bn: 'হবিগঞ্জ' },
    { en: 'Moulvibazar', bn: 'মৌলভীবাজার' },
    { en: 'Sunamganj', bn: 'সুনামগঞ্জ' },
    { en: 'Sylhet', bn: 'সিলেট' },
  ],
  Rangpur: [
    { en: 'Dinajpur', bn: 'দিনাজপুর' },
    { en: 'Gaibandha', bn: 'গাইবান্ধা' },
    { en: 'Kurigram', bn: 'কুড়িগ্রাম' },
    { en: 'Lalmonirhat', bn: 'লালমনিরহাট' },
    { en: 'Nilphamari', bn: 'নীলফামারী' },
    { en: 'Panchagarh', bn: 'পঞ্চগড়' },
    { en: 'Rangpur', bn: 'রংপুর' },
    { en: 'Thakurgaon', bn: 'ঠাকুরগাঁও' },
  ],
  Mymensingh: [
    { en: 'Jamalpur', bn: 'জামালপুর' },
    { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
    { en: 'Netrokona', bn: 'নেত্রকোনা' },
    { en: 'Sherpur', bn: 'শেরপুর' },
  ],
};

// Sample City/Village (Upazila-level) names per district, in English + Bangla.
// This is illustrative only — swap in your full dataset (or fetch it from an
// API keyed by district) for production use. The picker below also lets the
// customer type a name that isn't in the list, so coverage gaps aren't a dead end.
const VILLAGES_BY_DISTRICT = {
  Dhaka: [
    { en: 'Dhamrai', bn: 'ধামরাই' },
    { en: 'Savar', bn: 'সাভার' },
    { en: 'Keraniganj', bn: 'কেরানীগঞ্জ' },
    { en: 'Nawabganj', bn: 'নবাবগঞ্জ' },
    { en: 'Dohar', bn: 'দোহার' },
  ],
  Chattogram: [
    { en: 'Patiya', bn: 'পটিয়া' },
    { en: 'Sitakunda', bn: 'সীতাকুণ্ড' },
    { en: 'Rangunia', bn: 'রাঙ্গুনিয়া' },
    { en: 'Boalkhali', bn: 'বোয়ালখালী' },
  ],
  Cumilla: [
    { en: 'Debidwar', bn: 'দেবিদ্বার' },
    { en: 'Chandina', bn: 'চান্দিনা' },
    { en: 'Muradnagar', bn: 'মুরাদনগর' },
  ],
  "Cox's Bazar": [
    { en: 'Teknaf', bn: 'টেকনাফ' },
    { en: 'Ukhiya', bn: 'উখিয়া' },
    { en: 'Ramu', bn: 'রামু' },
  ],
  Sylhet: [
    { en: 'Beanibazar', bn: 'বিয়ানীবাজার' },
    { en: 'Golapganj', bn: 'গোলাপগঞ্জ' },
    { en: 'Jaintiapur', bn: 'জৈন্তাপুর' },
  ],
  Rajshahi: [
    { en: 'Godagari', bn: 'গোদাগাড়ী' },
    { en: 'Paba', bn: 'পবা' },
    { en: 'Charghat', bn: 'চারঘাট' },
  ],
  Khulna: [
    { en: 'Dumuria', bn: 'ডুমুরিয়া' },
    { en: 'Batiaghata', bn: 'বটিয়াঘাটা' },
    { en: 'Rupsha', bn: 'রূপসা' },
  ],
  Barishal: [
    { en: 'Bakerganj', bn: 'বাকেরগঞ্জ' },
    { en: 'Babuganj', bn: 'বাবুগঞ্জ' },
    { en: 'Muladi', bn: 'মুলাদী' },
  ],
  Rangpur: [
    { en: 'Mithapukur', bn: 'মিঠাপুকুর' },
    { en: 'Pirganj', bn: 'পীরগঞ্জ' },
    { en: 'Badarganj', bn: 'বদরগঞ্জ' },
  ],
  Mymensingh: [
    { en: 'Trishal', bn: 'ত্রিশাল' },
    { en: 'Muktagacha', bn: 'মুক্তাগাছা' },
    { en: 'Bhaluka', bn: 'ভালুকা' },
  ],
};

const DEFAULT_ADDRESS_FORM = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: 'Dhaka', // holds the selected Division (English key)
  area: 'Dhaka', // holds the selected District/City (English key)
  village: '', // holds the selected City/Village (English key, may be custom typed)
  notesOpen: false,
  notes: '',
};

export default function page() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [form, setForm] = useState(DEFAULT_ADDRESS_FORM);
  const [billingOpen, setBillingOpen] = useState(false);
  const [billingForm, setBillingForm] = useState(DEFAULT_ADDRESS_FORM);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const total = Math.max(0, subtotal + DELIVERY_COST - discount);

  const handleQty = (id, direction) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: direction === 'inc' ? item.qty + 1 : Math.max(1, item.qty - 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  // Text inputs (name, phone, email, address)
  const handleFieldChange = (setter) => (field) => (e) => {
    const value = e.target.value;
    setter((prev) => ({ ...prev, [field]: value }));
  };

  // Division select -> reset District (and any picked village) to defaults
  const handleDivisionChange = (setter) => (divisionEn) => {
    setter((prev) => ({
      ...prev,
      city: divisionEn,
      area: DISTRICTS_BY_DIVISION[divisionEn][0].en,
      village: '',
    }));
  };

  // District select -> clear any previously picked village, since the list depends on district
  const handleDistrictChange = (setter) => (districtEn) => {
    setter((prev) => ({ ...prev, area: districtEn, village: '' }));
  };

  // City/Village select (supports a custom typed value)
  const handleVillageChange = (setter) => (villageEn) => {
    setter((prev) => ({ ...prev, village: villageEn }));
  };

  // Special notes toggle + textarea, per address
  const handleNotesToggle = (setter) => () => {
    setter((prev) => ({ ...prev, notesOpen: !prev.notesOpen }));
  };
  const handleNotesChange = (setter) => (e) => {
    const value = e.target.value;
    setter((prev) => ({ ...prev, notes: value }));
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Enter a coupon code first');
      return;
    }
    if (couponCode.trim().toUpperCase() === 'SAVE10') {
      const value = Math.round(subtotal * 0.1);
      setDiscount(value);
      toast.success(`Coupon applied, you saved ৳${value}`);
    } else {
      toast.error('This coupon is not valid');
    }
  };

  const handlePlaceOrder = () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error('Fill in your name, phone, and address');
      return;
    }
    if (!agreed) {
      toast.error('Please agree to the Terms and Conditions to continue');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Order placed successfully');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-8 sm:px-8">
      <div className="mx-auto grid max-w-[1550px] grid-cols-1 gap-6 lg:grid-cols-[1.45fr_1fr]">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          {/* Order review */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <SectionTitle>Order review</SectionTitle>
            <div className="mt-4 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-800">{item.name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
                        <button
                          type="button"
                          onClick={() => handleQty(item.id, 'dec')}
                          className="flex h-7 w-7 items-center justify-center bg-gray-100 text-sm text-gray-600 hover:bg-gray-200"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="flex h-7 w-8 items-center justify-center bg-white text-sm text-gray-800">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQty(item.id, 'inc')}
                          className="flex h-7 w-7 items-center justify-center bg-gray-100 text-sm text-gray-600 hover:bg-gray-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-nowrap px-2 text-sm text-gray-800">
                    ৳{(item.price * item.qty).toLocaleString()}.00
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
                    aria-label="Remove item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </section>

          {/* Shipping address */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <SectionTitle>Shipping Address</SectionTitle>
            <div className="mt-4">
              <AddressFields
                form={form}
                onChange={handleFieldChange(setForm)}
                onDivisionChange={handleDivisionChange(setForm)}
                onDistrictChange={handleDistrictChange(setForm)}
                onVillageChange={handleVillageChange(setForm)}
                onNotesToggle={handleNotesToggle(setForm)}
                onNotesChange={handleNotesChange(setForm)}
              />
            </div>
          </section>

          {/* Billing address */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <SectionTitle>Billing Address</SectionTitle>
              <button
                type="button"
                onClick={() => setBillingOpen((prev) => !prev)}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-500"
                aria-pressed={billingOpen}
                aria-label="Toggle separate billing address"
              >
                {billingOpen && <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />}
              </button>
            </div>
            {billingOpen && (
              <div className="mt-4">
                <AddressFields
                  form={billingForm}
                  onChange={handleFieldChange(setBillingForm)}
                  onDivisionChange={handleDivisionChange(setBillingForm)}
                  onDistrictChange={handleDistrictChange(setBillingForm)}
                  onVillageChange={handleVillageChange(setBillingForm)}
                  onNotesToggle={handleNotesToggle(setBillingForm)}
                  onNotesChange={handleNotesChange(setBillingForm)}
                />
              </div>
            )}
          </section>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">
          {/* Payment method */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <SectionTitle>Payment method</SectionTitle>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <PaymentOption
                label="Cash On Delivery"
                selected={paymentMethod === 'cod'}
                onClick={() => setPaymentMethod('cod')}
                icon={<CodIcon />}
              />
              <PaymentOption
                label="Online Payment"
                selected={paymentMethod === 'online'}
                onClick={() => setPaymentMethod('online')}
                icon={<CardIcon />}
              />
              <PaymentOption
                label="Bkash"
                selected={paymentMethod === 'bkash'}
                onClick={() => setPaymentMethod('bkash')}
                icon={<BkashIcon />}
              />
              <PaymentOption
                label="Nagad"
                selected={paymentMethod === 'nagad'}
                onClick={() => setPaymentMethod('nagad')}
                icon={<NagadIcon />}
              />
            </div>
          </section>

          {/* Coupon */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <button
              type="button"
              onClick={() => setCouponOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-sm text-gray-700"
            >
              Have any coupon or gift voucher?
              <ChevronDownIcon className={`transition-transform ${couponOpen ? 'rotate-180' : ''}`} />
            </button>
            {couponOpen && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
                >
                  Apply
                </button>
              </div>
            )}
          </section>

            {/* Special notes (optional) */}
      <section className=' rounded-xl bg-white p-6 shadow-sm '>
        <button
          type="button"
          onClick={handleNotesToggle(setForm)}
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-orange-500"
            aria-hidden="true"
          >
            {form.notesOpen && <span className="h-2 w-2 rounded-full bg-orange-500" />}
          </span>
          Special notes <span className="text-xs text-gray-400">(Optional)</span>
        </button>
        {form.notesOpen && (
          <div className="mt-2">
            <textarea
              value={form.notes}
              maxLength={90}
              onChange={handleNotesChange(setForm)}
              rows={3}
              placeholder="e.g. landmark, delivery instructions…"
              className="w-full resize-none rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 focus:border-orange-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-400">{form.notes.length} / 90 characters</p>
          </div>
        )}
      </section>

          {/* Totals */}
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between py-1.5">
              <span className="text-sm text-gray-500">Sub total</span>
              <span className="text-sm text-gray-800">{subtotal.toLocaleString()}.00 BDT</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-sm text-gray-500">Delivery cost</span>
              <span className="text-sm text-gray-800">{DELIVERY_COST.toFixed(2)} BDT</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between py-1.5">
                <span className="text-sm text-orange-600">Discount</span>
                <span className="text-sm text-orange-600">-{discount.toLocaleString()}.00 BDT</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-base font-semibold text-gray-900">{total.toLocaleString()}.00BDT</span>
            </div>
          </section>

          {/* Terms */}
          <div className="flex items-start gap-2 px-1">
            <button
              type="button"
              onClick={() => setAgreed((prev) => !prev)}
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-orange-500"
              aria-pressed={agreed}
              aria-label="Agree to terms"
            >
              {agreed && <span className="h-2 w-2 rounded-full bg-orange-500" />}
            </button>
            <p className="text-sm text-gray-600">
              I have read and agree to the{' '}
              <Link href="/terms" className="text-orange-500 hover:underline">Terms and Conditions</Link>,{' '}
              <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link> &{' '}
              <Link href="/refund" className="text-orange-500 hover:underline">Refund and Return Policy</Link>.
            </p>
          </div>

          {/* Place order */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={submitting}
            className="w-full rounded-md bg-orange-500 py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? 'PLACING ORDER…' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="flex items-center gap-2 text-[15px] font-semibold text-gray-800">
      <span className="h-4 w-[3px] rounded-sm bg-orange-500" />
      {children}
    </h2>
  );
}

function AddressFields({ form, onChange, onDivisionChange, onDistrictChange, onVillageChange, onNotesToggle, onNotesChange }) {
  const districtOptions = DISTRICTS_BY_DIVISION[form.city] || [];
  const villageOptions = VILLAGES_BY_DISTRICT[form.area] || [];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={form.fullName}
          onChange={onChange('fullName')}
          placeholder="Your Full Name *"
          className="rounded-md border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-orange-400 focus:outline-none"
        />
        <div className="flex items-center overflow-hidden rounded-md border border-gray-200 focus-within:border-orange-400">
          <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-600">88</span>
          <input
            type="tel"
            value={form.phone}
            onChange={onChange('phone')}
            placeholder="017********"
            className="w-full px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <input
        type="email"
        value={form.email}
        onChange={onChange('email')}
        placeholder="example@gmail.com (Optional)"
        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-orange-400 focus:outline-none"
      />
      <input
        type="text"
        value={form.address}
        onChange={onChange('address')}
        placeholder="ex: House no. / building / street / area"
        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-orange-400 focus:outline-none"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SearchableSelect
          options={DIVISIONS}
          value={form.city}
          onChange={onDivisionChange}
          placeholder="Select Division"
          searchPlaceholder="Search division…"
        />
        <SearchableSelect
          options={districtOptions}
          value={form.area}
          onChange={onDistrictChange}
          placeholder="Select District/City"
          searchPlaceholder="Search district/city…"
        />
      </div>
      <div>
        <SearchableSelect
          options={villageOptions}
          value={form.village}
          onChange={onVillageChange}
          placeholder="Select or type City / Village"
          searchPlaceholder="Search city / village…"
          allowCustom
        />
        {villageOptions.length === 0 && (
          <p className="mt-1 text-xs text-gray-400">
            No preset list for {form.area} yet — just type the name and pick it.
          </p>
        )}
      </div>

    </div>
  );
}

/**
 * A searchable dropdown ("combobox") that lists options as "English (Bangla)"
 * and lets the user filter the list by typing either the English or Bangla name.
 */
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder = 'Search…',
  allowCustom = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Falls back to a plain "custom" entry (no Bangla name) when the current
  // value isn't one of the known options — only relevant when allowCustom.
  const selected = options.find((o) => o.en === value) || (value ? { en: value, bn: '' } : null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) => o.en.toLowerCase().includes(q) || o.bn.includes(query.trim())
    );
  }, [options, query]);

  const trimmedQuery = query.trim();
  const hasExactMatch = filtered.some((o) => o.en.toLowerCase() === trimmedQuery.toLowerCase());
  const showCustomOption = allowCustom && trimmedQuery.length > 0 && !hasExactMatch;

  const handleSelect = (optionEn) => {
    onChange(optionEn);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-gray-200 px-3 py-2.5 text-left text-sm text-gray-700 focus:border-orange-400 focus:outline-none"
      >
        <span className="truncate">
          {selected ? (
            <>
              {selected.en}
              {selected.bn && <span className="text-gray-400"> ({selected.bn})</span>}
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDownIcon className={`ml-2 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Click-outside catcher */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 p-2">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-sm placeholder-gray-400 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <ul className="max-h-56 overflow-y-auto py-1">
              {showCustomOption && (
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelect(trimmedQuery)}
                    className="flex w-full items-center px-3 py-2 text-left text-sm text-orange-600 hover:bg-orange-50"
                  >
                    Use “{trimmedQuery}”
                  </button>
                </li>
              )}
              {filtered.map((option) => (
                <li key={option.en}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.en)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                      option.en === value ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>
                      {option.en} <span className="text-gray-400">({option.bn})</span>
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && !showCustomOption && (
                <li className="px-3 py-2 text-sm text-gray-400">No matches found</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function PaymentOption({ label, selected, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2.5 rounded-md border px-3 py-3 text-left text-sm font-medium text-gray-700 transition ${
        selected ? 'border-orange-400' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {icon}
      <span>{label}</span>
      {selected && (
        <span className="absolute right-2.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.415 0l-3.5-3.5a1 1 0 111.415-1.414l2.792 2.792 6.793-6.793a1 1 0 011.415 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M8.5 3.5a1 1 0 00-1 1V5h5v-.5a1 1 0 00-1-1h-3zM4 6.5h12l-.72 9.36A2 2 0 0113.29 17.5H6.71a2 2 0 01-1.99-1.64L4 6.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className}`}>
      <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-br from-emerald-400 via-amber-300 to-pink-400 text-white">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M2 5.5A1.5 1.5 0 013.5 4h9A1.5 1.5 0 0114 5.5v.5h1a1 1 0 011 1v6a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 13V6.5A1 1 0 012 5.5z" />
      </svg>
    </span>
  );
}

function CardIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v1H2V5zm0 3h16v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8zm2 4a1 1 0 000 2h3a1 1 0 100-2H4z" />
      </svg>
    </span>
  );
}

function BkashIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-600 text-white">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
        <path d="M10 2l2.5 5.5L18 10l-5.5 2.5L10 18l-2.5-5.5L2 10l5.5-2.5z" />
      </svg>
    </span>
  );
}

function NagadIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3.5a1 1 0 011 1V9h1.5a1 1 0 110 2H11v2.5a1 1 0 11-2 0V11H7.5a1 1 0 110-2H9V6.5a1 1 0 011-1z" />
      </svg>
    </span>
  );
}