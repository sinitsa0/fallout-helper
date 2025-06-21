import styles from './Cards.module.scss';
import CardContent from '../../components/CardContent/CardContent';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import ActiveCard from './ActiveCard/ActiveCard';
import { falloutActions } from '../../store/cart.slice';
import Button from '../../components/Button/Button';
import ExitCard from './ExitCard/ExitCard';

function Cards() {
    const [activeCard, setActiveCard] = useState<number>(0); // карта в центре экрана
    const state = useSelector((s: RootState) => s.fallout);
    const [quests, setQuests] = useState<number[]>(state.quests); // квесты на столе, слева от вертикальной линии
    const [icon, setIcon] = useState<'' | 'trash' | 'back'>('');
    const [historyList, setHistoryList] = useState<string[]>([]); // действия, которые были сделаны на открытой карте activeCard
    const [historyId, setHistoryId] = useState<number>(0); // Id текущей активной карты, которую можно открыть повторно, если случайно закрыли
    const [autoReset, setAutoReset] = useState<'' | 'city' | 'barren' | '109' | '44' | '84' | '7'>(''); // автосброс при закрытии формы с активной картой (+ квесты на столе сбросить нельзя)
    const [exit, setExit] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispath>();
    console.log(state);

    useEffect(() => {
        // отключение кнопки Назад
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function () {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, []);

    useEffect(() => {
        setQuests(state.quests);
    }, [state.quests]);

    useEffect(() => {
        if (activeCard > 0) setHistoryId(activeCard);
    }, [activeCard]);

    const changeActiveCard = (e: MouseEvent) => {
        setActiveCard(Number(e.target.id));
    };

    const backQuests = () => {
        if (icon.length > 0) {
            setQuests(state.quests);
            setIcon('');
        }
    };

    const pop = (e: MouseEvent) => {
        setHistoryList([]);
        setHistoryId(0);
        switch (e.target.id) {
            case '1': {
                setAutoReset('city');
                setActiveCard(state.city[state.city.length - 1]);
                backQuests();

                break;
            }
            case '2': {
                setAutoReset('barren');
                setActiveCard(state.barren[state.barren.length - 1]);
                backQuests();
                break;
            }
            case '3': {
                setAutoReset('7');
                setActiveCard(state.shelter7[state.shelter7.length - 1]);
                backQuests();
                break;
            }
            case '4': {
                setAutoReset('44');
                setActiveCard(state.shelter44[state.shelter44.length - 1]);
                backQuests();
                break;
            }
            case '5': {
                setAutoReset('84');
                setActiveCard(state.shelter84[state.shelter84.length - 1]);
                break;
            }
            case '6': {
                setAutoReset('109');
                setActiveCard(state.shelter109[state.shelter109.length - 1]);
                backQuests();
                break;
            }
            case '7': {
                // star
                // здесь нет автосброса. Если случайно закрыть, то отобразится в истории.
                setActiveCard(state.star[state.star.length - 1]);
                backQuests();
                break;
            }
            case '8': {
                // shield
                setActiveCard(state.shield[state.shield.length - 1]);
                backQuests();
                break;
            }
            case '9': {
                // корзина
                setQuests(state.trash);
                setIcon('trash');
                break;
            }
            default: {
                //e.target.id.len;
                if (e.target.id === historyId.toString()) setActiveCard(historyId);
            }
        }
    };

    const reset = (e: MouseEvent) => {
        // если нажали на колоду сброса
        e.stopPropagation();
        setIcon('back');
        switch (e.target.id) {
            case '1': {
                setQuests(state.city_r);
                break;
            }
            case '2': {
                setQuests(state.barren_r);
                break;
            }
            case '3': {
                setQuests(state.shelter7_r);
                break;
            }
            case '4': {
                setQuests(state.shelter44_r);
                break;
            }
            case '5': {
                setQuests(state.shelter84_r);
                break;
            }
            case '6': {
                setQuests(state.shelter109_r);
                break;
            }
            default: {
                setIcon('');
            }
        }
    };

    const iconClick = (e: MouseEvent) => {
        e.stopPropagation();
        switch (e.target.id) {
            case '900':
            case '901': {
                setQuests(state.quests);
                setIcon('');
                break;
            }
            default: {
                if (e.target.id === historyId.toString()) setActiveCard(historyId);
                backQuests();
            }
        }
    };

    const auto_Reset = () => {
        if (autoReset === '') return;
        dispatch(falloutActions.actions_for_Cards({ id: [historyId], action: 'reset', pack: autoReset }));
        setAutoReset('');
    };

    return (
        <div className={styles['cards']}>
            <div>
                <div className={styles['card-list']} onClick={changeActiveCard}>
                    {quests.map((c) => (
                        <CardContent key={c} id={c} folder="quests" />
                    ))}
                </div>
            </div>
            <div className={styles['line']} />
            <div className={styles['shirtList']} onClick={pop}>
                <div className={styles['icon']} onClick={iconClick}>
                    {historyId > 0 && <CardContent key={12} id={historyId} size="mini" folder="quests" />}
                    {icon === 'back' && <CardContent key={10} id={900} size="mini" folder="icons" />}
                    {icon === 'trash' && <CardContent key={11} id={901} size="mini" folder="icons" />}
                </div>
                <CardContent key={1} id={1} size="small" folder="shirts" />
                <CardContent key={2} id={2} size="small" folder="shirts" />
                {(state.shelter7.length > 0 || state.shelter7_r.length > 0) && <CardContent key={3} id={3} size="small" folder="shirts" />}
                {(state.shelter44.length > 0 || state.shelter44_r.length > 0) && (
                    <CardContent key={4} id={4} size="small" folder="shirts" />
                )}
                {(state.shelter84.length > 0 || state.shelter84_r.length > 0) && (
                    <CardContent key={5} id={5} size="small" folder="shirts" />
                )}
                {(state.shelter109.length > 0 || state.shelter109_r.length > 0) && (
                    <CardContent key={6} id={6} size="small" folder="shirts" />
                )}
                {state.star.length > 0 && <CardContent key={7} id={7} size="small" folder="shirts" />}
                {state.shield.length > 0 && <CardContent key={8} id={8} size="small" folder="shirts" />}
                {state.trash.length > 0 && <CardContent key={9} id={9} size="small" folder="shirts" />}
                {(state.city_r.length > 0 ||
                    state.barren_r.length > 0 ||
                    state.shelter7_r.length > 0 ||
                    state.shelter44_r.length > 0 ||
                    state.shelter84_r.length > 0 ||
                    state.shelter109_r.length > 0) && <div className={styles['textReset']}>Сброс:</div>}
                <div className={styles['shirtsReset']} onClick={reset}>
                    {state.city_r.length > 0 && <CardContent key={20} id={1} size="mini" folder="shirts" />}
                    {state.barren_r.length > 0 && <CardContent key={21} id={2} size="mini" folder="shirts" />}
                    {state.shelter7_r.length > 0 && <CardContent key={22} id={3} size="mini" folder="shirts" />}
                    {state.shelter44_r.length > 0 && <CardContent key={23} id={4} size="mini" folder="shirts" />}
                    {state.shelter84_r.length > 0 && <CardContent key={24} id={5} size="mini" folder="shirts" />}
                    {state.shelter109_r.length > 0 && <CardContent key={25} id={6} size="mini" folder="shirts" />}
                </div>
                <Button className={styles['btn-norm']} onClick={() => setExit(true)}>
                    Выход
                </Button>
            </div>
            {activeCard > 0 && (
                <ActiveCard
                    closeCard={setActiveCard}
                    card={{ id: activeCard, size: 'big', folder: 'quests' }}
                    setHistoryList={(list) => setHistoryList(list)}
                    historyList={activeCard === historyId ? historyList : []}
                    auto_Reset={auto_Reset}
                    autoReset={!!autoReset}
                    setAutoReset={(val) => setAutoReset(val)}
                />
            )}
            {exit == true && <ExitCard setExit={setExit} />}
        </div>
    );
}

export default Cards;
