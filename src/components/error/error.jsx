import styles from './error.module.css';

const Error = () => {
    return (
        <div className={`${styles.error}`}>
            <p className={`${styles.text} text text_type_main-medium pl-10 pr-10 pt-30 pb-10`}>Что-то пошло не так. Перезагрузите страницу</p>
            <p className={`${styles.span} pl-10 pr-10 pt-10 pb-30`}>&#128549;</p>
        </div>
        
    )
}

export default Error;