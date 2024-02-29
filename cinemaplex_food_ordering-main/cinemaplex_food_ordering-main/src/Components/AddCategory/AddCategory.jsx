import React, { useEffect, useState } from "react";
import "./AddCategory.css";
import { IoIosSearch } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import AddFoodItemModal from "../../Components/AddFoodItemModal/AddFoodItemModal";
import Data from "../../Data/FoodData.json";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { ShimmerTable, ShimmerTitle } from "react-shimmer-effects";
import toast from "react-hot-toast";
const AddCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(7);
  const [openModal, setOpenModal] = useState(false);
  const [filterData, setFilterData] = useState([]);

  //getting current page posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentData = filterData.slice(indexOfFirstPost, indexOfLastPost);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products");
      setCategoryData(response.data.products);
      setFilterData(response.data.products);
      console.log("Data Fetched");
      setLoading(false);
    };

    fetch();
  }, []);

  const paginate = (pagenumber) => {
    if (
      pagenumber >= 1 &&
      pagenumber <= Math.ceil(filterData.length / postPerPage) &&
      pagenumber !== currentPage
    ) {
      setCurrentPage(pagenumber);
    }
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
          <h1>Add Category</h1>
          <button
            className="openModalButton"
            onClick={() => {
              setOpenModal(true);
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
                categoryData.filter((data) =>
                  data.brand
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
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

      {openModal ? <AddFoodItemModal closeModal={setOpenModal} /> : null}

      {filterData.length <= 0 ? (
        <h1>No Category Found</h1>
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
                {currentData &&
                  currentData.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <img src={item.thumbnail} alt={item.title} />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.brand}</td>
                        <td>${item.price}</td>
                        <td>{item.description}</td>
                        <td>
                          <div className="fooditems-actions">
                            <span>
                              <FiEdit />
                            </span>
                            <span
                              onClick={(e) => {
                                console.log(e.target);
                                let action = confirm(
                                  "Are You Sure You Want to Delete?"
                                );

                                if (action) {
                                  // setToBeDeleted(item.id)
                                  setFilterData(
                                    filterData.filter(
                                      (data) => data.id != item.id
                                    )
                                  );
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
export default AddCategory;
