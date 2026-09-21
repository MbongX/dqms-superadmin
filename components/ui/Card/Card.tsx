import React, { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
    variant?: 'card' | 'dark';
    children: ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
                                              variant = 'card',
                                              children,
                                              className = ''
                                          }) => {
    return (
        <div className={`${styles[variant]} ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                      children,
                                                                                      className = ''
                                                                                  }) => <div className={`${styles.header} ${className}`}>{children}</div>;

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                    children,
                                                                                    className = ''
                                                                                }) => <div className={`${styles.body} ${className}`}>{children}</div>;