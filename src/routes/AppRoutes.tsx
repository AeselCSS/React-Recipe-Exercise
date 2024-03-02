import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { Categories, Recipe, RecipeForm, RecipesLayout } from "../recipes";
import { Login, Logout, RequireAuth } from "../security";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/" element={<Categories />} />
            <Route path="/recipes" element={<RecipesLayout/>}>
                <Route path=":id" element={<Recipe />} />
            </Route>
            <Route path="/add" element={
                <RequireAuth roles={["ADMIN"]}>
                    <RecipeForm />
                </RequireAuth>
            }
            />
            <Route path="/login" element={<Login />} />
             <Route path="/logout" element={<Logout />} />

            {/* Catch all route */}
            <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
    );
}

export default AppRoutes;