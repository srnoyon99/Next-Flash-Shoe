"use client"
import React from 'react'
import Link from 'next/link'
import { User, UserPlus, ShoppingBag, XCircle, Star } from 'lucide-react'

export const AccountLinks = ({
  currentUser,
  iconSize,
  linkClassName,
  onClick,
  emailClassName = "text-sm text-gray-500 dark:text-gray-300",
}) => (
  <>
    {currentUser && <p className={emailClassName}>{currentUser.email}</p>}
    {currentUser ? (
      <>
        <Link href="/account" className={linkClassName} onClick={onClick}>
          <User size={iconSize} /> Manage My Account
        </Link>
        <Link href="/orders" className={linkClassName} onClick={onClick}>
          <ShoppingBag size={iconSize} /> My Order
        </Link>
        <Link href="/cancellations" className={linkClassName} onClick={onClick}>
          <XCircle size={iconSize} /> My Cancellation
        </Link>
        <Link href="/reviews" className={linkClassName} onClick={onClick}>
          <Star size={iconSize} /> My Reviews
        </Link>
      </>
    ) : (
      <>
        <Link href="signin" className={linkClassName} onClick={onClick}>
          <User size={iconSize} /> Sign In
        </Link>
        <Link href="signup" className={linkClassName} onClick={onClick}>
          <UserPlus size={iconSize} /> Create Account
        </Link>
      </>
    )}
  </>
)
