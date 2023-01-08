import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import EditProduct, { action as editProductAction } from "./pages/EditProduct";
import NewProduct, {
  action as newProductAction,
  loader as productFormDataLoader,
} from "./pages/NewProduct";
import ProductDetailPage, {
  loader as productDetailLoader,
} from "./pages/ProductDetailPage";
import ProductsLayout from "./pages/ProductsLayout";
import ProductsList from "./pages/ProductsList";
import RootLayout from "./pages/RootLayout";
import SizesList, { loader as sizesLoader } from "./pages/SizesList";
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
                  path: ":id/edit",
                  element: <EditProduct />,
                  errorElement: <ErrorPage />,
                  action: editProductAction,
                },
                {
                  path: "new",
                  element: <NewProduct />,
                  errorElement: <ErrorPage />,
                  action: newProductAction,
                  loader: productFormDataLoader,
                },
                {
                  path: "sizes",
                  element: <SizesList />,
                  loader: sizesLoader,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
