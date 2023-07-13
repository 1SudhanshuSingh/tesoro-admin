import SideHeader from "../HOCs/SideHeader";
import ViewProduct from "./Product/ViewProduct";
import CreateProduct from "./Product/CreateProduct";
import ViewSubProduct from "./SubProduct/ViewSubProduct";
import CreateSubProduct from "./SubProduct/CreateSubProduct";
import CreateItem from "./Item/CreateItem";
import ViewItem from "./Item/ViewItem";
import Dashboard from "./Dashboard/Dashboard";
import ViewCategory from "./Category/ViewCategory";
import CreateCategory from "./Category/CreateCategory";

const WithHOCDashboard = SideHeader(Dashboard);
const WithHOCViewCategory = SideHeader(ViewCategory);
const WithHOCCreateCategory = SideHeader(CreateCategory);
const WithHOCViewProduct = SideHeader(ViewProduct);
const WithHOCCreateProduct = SideHeader(CreateProduct);
const WithHOCViewSubProduct = SideHeader(ViewSubProduct);
const WithHOCCreateSubProduct = SideHeader(CreateSubProduct);
const WithHOCViewItem = SideHeader(ViewItem);
const WithHOCCreateItem = SideHeader(CreateItem);

export {
  WithHOCViewCategory as ViewCategory,
  WithHOCCreateCategory as CreateCategory,
  WithHOCViewProduct as ViewProduct,
  WithHOCCreateProduct as CreateProduct,
  WithHOCDashboard as Dashboard,
  WithHOCViewSubProduct as ViewSubProduct,
  WithHOCCreateSubProduct as CreateSubProduct,
  WithHOCViewItem as ViewItem,
  WithHOCCreateItem as CreateItem,
};
