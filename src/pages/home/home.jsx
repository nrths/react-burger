import { useSelector} from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.css';

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Loader from "../../components/loader/loader";
import Error from '../../components/error/error';

const HomePage = () => {
    const { loading, hasError } = useSelector(ingredientsSelector);

    const renderIngredients = () => {
        if (loading) return <Loader />
        if (hasError) return <Error />

        return <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </>
    }

    return <main className={styles.main}>
        {renderIngredients()}
    </main>
}

export default HomePage;