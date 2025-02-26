import React from "react";
import Header from "../dashboard/_components/Header";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Toaster />
            <div className="mx-5 md:mx-10 lg:mx-36">
                {children}
            </div>

        </div>
    );
};

export default DashboardLayout;
