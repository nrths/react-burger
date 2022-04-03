import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Loader from "../../components/loader/loader";
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients';

const IngredientDetailsPage = () => {
    const { loading } = useSelector(ingredientsSelector)

    return <div className={styles.container}>
        {loading && <Loader />}
        <IngredientDetails />
    </div>
}

export default IngredientDetailsPage;