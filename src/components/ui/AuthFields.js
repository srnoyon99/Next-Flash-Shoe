"use client"
import React from 'react'

const inputClassName = 'px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50'

export const TextField = ({
  type,
  id,
  name,
  label,
  placeholder,
  required = true,
  darkClassName = 'dark:bg-neutral-800 dark:outline-neutral-700',
  children,
  className,
  requiredFirst = false,
}) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">{label}</label>
    {children || (
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...(requiredFirst ? { required } : {})}
        className={`${inputClassName} ${darkClassName}`}
        {...(!requiredFirst ? { required } : {})}
      />
    )}
  </div>
)

export const Checkbox = ({
  id,
  name,
  label,
  darkClassName = 'dark:outline-neutral-700 dark:bg-neutral-800',
  terms = false,
  wrapperClassName = 'flex items-start flex-wrap gap-2',
}) => {
  const darkClasses = darkClassName.split(' ')
  const darkOutlineClassName = darkClasses.find((className) => className.startsWith('dark:outline'))
  const darkBackgroundClassName = darkClasses.find((className) => className.startsWith('dark:bg'))
  const content = (
    <>
      <label className="flex items-center group has-[input:checked]:text-slate-900">
        <input id={id} name={name} type="checkbox" required className="sr-only" />
        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 ${darkOutlineClassName} bg-white ${darkBackgroundClassName} group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600`} aria-hidden="true">
          <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 5l3 3 7-7" />
          </svg>
        </span>
        <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
          {label}
        </span>
      </label>
      {terms && (
        <a href="#"
          className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
          Terms and Conditions
        </a>
      )}
    </>
  )

  return wrapperClassName === null ? content : <div className={wrapperClassName}>{content}</div>
}
