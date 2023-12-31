import "./recipeList.css";
import { useRecipe } from "../api/useDatabase";
import { RECIPE_CATEGORIES } from "../api/types/types";
import { Link } from "react-router-dom";
import { useAuth } from "../api/useAuth";
import { Button, ButtonOfNavigation } from "../Button/Button";

export const RecipeList = () => {
  const recipeApi = useRecipe();
  const recipes = recipeApi.getAll();
  const { login, logout, isUserAllowed } = useAuth();

  const saltyRecipes = recipes.filter(
    (recipe) => recipe.category === RECIPE_CATEGORIES.SALTY
  );
  const sweetRecipes = recipes.filter(
    (recipe) => recipe.category === RECIPE_CATEGORIES.SWEET
  );

  return (
    <>
      <div className="test">
        <div className="headerBox">
          <div>
            {isUserAllowed ? (
              <Button
                type="submit"
                onClick={logout}
                children="Se déconnecter"
                className="loginButton"
                colorIsRed={false}
              />
            ) : (
              <Button
                type="submit"
                onClick={login}
                children="Se connecter"
                className="loginButton"
                colorIsRed={false}
              />
            )}
          </div>
          <div className="mainTitle">
            Les recettes du père Gathy
            <div className="addRecipe">
              {isUserAllowed && (
                <ButtonOfNavigation
                  road="/recipe/add"
                  name="Ajouter une recette"
                />
              )}
            </div>
          </div>
        </div>

        <div className="foodType">
          <details>
            <summary className="subTitle">Recettes sucrées</summary>
            <ul className="recipesList">
              {sweetRecipes.map((sweetRecipe) => (
                <li key={sweetRecipe.uid}>
                  <Link
                    className="recipesList"
                    to={"/recipe/" + sweetRecipe.uid}
                  >
                    {sweetRecipe.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary className="subTitle">Recettes salées</summary>
            <ul className="recipesList">
              {saltyRecipes.map((saltyRecipe) => (
                <li key={saltyRecipe.uid}>
                  <Link
                    className="recipesList"
                    to={"/recipe/" + saltyRecipe.uid}
                  >
                    {saltyRecipe.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </>
  );
};
