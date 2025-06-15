import React from 'react'
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import * as Accordion from '@radix-ui/react-accordion'
export const AccordionItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={classNames(
                "overflow-hidden border-b border-b-gray-400 h-fit py-[6px]",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    ),
);

export const AccordionTrigger = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={classNames(
                    "group flex h-[45px] flex-1 font-dm_sans font-normal text-lg cursor-default items-center justify-between leading-none outline-none",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    ),
);

export const AccordionContent = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames(
                "bg-gray-100 text-[15px] leading-7 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="px-0 py-4">{children}</div>
        </Accordion.Content>
    ),
);