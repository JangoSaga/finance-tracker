/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteCategory } from "../../Features/categories/useDeleteCategory";
import { useUpdateCategory } from "../../Features/categories/useUpdateCategory";
import EmojiPicker from "emoji-picker-react";

function Category({ category }) {
  const { deleteCategory, isLoading: isDeleting, error } = useDeleteCategory();
  const {
    updateCategory,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateCategory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category);
  const [categoryEmoji, setCategoryEmoji] = useState(category.emoji);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onEmojiClick = (emojiObject) => {
    setCategoryEmoji(emojiObject.emoji);
    setEditedCategory((prev) => ({
      ...prev,
      emoji: emojiObject.emoji,
    }));
    setShowEmojiPicker(false);
  };
  const handleSubmit = (e) => {
    console.log(editedCategory);
    e.preventDefault();
    updateCategory(
      {
        categoryId: category.category_id,
        category: editedCategory,
        emoji: categoryEmoji,
      },
      {
        onSettled: () => {
          setIsEditing(false);
          setEditedCategory(category);
          setCategoryEmoji(editedCategory.emoji);
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
          <td className="relative w-full md:w-fit">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full "
            >
              {categoryEmoji} Select Emoji
            </button>
            {showEmojiPicker && (
              <div className="absolute z-10 top-full mt-2">
                <div className="bg-white rounded-md shadow-lg p-2">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width={300}
                    height={400}
                  />
                </div>
              </div>
            )}
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
