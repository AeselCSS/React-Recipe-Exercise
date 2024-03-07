import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { Recipe, RecipeForm, RecipesLayout } from "../recipes";
import { Login, Logout, RequireAuth } from "../security";
import {Categories, CategoryForm} from "../categories";
import SignUp from "../security/SignUp.tsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/" element={<Categories />} />
            <Route path="/recipes" element={<RecipesLayout/>}>
                <Route path=":id" element={<Recipe />} />
            </Route>
            <Route path="/add-recipe" element={
                <RequireAuth roles={["ADMIN", "USER"]}>
                    <RecipeForm />
                </RequireAuth>
            }
            />
            <Route path="/add-category" element={
                <RequireAuth roles={["ADMIN"]}>
                    <CategoryForm />
                </RequireAuth>
            }
            />
            <Route path="/user-with-role" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
             <Route path="/logout" element={<Logout />} />

            {/* Catch all route */}
            <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
    );
}

export default AppRoutes;