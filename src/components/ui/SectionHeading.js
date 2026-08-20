"use client"
import React from 'react'

export const SectionHeading = ({
  title,
  wrapperClassName = 'container flex items-center ',
  contentClassName,
  pillClassName = 'h-[20px] w-[20px] bg-red-700 mb-4 rounded-3xl ',
  titleClassName = ' text-2xl font-bold mb-4 ml-2 ',
  action,
}) => (
  <div className={wrapperClassName}>
    {contentClassName ? (
      <div className={contentClassName}>
        <div className={pillClassName} />
        <h2 className={titleClassName}>{title}</h2>
      </div>
    ) : (
      <>
        <div className={pillClassName} />
        <h2 className={titleClassName}>{title}</h2>
      </>
    )}
    {action}
  </div>
)
