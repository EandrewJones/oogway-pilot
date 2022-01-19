import React from 'react'
import { UilSetting } from '@iconscout/react-unicons'
import Link from 'next/link'

interface SettingsButtonProps {
    hasText: boolean
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ hasText }) => {
    // TODO: Add Hooks / link href

    return (
        <Link href='#' passHref>
            <a className='inline-flex group-hover:text-black active:text-black dark:group-hover:text-neutralDark-50 
            dark:active:text-neutralDark-50'>
                <UilSetting className="mx-1"/>
            {hasText && 'Settings'}
            </a>
        </Link>
    )
}

SettingsButton.defaultProps = {
    hasText: false
}

export default SettingsButton
