import Footer from "@/components/Footer"
import MainNavigationBar from "@/components/MainNavigationBar"
import { Outlet } from "react-router";

const DefaultLayout = () => {
    return (
        <div className="default-layout">
            <MainNavigationBar />
            <main>
            <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default DefaultLayout;