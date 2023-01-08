import { redirect, useNavigation } from "react-router-dom";

const ProductAddRoute = () => {
  return (
    <>
      <ProductAdd />;
    </>
  );
};

export default ProductAddRoute;

export const action = async ({ request }) => {
  // const formData = request.formData(); // tworzy Promise
  //   const post = {
  //     title: form
  //   }
  console.log(request);
  return redirect("/product");
};
