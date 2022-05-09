import styles from './loader.module.css';
import { FC } from 'react';

const Loader: FC = () => {
    return (
        <div className={`${styles.spin_wrapper}`}>
            <div className={`${styles.spinner}`}>
            </div>
        </div>
    )
}

export default Loader;