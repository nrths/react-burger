import styles from "./ingredient-details.module.css";
import dataPropTypes from '../../utils/types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients';

const IngredientDetails = () => {
  const { ingredientDetails } = useSelector(ingredientsSelector)

  const { id } = useParams();
  const storageIngredients = localStorage.getItem('storageIngredients')
  
  const card = ingredientDetails

  return (
    card && <div className={`${styles.ingredient} pb-15`}>
      <img
        src={card.image_large}
        alt={card.name}
        className={`${styles.nutrient_image} mb-4`}
      />
      <p className="text text_type_main-medium mb-8">{card.name}</p>

      <ul className={styles.nutrients}>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {card.calories}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {card.proteins}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {card.fat}
          </p>
        </li>
        <li className={`${styles.nutrient} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {card.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

// IngredientDetails.propTypes = {
//   ingredient: dataPropTypes.isRequired
// };

export default IngredientDetails;
