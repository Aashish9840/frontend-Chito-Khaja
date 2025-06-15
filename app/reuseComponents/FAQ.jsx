import * as Accordion from "@radix-ui/react-accordion"
import React from 'react'
import { AccordionItem, AccordionTrigger, AccordionContent } from './SupportAccordion'

const FAQ = ({ QA }) => {
    return (
        <div>
            <Accordion.Root
                className="w-full lg:w-[80%] rounded-md"
                type="single"
                collapsible
            >
                {
                    QA.map((element, index) => (

                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger>{element.title}</AccordionTrigger>
                            <AccordionContent>
                                {element.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion.Root>


        </div>
    )
}

export default FAQ