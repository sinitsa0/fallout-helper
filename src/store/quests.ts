const city = [
    5, 7, 8, 9, 10, 11, 13, 26, 31, 38, 103, 129, 154, 160, 161, 163, 164, 165, 228, 229, 241, 243, 244, 508, 509, 510, 511, 512, 513, 514,
    515, 528, 529, 530, 531, 532, 533, 534, 535, 2411, 2412, 2431, 2432, 2441, 2442, 2443
];
const barren = [
    1, 2, 3, 4, 6, 12, 17, 22, 27, 46, 47, 53, 63, 100, 105, 106, 110, 122, 123, 124, 127, 135, 140, 144, 145, 156, 162, 168, 171, 191, 215,
    216, 222, 224, 227, 231, 235, 239, 240, 242, 500, 501, 502, 503, 504, 505, 506, 507, 520, 521, 522, 523, 524, 525, 526, 527, 2401, 2402,
    2403, 2404
];
const star = [173, 174, 175, 238];
const shield = [177, 178, 179, 181, 182];
const shelter7 = [194, 195, 196, 197, 198, 199, 200, 201, 202];
const shelter44 = [204, 205, 206, 207, 208, 209, 210, 211, 212, 213];
const shelter84 = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];
const shelter109 = [86, 87, 88, 89, 90, 91, 92, 93];

export const findBlockCard = (id: number): string => {
    return city.find((item) => item === id)
        ? 'city'
        : barren.find((item) => item === id)
        ? 'barren'
        : shelter109.find((item) => item === id)
        ? '109'
        : shelter84.find((item) => item === id)
        ? '84'
        : shelter44.find((item) => item === id)
        ? '44'
        : shelter7.find((item) => item === id)
        ? '7'
        : star.find((item) => item === id)
        ? 'star'
        : shield.find((item) => item === id)
        ? 'shield'
        : '';
};

// import { ICard } from './interface.card';

// // квесты
// export const allCardList: ICard[] = [
//     {
//         firstInScenario: 0,
//         variant: [
//             {
//                 success: {
//                     nextQuest: [],
//                     meet: [],
//                     basket: false,
//                     addSelf: false
//                 }
//             }
//         ]
//     }, // это шаблон
//     {
//         firstInScenario: 1,
//         variant: [
//             {
//                 success: {
//                     nextQuest: [],
//                     meet: [],
//                     basket: false,
//                     addSelf: false
//                 }
//             }
//         ]
//     }
// ];

// далее список всех колод с картами встречь
