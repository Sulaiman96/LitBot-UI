import Footer from "@/components/Footer"
import MainNavigationBar from "@/components/MainNavigationBar"
import { Toaster } from "sonner"
import { Outlet } from "react-router";

const DefaultLayout = () => {
    return (
        <div className="default-layout">
            <MainNavigationBar />
            <main>
            <Outlet />
            </main>
            <Footer />
            <Toaster />
        </div>
    )
}

export default DefaultLayout;