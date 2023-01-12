import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080",
  // validateStatus: false,
});

export const getSizes = async () => {
  try {
    const { data } = await request.get("/size");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getColours = async () => {
  try {
    const { data } = await request.get("/colour");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const { data } = await request.get("/product");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilteredProducts = async (checkedCategories) => {
  try {
    const category = checkedCategories.join();
    const { data } = await request.get("/product", {
      params: { category },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchedProducts = async (search) => {
  try {
    const { data } = await request.get("/product", {
      params: { search },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchedAndFilteredProducts = async (
  search,
  checkedCategories
) => {
  try {
    const category = checkedCategories.join();
    const { data } = await request.get("/product", {
      params: { category, search },
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await request.get("/product/" + id);
    return data;
  } catch (error) {
    console.log(error);
    // throw error.response.data;
    throw error;
  }
};

export const saveProduct = async (product) => {
  try {
    const { data, status } = await request.post("/product", product);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const { data, status } = await request.put("/product", product);
  } catch (error) {
    throw error.response.data;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await request.get("/product/category");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMaterials = async () => {
  try {
    const { data } = await request.get("/material");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductArchive = async (id) => {
  try {
    const { data } = await request.get("/archive/product/" + id);
    return data;
  } catch (error) {
    console.log(error);
    // throw error.response.data;
    throw error;
  }
};
