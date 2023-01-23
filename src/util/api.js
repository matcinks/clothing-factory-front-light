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

export const updateSize = async (size) => {
  try {
    const { data, status } = await request.put("/size/" + size.id, size);
  } catch (error) {
    throw error.response.data;
  }
};

export const saveSize = async (size) => {
  try {
    const { data, status } = await request.post("/size", size);
    // return data;
  } catch (error) {
    throw error;
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

export const updateColour = async (colour) => {
  try {
    const { data, status } = await request.put("/colour/" + colour.id, colour);
  } catch (error) {
    throw error.response.data;
  }
};

export const saveColour = async (colour) => {
  try {
    const { data, status } = await request.post("/colour", colour);
    // return data;
  } catch (error) {
    throw error;
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

export const getMaterial = async (id) => {
  try {
    const { data } = await request.get("/material/" + id);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRawMaterials = async () => {
  try {
    const { data } = await request.get("/material/rawmaterial");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveMaterial = async (material) => {
  try {
    const { data, status } = await request.post("/material", material);
  } catch (error) {
    throw error.response.data;
  }
};

export const updateMaterial = async (material) => {
  try {
    const { data, status } = await request.put("/material", material);
  } catch (error) {
    throw error.response.data;
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

export const getSeamstresses = async () => {
  try {
    const { data } = await request.get("/seamstress");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSeamstress = async (seamstress) => {
  try {
    const { data, status } = await request.put(
      "/seamstress/" + seamstress.id,
      seamstress
    );
  } catch (error) {
    throw error.response.data;
  }
};

export const saveSeamstress = async (seamstress) => {
  try {
    const { data, status } = await request.post("/seamstress", seamstress);
    // return data;
  } catch (error) {
    throw error;
  }
};

export const getAllSewing = async () => {
  try {
    const { data } = await request.get("/sewing");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllSewingByDate = async (date) => {
  try {
    const { data } = await request.get("/sewing/" + date);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSewingStatus = async (id, newStatus) => {
  try {
    const { data, status } = await request.put("/sewing/" + id, newStatus, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const saveSewing = async (schedule) => {
  console.log(schedule);
  try {
    const { data, status } = await request.post("/sewing", schedule);
    // return data;
  } catch (error) {
    throw error;
  }
};

export const updateSewing = async (updatedSchedule) => {
  try {
    const { data, status } = await request.put("/sewing", updatedSchedule);
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductMaterials = async (id) => {
  try {
    const { data } = await request.get("/product/" + id + "/materials");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
