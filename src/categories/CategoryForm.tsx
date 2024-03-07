import React, { useContext, useState } from "react";
import { CategoryContext } from './CategoryContext';
import {addCategory} from "../services/apiFacade.ts";

interface Category {
  name: string;
}

const emptyCategoryForm: Category = {
    name: ""
}

const CategoryForm = () => {
    const [category, setCategory] = useState(emptyCategoryForm);
    const { categories, setCategories, editCategory, setEditCategory } = useContext(CategoryContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setCategory({ ...category, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editCategory) {
            const index = categories.findIndex((c: Category) => c.name === editCategory.name);
            categories[index] = category;
            setCategories([...categories]);
            setEditCategory(null);
        } else {
            setCategories([...categories, category]);
            addCategory(category)
        }
        setCategory(emptyCategoryForm);
    }

    return (
        <>
        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Category:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
        </>
    );
}

export default CategoryForm;