import { useEffect, useState } from 'react';
import './CategoryFilter.css';
import API_URL from '../api/BooksAPI';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  // fetch the different book categories from the database with error catching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/GetBookTypes`);
        const data = await response.json();
        console.log('Fetch categories:', data);
        setCategories(data);
        console.log(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []); // return an empty array if no data is found

  // handles what happens when a checkbox is checked/unchecked
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // checks if the category is already in the selected categories
    const updatedCategories = selectedCategories.includes(target.value)
      ? // if the category is already selected, remove it from the list
        selectedCategories.filter((x) => x !== target.value)
      : // else if the category is not in the list, add it to the selected categories
        [...selectedCategories, target.value];

    // update the categories to filter by
    setSelectedCategories(updatedCategories);
  }

  return (
    <div>
      <div className="category-filter">
        <h5>Book Categories</h5>
        <div className="category-list">
          {/* map out all the categories with a checkbox */}
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
