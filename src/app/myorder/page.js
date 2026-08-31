'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Mock data — replace with your API / DB response                    */
/* ------------------------------------------------------------------ */

const ORDERS = [
  {
    id: 'ORD-58213',
    date: '28 Aug, 2026',
    time: '11:42 AM',
    status: 'delivery',
    price: 2450,
    quantity: 2,
    size: 'L',
    color: 'Charcoal Black',
    productName: 'Oversized Cotton Hoodie',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Hoodie',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1712-345678',
    payment: 'Cash on Delivery',
    subtotal: 2450,
    deliveryFee: 60,
    discount: 100,
    total: 2410,
    timeline: [
      { label: 'Order placed', date: '25 Aug, 2026 · 10:05 AM' },
      { label: 'Order confirmed', date: '25 Aug, 2026 · 1:30 PM' },
      { label: 'Shipped', date: '27 Aug, 2026 · 9:15 AM' },
      { label: 'Delivered', date: '28 Aug, 2026 · 11:42 AM' },
    ],
  },
  {
    id: 'ORD-58147',
    date: '21 Aug, 2026',
    time: '4:05 PM',
    status: 'cancelled',
    price: 1290,
    quantity: 1,
    size: 'M',
    color: 'Olive Green',
    productName: 'Slim Fit Cargo Pants',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Cargo',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1812-987654',
    payment: 'bKash',
    subtotal: 1290,
    deliveryFee: 60,
    discount: 0,
    total: 1350,
    timeline: [
      { label: 'Order placed', date: '20 Aug, 2026 · 6:20 PM' },
      { label: 'Order confirmed', date: '20 Aug, 2026 · 7:00 PM' },
      { label: 'Cancelled by customer', date: '21 Aug, 2026 · 4:05 PM' },
    ],
  },
  {
    id: 'ORD-57990',
    date: '12 Aug, 2026',
    time: '9:18 AM',
    status: 'returned',
    price: 3200,
    quantity: 1,
    size: '42',
    color: 'Tan Brown',
    productName: 'Genuine Leather Loafers',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Loafers',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1912-456123',
    payment: 'Online Payment',
    subtotal: 3200,
    deliveryFee: 0,
    discount: 200,
    total: 3000,
    timeline: [
      { label: 'Order placed', date: '05 Aug, 2026 · 2:40 PM' },
      { label: 'Delivered', date: '08 Aug, 2026 · 3:10 PM' },
      { label: 'Return requested', date: '10 Aug, 2026 · 8:00 AM' },
      { label: 'Return picked up', date: '12 Aug, 2026 · 9:18 AM' },
    ],
  },
  {
    id: 'ORD-57812',
    date: '02 Aug, 2026',
    time: '6:52 PM',
    status: 'delivery',
    price: 890,
    quantity: 3,
    size: 'S',
    color: 'White',
    productName: 'Basic Crew Neck T-Shirt',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=T-Shirt',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1612-789012',
    payment: 'Cash on Delivery',
    subtotal: 2670,
    deliveryFee: 60,
    discount: 0,
    total: 2730,
    timeline: [
      { label: 'Order placed', date: '30 Jul, 2026 · 11:00 AM' },
      { label: 'Order confirmed', date: '30 Jul, 2026 · 1:15 PM' },
      { label: 'Shipped', date: '01 Aug, 2026 · 10:00 AM' },
      { label: 'Delivered', date: '02 Aug, 2026 · 6:52 PM' },
    ],
  },
  {
    id: 'ORD-57690',
    date: '27 Jul, 2026',
    time: '1:20 PM',
    status: 'delivery',
    price: 1650,
    quantity: 1,
    size: 'M',
    color: 'Navy Blue',
    productName: 'Regular Fit Denim Jacket',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Jacket',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1712-345678',
    payment: 'bKash',
    subtotal: 1650,
    deliveryFee: 60,
    discount: 0,
    total: 1710,
    timeline: [
      { label: 'Order placed', date: '24 Jul, 2026 · 9:10 AM' },
      { label: 'Order confirmed', date: '24 Jul, 2026 · 11:00 AM' },
      { label: 'Shipped', date: '26 Jul, 2026 · 8:30 AM' },
      { label: 'Delivered', date: '27 Jul, 2026 · 1:20 PM' },
    ],
  },
  {
    id: 'ORD-57544',
    date: '19 Jul, 2026',
    time: '5:40 PM',
    status: 'returned',
    price: 720,
    quantity: 2,
    size: 'One Size',
    color: 'Black',
    productName: 'Classic Leather Belt',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Belt',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1812-987654',
    payment: 'Online Payment',
    subtotal: 1440,
    deliveryFee: 60,
    discount: 0,
    total: 1500,
    timeline: [
      { label: 'Order placed', date: '14 Jul, 2026 · 3:00 PM' },
      { label: 'Delivered', date: '17 Jul, 2026 · 2:15 PM' },
      { label: 'Return requested', date: '18 Jul, 2026 · 10:00 AM' },
      { label: 'Return picked up', date: '19 Jul, 2026 · 5:40 PM' },
    ],
  },
  {
    id: 'ORD-57402',
    date: '10 Jul, 2026',
    time: '10:05 AM',
    status: 'cancelled',
    price: 990,
    quantity: 1,
    size: 'L',
    color: 'Grey',
    productName: 'Polo Neck T-Shirt',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Polo',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1912-456123',
    payment: 'Cash on Delivery',
    subtotal: 990,
    deliveryFee: 60,
    discount: 0,
    total: 1050,
    timeline: [
      { label: 'Order placed', date: '09 Jul, 2026 · 4:45 PM' },
      { label: 'Order confirmed', date: '09 Jul, 2026 · 6:00 PM' },
      { label: 'Cancelled by customer', date: '10 Jul, 2026 · 10:05 AM' },
    ],
  },
  {
    id: 'ORD-57288',
    date: '02 Jul, 2026',
    time: '2:55 PM',
    status: 'delivery',
    price: 1980,
    quantity: 1,
    size: '40',
    color: 'Brown',
    productName: 'Suede Chukka Boots',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Boots',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1612-789012',
    payment: 'bKash',
    subtotal: 1980,
    deliveryFee: 60,
    discount: 50,
    total: 1990,
    timeline: [
      { label: 'Order placed', date: '28 Jun, 2026 · 12:20 PM' },
      { label: 'Order confirmed', date: '28 Jun, 2026 · 1:00 PM' },
      { label: 'Shipped', date: '30 Jun, 2026 · 9:00 AM' },
      { label: 'Delivered', date: '02 Jul, 2026 · 2:55 PM' },
    ],
  },
  {
    id: 'ORD-57150',
    date: '24 Jun, 2026',
    time: '8:30 AM',
    status: 'delivery',
    price: 540,
    quantity: 4,
    size: 'S',
    color: 'Assorted',
    productName: 'Cotton Ankle Socks (Pack of 4)',
    image: 'https://placehold.co/200x200/F0EEFB/312E81?text=Socks',
    address: 'House 14, Road 7, Kafrul, Dhaka',
    phone: '+880 1712-345678',
    payment: 'Cash on Delivery',
    subtotal: 2160,
    deliveryFee: 60,
    discount: 0,
    total: 2220,
    timeline: [
      { label: 'Order placed', date: '20 Jun, 2026 · 10:00 AM' },
      { label: 'Order confirmed', date: '20 Jun, 2026 · 11:30 AM' },
      { label: 'Shipped', date: '22 Jun, 2026 · 9:45 AM' },
      { label: 'Delivered', date: '24 Jun, 2026 · 8:30 AM' },
    ],
  },
];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'returned', label: 'Returned' },
];

const STATUS_STYLES = {
  delivery: {
    text: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-400/10',
    dot: 'bg-emerald-500',
    label: 'Delivered',
  },
  cancelled: {
    text: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-400/10',
    dot: 'bg-rose-500',
    label: 'Cancelled',
  },
  returned: {
    text: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-400/10',
    dot: 'bg-amber-500',
    label: 'Returned',
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/*  Note: this uses Tailwind's class-based dark mode. Make sure your   */
/*  tailwind.config.js has `darkMode: 'class'` set, or the dark:       */
/*  variants below won't switch when the "dark" class is toggled.      */
/* ------------------------------------------------------------------ */

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const visibleOrders =
    activeTab === 'all' ? ORDERS : ORDERS.filter((o) => o.status === activeTab);

  return (
    <div >
      <div className="min-h-screen bg-gradient-to-b from-[#F6F6FB] to-[#FAFAFC] text-[#161623] transition-colors duration-300 dark:from-[#0B0B14] dark:to-[#121220] dark:text-[#F2F1FA]">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
          <header className="mb-9 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Orders</h1>
              <p className="mt-1.5 text-[15px] text-[#6E6E85] dark:text-[#8F8FA8]">
                Track, manage, and review everything you've ordered.
              </p>
            </div>

          </header>

          {/* Segmented pill tabs */}
          <div className="mb-7 inline-flex gap-1 rounded-full bg-[#ECEBF5] p-1 dark:bg-white/5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count =
                tab.key === 'all'
                  ? ORDERS.length
                  : ORDERS.filter((o) => o.status === tab.key).length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#161623] shadow-[0_1px_2px_rgba(22,22,35,0.08),0_1px_8px_rgba(22,22,35,0.06)] dark:bg-[#2A2A45] dark:text-white'
                      : 'text-[#7C7C93] hover:text-[#161623] dark:text-[#7C7C93] dark:hover:text-[#E5E4F0]'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      isActive
                        ? 'text-[#8B8BFF] dark:text-[#A5A5FF]'
                        : 'text-[#B4B4C6] dark:text-[#5F5F78]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Order list */}
          {visibleOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D9D8E8] bg-white/50 py-20 text-center dark:border-[#2A2A3D] dark:bg-white/[0.02]">
              <p className="text-sm text-[#8B8BA0] dark:text-[#7C7C93]">
                No {activeTab === 'all' ? '' : activeTab} orders to show yet.
              </p>
            </div>
          ) : visibleOrders.length > 8 ? (
            <div className="relative">
              <div className="orders-scroll max-h-[640px] overflow-y-auto rounded-2xl pr-1.5">
                <ul className="flex flex-col gap-3.5 pb-1">
                  {visibleOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onViewDetails={() => setSelectedOrder(order)}
                    />
                  ))}
                </ul>
              </div>
              {/* fade hint at the bottom edge so it's clear there's more to scroll */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-2xl bg-gradient-to-t from-[#FAFAFC] to-transparent dark:from-[#121220]" />
              <p className="mt-2 text-center text-xs text-[#9797AC] dark:text-[#75758F]">
                Showing all {visibleOrders.length} orders · scroll for more
              </p>
              <style jsx>{`
                .orders-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #d9d8e8 transparent;
                }
                .orders-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .orders-scroll::-webkit-scrollbar-track {
                  background: transparent;
                }
                .orders-scroll::-webkit-scrollbar-thumb {
                  background-color: #d9d8e8;
                  border-radius: 9999px;
                }
                :global(.dark) .orders-scroll {
                  scrollbar-color: #2a2a3d transparent;
                }
                :global(.dark) .orders-scroll::-webkit-scrollbar-thumb {
                  background-color: #2a2a3d;
                }
              `}</style>
            </div>
          ) : (
            <ul className="flex flex-col gap-3.5">
              {visibleOrders.map((order) => (
                <OrderRow key={order.id} order={order} onViewDetails={() => setSelectedOrder(order)} />
              ))}
            </ul>
          )}
        </div>

        {selectedOrder && (
          <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Order row                                                          */
/* ------------------------------------------------------------------ */

function OrderRow({ order, onViewDetails }) {
  const status = STATUS_STYLES[order.status];

  return (
    <li className="group rounded-2xl border border-[#ECEBF5] bg-white p-4 transition-all duration-200 hover:border-[#DCDBF2] hover:shadow-[0_2px_6px_rgba(22,22,35,0.04),0_8px_24px_rgba(22,22,35,0.06)] dark:border-[#242438] dark:bg-[#161623] dark:hover:border-[#34344C] dark:hover:shadow-[0_2px_16px_rgba(0,0,0,0.35)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side: meta + product */}
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <img
            src={order.image}
            alt={order.productName}
            className="h-[72px] w-[72px] shrink-0 rounded-xl border border-[#ECEBF5] object-cover dark:border-[#2A2A3D]"
          />

          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-[#9797AC] dark:text-[#75758F]">
              <span>{order.date}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-[#D3D2E4] dark:bg-[#3A3A50]" />
              <span>{order.time}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-[#D3D2E4] dark:bg-[#3A3A50]" />
              <span className="font-medium text-[#6E6E85] dark:text-[#9797B0]">{order.id}</span>
            </div>

            <p className="truncate text-[15px] font-semibold text-[#161623] dark:text-[#F2F1FA] sm:text-base">
              {order.productName}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#F5F4FA] px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/5 dark:text-[#B4B4C6]">
                {order.size}
              </span>
              <span className="rounded-md bg-[#F5F4FA] px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/5 dark:text-[#B4B4C6]">
                {order.color}
              </span>
              <span className="rounded-md bg-[#F5F4FA] px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/5 dark:text-[#B4B4C6]">
                Qty {order.quantity}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: price + button */}
        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
          <p className="text-lg font-bold text-[#161623] dark:text-white">
            ৳{order.price.toLocaleString('en-BD')}
          </p>
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#161623] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#33334D] dark:bg-[#8B8BFF] dark:text-[#0B0B14] dark:hover:bg-[#A5A5FF]"
          >
            Order Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Order details modal                                                */
/* ------------------------------------------------------------------ */

function OrderDetailsModal({ order, onClose }) {
  const status = STATUS_STYLES[order.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#161623]/50 px-0 backdrop-blur-sm sm:items-center sm:px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl dark:bg-[#14141F] sm:max-w-lg sm:rounded-[28px] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-[#9797AC] dark:text-[#75758F]">
              Order {order.id}
            </p>
            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-[#161623] dark:text-white">
              Order Details
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full bg-[#F5F4FA] p-2 text-[#6E6E85] transition-colors hover:bg-[#ECEBF5] hover:text-[#161623] dark:bg-white/5 dark:text-[#9797B0] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Product */}
        <div className="mb-5 flex gap-4 rounded-2xl bg-[#F8F7FC] p-4 dark:bg-white/[0.04]">
          <img
            src={order.image}
            alt={order.productName}
            className="h-16 w-16 shrink-0 rounded-xl border border-[#ECEBF5] object-cover dark:border-[#2A2A3D]"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#161623] dark:text-[#F2F1FA]">
              {order.productName}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-white px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/10 dark:text-[#B4B4C6]">
                {order.size}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/10 dark:text-[#B4B4C6]">
                {order.color}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-xs text-[#6E6E85] dark:bg-white/10 dark:text-[#B4B4C6]">
                Qty {order.quantity}
              </span>
            </div>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Order info */}
        <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
          <InfoRow label="Order date" value={`${order.date} · ${order.time}`} />
          <InfoRow label="Payment method" value={order.payment} />
          <InfoRow label="Delivery address" value={order.address} full />
          <InfoRow label="Phone number" value={order.phone} full />
        </div>

        {/* Price breakdown */}
        <div className="mb-5 rounded-2xl border border-[#ECEBF5] p-4 dark:border-[#242438]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9797AC] dark:text-[#75758F]">
            Price summary
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <PriceLine label="Subtotal" value={order.subtotal} />
            <PriceLine label="Delivery fee" value={order.deliveryFee} />
            {order.discount > 0 && <PriceLine label="Discount" value={-order.discount} />}
            <div className="mt-1 flex justify-between border-t border-[#ECEBF5] pt-3 text-[15px] font-bold text-[#161623] dark:border-[#242438] dark:text-white">
              <span>Total</span>
              <span>৳{order.total.toLocaleString('en-BD')}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#9797AC] dark:text-[#75758F]">
            Order timeline
          </p>
          <ul className="flex flex-col gap-4">
            {order.timeline.map((step, i) => {
              const isLast = i === order.timeline.length - 1;
              return (
                <li key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        isLast ? 'bg-[#161623] dark:bg-[#8B8BFF]' : 'bg-[#ECEBF5] dark:bg-white/10'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isLast ? 'bg-white dark:bg-[#0B0B14]' : 'bg-[#9797AC] dark:bg-[#75758F]'
                        }`}
                      />
                    </span>
                    {!isLast && (
                      <span className="mt-1 h-full w-px flex-1 bg-[#ECEBF5] dark:bg-[#242438]" />
                    )}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-semibold text-[#161623] dark:text-[#F2F1FA]">
                      {step.label}
                    </p>
                    <p className="text-xs text-[#9797AC] dark:text-[#75758F]">{step.date}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, full }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <p className="text-xs text-[#9797AC] dark:text-[#75758F]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#161623] dark:text-[#F2F1FA]">{value}</p>
    </div>
  );
}

function PriceLine({ label, value }) {
  return (
    <div className="flex justify-between text-[#6E6E85] dark:text-[#9797B0]">
      <span>{label}</span>
      <span>
        {value < 0 ? '-' : ''}৳{Math.abs(value).toLocaleString('en-BD')}
      </span>
    </div>
  );
}