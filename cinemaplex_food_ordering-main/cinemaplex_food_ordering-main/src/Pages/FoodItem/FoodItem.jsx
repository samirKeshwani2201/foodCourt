import React, { useEffect, useState } from "react";
import "./FoodItem.css";
import { IoIosSearch } from "react-icons/io";
import { FoodItemData } from "./FoodItemData";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import AddFoodItemModal from "../../Components/AddFoodItemModal/AddFoodItemModal";
import Data from "./FoodItemData.json";
import axios from "axios";
import Pagination from "../../Components/Pagination/Pagination";
import EditFoodItemModel from "../../Components/EditFoodItemModal/EditFoodItemModal";
import { ShimmerTable, ShimmerTitle } from "react-shimmer-effects";
import toast from "react-hot-toast";
const FoodItem = () => {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(7);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editModalData, setEditModalData] = useState("");
  //getting current page posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const [filterData, setFilterData] = useState(foodData);

  const currentPosts = filterData.slice(indexOfFirstPost, indexOfLastPost);
  // const currentPosts = foodData.slice(indexOfFirstPost, indexOfLastPost);

  const [toBeDeleted, setToBeDeleted] = useState(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/admin/allDishes"
      );
      console.log("First time load", response.data);
      const data = response.data;
      const mergedData = data.map((item) => {
        return { ...item, category: item.category.category_name };
      });
      console.log("Merged ", mergedData);
      setFoodData(mergedData);
      setFilterData(mergedData);
      setLoading(false);
    };

    fetch();
  }, []);

  function addNewFoodItem(data) {
    setFilterData(filterData.concat(data));
  }

  function updateFoodItem(data) {
    setFoodData(
      foodData.map((item) => {
        if (item.id === data.itemId) {
          item.title = data.itemName;
          item.brand = data.itemCategory;
          item.price = data.itemPrice;
          item.description = data.itemDescription;
        }
        return item;
      })
    );
  }

  const paginate = (pagenumber) => {
    if (
      pagenumber >= 1 &&
      pagenumber <= Math.ceil(filterData.length / postPerPage) &&
      pagenumber !== currentPage
    ) {
      setCurrentPage(pagenumber);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await axios.delete(
      `http://localhost:8080/api/admin/Dishes/${id}`
    );
    console.log("deleted sdvmfis");
  };

  return loading ? (
    <div
      style={{
        margin: "20px",
      }}
    >
      <ShimmerTitle line={2} gap={10} variant="primary" />
      <ShimmerTable row={7} col={6} />
    </div>
  ) : (
    <div className="fooditems">
      <div className="fooditems-top">
        <div className="fooditems-top-left">
          <h1>Food Items</h1>
          <button
            className="openModalButton"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            Add New
          </button>
        </div>
        <div className="fooditems-top-right search-area">
          <input
            type="text"
            placeholder="Search here.."
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              setFilterData(
                foodData.filter((data) =>
                  data.dish_name.toLowerCase().includes(event.target.value)
                )
              );
              setCurrentPage(1);
            }}
          />
          <span className="search-icon">
            <IoIosSearch />
          </span>
        </div>
      </div>
      {openAddModal ? (
        <AddFoodItemModal
          closeModal={setOpenAddModal}
          addFoodItem={addNewFoodItem}
        />
      ) : null}

      {openEditModal ? (
        <EditFoodItemModel
          closeModal={setOpenEditModal}
          editId={editModalData}
          data={currentPosts}
          updateData={updateFoodItem}
        />
      ) : null}

      {filterData.length <= 0 ? (
        <h1>No Data Found</h1>
      ) : (
        <>
          <div className="fooditems-bottom table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {console.log(foodData)}
                {currentPosts.map((item, i) => {
                  return (
                    <tr key={item.dish_id}>
                      <td>
                        <img src={item.dish_image} alt={item.dish_name} />
                      </td>
                      <td>{item.dish_name}</td>
                      <td>{item.category}</td>
                      <td>${item.dish_price}</td>
                      <td>{item.dish_description}</td>
                      <td>
                        <div className="fooditems-actions">
                          <span
                            className="fooditems-action-edit"
                            onClick={(e) => {
                              console.log(e.target);
                              setOpenEditModal(true);
                              setEditModalData(item.id);
                            }}
                          >
                            <FiEdit />
                          </span>
                          <span
                            className="fooditems-action-edit"
                            onClick={(e) => {
                              console.log(e.target);
                              let action = confirm(
                                "Are You Sure You Want to Delete?"
                              );

                              if (action) {

                                // setToBeDeleted(item.id)
                                setFilterData(
                                  filterData.filter(
                                    (data) => data.dish_id != item.dish_id
                                  )
                                );
                                handleDelete(item.dish_id);
                                toast.success("Item Deleted Successfully");
                              } else {
                                toast.error("Action Aborted");
                              }
                            }}
                          >
                            <AiTwotoneDelete />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPosts={filterData.length}
            postsPerPage={postPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};
export default FoodItem;
