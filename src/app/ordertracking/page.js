'use client';

import { useState } from 'react';
import { Search, Package, CheckCircle2, Truck, Home, Clock, XCircle, MapPin } from 'lucide-react';

const translations = {
  en: {
    title: 'Track Your Order',
    subtitle: 'Enter your Order ID or Order Number to see the latest status',
    placeholder: 'Enter Order ID or Order Number (e.g. ORD-10293)',
    searchBtn: 'Track Order',
    searching: 'Searching...',
    notFound: "We couldn't find an order with that ID or number. Please check and try again.",
    emptyError: 'Please enter an Order ID or Order Number.',
    orderId: 'Order ID',
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    estDelivery: 'Estimated Delivery',
    items: 'Items',
    qty: 'Qty',
    total: 'Total',
    shippingTo: 'Shipping To',
    currentStatus: 'Current Status',
    trackingHistory: 'Tracking History',
    steps: {
      placed: 'Order Placed',
      confirmed: 'Order Confirmed',
      packed: 'Packed',
      shipped: 'Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    },
    langLabel: 'EN',
  },
  bn: {
    title: 'আপনার অর্ডার ট্র্যাক করুন',
    subtitle: 'সর্বশেষ অবস্থা দেখতে আপনার অর্ডার আইডি বা অর্ডার নম্বর লিখুন',
    placeholder: 'অর্ডার আইডি বা অর্ডার নম্বর লিখুন (যেমন ORD-10293)',
    searchBtn: 'অর্ডার ট্র্যাক করুন',
    searching: 'খোঁজা হচ্ছে...',
    notFound: 'এই আইডি বা নম্বর দিয়ে কোনো অর্ডার পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    emptyError: 'অনুগ্রহ করে অর্ডার আইডি বা অর্ডার নম্বর লিখুন।',
    orderId: 'অর্ডার আইডি',
    orderNumber: 'অর্ডার নম্বর',
    orderDate: 'অর্ডারের তারিখ',
    estDelivery: 'আনুমানিক ডেলিভারি',
    items: 'পণ্যসমূহ',
    qty: 'পরিমাণ',
    total: 'মোট',
    shippingTo: 'ডেলিভারি ঠিকানা',
    currentStatus: 'বর্তমান অবস্থা',
    trackingHistory: 'ট্র্যাকিং ইতিহাস',
    steps: {
      placed: 'অর্ডার সম্পন্ন হয়েছে',
      confirmed: 'অর্ডার নিশ্চিত হয়েছে',
      packed: 'প্যাক করা হয়েছে',
      shipped: 'পাঠানো হয়েছে',
      out_for_delivery: 'ডেলিভারির পথে',
      delivered: 'ডেলিভারি সম্পন্ন',
      cancelled: 'বাতিল হয়েছে',
    },
    langLabel: 'বাং',
  },
};

// Mock order database. Replace with a real API call (e.g. fetch(`/api/orders/track?query=...`))
const MOCK_ORDERS = [
  {
    orderId: 'ORD-10293',
    orderNumber: '10293',
    orderDate: '2026-08-20',
    estDelivery: '2026-09-02',
    total: '৳ 3,450',
    shippingTo: 'House 12, Road 5, Kafrul, Dhaka',
    items: [{ name: 'Wireless Earbuds Pro', qty: 1 }, { name: 'Phone Case', qty: 2 }],
    currentStep: 'out_for_delivery',
    history: [
      { step: 'placed', date: '2026-08-20', time: '10:15 AM' },
      { step: 'confirmed', date: '2026-08-20', time: '11:02 AM' },
      { step: 'packed', date: '2026-08-21', time: '02:40 PM' },
      { step: 'shipped', date: '2026-08-22', time: '09:10 AM' },
      { step: 'out_for_delivery', date: '2026-08-31', time: '08:05 AM' },
    ],
  },
  {
    orderId: 'ORD-10188',
    orderNumber: '10188',
    orderDate: '2026-08-10',
    estDelivery: '2026-08-16',
    total: '৳ 1,200',
    shippingTo: 'Flat 3B, Green Road, Dhaka',
    items: [{ name: 'Cotton T-Shirt', qty: 2 }],
    currentStep: 'delivered',
    history: [
      { step: 'placed', date: '2026-08-10', time: '01:20 PM' },
      { step: 'confirmed', date: '2026-08-10', time: '02:00 PM' },
      { step: 'packed', date: '2026-08-11', time: '10:30 AM' },
      { step: 'shipped', date: '2026-08-12', time: '09:00 AM' },
      { step: 'out_for_delivery', date: '2026-08-16', time: '09:00 AM' },
      { step: 'delivered', date: '2026-08-16', time: '03:45 PM' },
    ],
  },
];

const STEP_ORDER = ['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

const STEP_ICONS = {
  placed: Package,
  confirmed: CheckCircle2,
  packed: Package,
  shipped: Truck,
  out_for_delivery: Truck,
  delivered: Home,
  cancelled: XCircle,
};

export default function OrderTrackingPage() {
  const [lang, setLang] = useState('en');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | found | notfound | error
  const [order, setOrder] = useState(null);

  const t = translations[lang];

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setStatus('error');
      setOrder(null);
      return;
    }

    setStatus('loading');

    // Simulate an API lookup delay. Swap this block for a real fetch() call.
    setTimeout(() => {
      const found = MOCK_ORDERS.find(
        (o) =>
          o.orderId.toLowerCase() === trimmed.toLowerCase() ||
          o.orderNumber.toLowerCase() === trimmed.toLowerCase()
      );

      if (found) {
        setOrder(found);
        setStatus('found');
      } else {
        setOrder(null);
        setStatus('notfound');
      }
    }, 600);
  };

  const currentStepIndex = order ? STEP_ORDER.indexOf(order.currentStep) : -1;
  const isCancelled = order?.currentStep === 'cancelled';

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Language toggle
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden text-sm font-medium">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 transition-colors ${
                lang === 'en' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-3 py-1.5 transition-colors ${
                lang === 'bn' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              বাং
            </button>
          </div>
        </div> */}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{t.title}</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-white p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-200" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-300 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gray-900 dark:bg-white text-white dark:text-black font-medium px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {status === 'loading' ? t.searching : t.searchBtn}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-red-600 text-sm mt-3">{t.emptyError}</p>
          )}
        </form>

        {status === 'notfound' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t.notFound}</p>
          </div>
        )}

        {status === 'found' && order && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-6">
            {/* Order summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400 dark:text-gray-200">{t.orderId}</p>
                <p className="font-semibold text-black dark:text-white">{order.orderId}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-200">{t.orderNumber}</p>
                <p className="font-semibold text-black dark:text-white">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-200">{t.orderDate}</p>
                <p className="font-semibold text-black dark:text-white">{order.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-200">{t.estDelivery}</p>
                <p className="font-semibold text-black dark:text-white">{order.estDelivery}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-200 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-400 dark:text-gray-200">{t.shippingTo}</p>
                <p className="text-gray-800">{order.shippingTo}</p>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-400 dark:text-gray-200 text-sm mb-2">{t.items}</p>
              <ul className="space-y-1.5 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-gray-700">
                    <span>{item.name}</span>
                    <span className="text-gray-400 dark:text-gray-200">{t.qty}: {item.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-2 pt-2 border-t border-dashed border-gray-200 text-sm font-semibold text-black dark:text-white">
                <span>{t.total}</span>
                <span>{order.total}</span>
              </div>
            </div>

            {/* Current status badge */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-400 dark:text-gray-200 text-sm mb-2">{t.currentStatus}</p>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isCancelled
                    ? 'bg-red-50 text-red-600'
                    : order.currentStep === 'delivered'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {(() => {
                  const Icon = STEP_ICONS[order.currentStep] || Clock;
                  return <Icon className="w-4 h-4" />;
                })()}
                {t.steps[order.currentStep]}
              </span>
            </div>

            {/* Timeline */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-400 dark:text-gray-200 text-sm mb-4">{t.trackingHistory}</p>
              <ol className="relative border-s border-gray-200 ms-2">
                {STEP_ORDER.map((step, idx) => {
                  const historyEntry = order.history.find((h) => h.step === step);
                  const done = idx <= currentStepIndex && !isCancelled;
                  const Icon = STEP_ICONS[step];
                  return (
                    <li key={step} className="mb-6 ms-6 last:mb-0">
                      <span
                        className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-4 ring-white ${
                          done ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400 dark:text-gray-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <p className={`text-sm font-medium ${done ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-200'}`}>
                        {t.steps[step]}
                      </p>
                      {historyEntry && (
                        <p className="text-xs text-gray-400 dark:text-gray-200 mt-0.5">
                          {historyEntry.date} · {historyEntry.time}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}