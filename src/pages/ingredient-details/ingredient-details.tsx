import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Loader from "../../components/loader/loader";
import styles from './ingredient-details.module.css';
import { FC } from 'react';
import { useSelector } from '../../services/types/hooks-types';
import { ingredientsSelector } from '../../services/slices/ingredients';

const IngredientDetailsPage: FC = () => {
    const { loading } = useSelector(ingredientsSelector)

    return <div className={styles.container}>
        {loading && <Loader />}
        <IngredientDetails />
    </div>
}

export default IngredientDetailsPage;