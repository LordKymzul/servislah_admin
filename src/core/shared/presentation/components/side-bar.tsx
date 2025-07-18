"use client"

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
    Search,
    Calendar,
    Tag,
    Package,
    Users,
    Percent,
    Tags,
    Settings,
    FileText,
    History,
    Keyboard,
    Moon,
    Sun,
    LogOut,
    Menu,
    Building2,
    Car,
    Wrench,
    ChevronDown,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useAuthTanstack } from "@/src/modules/auth/presentation/tanstack/auth-tanstack";

interface SideBarProps {
    className?: string;
}

interface NavigationItem {
    icon: any;
    label: string;
    href?: string;
    count?: string;
    children?: NavigationItem[];
}


const navigationItems: NavigationItem[] = [
    { icon: Calendar, label: "Appointments", href: "/appointments" },
    { icon: Wrench, label: "Mechanics", href: "/mechanics" },
    { icon: Car, label: "Vehicles", href: "/vehicles" },
    {
        icon: Building2,
        label: "Service Centers",
        href: "/service-centers",
        children: [
            { icon: Tag, label: "Services", href: "/service-centers/services" },
            { icon: Package, label: "Service Bay", href: "/service-centers/service-bay" },
        ]
    },
];

// Separate navigation items for settings
const settingsNavigationItems: NavigationItem[] = [
    { icon: Building2, label: "Company", href: "/settings/company" },
    {
        icon: Building2,
        label: "Service Center",
        href: "/settings/service-center",
        children: [
            { icon: Tag, label: "Services", href: "/settings/service-center/services" },
            { icon: Package, label: "Service Bay", href: "/settings/service-center/service-bay" },
        ]
    },
    { icon: Users, label: "Profile", href: "/settings/profile" },
];


const SideBar = ({ className }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const { setTheme, theme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const {
        user,
        logoutMutation
    } = useAuthTanstack();

    // Set initial expanded state based on current path
    React.useEffect(() => {
        const currentParent = navigationItems.find(item =>
            item.children?.some(child => child.href === pathname)
        );
        if (currentParent) {
            setExpandedItem(currentParent.label);
        }
    }, [pathname, navigationItems]);


    const handleItemClick = (item: NavigationItem) => {
        if (item.children) {
            setExpandedItem(expandedItem === item.label ? null : item.label);
        } else {
            setExpandedItem(null);
        }

        if (item.href) {
            router.push(item.href);
        }
        setIsOpen(false);
    };

    const handleSettingsClick = () => {
        router.push("/settings/company");
        setIsOpen(false);
    };

    const renderNavigationItem = (item: NavigationItem) => {
        const isSelected = pathname === item.href;
        const hasSelectedChild = item.children?.some(child => pathname === child.href);
        const isExpanded = expandedItem === item.label;

        return (
            <li key={item.label}>
                <div className="flex flex-col">
                    <div className="flex">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-2 h-10",
                                (isSelected || hasSelectedChild) && "bg-muted font-medium"
                            )}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="flex items-center w-full">
                                <item.icon className="h-4 w-4" />
                                <span className="ml-2">{item.label}</span>
                                {item.children ? (
                                    <ChevronDown
                                        className={cn(
                                            "ml-auto h-4 w-4 transition-transform duration-200",
                                            isExpanded && "transform rotate-180"
                                        )}
                                    />
                                ) : item.count ? (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {item.count}
                                    </span>
                                ) : null}
                            </div>
                        </Button>
                    </div>
                    {item.children && isExpanded && (
                        <ul className="pl-6 space-y-1 mt-1">
                            {item.children.map((child) => (
                                <li key={child.label}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-2 h-9",
                                            pathname === child.href && "bg-muted font-medium"
                                        )}
                                        onClick={() => {
                                            if (child.href) {
                                                router.push(child.href);
                                            }
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex items-center w-full">
                                            <child.icon className="h-4 w-4" />
                                            <span className="ml-2">{child.label}</span>
                                        </div>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </li>
        );
    };

    const storeSettingsItems = [
        { icon: Settings, label: "Store settings" },
        { icon: LogOut, label: "Log out" },
    ];

    const userSettingsItems = [
        { icon: Settings, label: "Profile settings" },
        { icon: FileText, label: "Documentation" },
        { icon: History, label: "Changelog" },
        { icon: Keyboard, label: "Shortcuts" },
        {
            icon: theme === 'light' ? Moon : Sun,
            label: "Theme",
            onClick: () => setTheme(theme === 'light' ? 'dark' : 'light')
        },
        {
            icon: LogOut,
            label: "Log out",
            onClick: () => {
                logoutMutation.mutate();
            }
        },
    ];

    const SidebarContent = ({ email }: { email: string }) => (
        <>
            {/* Store Header */}
            <div className="p-4 flex items-center gap-2 border-b">
                <div className="w-full">
                    {pathname.startsWith("/settings") ? (
                        <Button variant="ghost" className="w-full justify-start h-10" onClick={() => router.push("/dashboard")}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="ml-2">Settings</span>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start h-10">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>N</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start">
                                                <span className="font-semibold">Hakim Store</span>
                                                <span className="text-sm text-muted-foreground">Store</span>
                                            </div>
                                        </div>
                                        <Menu className="h-4 w-4" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                {storeSettingsItems.map((item) => (
                                    <DropdownMenuItem
                                        key={item.label}
                                        className="gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="p-2 space-y-1">
                    {pathname.startsWith("/settings")
                        ? settingsNavigationItems.map(renderNavigationItem)
                        : navigationItems.map(renderNavigationItem)
                    }
                </ul>
            </nav>

            {/* Settings Item - Show only when not in settings */}
            {!pathname.startsWith("/settings") && (
                <div className="border-t p-2">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-2 h-10",
                            pathname === "/settings/company" && "bg-muted font-medium"
                        )}
                        onClick={handleSettingsClick}
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Button>
                </div>
            )}

            {/* User Settings */}
            <div className="border-t p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-10">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                            <span className="truncate">{email}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        {userSettingsItems.map((item) => (
                            <DropdownMenuItem
                                key={item.label}
                                className="gap-2"
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    }
                                    setIsOpen(false);
                                }}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button and Sheet */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col h-full">
                            <SidebarContent email={user?.email || ''} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col h-screen w-72 border-r",
                    className
                )}
            >
                <SidebarContent email={user?.email || ''} />
            </aside>
        </>
    );
};

export default SideBar;