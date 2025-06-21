import { MouseEvent, useEffect, useState } from 'react';
import CardContent from '../../../components/CardContent/CardContent';
import styles from './ActiveCard.module.scss';
import { IActiveCardProps } from './ActiveCard.props';
import Button from '../../../components/Button/Button';
import cn from 'classnames';
import Action from '../../../components/Action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../../store/store';
import { falloutActions } from '../../../store/cart.slice';

function ActiveCard(props: IActiveCardProps) {
    const [numInput, setNumInput] = useState<string>('');
    const [actionList, setActionList] = useState<string[]>(props.historyList);
    const [activeAction, setActiveAction] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispath>();
    const state = useSelector((s: RootState) => s.fallout);
    //console.log(state.city);
    const updateList = (id: string, action: string) => {
        setActionList((prev) => [...prev, (id.length === 1 ? '00' + id : id.length === 2 ? '0' + id : id) + ' - ' + action]);
        setNumInput('');
    };

    useEffect(() => {
        props.setHistoryList(actionList);
    }, [actionList]);

    const rombAdd = (id: string, max: number) => {
        dispatch(
            falloutActions.actions_for_Cards({
                id: [Number(id + (Math.floor(Math.random() * (max - 1 + 1)) + 1))],
                action: 'add'
            })
        );
    };
    const rombPlay = (id: string, max: number) => {
        dispatch(falloutActions.add_Quest(Number(id + (Math.floor(Math.random() * (max - 1 + 1)) + 1))));
    };
    const getRandomElem = (arr: number[], count: number): number[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const click = (e: MouseEvent) => {
        // добавить кнопку Разыграть (пример этап 184)

        switch (e.target.id) {
            case '01':
            case '02':
            case '03':
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':
            case '00': {
                if (numInput.length === 0 && e.target.id[1] === '0') break;
                if (numInput.length < 3) setNumInput((prev) => prev + e.target.id[1]);
                break;
            }
            case 'x': {
                setNumInput('');
                break;
            }
            case 'del': {
                setNumInput((prev) => prev.slice(0, -1));
                break;
            }
            case 'add': {
                if (numInput.length === 0) break;
                switch (numInput) {
                    case '240': {
                        rombAdd(numInput, 4);
                        break;
                    }
                    case '241':
                    case '243': {
                        rombAdd(numInput, 2);
                        break;
                    }
                    case '244': {
                        rombAdd(numInput, 3);
                        break;
                    }
                    default: {
                        dispatch(falloutActions.actions_for_Cards({ id: [Number(numInput)], action: 'add' }));
                    }
                }
                updateList(numInput, 'добавлена');
                if (numInput === props.card.id.toString()) props.setAutoReset('');
                break;
            }
            case 'next': {
                if (numInput.length === 0) break;
                dispatch(falloutActions.add_Quest(Number(numInput)));
                updateList(numInput, 'этап');
                if (numInput === props.card.id.toString()) props.setAutoReset('');

                break;
            }
            case 'trash': {
                // корзина

                dispatch(falloutActions.del_Quest(props.card.id));
                updateList(props.card.id.toString(), 'корзина');
                props.setAutoReset('');

                break;
            }
            case 'addSelf': {
                dispatch(falloutActions.actions_for_Cards({ id: [props.card.id], action: 'add' }));
                updateList(props.card.id.toString(), 'добавлена');
                props.setAutoReset('');
                break;
            }
            case 'play': {
                switch (numInput) {
                    case '240': {
                        rombPlay(numInput, 4);
                        break;
                    }
                    case '241':
                    case '243': {
                        rombPlay(numInput, 2);
                        break;
                    }
                    case '244': {
                        rombPlay(numInput, 3);
                        break;
                    }
                    default: {
                        return;
                    }
                }
                updateList(numInput, 'на столе');
                if (numInput === props.card.id.toString()) props.setAutoReset('');
                break;
            }
            case '070':
            case '071': {
                const arr = getRandomElem([72, 73, 74, 75, 76, 77, 78, 79], state.countPlayer);
                dispatch(falloutActions.actions_for_Cards({ id: arr, action: 'add', pack: '84' }));
                updateList(e.target.id, 'готово');
                break;
            }
            case '089': {
                dispatch(falloutActions.del_Quest(86));
                dispatch(falloutActions.del_Quest(88));
                dispatch(falloutActions.del_Quest(90));
                dispatch(falloutActions.del_Quest(92));
                updateList('089', 'готово');
                break;
            }
            case '193': {
                dispatch(falloutActions.actions_for_Cards({ id: [194, 195, 196, 197, 198, 199], action: 'add', pack: '7' }));
                updateList('193', 'готово');
                break;
            }
            case '204': {
                dispatch(falloutActions.actions_for_Cards({ id: [205, 206, 207, 208, 209], action: 'add', pack: '44' }));
                updateList('204', 'готово');
                break;
            }
            case '2412': {
                const arr = getRandomElem([86, 87, 88, 89, 90, 91, 92, 93], state.countPlayer);
                dispatch(falloutActions.actions_for_Cards({ id: arr, action: 'add', pack: '109' }));
                updateList('241', 'готово');
                break;
            }
            case 'history': {
                setActiveAction(null);
                break;
            }
            case 'cancel': {
                // разработка отложена, т.к. не является обязательной
                const actionCancel = actionList[activeAction!];

                switch (actionCancel[6]) {
                    case 'д': {
                        //добавлена
                        // убрать из колоды и добавить вверх
                        break;
                    }
                    case 'к': {
                        //корзина
                        // убрать из корзины и если это квест - на стол, иначе добавить вверх
                        break;
                    }
                    case 'с': {
                        //сброс
                        // убрать из сброса и добавить вверх
                        break;
                    }
                    //case 'этап': { // это действие не нужно, т.к. если убрать со стола, карта может потеряться. Плюс со стола и без этого легко ее убрать в нужную колоду. Разыграна (на столе) тоже не отменяется.
                    //  break;
                    //}
                }

                break;
            }
            default: {
                if (e.target.id === props.card.id.toString() || e.target.id.length === 0) break;
                if (e.target.id[0] === 'h') {
                    setActiveAction(Number(e.target.id.slice(1)));
                    break;
                }
            }
        }
    };

    const close = () => {
        if (props.autoReset) {
            props.auto_Reset();
            const id = props.card.id.toString();
            props.setHistoryList([...actionList, (id.length === 1 ? '00' + id : id.length === 2 ? '0' + id : id) + ' - ' + 'сброс']); // не использую updateList т.к. реакт не обновляет список перед закрытием этой компоненты
        }
        props.closeCard(0);
    };

    return (
        <div className={styles['form']} onClick={() => close()}>
            <div
                className={styles['content']}
                onClick={(e) => {
                    e.stopPropagation();
                    click(e);
                }}
            >
                <div className={styles['actions']}>
                    <div
                        className={cn(styles['history'], {
                            [styles['history-big']]: ![70, 71, 89, 193, 204, 2412].includes(props.card.id)
                        })}
                        id="history"
                    >
                        {actionList.map((item, i) => (
                            <Action key={i} id={`h${i}`} active={activeAction === i ? true : false}>
                                {item}
                            </Action>
                        ))}
                    </div>
                    <Button className={styles['btn-inactive']}>Отмена</Button>
                    {[70, 71, 89, 204, 193, 2412].includes(props.card.id) && <hr className={styles['line']} />}
                    {props.card.id === 70 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="070">
                            № 070
                            <br />
                            Убежище 84
                            <br />
                            Замешать
                        </Button>
                    )}
                    {props.card.id === 71 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="071">
                            № 071
                            <br />
                            Убежище 84
                            <br />
                            Замешать
                        </Button>
                    )}
                    {props.card.id === 89 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="089">
                            № 089
                            <br />
                            Убеж. 109
                            <br />
                            Отправить
                        </Button>
                    )}
                    {props.card.id === 193 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="193">
                            № 193
                            <br />
                            Убежище 7
                            <br />
                            Добавить
                        </Button>
                    )}
                    {props.card.id === 204 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="204">
                            № 204
                            <br />
                            Убежище 44
                            <br />
                            Добавить
                        </Button>
                    )}
                    {props.card.id === 2412 && (
                        <Button className={cn(styles['btn-norm'], styles['btn-norm-min'])} id="2412">
                            № 241
                            <br />
                            Убеж. 109
                            <br />
                            Добавить
                        </Button>
                    )}
                </div>
                <CardContent id={props.card.id} size="big" folder="quests" />
                <div className={styles['actions']}>
                    <div className={styles['numInput']}>{numInput}</div>
                    <div className={styles['num']}>
                        <div className={styles['num-row']}>
                            <Button className={styles['num-btn']} id="01">
                                1
                            </Button>
                            <Button className={styles['num-btn']} id="02">
                                2
                            </Button>
                            <Button className={styles['num-btn']} id="03">
                                3
                            </Button>
                        </div>
                        <div className={styles['num-row']}>
                            <Button className={styles['num-btn']} id="04">
                                4
                            </Button>
                            <Button className={styles['num-btn']} id="05">
                                5
                            </Button>
                            <Button className={styles['num-btn']} id="06">
                                6
                            </Button>
                        </div>
                        <div className={styles['num-row']}>
                            <Button className={styles['num-btn']} id="07">
                                7
                            </Button>
                            <Button className={styles['num-btn']} id="08">
                                8
                            </Button>
                            <Button className={styles['num-btn']} id="09">
                                9
                            </Button>
                        </div>
                        <div className={styles['num-row']}>
                            <Button className={styles['num-btn']} id="x">
                                x
                            </Button>
                            <Button className={styles['num-btn']} id="00">
                                0
                            </Button>
                            <Button className={styles['num-btn']} id="del">
                                &lt;
                            </Button>
                        </div>
                    </div>
                    <Button
                        className={cn(styles['btn-norm'], { [styles['btn-inactive']]: ['240', '241', '243', '244'].includes(numInput) })}
                        id="add"
                    >
                        Добавить
                    </Button>
                    <Button
                        className={cn(styles['btn-norm'], { [styles['btn-inactive']]: ['240', '241', '243', '244'].includes(numInput) })}
                        id="next"
                    >
                        + след. Этап
                    </Button>
                    <Button
                        className={cn(styles['btn-norm'], { [styles['btn-inactive']]: !['240', '241', '243', '244'].includes(numInput) })}
                        id="play"
                    >
                        Разыграть
                    </Button>
                    <hr className={styles['line']} />
                    <Button className={styles['btn-norm']} id="trash">
                        Корзина
                    </Button>

                    <Button className={styles['btn-norm']} id="addSelf">
                        Добавить
                        <br />
                        карту {props.card.id}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ActiveCard;
