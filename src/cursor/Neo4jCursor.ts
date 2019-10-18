import { Cursor } from '@/cursor/Cursor';
import { CursorSpecification } from '@/cursor/CursorSpecification';
import { Neo4jConnection } from '@/connection/Neo4jConnection';
import { QuerySpecification } from '@/query/QuerySpecification';

export class Neo4jCursor<T> extends Cursor<T> {
    private page: number;

    public constructor(sessionId: string, spec: CursorSpecification<T>, private readonly connection: Neo4jConnection) {
        super(sessionId, spec);
        this.page = 0;
    }

    public async read(count: number): Promise<T[]> {
        const results = await this.connection.query(
            new QuerySpecification<T>()
                .withStatement(`${this.spec.statement} SKIP ${count * this.page} LIMIT ${count}`)
                .bind(this.spec.parameters)
                .transform(this.spec.transformType!)
                .map(this.spec.mapper!)
        );
        this.page++;
        return results;
    }

    public async close(): Promise<void> {
        return Promise.resolve();
    }
}
