import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa6";
import "./AddFoodItemModal.css";
import { useFormik } from "formik";
import { addFoodModelSchema } from "./schemas/addFoodModelSchema";
import toast from "react-hot-toast";
import axios from "axios";
const AddFoodItemModal = ({ closeModal, addFoodItem }) => {
  const addItemData = {
    itemName: "",
    itemPrice: "",
    itemImage: "",
    itemCategory: "",
    itemDescription: "",
  };
  const handleCreateDish = async (finalData) => {
    const { category } = finalData;
    const response = await axios.post("http://localhost:8080/api/admin/getCategoryByName", {
      category_name: category
    });
    const categoryId = response.data.id;
    const res = await axios.post("http://localhost:8080/api/admin/addDish", {
      dish_name: finalData.dish_name,
      dish_image: "https://davur.dexignzone.com/frontend/images/food-icon/1.png",
      dish_price: finalData.dish_price,
      category_id: categoryId,
      dish_description: finalData.dish_description
    });
  };
  // addFoodItem("finalDataddd");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: addItemData,
      validationSchema: addFoodModelSchema,
      onSubmit: async (values, action) => {
        const finalData = {
          category: values.itemCategory,
          dish_name: values.itemName,
          dish_price: values.itemPrice,
          dish_description: values.itemDescription,
          dish_image: "http://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        };
        addFoodItem(finalData);
        // console.log("fckkk", finalData);
        handleCreateDish(finalData);
        closeModal(false);
        toast.success("Item Added Successfully");
        action.resetForm();
      },
    });

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal-header">
          <h1>Add New Items</h1>
          <button className="modalCloseBtn" onClick={() => closeModal(false)}>
            <IoCloseCircleOutline />
          </button>
        </div>

        <form
          name="addItemForm"
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="addItemForm">
            <div className="form-field">
              <label htmlFor="itemName">Item name</label>
              <div className="form-control">
                <input
                  type="text"
                  name="itemName"
                  id="itemName"
                  placeholder="Enter dish name"
                  value={values.itemName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.itemName && touched.itemName ? (
                <p className="form-error">{errors.itemName}</p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="itemPrice">Price</label>
              <div className="form-control">
                <input
                  type="number"
                  name="itemPrice"
                  id="itemPrice"
                  placeholder="Enter price"
                  value={values.itemPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.itemPrice && touched.itemPrice ? (
                <p className="form-error">{errors.itemPrice}</p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="itemImage">Item Image</label>
              <div className="form-control itemImage">
                <span>
                  {values.itemImage == ""
                    ? "Select an Image"
                    : values.itemImage.split("\\").reverse()[0]}
                </span>
                {/* <img src={values.itemImage} alt="" /> */}
                <label htmlFor="itemImage">
                  <FaUpload />
                </label>
                <input
                  type="file"
                  name="itemImage"
                  value={values.itemImage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="itemImage"
                />
              </div>
              {errors.itemImage ? (
                <p className="form-error">{errors.itemImage}</p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="">Category</label>
              <div className="form-control">
                <select
                  name="itemCategory"
                  id="itemCategory"
                  value={values.itemCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={"Select Category"}>Select Category</option>
                  <option value="burgers">Burgers</option>
                  <option value="italian">Italian</option>
                  <option value="american">American</option>
                  <option value="mexican">Mexican</option>
                </select>
              </div>
              {errors.itemCategory && touched.itemCategory ? (
                <p className="form-error">{errors.itemCategory}</p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="itemDescription">Description</label>
              <div className="form-control">
                <textarea
                  name="itemDescription"
                  id="itemDescription"
                  placeholder="Enter Description"
                  value={values.itemDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.itemDescription && touched.itemDescription ? (
                <p className="form-error">{errors.itemDescription}</p>
              ) : null}
            </div>
          </div>
          {/* 
          <div className="addItemForm">
            <div className="form-field">
              <label htmlFor="itemName">Item name</label>
              <div className="form-control">
                <input
                  type="text"
                  name="itemName"
                  id="itemName"
                  placeholder="Enter dish name"
                  value={values.itemName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div> */}
          <div className="model-footer">
            <button type="submit" className="modal-saveBtn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItemModal;
