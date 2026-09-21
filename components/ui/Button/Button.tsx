import React, {ButtonHTMLAttributes, ReactNode} from "react";
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'warning' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullwidth?: boolean;
    children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size= 'md',
    fullwidth = false,
    children,
    className = '',
    ...props
}) => {
    const combinedClasses = [
        styles.base,
        styles[variant],
        styles[size],
        fullwidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}