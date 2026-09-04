"use client";

import { useState, useMemo } from "react";
import {
  Phone,
  MessageCircle,
  Search,
  X,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import WhatsappLogo from "../../../images/whatsapplogo.webp";

/* ------------------------------------------------------------------ */
/*  Config — swap these for your real numbers                          */
/* ------------------------------------------------------------------ */
const COMPANY_PHONE_DISPLAY = "09612-345 678";
const COMPANY_PHONE_TEL = "+8809612345678";
const WHATSAPP_NUMBER = "8801234567890";
const WHATSAPP_MESSAGE = "Hi, I'd like help cancelling my order.";

const CANCEL_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Delivery is taking too long",
  "Wrong size or color selected",
  "No longer need the item",
  "Payment or billing issue",
  "Other reason",
];

/* ------------------------------------------------------------------ */
/*  Mock recent orders — replace with your API                        */
/* ------------------------------------------------------------------ */
const RECENT_ORDERS = [
  { orderNo: "ORD-58213", date: "28 Aug, 2026", time: "11:42 AM", img: "/shoe1.avif", product: "Oversized Cotton Hoodie", size: "L", color: "Charcoal Black", qty: 2, price: "2,450" },
  { orderNo: "ORD-58147", date: "21 Aug, 2026", time: "4:05 PM", img: "/shoe2.avif", product: "Slim Fit Cargo Pants", size: "M", color: "Olive Green", qty: 1, price: "1,290" },
  { orderNo: "ORD-57990", date: "12 Aug, 2026", time: "9:18 AM", img: "/shoe3.avif", product: "Genuine Leather Loafers", size: "42", color: "Tan Brown", qty: 1, price: "3,200" },
  { orderNo: "ORD-57810", date: "05 Aug, 2026", time: "2:30 PM", img: "/shoe4.webp", product: "Classic Crewneck Tee", size: "S", color: "Off White", qty: 3, price: "980" },
  { orderNo: "ORD-57622", date: "29 Jul, 2026", time: "6:14 PM", img: "/shoe5.avif", product: "Ridge Trail Jacket", size: "L", color: "Moss Green", qty: 1, price: "4,650" },
  { orderNo: "ORD-57210", date: "06 Jul, 2026", time: "5:20 PM", img: "/shoe7.avif", product: "Cotton Ankle Socks (3-pack)", size: "L", color: "Grey", qty: 2, price: "420" },
  { orderNo: "ORD-57098", date: "29 Jun, 2026", time: "9:55 AM", img: "/shoe8.avif", product: "Running Cap", size: "One size", color: "Red", qty: 1, price: "550" },
  { orderNo: "ORD-56944", date: "20 Jun, 2026", time: "3:12 PM", img: "/shoe9.avif", product: "Trail Running Shoes", size: "42", color: "Grey/Orange", qty: 1, price: "5,100" },
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-medium px-2.5 py-1">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */

export default function OrderCancelPage() {
  const [query, setQuery] = useState("");
  const [visibleOrders, setVisibleOrders] = useState(RECENT_ORDERS);
  const [searchError, setSearchError] = useState("");
  const [cancelledIds, setCancelledIds] = useState(new Set());
  const [modalOrder, setModalOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [confirmedToast, setConfirmedToast] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const key = query.trim().toUpperCase();
    if (!key) {
      setVisibleOrders(RECENT_ORDERS);
      setSearchError("");
      return;
    }
    const match = RECENT_ORDERS.filter((o) => o.orderNo.toUpperCase().includes(key));
    if (match.length) {
      setVisibleOrders(match);
      setSearchError("");
    } else {
      setVisibleOrders([]);
      setSearchError(`No order found for "${query.trim()}". Check the number and try again.`);
    }
  }

  function openCancelModal(order) {
    setReason("");
    setModalOrder(order);
  }

  function confirmCancel() {
    if (!reason || !modalOrder) return;
    setCancelledIds((prev) => new Set(prev).add(modalOrder.orderNo));
    setModalOrder(null);
    setConfirmedToast(true);
    setTimeout(() => setConfirmedToast(false), 3000);
  }

  const waHref = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    []
  );

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight">
            Cancel an order
          </h1>
          <p className="mt-1.5 text-sm text-stone-500">
            Find your order below, or talk to us directly.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={`tel:${COMPANY_PHONE_TEL}`}
            className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white dark:bg-gray-800 dark:text-white p-4 hover:border-stone-300 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-50 grid place-items-center text-indigo-600">
              <Phone size={16} />
            </div>
            <div className="mt-4">
              <p className="text-xs text-stone-500 dark:text-gray-300">Call our team</p>
              <p className="text-[15px] font-medium mt-0.5 tabular-nums">{COMPANY_PHONE_DISPLAY}</p>
            </div>
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white dark:bg-gray-800 dark:text-white p-4 hover:border-emerald-300 transition-colors"
          >
            <div className="w-12 h-12 rounded-full grid place-items-center">
              <Image src={WhatsappLogo} alt="WhatsApp"  />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-stone-500 dark:text-gray-300">Chat with us</p>
                <p className="text-[15px] font-medium mt-0.5">Open WhatsApp</p>
              </div>
              <ChevronRight size={16} className="text-stone-300 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-xs text-stone-400">or search by order number</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. ORD-58213"
              className="w-full rounded-xl border border-stone-200 bg-white dark:bg-gray-900 pl-10 pr-3 py-2.5 text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-shadow"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-stone-900 dark:bg-white text-white dark:text-black text-sm font-medium px-5 hover:bg-stone-700 dark:hover:bg-amber-50 transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {searchError && (
          <p className="text-sm text-red-600 mt-2 mb-4">{searchError}</p>
        )}

        {/* Recent / searched orders */}
        {visibleOrders.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-medium text-stone-400 mb-3">
              {query.trim() ? "Search results" : "Your recent orders"}
            </p>

            <div
              className={
                "space-y-3 " +
                (visibleOrders.length > 8 ? "max-h-[600px] overflow-y-auto pr-1" : "")
              }
            >
              {visibleOrders.map((order) => {
                const isCancelled = cancelledIds.has(order.orderNo);
                return (
                  <div
                    key={order.orderNo}
                    className="rounded-2xl bg-white dark:bg-gray-800 dark:text-white shadow-sm p-4 flex items-center gap-4"
                  >
                    <img
                      src={order.img}
                      alt={order.product}
                      className="w-16 h-16 shrink-0 rounded-2xl bg-indigo-50 text-indigo-700 font-medium text-sm flex items-center justify-center text-center px-1"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-stone-400 dark:text-gray-300 flex flex-wrap items-center gap-x-1.5">
                        <span>{order.date}</span>
                        <span className="opacity-50">·</span>
                        <span>{order.time}</span>
                        <span className="opacity-50">·</span>
                        <span>{order.orderNo}</span>
                      </p>
                      <p className="text-[15px] font-semibold mt-1 truncate">{order.product}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Pill>{order.size}</Pill>
                        <Pill>{order.color}</Pill>
                        <Pill>Qty {order.qty}</Pill>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-base font-semibold tabular-nums">৳{order.price}</span>
                      {isCancelled ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500">
                          <CheckCircle2 size={14} /> Cancelled
                        </span>
                      ) : (
                        <button
                          onClick={() => openCancelModal(order)}
                          className="inline-flex items-center gap-1 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-xs font-medium pl-4 pr-3 py-2 hover:bg-stone-700 dark:hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          Cancel Order
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cancel reason modal */}
      {modalOrder && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-800 border border-stone-200 p-5">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-semibold">Why cancel this order?</h3>
              <button
                onClick={() => setModalOrder(null)}
                className="text-stone-400 hover:text-stone-600"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-stone-500 mb-4 truncate">
              Order Number: {modalOrder.orderNo}
            </p>

            <div className="space-y-1.5 mb-5">
              {CANCEL_REASONS.map((r) => (
                <label
                  key={r}
                  className={
                    "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm cursor-pointer transition-colors " +
                    (reason === r
                      ? "border-indigo-400 bg-indigo-50/60"
                      : "border-stone-200 hover:bg-stone-50 dark:hover:bg-gray-700")
                  }
                >
                  <input
                    type="radio"
                    name="cancel-reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-indigo-600"
                  />
                  {r}
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setModalOrder(null)}
                className="flex-1 rounded-xl border border-stone-200 text-sm font-medium py-2.5 hover:bg-stone-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Keep order
              </button>
              <button
                onClick={confirmCancel}
                disabled={!reason}
                className="flex-1 rounded-xl bg-red-600 text-white text-sm font-medium py-2.5 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 transition-colors cursor-pointer"
              >
                Cancel order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation toast */}
      {confirmedToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-stone-900 text-white text-sm font-medium px-4 py-2.5 shadow-lg">
          <CheckCircle2 size={16} />
          Order cancelled
        </div>
      )}
    </div>
  );
}