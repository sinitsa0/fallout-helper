import styles from './ExitCard.module.scss';
import Button from '../../../components/Button/Button';
import { IExitCardProps } from './ExitCard.props';
import { Link } from 'react-router-dom';

function ExitCard(props: IExitCardProps) {
    return (
        <div className={styles['form']}>
            <div className={styles['content']}>
                <div className={styles['text']}>
                    Вы уверены, что хотите выйти?
                    <br />
                    Текущий прогресс сохранится автоматически.
                </div>
                <div className={styles['div-btn']}>
                    <Link to={`/`} className={styles['link']}>
                        <Button className={styles['btn-norm']}>Да</Button>
                    </Link>
                    <Button className={styles['btn-norm']} onClick={() => props.setExit(false)}>
                        Нет
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ExitCard;
