import styles from './Action.module.scss';
import cn from 'classnames';

function Action({ children = '', active = false, ...props }) {
    return (
        <div
            className={cn(styles['action'], {
                [styles['action-active']]: active
            })}
            {...props}
        >
            {children}
        </div>
    );
}

export default Action;
