import db from '../data/db.json';

// declaring the types to ensure that the components consume the data predictably

export type Ticket = typeof db.station.nextInLine[0];
export type CongestionData = typeof db.dashboard.congestionAnalysis[0];
export type StaffAllocation = typeof db.dashboard.staffAllocation[0];

// New Knowledge Base types {for refence}
export type DocumentSource = typeof db.knowledge.documents[0];
export type RagResponse = typeof db.knowledge.mockRagResponse;

export const getStationData = () => db.station;
export const getDashboardData = () => db.dashboard;
export const getKnowledgeData = () => db.knowledge;