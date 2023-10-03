import Link from "next/link";
import React from "react";


const NavItem = ({ href, text, active }) => {
    return (
        <Link href={href}>
            <div className={`
                nav__link ${active ? 'active' : ''}
            `}>{text}</div>
        </Link>
    )
}

export default NavItem 