import { Popover, Transition } from '@headlessui/react'
import { UilBell } from '@iconscout/react-unicons'
import React, { Fragment, useState } from 'react'
import { usePopper } from 'react-popper'

import { NotificationMenu } from './NotificationMenu'
import { NotificationDropdownStyles } from './NotificationStyles'

export const NotificationDropdown: React.FC = () => {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)

    // Update popper location
    styles.popper = {
        position: 'absolute',
        right: '0',
        top: '1',
    }

    return (
        <Popover as="div">
            <Popover.Button
                className={NotificationDropdownStyles.button}
                ref={setReferenceElement as unknown as string}
            >
                <UilBell className={NotificationDropdownStyles.bellIcon} />
                <div className={NotificationDropdownStyles.dot} />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel
                    as="div"
                    ref={setPopperElement as unknown as string}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <NotificationMenu />
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
