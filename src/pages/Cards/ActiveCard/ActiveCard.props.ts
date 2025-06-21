import { ICardContentProps } from '../../../components/CardContent/CardContent.props';

export interface IActiveCardProps {
    card: ICardContentProps;
    closeCard(a: number): void;
    setHistoryList(history: string[]): void;
    historyList: string[];
    auto_Reset(): void;
    autoReset: boolean;
    setAutoReset(val: '' | 'city' | 'barren' | '109' | '44' | '84' | '7'): void;
}
