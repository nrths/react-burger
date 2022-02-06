import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

function IngredientDetails(props) {
  return (
    <div className={`${styles.ingredient} pb-15`}>
      <img
        src={props.ingredient.image_large}
        alt={props.ingredient.name}
        className={`${styles.nutrient_image} mb-4`}
      />
      <p className="text text_type_main-medium mb-8">{props.ingredient.name}</p>

      <ul className={styles.nutrients}>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.calories}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.proteins}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.fat}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
    data: PropTypes.shape({
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
}),
    ingredient: PropTypes.bool.isRequired,
}

export default IngredientDetails;
