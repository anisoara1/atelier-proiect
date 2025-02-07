import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import "./AdminPage.css";

export const AdminPage = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const imageInputRef = useRef(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "topDishes",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: type === "file" ? value : value,
    }));

    if (type === "file") {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      await dispatch(updateProduct({ id: editId, updateData: formData }));
    } else {
      await dispatch(addProduct(formData));
    }

    resetForm();
  };

  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
      category: "topDishes",
    });
    setImageFile(null);
    setIsEditing(false);
    setEditId(null);

    formRef.current.reset();
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleEditProduct = (product) => {
    setProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    });
    setIsEditing(true);
    setEditId(product._id);
  };

  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(editId));
    resetForm();
  };

  const categories = {
    topDishes: products.filter((p) => p.category === "topDishes"),
    menus: products.filter((p) => p.category === "menus"),
    dailyMenu: products.filter((p) => p.category === "dailyMenu"),
  };

  const renderProductList = (categoryName, products) => (
    <div>
      <h3>{categoryName}</h3>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li
              className="product-item"
              key={product._id}
              onClick={() => handleEditProduct(product)}
            >
              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.price} lei</p>
                <p>{product.description}</p>
                <p>Categoria: {product.category}</p>
              </div>
              {product.image && (
                <img
                  src={`${process.env.REACT_APP_SERVER_URL_DEV}${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nu există produse în această categorie.</p>
      )}
    </div>
  );

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>

      <form className="product-form" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          name="name"
          placeholder="Nume produs"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preț"
          value={product.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descriere"
          value={product.description}
          onChange={handleChange}
        />
        <select
          name="category"
          value={product.category || "topDishes"}
          onChange={handleChange}
        >
          <option value="topDishes">Top Dishes</option>
          <option value="menus">Menus</option>
          <option value="dailyMenu">Daily Menu</option>
        </select>
        <input
          type="file"
          name="image"
          ref={imageInputRef}
          onChange={handleChange}
        />
        {imageFile && <p>Imagine selectată: {imageFile.name}</p>}
        <button type="submit" disabled={loading}>
          {isEditing ? "Salvează produs" : "Adaugă produs"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDeleteProduct}
            className="delete-button"
          >
            Șterge produs
          </button>
        )}
      </form>

      <h2>Produse existente</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {renderProductList("Top Dishes", categories.topDishes)}
      {renderProductList("Menus", categories.menus)}
      {renderProductList("Daily Menu", categories.dailyMenu)}
    </div>
  );
};
