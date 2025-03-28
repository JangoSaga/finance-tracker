import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useCategories } from "../Features/categories/useCategories";
import { useCreateCategory } from "../Features/categories/useCreateCategory";
import Category from "../components/categories/Category";
import Table from "../components/Table/Table";
import Loading from "../components/Loading";

function Categories() {
  const { categories, isLoading, error } = useCategories();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("income");
  const {
    createCategory,
    isLoading: isCreating,
    error: creatingError,
  } = useCreateCategory();
  const [categoryEmoji, setCategoryEmoji] = useState("💰");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createCategory(
      {
        category_name: categoryName,
        type: categoryType,
        emoji: categoryEmoji,
      },
      {
        onSettled: () => {
          setCategoryName("");
          setCategoryType("income");
        },
      }
    );
  }

  const onEmojiClick = (emojiObject) => {
    setCategoryEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const tableHeaders = ["Name", "Type", "Emoji", "Actions"];

  if (isLoading || isCreating) return <Loading />;
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 shadow-xl p-4 bg-white rounded-lg w-full flex-wrap"
      >
        <div className="relative w-full md:w-fit">
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
        </div>

        <input
          type="text"
          name="name"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <select
          name="type"
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-fit"
        >
          Create Category
        </button>
      </form>

      {error && creatingError && (
        <p className="text-red-500">{creatingError.message}</p>
      )}

      {categories && categories.length > 0 ? (
        <Table headers={tableHeaders}>
          {categories.map((category) => (
            <Category key={category.category_id} category={category} />
          ))}
        </Table>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-6 p-4">
          <img
            src="noCategory.png"
            alt="No Category"
            className="grayscale w-full max-w-[280px] md:max-w-[320px] h-auto object-contain"
          />
          <p className="text-2xl font-bold text-center md:text-left">
            No Category yet, add your first category
          </p>
        </div>
      )}
    </div>
  );
}

export default Categories;
