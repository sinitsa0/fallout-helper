import { IScenarioProps } from './Scenario.props';
import styles from './Scenario.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { falloutActions } from '../../store/cart.slice';

function Scenario(props: IScenarioProps) {
    const dispatch = useDispatch<AppDispath>();

    const clean = () => {
        dispatch(falloutActions.add_FirstQuest({ scenario: props.id, countPlayer: props.countPlayer }));
    };

    return (
        <Link to={`/scenario/${props.id}`} className={styles['link']} onClick={() => clean()}>
            <div className={styles['scenario']}>{props.text}</div>
        </Link>
    );
}

export default Scenario;
