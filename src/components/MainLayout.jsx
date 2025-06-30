import SideHeader from "./SideHeader";
import UpperHeader from "./UpperHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <UpperHeader />
            <main>
                <SideHeader />
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;