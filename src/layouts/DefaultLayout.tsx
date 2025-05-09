import type { PropsWithChildren } from "react";
import Footer from "@/components/Footer"
import MainNavigationBar from "@/components/MainNavigationBar"

const DefaultLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="default-layout">
            <MainNavigationBar />
            {children}
            <Footer />
        </div>
    )
}