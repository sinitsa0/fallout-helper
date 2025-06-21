import Scenario from '../../components/Scenario/Scenario';
import styles from './ScenarioList.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

function ScenarioList() {
    const scenario = useSelector((s: RootState) => s.fallout).scenario;
    const [countPlayer, setCountPlayer] = useState<string>('');

    const countUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setCountPlayer(e.target.value);
    };

    return (
        <>
            <div className={styles['scenario-type']}>
                <div className={styles['scenario-list']}>
                    <Scenario text="Столичная пустошь" id={1} countPlayer={countPlayer} />
                    <Scenario text="Содружество" id={2} countPlayer={countPlayer} />
                    <Scenario text="Фар-харбор" id={3} countPlayer={countPlayer} />
                    <Scenario text="Питт" id={4} countPlayer={countPlayer} />
                </div>
                <div className={styles['scenario-list']}>
                    <Scenario text="+ доп Новая Калифорния" id={7} countPlayer={countPlayer} />
                    <Scenario text="+ доп Новая Калифорния" id={8} countPlayer={countPlayer} />
                    <Scenario text="+ доп Новая Калифорния" id={9} countPlayer={countPlayer} />
                    <Scenario text="+ доп Новая Калифорния" id={10} countPlayer={countPlayer} />
                </div>
            </div>
            <div className={styles['scenario-list']}>
                <Scenario text="Триумф мастера" id={5} countPlayer={countPlayer} />
                <Scenario text="Новая Калифорния" id={6} countPlayer={countPlayer} />
            </div>
            {scenario > 0 && (
                <div className={styles['div-btn']}>
                    <Link to={`/scenario/${scenario}`} className={styles['link']}>
                        <Button className={styles['scenario-btn']}>Продолжить сохраненный сценарий</Button>
                    </Link>{' '}
                </div>
            )}
            <div className={styles['div-btn']}>
                <input
                    className={styles['input']}
                    placeholder="Введите количество игроков"
                    type="number"
                    min={1}
                    max={4}
                    onChange={countUpdate}
                ></input>
            </div>
        </>
    );
}

export default ScenarioList;
