// app/board/page.tsx
'use client';

import React from 'react';
import styles from './page.module.css';
import { Badge, BadgeVariant } from '@/components/ui/Badge/Badge';
import { getDashboardData } from '@/lib/data';

export default function QueueBoardPage() {
    const dashboardData = getDashboardData();
    const { metrics, congestionAnalysis, staffAllocation } = dashboardData;

    // Maps the text status from the mock JSON to the exact UI variant
    const getStatusBadgeVariant = (status: string): BadgeVariant => {
        switch (status.toLowerCase()) {
            case 'urgent': return 'urgent';
            case 'moderate': return 'moderate';
            case 'low wait': return 'lowWait';
            default: return 'neutral';
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.titleArea}>
                    <h1 className={styles.pageTitle}>Live Queue Management Dashboard</h1>
                    <p className={styles.pageSubtitle}>Real-time monitoring of service times and teller workloads</p>
                </div>
                <div className={styles.liveIndicator}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Mock Data • Live
                </div>
            </header>

            {/* Top Metrics Row */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <span className={styles.metricLabel}>Active Waiting</span>
                        <span className={styles.metricTrendWarning}>{metrics.activeWaiting.trend}</span>
                    </div>
                    <div className={styles.metricValue}>{metrics.activeWaiting.value} Customers</div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <span className={styles.metricLabel}>Avg Wait Time</span>
                        <span className={styles.metricTrendDown}>{metrics.avgWaitTime.trend}</span>
                    </div>
                    <div className={styles.metricValue}>{metrics.avgWaitTime.value}</div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <span className={styles.metricLabel}>Active Tellers</span>
                        <span className={styles.metricTrendNeutral}>{metrics.activeTellers.trend}</span>
                    </div>
                    <div className={styles.metricValue}>{metrics.activeTellers.value}</div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                        <span className={styles.metricLabel}>Completed Today</span>
                        <span className={styles.metricTrendUp}>{metrics.completedToday.trend}</span>
                    </div>
                    <div className={styles.metricValue}>{metrics.completedToday.value} Served</div>
                </div>
            </div>

            {/* Service Demand & Congestion Analysis */}
            <div>
                <h2 className={styles.sectionTitle}>Service Demand & Congestion Analysis</h2>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th className={styles.th}>Service Category</th>
                            <th className={styles.th}>Waiting Count</th>
                            <th className={styles.th}>Avg Wait Time</th>
                            <th className={styles.th}>Active Allocation</th>
                            <th className={styles.th}>Congestion Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {congestionAnalysis.map((item, index) => (
                            <tr key={index} className={styles.tr}>
                                <td className={`${styles.td} font-medium`}>{item.category}</td>
                                <td className={styles.td}>{item.waitingCount}</td>
                                <td className={styles.td}>{item.avgWaitTime}</td>
                                <td className={styles.td}>{item.activeAllocation}</td>
                                <td className={styles.td}>
                                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Staff & Teller Station Allocations */}
            <div>
                <h2 className={styles.sectionTitle}>Staff & Teller Station Allocations</h2>
                <div className={styles.staffGrid}>
                    {staffAllocation.map((staff, index) => (
                        <div key={index} className={styles.staffCard}>
                            <div className={styles.staffHeader}>
                                <div className={styles.staffAvatar}>
                                    {staff.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className={styles.staffInfo}>
                                    <span className={styles.staffName}>{staff.name}</span>
                                    <span className={styles.staffDesk}>{staff.desk}</span>
                                </div>
                            </div>
                            <div className={styles.staffStats}>
                                <span className="text-text-secondary">Tickets Served Today</span>
                                <span className="font-bold text-text-primary">{staff.ticketsServed}</span>
                            </div>
                            <div className={
                                     staff.statusCode === 'serving' ? styles.staffStatusServing :
                                         staff.statusCode === 'available' ? styles.staffStatusAvailable :
                                             styles.staffStatusBreak
                                 }>
                                {staff.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}