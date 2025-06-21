import { IButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

function Button({ children, className, ...props }: IButtonProps) {
    return (
        <button className={cn(styles['btn'], className)} {...props}>
            {children}
        </button>
    );
}

export default Button;
