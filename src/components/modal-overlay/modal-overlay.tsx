import styles from './modal-overlay.module.css';
import { FC } from 'react';
import { TModalOverlay } from '../../services/types/types';

const ModalOverlay: FC<TModalOverlay> = (props) => {
    return (<div className={styles.overlay} onClick={() => {props.onClose(false)}}></div>)
}

export default ModalOverlay;