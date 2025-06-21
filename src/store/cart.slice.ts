import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { findBlockCard } from './quests';

export const FALLOUT_STATE = 'fallout-data';

export interface IFalloutState {
    scenario: number;
    quests: number[]; //ICard[];
    city: number[];
    city_r: number[]; // reset - сброс
    barren: number[]; // встречи в пустоше
    barren_r: number[];
    shelter7: number[];
    shelter7_r: number[];
    shelter44: number[];
    shelter44_r: number[];
    shelter84: number[];
    shelter84_r: number[];
    shelter109: number[];
    shelter109_r: number[];
    star: number[];
    shield: number[];
    trash: number[];
    countPlayer: number;
}

export interface IFirstParams {
    scenario: number;
    countPlayer: string;
}

export interface IActionsForCards {
    id: number[];
    action: 'add' | 'reset' | 'addUp'; //'pop' | 'shuffle';
    pack?: 'city' | 'barren' | '109' | '44' | '84' | '7' | 'star' | 'shield';
}

const initialState: IFalloutState = loadState<IFalloutState>(FALLOUT_STATE) ?? {
    scenario: 0,
    quests: [],
    city: [],
    city_r: [],
    barren: [],
    barren_r: [],
    shelter7: [],
    shelter7_r: [],
    shelter44: [],
    shelter44_r: [],
    shelter84: [],
    shelter84_r: [],
    shelter109: [],
    shelter109_r: [],
    star: [],
    shield: [],
    trash: [],
    countPlayer: 0
};

// Тасование Фишера-Йетса
function shuffle(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function add(cards: number[], reset: number[], ids: number[], countPlayers: number): [number[], number[]] {
    //const arr = ids;
    if (cards.length < countPlayers && reset.length > 0) {
        cards = shuffle([...reset, ...cards]);
        reset = [];
    }
    if (cards.length < countPlayers) countPlayers = cards.length;

    if (cards.length > 0) {
        for (let i = 0; i < countPlayers; i++) {
            ids.push(cards.pop()!);
        }
    }
    cards = [...cards, ...shuffle(ids)];
    return [cards, reset];
}

function setBlocksCard(state, cardId: number, pack: string): [number[], number[]] {
    let block: number[] = [];
    let block_r: number[] = [];
    const cardType = pack === '' ? findBlockCard(cardId) : pack;
    switch (cardType) {
        case 'city': {
            block = state.city;
            block_r = state.city_r;
            break;
        }
        case 'barren': {
            block = state.barren;
            block_r = state.barren_r;
            break;
        }
        case '109': {
            block = state.shelter109;
            block_r = state.shelter109_r;
            break;
        }
        case '84': {
            block = state.shelter84;
            block_r = state.shelter84_r;
            break;
        }
        case '44': {
            block = state.shelter44;
            block_r = state.shelter44_r;
            break;
        }
        case '7': {
            block = state.shelter7;
            block_r = state.shelter7_r;
            break;
        }
        case 'star': {
            block = state.star;
            break;
        }
        case 'shield': {
            block = state.shield;
            break;
        }
        default:
            return [[], []];
    }
    return [block, block_r];
}

function delFromBlocksCard(block: number[], block_r: number[], cardId: number) {
    let index = block.findIndex((item: number) => item === cardId);
    if (index !== -1) block.splice(index, 1);

    index = block_r.findIndex((item: number) => item === cardId);
    if (index !== -1) block_r.splice(index, 1);
}

export const falloutSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add_FirstQuest: (state, action: PayloadAction<IFirstParams>) => {
            state.city = [508, 509, 510, 511, 512, 513, 514, 515];
            state.city_r = []; // обнуляем вместо метода clean
            state.barren = [500, 501, 502, 503, 504, 505, 506, 507];
            state.barren_r = [];
            state.shelter7 = [];
            state.shelter7_r = [];
            state.shelter44 = [];
            state.shelter44_r = [];
            state.shelter84 = [];
            state.shelter84_r = [];
            state.shelter109 = [];
            state.shelter109_r = [];
            state.star = [];
            state.shield = [];
            state.trash = [];
            state.countPlayer = action.payload.countPlayer.length === 0 ? 1 : Number(action.payload.countPlayer);

            switch (action.payload.scenario) {
                case 1: {
                    // Столичная пустошь
                    state.scenario = 1;
                    state.quests = [44];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    break;
                }
                case 2: {
                    // Содружество
                    state.scenario = 2;
                    state.quests = [14];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    break;
                }
                case 3: {
                    // Фар-хфрбор
                    state.scenario = 3;
                    state.quests = [29, 30];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    state.city = add(state.city, state.city_r, [31], state.countPlayer)[0];
                    break;
                }
                case 4: {
                    // Питт
                    state.scenario = 4;
                    state.quests = [56];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    break;
                }
                case 5: {
                    // Триумф мастера
                    state.scenario = 5;
                    state.quests = [166];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    // добавляем карты с ромбом 240 и 241
                    state.city = add(
                        state.city,
                        state.city_r,
                        [Number('241' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))], // записано по формуле, чтобы не запутаться -> (rand * (max - min + 1)) + min
                        state.countPlayer
                    )[0];
                    state.barren = add(
                        state.city,
                        state.city_r,
                        [Number('240' + (Math.floor(Math.random() * (4 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    break;
                }
                case 6: {
                    // Новая Калифорния
                    state.scenario = 6;
                    state.quests = [184];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    // добавляем карты с ромбом 240 и 241
                    state.city = add(
                        state.city,
                        state.city_r,
                        [Number('241' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    state.barren = add(
                        state.city,
                        state.city_r,
                        [Number('240' + (Math.floor(Math.random() * (4 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    break;
                }
                case 7: {
                    // Столичная пустошь доп
                    state.scenario = 7;
                    state.quests = [44];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    state.city = add(
                        // добавляем карты с ромбом 243 и 244
                        add(
                            state.city,
                            state.city_r,
                            [Number('243' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))],
                            state.countPlayer
                        )[0],
                        state.city_r,
                        [Number('244' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    break;
                }
                case 8: {
                    // Содружество доп
                    state.scenario = 8;
                    state.quests = [14];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    state.city = add(
                        // добавляем карты с ромбом 243 и 244
                        add(
                            state.city,
                            state.city_r,
                            [Number('243' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))],
                            state.countPlayer
                        )[0],
                        state.city_r,
                        [Number('244' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    break;
                }
                case 9: {
                    // Фар-хфрбор доп
                    state.scenario = 9;
                    state.quests = [29, 30];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    state.city = add(
                        add(
                            // добавляем карты с ромбом 243 и 244
                            add(
                                state.city,
                                state.city_r,
                                [Number('243' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))],
                                state.countPlayer
                            )[0],
                            state.city_r,
                            [Number('244' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1))],
                            state.countPlayer
                        )[0],
                        state.city_r,
                        [31],
                        state.countPlayer
                    )[0];
                    break;
                }
                case 10: {
                    // Питт доп
                    state.scenario = 10;
                    state.quests = [56];
                    state.barren = [...state.barren, 520, 521, 522, 523, 524, 525, 526, 527];
                    state.city = [...state.city, 528, 529, 530, 531, 532, 533, 534, 535];
                    state.city = shuffle(state.city);
                    state.barren = shuffle(state.barren);
                    state.city = add(
                        // добавляем карты с ромбом 243 и 244
                        add(
                            state.city,
                            state.city_r,
                            [Number('243' + (Math.floor(Math.random() * (2 - 1 + 1)) + 1))],
                            state.countPlayer
                        )[0],
                        state.city_r,
                        [Number('244' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1))],
                        state.countPlayer
                    )[0];
                    break;
                }
            }
        },
        actions_for_Cards: (state, action: PayloadAction<IActionsForCards>) => {
            const [block, block_r] = setBlocksCard(
                state,
                action.payload.id[0],
                action.payload.action === 'reset' ? action.payload.pack! : action.payload.id.length > 1 ? action.payload.pack! : ''
            );

            if (action.payload.action === 'add') {
                if (action.payload.id.length === 1) {
                    // удаление из всех колод
                    delFromBlocksCard(block, block_r, action.payload.id[0]);
                    state.trash = state.trash.filter((v) => v !== action.payload.id[0]);
                }

                const arr = add(block, block_r, action.payload.id, state.countPlayer);
                block.splice(0, block.length, ...arr[0]);
                if (arr[1]?.length > 0 && block_r.length > 0) {
                    block_r.splice(0, block_r.length, ...arr[1]);
                }
            } else if (action.payload.action === 'reset') {
                block.pop();
                if (block_r.findIndex((item) => item === action.payload.id[0]) === -1) {
                    block_r.push(action.payload.id[0]);
                }
                if (block.length === 0) {
                    block.splice(0, 0, ...shuffle(block_r));
                    block_r.splice(0);
                }
            } else {
                // addUp - добавить вверх для действий отмены. Разработка отложена, т.к. не обязательна
            }
        },

        add_Quest: (state, action: PayloadAction<number>) => {
            if (state.quests.findIndex((item) => item === action.payload) === -1) state.quests.push(action.payload);
        },
        del_Quest: (state, action: PayloadAction<number>) => {
            // кнопка Корзина
            state.quests = state.quests.filter((v) => v !== action.payload);
            if (state.trash.findIndex((item) => item === action.payload) === -1) state.trash.unshift(action.payload); // в начало - для быстрого просмотра
            const [block, block_r] = setBlocksCard(state, action.payload, '');
            if (block.length === 0) return;
            delFromBlocksCard(block, block_r, action.payload);
            if (block.length === 0) {
                block.splice(0, 0, ...shuffle(block_r));
                block_r.splice(0);
            }
        }
    }
});

export default falloutSlice.reducer;
export const falloutActions = falloutSlice.actions;
