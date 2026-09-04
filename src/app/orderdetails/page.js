'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CheckCircle2,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  Landmark,
  Wallet,
  Home,
} from 'lucide-react';
import Link from 'next/link';

// Replace this with the real order data fetched from your API / order state.
const sampleOrder = {
  orderId: 'ORD-2026-00123',
  productImage: '/shoe4.webp',
  productName: 'Premium Ajwa Dates - 1kg Box',
  quantity: 2,
  customerName: 'Md. Karim Hossain',
  mobile: '01712345678',
  email: '', // leave empty string if the customer did not provide one
  address: 'House 12, Road 5, Sector 10, Uttara',
  district: 'Dhaka',
  thana: 'Uttara West',
  paymentMethod: 'cod', // 'cod' | 'online' | 'bkash' | 'nagad'
  subtotal: 1200,
  deliveryCost: 70,
};

const paymentLabels = {
  cod: 'Cash on Delivery',
  online: 'Online Payment',
  bkash: 'bKash',
  nagad: 'Nagad',
};

export default function OrderSuccessPage({ order: initialOrder = sampleOrder }) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [secondsLeft, setSecondsLeft] = useState(30);

  const total = order.total ?? (order.subtotal || 0) + (order.deliveryCost || 0) - (order.discount || 0);
  const isDhaka = (order.district || '').trim().toLowerCase() === 'dhaka';

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('flashShoeOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push('/');
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden">
        {/* Success header */}
        <div className="bg-green-50 dark:bg-green-900/20 px-6 py-8 text-center border-b border-green-100 dark:border-green-900/40">
          <CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Your order is complete!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Very soon you will receive your desired order.{' '}
            {isDhaka ? (
              <>Your order will be delivered within <span className="font-semibold">72 hours</span> as you are inside Dhaka.</>
            ) : (
              <>Your order will be delivered within <span className="font-semibold">72 hours</span> inside Dhaka, and it may take a bit longer outside Dhaka.</>
            )}
          </p>

     <Link href={'/ordertracking'}>
          <button
            onClick={() => router.push(`/order-tracking?orderId=${order.orderId}`)}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            Track Order
          </button>
          </Link>
        </div>

        {/* Product + order id */}
        <div className="px-6 py-5 flex items-center gap-4 border-b border-gray-100 dark:border-neutral-800">
          <div className="relative w-20 h-20 border-1 rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800 flex-shrink-0">
            <Image
              src={order.productImage}
              alt={order.productName || 'Product'}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
            <p className="font-semibold text-gray-900 dark:text-white">{order.orderId}</p>
            {order.productName && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {order.productName}
                {order.quantity ? (
                  <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Qty: {order.quantity}
                  </span>
                ) : null}
              </p>
            )}
          </div>
        </div>

        {/* Customer info */}
        <div className="px-6 py-5 space-y-3 border-b border-gray-100 dark:border-neutral-800">
          <InfoRow icon={User} label="Name" value={order.customerName} />
          <InfoRow icon={Phone} label="Mobile" value={order.mobile} />
          <InfoRow icon={Mail} label="Email" value={order.email?.trim() ? order.email : 'Not provided'} />
          <InfoRow icon={MapPin} label="Address" value={order.address} />
          <InfoRow icon={Landmark} label="District / Thana" value={`${order.district}, ${order.thana}`} />
          <InfoRow icon={Wallet} label="Payment Method" value={paymentLabels[order.paymentMethod] || order.paymentMethod} />
        </div>

        {/* Price breakdown */}
        <div className="px-6 py-5 space-y-2 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Subtotal</span>
            <span>৳{order.subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Delivery Cost</span>
            <span>৳{order.deliveryCost?.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-orange-600">
              <span>Discount</span>
              <span>-৳{order.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-dashed border-gray-200 dark:border-neutral-700">
            <span>Total Amount</span>
            <span>৳{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Back to home */}
        <div className="px-6 py-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home ({secondsLeft})
          </button>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            You will be automatically redirected to the homepage.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}