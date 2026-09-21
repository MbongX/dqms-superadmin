import { getKnowledgeData } from '@/lib/data';
import { Badge } from '@/components/ui/Badge/Badge';
import { Card, CardBody } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export default function KnowledgeBasePage() {
    const { documents, mockRagResponse } = getKnowledgeData();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Knowledge Base</h1>
                    <p className={styles.subtitle}>
                        Manage grounded documents used by the queue assistant.
                    </p>
                </div>
                <Badge variant="lowWait" showDot>Knowledge Grounded</Badge>
            </header>

            <section>
                <h2 className={styles.sectionTitle}>Indexed Documents</h2>
                <div className={styles.documentGrid}>
                    {documents.map((document) => (
                        <Card key={document.id}>
                            <CardBody>
                                <div className={styles.documentHeader}>
                                    <div>
                                        <h3 className={styles.documentName}>{document.name}</h3>
                                        <p className={styles.documentMeta}>
                                            {document.version} · {document.pages} pages · {document.chunks} chunks
                                        </p>
                                    </div>
                                    <Badge variant="lowWait">{document.status}</Badge>
                                </div>
                                <p className={styles.uploadDate}>Uploaded {document.uploadDate}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Latest Retrieval</h2>
                <Card variant="dark">
                    <CardBody>
                        <div className={styles.retrievalHeader}>
                            <span className={styles.retrievalLabel}>Source document</span>
                            <Badge variant="darkSubtle">Match score {mockRagResponse.score}</Badge>
                        </div>
                        <h3 className={styles.sourceName}>{mockRagResponse.source}</h3>
                        <p className={styles.retrievalContent}>{mockRagResponse.content}</p>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
}
