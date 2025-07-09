import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import NotificationSideBar from "./notification-side-bar";

const HeadNav = () => {
    return (
        <div className="flex items-center justify-between w-full border-b p-4">
            <p className="text-lg font-bold">
                Price List
            </p>
            <NotificationSideBar />

        </div>
    )
}

export default HeadNav;