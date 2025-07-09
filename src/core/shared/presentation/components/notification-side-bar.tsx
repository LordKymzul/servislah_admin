"use client"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Package, ShoppingCart, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const NotificationSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Mock notification data
    const notifications = [
        {
            id: 1,
            type: "order",
            icon: ShoppingCart,
            title: "New Order Received",
            message: "Order #12345 from John Doe",
            time: "2 minutes ago",
            unread: true,
            avatar: "JD"
        },
        {
            id: 2,
            type: "inventory",
            icon: Package,
            title: "Low Stock Alert",
            message: "iPhone 15 Pro Max is running low (5 items left)",
            time: "15 minutes ago",
            unread: true,
            avatar: null
        },
        {
            id: 3,
            type: "customer",
            icon: Users,
            title: "New Customer Registration",
            message: "Sarah Wilson just created an account",
            time: "1 hour ago",
            unread: false,
            avatar: "SW"
        },
        {
            id: 4,
            type: "system",
            icon: AlertCircle,
            title: "Payment Failed",
            message: "Order #12340 payment failed - retry required",
            time: "2 hours ago",
            unread: true,
            avatar: null
        },
        {
            id: 5,
            type: "success",
            icon: CheckCircle2,
            title: "Shipment Delivered",
            message: "Order #12338 has been delivered successfully",
            time: "3 hours ago",
            unread: false,
            avatar: null
        },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const getNotificationColor = (type: string) => {
        switch (type) {
            case "order": return "bg-blue-500";
            case "inventory": return "bg-orange-500";
            case "customer": return "bg-green-500";
            case "system": return "bg-red-500";
            case "success": return "bg-green-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0 relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 p-0">
                <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle className="flex items-center justify-between">
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {unreadCount} new
                            </Badge>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {/* Notifications List */}
                    <div className="flex-1 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                                <Bell className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${notification.unread ? 'bg-muted/30' : ''
                                            }`}
                                        onClick={() => {
                                            // Handle notification click
                                            console.log('Clicked notification:', notification.id);
                                        }}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {/* Icon or Avatar */}
                                            <div className="flex-shrink-0">
                                                {notification.avatar ? (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="" />
                                                        <AvatarFallback className="text-xs">
                                                            {notification.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ) : (
                                                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                                                        <notification.icon className="h-4 w-4 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium truncate">
                                                        {notification.title}
                                                    </p>
                                                    {notification.unread && (
                                                        <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t p-4 space-y-2">
                        <Button
                            variant="outline"
                            className="w-full text-sm"
                            onClick={() => {
                                // Mark all as read
                                console.log('Mark all as read');
                            }}
                        >
                            Mark all as read
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full text-sm"
                            onClick={() => {
                                // View all notifications
                                setIsOpen(false);
                                console.log('View all notifications');
                            }}
                        >
                            View all notifications
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NotificationSideBar;
