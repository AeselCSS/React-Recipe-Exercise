import {API_URL} from "../settings";
import {makeOptions, handleHttpErrors} from "./fetchUtils";

const CATEGORIES_URL = API_URL + "/categories";
const RECIPE_URL = API_URL + "/recipes";
const INFO_URL = API_URL + "/info";

const token = localStorage.getItem("token");

interface Category {
    name: string;
}

interface Recipe {
    id: number | null;
    name: string;
    owner: string;
    category: string;
    instructions: string;
    thumb: string;
    youTube: string;
    ingredients: string;
    source: string;
}

interface Info {
    reference: string;
    created: string;
    info: string;
}

let categories: Array<string> = [];
const recipes: Array<Recipe> = [];
let info: Info | null = null;

const getCategories = async (): Promise<string[]> => {
    if (categories.length > 0) return [...categories];
    const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
    categories = [...res];
    return categories;
}

const addCategory = async (newCategory: Category): Promise<Category> => {
    const options = makeOptions("POST", newCategory, token);
    return fetch(CATEGORIES_URL, options).then(handleHttpErrors);
}

const getRecipes = async (category: string | null): Promise<Recipe[]> => {
    if (recipes.length > 0) return [...recipes];
    console.log("category", category);
    const queryParams = category ? "?category=" + category : "";
    return fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
}
const getRecipe = async (id: number): Promise<Recipe> => {
    // if (recipes.length > 0) return [...recipes];
    return fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
}
const addRecipe = async (newRecipe: Recipe): Promise<Recipe> => {
    const method = newRecipe.id ? "PUT" : "POST";
    const options = makeOptions(method, newRecipe, token);
    const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
    return fetch(URL, options).then(handleHttpErrors);
}
const deleteRecipe = async (id: number): Promise<Recipe> => {
    const options = makeOptions("DELETE", null, token);
    return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
}

const getInfo = async (): Promise<Info> => {
    if(!info) info = await fetch(INFO_URL).then(handleHttpErrors) as Info
    return info;
}

export type {Recipe, Info};
// eslint-disable-next-line react-refresh/only-export-components
export {getCategories, addCategory, getRecipes, getRecipe, addRecipe, deleteRecipe, getInfo};
