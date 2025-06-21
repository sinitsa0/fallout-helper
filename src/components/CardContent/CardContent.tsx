import cn from 'classnames';
import { ICardContentProps } from './CardContent.props';
import styles from './CardContent.module.scss';

function CardContent(props: ICardContentProps) {
    return (
        <img
            className={cn(styles['image'], {
                [styles['big']]: props.size === 'big',
                [styles['small']]: props.size === 'small',
                [styles['mini']]: props.size === 'mini'
            })}
            src={`/${props.folder}/${props.id}.gif`}
            alt={'Карта с квестом № ' + props.id}
            id={props.id.toString()}
        />
    );
}

export default CardContent;
