import SideHeader from "../HOCs/SideHeader";
import ViewProduct from "./Product/ViewProduct";
import CreateProduct from "./Product/CreateProduct";
import ViewSubProduct from "./SubProduct/ViewSubProduct";
import CreateSubProduct from "./SubProduct/CreateSubProduct";
import Dashboard from "./Dashboard/Dashboard";

const WithHOCDashboard = SideHeader(Dashboard);
const WithHOCViewProduct = SideHeader(ViewProduct);
const WithHOCCreateProduct = SideHeader(CreateProduct);
const WithHOCViewSubProduct = SideHeader(ViewSubProduct);
const WithHOCCreateSubProduct = SideHeader(CreateSubProduct);

export {
    WithHOCViewProduct as ViewProduct,
    WithHOCCreateProduct as CreateProduct,
    WithHOCDashboard as Dashboard,
    WithHOCViewSubProduct as ViewSubProduct,
    WithHOCCreateSubProduct as CreateSubProduct,
}