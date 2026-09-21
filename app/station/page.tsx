// app/station/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { Card, CardBody } from '@/components/ui/Card/Card';
import { getStationData } from '@/lib/data';
import { useTimer } from '@/hooks/useTimer';
import { useHotkey } from '@/hooks/useHotkey';

export default function StationPage() {
    const stationData = getStationData();
    const [activeTicket, setActiveTicket] = useState(stationData.currentlyServing);
    const [queue, setQueue] = useState(stationData.nextInLine);

    // Timer Hook
    const { formattedTime, reset } = useTimer(!!activeTicket, 322); // Starts at 05:22 for demo match

    // Hotkey Hook [Spacebar]
    useHotkey('Space', () => {
        handleCallNext();
    });

    const handleCallNext = () => {
        if (queue.length > 0) {
            const nextTicket = queue[0];
            setActiveTicket({
                ticketNumber: nextTicket.id,
                service: nextTicket.service,
                arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                waitDuration: nextTicket.waitTime,
            });
            setQueue(queue.slice(1));
            reset();
        }
    };

    const handleComplete = () => {
        // @ts-ignore
        setActiveTicket(null);
        reset();
    };

    return (
        <div className={styles.container}>
            {/* Top Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.deskSelector}>
                        Desk 04 — Fast Track Services
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <Badge variant="lowWait" showDot>Shift Active</Badge>
                </div>
                <div className={styles.operatorInfo}>
                    <span className="text-text-secondary">Operator:</span>
                    <span className={styles.operatorName}>Sarah Jenkins</span>
                </div>
            </header>

            <div className={styles.mainGrid}>
                {/* Active Ticket Area */}
                <div className={styles.activeArea}>

                    {/* Call Next Banner */}
                    <div className={styles.callNextContainer}>
                        <div className={styles.callNextStatus}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Ready to Call
                        </div>
                        <div className={styles.waitingBadge}>
                            {queue.length} Waiting
                        </div>
                        <Button size="lg" onClick={handleCallNext}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                            CALL NEXT CUSTOMER
                        </Button>
                        <span className={styles.shortcutText}>Press [Spacebar] as Hotkey Shortcut</span>
                    </div>

                    {/* Currently Serving Card */}
                    <Card>
                        <CardBody>
                            <div className={styles.servingHeader}>
                                <div>
                                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Currently Serving</h3>
                                    {activeTicket ? (
                                        <>
                                            <div className={styles.ticketNumber}>{activeTicket.ticketNumber}</div>
                                            <div className={styles.serviceTitle}>{activeTicket.service}</div>
                                            <div className={styles.arrivalInfo}>
                                                Arrival Time: {activeTicket.arrivalTime} (Wait: {activeTicket.waitDuration})
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-xl text-text-secondary py-4">No active ticket. Call the next customer.</div>
                                    )}
                                </div>

                                {activeTicket && (
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge variant="inService">In-Service</Badge>
                                        <div className={styles.timerContainer}>
                                            <div className={styles.timerLabel}>Service Time</div>
                                            <div className={styles.timerValue}>{formattedTime}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actionRow}>
                                <Button
                                    fullwidth
                                    className=""
                                    onClick={handleComplete}
                                    disabled={!activeTicket}
                                >
                                    Complete Service
                                </Button>
                                <Button
                                    variant="warning"
                                    fullwidth
                                    className=""
                                    disabled={!activeTicket}
                                >
                                    Transfer Ticket
                                </Button>
                                <Button
                                    variant="danger"
                                    fullwidth
                                    className=""
                                    disabled={!activeTicket}
                                >
                                    Mark No-Show
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Next in Line Sidebar */}
                <div>
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Next in Line</h3>
                    <div className={styles.queueList}>
                        {queue.map((ticket) => (
                            <div key={ticket.id} className={styles.queueItem}>
                                <div>
                                    <div className={styles.queueItemTitle}>{ticket.id}</div>
                                    <div className={styles.queueItemService}>{ticket.service}</div>
                                </div>
                                <div className={styles.queueItemWait}>{ticket.waitTime}</div>
                            </div>
                        ))}
                        {queue.length === 0 && (
                            <div className="text-center p-6 text-text-secondary border border-dashed border-surface-border rounded-lg">
                                Queue is empty
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}