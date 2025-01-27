/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteCategory } from "../../Features/categories/useDeleteCategory";
import { useUpdateCategory } from "../../Features/categories/useUpdateCategory";

function Category({ category }) {
  const { deleteCategory, isLoading: isDeleting, error } = useDeleteCategory();
  const {
    updateCategory,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateCategory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(
      {
        categoryId: category.category_id,
        category: editedCategory,
      },
      {
        onSettled: () => {
          setIsEditing(false);
          setEditedCategory(category);
        },
      }
    );
  };

  if (isDeleting || isUpdating)
    return (
      <tr>
        <td colSpan="3">Loading...</td>
      </tr>
    );
  if (error || updateError)
    return (
      <tr>
        <td colSpan="3" className="text-red-500">
          Error occurred
        </td>
      </tr>
    );

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {isEditing ? (
        <>
          <td className="px-6 py-4">
            <input
              type="text"
              value={editedCategory.category_name}
              onChange={(e) =>
                setEditedCategory({
                  ...editedCategory,
                  category_name: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </td>
          <td className="px-6 py-4">
            <select
              value={editedCategory.type}
              onChange={(e) =>
                setEditedCategory({
                  ...editedCategory,
                  type: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </td>
          <td className="px-6 py-4">
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedCategory(category);
                }}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4">{category.category_name}</td>
          <td className="px-6 py-4">
            <span
              className={`capitalize px-2 py-1 rounded-full ${
                category.type === "income"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {category.type}
            </span>
          </td>
          <td className="px-6 py-4 text-4xl ">{category.emoji}</td>
          <td className="px-6 py-4 flex ">
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(category.category_id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

export default Category;
