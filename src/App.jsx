import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ColoursLayout, {
  action as coloursAction,
  loader as coloursLoader,
} from "./pages/ColoursLayout";
import ErrorPage from "./pages/Error";
import EditProduct, { action as editProductAction } from "./pages/EditProduct";
import NewProduct, {
  action as newProductAction,
  loader as productFormDataLoader,
} from "./pages/NewProduct";
import ProductArchive, {
  loader as productArchiveLoader,
} from "./pages/ProductArchive";
import ProductDetailPage, {
  loader as productDetailLoader,
} from "./pages/ProductDetailPage";
import ProductsLayout from "./pages/ProductsLayout";
import ProductsList from "./pages/ProductsList";
import RootLayout from "./pages/RootLayout";
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
