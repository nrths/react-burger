import styles from './constructor-start-block.module.css';
import bunN200 from '../../images/bun-n-200i.png';
import luminousFillet from '../../images/luminous-fillet.png';
import sauce from '../../images/sauce-space.png';
import mineralRings from '../../images/crunchy-mineral-rings.png';
import ekzoPlantago from '../../images/ekzo-plantago.png';


const ConstructorStartBlock = () => {
    return (
        <div className={styles.block}>
            <span className={`${styles.span} text text_type_main-medium mt-16`}>Добавьте ингредиенты, чтобы собрать бургер!</span>
            <img className={styles.image} src={bunN200} alt="Булка" />
            <img className={styles.image} src={luminousFillet} alt="Филе" />
            <img className={styles.image} src={sauce} alt="Соус" />
            <img className={styles.image} src={mineralRings} alt="Хрустящие колечки" />
            <img className={styles.image} src={ekzoPlantago} alt="Салат" />
            <img className={styles.image} src={bunN200} alt="Булка" />
        </div>
    )
}

export default ConstructorStartBlock