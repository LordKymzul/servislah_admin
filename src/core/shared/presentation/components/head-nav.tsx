'use client'

import { usePathname } from "next/navigation";
import NotificationSideBar from "./notification-side-bar";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const HeadNav = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    return (
        <div className="flex items-center justify-between w-full border-b px-4 py-4">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li className="flex items-center">
                        <Link href="/" className="text-muted-foreground hover:text-foreground">
                            <Home className="h-4 w-4" />
                        </Link>
                    </li>
                    {pathSegments.map((segment, index) => {
                        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathSegments.length - 1;
                        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

                        return (
                            <li key={path} className="flex items-center">
                                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                                {isLast ? (
                                    <span className="font-medium">{formattedSegment}</span>
                                ) : (
                                    <Link
                                        href={path}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {formattedSegment}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <NotificationSideBar />
        </div>
    )
}

export default HeadNav;