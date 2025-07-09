'use client'

import { usePathname } from "next/navigation";
import NotificationSideBar from "./notification-side-bar";

const HeadNav = () => {

    const pathname = usePathname()

    return (
        <div className="flex items-center justify-between w-full border-b p-4">
            <p className="text-lg font-bold">
                {pathname.split('/').pop()?.charAt(0).toUpperCase() + (pathname.split('/').pop()?.slice(1) ?? '')}
            </p>
            <NotificationSideBar />

        </div>
    )
}

export default HeadNav;