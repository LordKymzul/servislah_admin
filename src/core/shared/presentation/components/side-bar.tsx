"use client"

import { cn } from "@/lib/utils";
import {
    Search,
    ShoppingCart,
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
    LogOut,
    Menu,
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
import { useState } from "react";

interface SideBarProps {
    className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigationItems = [
        { icon: Search, label: "Search", count: "8K" },
        { icon: ShoppingCart, label: "Orders" },
        { icon: Tag, label: "Products" },
        { icon: Package, label: "Inventory" },
        { icon: Users, label: "Customers" },
        { icon: Percent, label: "Promotions" },
        { icon: Tags, label: "Price Lists" },
    ];

    const storeSettingsItems = [
        { icon: Settings, label: "Store settings" },
        { icon: LogOut, label: "Log out" },
    ];

    const userSettingsItems = [
        { icon: Settings, label: "Profile settings" },
        { icon: FileText, label: "Documentation" },
        { icon: History, label: "Changelog" },
        { icon: Keyboard, label: "Shortcuts" },
        { icon: Moon, label: "Theme" },
        { icon: LogOut, label: "Log out" },
    ];

    const SidebarContent = () => (
        <>
            {/* Store Header */}
            <div className="p-4 flex items-center gap-2 border-b">
                <div className="w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start h-10">
                                <div className="flex items-center w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>N</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold">Nuuha Store</span>
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
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="p-2 space-y-1">
                    {navigationItems.map((item) => (
                        <li key={item.label}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 h-10"
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                                {item.count && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {item.count}
                                    </span>
                                )}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Settings */}
            <div className="border-t p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-10">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                            <span className="truncate">muhdhakimXXXXXX</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        {userSettingsItems.map((item) => (
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
                            <SidebarContent />
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
                <SidebarContent />
            </aside>
        </>
    );
};

export default SideBar;
