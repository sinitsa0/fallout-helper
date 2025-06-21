export interface IResult {
    nextQuest?: number[]; // следующие квесты
    meet?: number[]; // добавить встречи
    basket: boolean; // в мусорку - if ( nextQuest.length === 0) - нет, могут встретиться те, которые остаются в игре
    addSelf: boolean; // добавить эту же карту во встречи
}

export interface IVariant {
    success: IResult; // успех
    fail?: IResult; // провал
}

export interface ICard {
    // как тот, что обычно лежит на столе, так и встречи
    firstInScenario: number; // если 0, то не первая
    variant: IVariant[];
}
