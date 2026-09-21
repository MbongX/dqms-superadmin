import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
    | 'urgent'
    | 'moderate'
    | 'lowWait'
    | 'inService'
    | 'neutral'
    | 'darkSubtle';

interface BadgeProps {
    variant?: BadgeVariant;
    showDot?: boolean;
    children: ReactNode;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
                                                variant = 'neutral',
                                                showDot = false,
                                                children,
                                                className = ''
                                            }) => {
    const dotClasses: Record<BadgeVariant, string> = {
        urgent: styles.dotUrgent,
        moderate: styles.dotModerate,
        lowWait: styles.dotLowWait,
        inService: styles.dotInService,
        neutral: styles.dotNeutral,
        darkSubtle: styles.dotLowWait,
    };

    return (
        <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {showDot && <span className={`${styles.dot} ${dotClasses[variant]}`} />}
            {children}
    </span>
    );
};