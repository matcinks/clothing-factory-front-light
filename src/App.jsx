import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ColoursLayout, {
  action as coloursAction,
  loader as coloursLoader,
} from "./pages/ColoursLayout";
import ErrorPage from "./pages/Error";
import EditMaterial, {
  action as editMaterialAction,
  loader as editMaterialFormDataLoader,
} from "./pages/EditMaterial";
import EditProduct, { action as editProductAction } from "./pages/EditProduct";
import EditSchedule, {
  action as editScheduleFormAction,
  loader as editScheduleFormDataLoader,
} from "./pages/EditSchedule";
import MaterialsLayout from "./pages/MaterialsLayout";
import MaterialsList, {
  loader as materialsLoader,
} from "./pages/MaterialsList";
import NewMaterial, {
  action as newMaterialAction,
  loader as materialFormDataLoader,
} from "./pages/NewMaterial";
import NewProduct, {
  action as newProductAction,
  loader as productFormDataLoader,
} from "./pages/NewProduct";
import NewSchedule, {
  action as newScheduleFormAction,
  loader as newScheduleFormDataLoader,
} from "./pages/NewSchedule";
import ProductArchive, {
  loader as productArchiveLoader,
} from "./pages/ProductArchive";
import ProductDetailPage, {
  loader as productDetailLoader,
} from "./pages/ProductDetailPage";
import ProductsLayout from "./pages/ProductsLayout";
import ProductsList from "./pages/ProductsList";
import ProductionLayout from "./pages/ProductionLayout";
import RootLayout, { action as loginAction } from "./pages/RootLayout";
import SeamstressesLayout, {
  action as seamstressesAction,
  loader as seamstressesDataLoader,
} from "./pages/SeamstressesLayout";
import SewingLayout, {
  action as sewingUpdateStatusAction,
  loader as sewingDataLoader,
} from "./pages/SewingLayout";
import SizesLayout, {
  action as sizesAction,
  loader as sizesLoader,
} from "./pages/SizesLayout";
import WelcomePage from "./pages/Welcome";

import { ProductContextProvider } from "./store/product-context";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      action: loginAction,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "products",
          element: <ProductsLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              element: <ProductContextProvider />,
              children: [
                {
                  index: true,
                  element: <ProductsList />,
                },
                {
                  path: ":id",
                  element: <ProductDetailPage />,
                  loader: productDetailLoader,
                },
                {
                  path: ":id/archive",
                  element: <ProductArchive />,
                  loader: productArchiveLoader,
                },
                {
                  path: ":id/edit",
                  element: <EditProduct />,
                  action: editProductAction,
                  loader: productFormDataLoader,
                },
                {
                  path: "new",
                  element: <NewProduct />,
                  action: newProductAction,
                  loader: productFormDataLoader,
                },
              ],
            },
            {
              path: "sizes",
              element: <SizesLayout />,
              errorElement: <ErrorPage />,
              loader: sizesLoader,
              action: sizesAction,
            },
            {
              path: "colours",
              element: <ColoursLayout />,
              errorElement: <ErrorPage />,
              loader: coloursLoader,
              action: coloursAction,
            },
            {
              path: "materials",
              element: <MaterialsLayout />,
              errorElement: <ErrorPage />,

              children: [
                {
                  index: true,
                  element: <MaterialsList />,
                  loader: materialsLoader,
                },
                {
                  path: "new",
                  element: <NewMaterial />,
                  action: newMaterialAction,
                  loader: materialFormDataLoader,
                },
                {
                  path: ":id/edit",
                  element: <EditMaterial />,
                  loader: editMaterialFormDataLoader,
                  action: editMaterialAction,
                },
              ],
            },
          ],
        },
        {
          path: "production",
          element: <ProductionLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "sewing/:date",
              element: <SewingLayout />,
              loader: sewingDataLoader,
              action: sewingUpdateStatusAction,
            },
            {
              path: "sewing/seamstresses",
              element: <SeamstressesLayout />,
              action: seamstressesAction,
              loader: seamstressesDataLoader,
            },
            {
              path: "sewing/new",
              element: <NewSchedule />,
              action: newScheduleFormAction,
              loader: newScheduleFormDataLoader,
            },
            {
              path: "sewing/:id/edit",
              element: <EditSchedule />,
              action: editScheduleFormAction,
              loader: editScheduleFormDataLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
