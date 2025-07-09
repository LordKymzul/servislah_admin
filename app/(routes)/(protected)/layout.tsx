import HeadNav from "@/src/core/shared/presentation/components/head-nav";
import SideBar from "@/src/core/shared/presentation/components/side-bar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <SideBar />
            <main className="w-full">
                <HeadNav />
                {children}
            </main>
        </div>
    )
}

export default ProtectedLayout;