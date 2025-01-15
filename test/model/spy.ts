import { QueryService } from '@core/services/query/query.service';

type Stubs<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R
        ? Awaited<R>
        : never;
};

type Calls<T> = {
    [K in keyof T]: {
        count: number;
        history: unknown[];
    };
};

type Throws<T> = Array<keyof T>;

const queryServiceStubs: Stubs<QueryService> = {
    buildQueryFrom: 'test',
};

export class Spy<T, K extends keyof T = keyof T> {
    private stubs = {} as Stubs<T>;
    private throwingMethods: Throws<T> = [];

    protected calls = {} as Calls<T>;

    protected increment(method: K, history: unknown): void {
        if (!this.calls[method]) {
            this.calls[method] = {
                count: 0,
                history: [],
            };
        }
        this.calls[method].count++;
        this.calls[method].history.push(history);
    }

    makeThrow(method: K): void {
        this.throwingMethods.push(method);
    }

    stub(method: K, value: Stubs<T>[K]): void {
        this.stubs[method] = value;
    }

    protected getStubOrDefault(method: K, value: Stubs<T>[K]): Stubs<T>[K] {
        if (this.throws(method)) throw new Error();

        const stub = this.stubs[method];
        return typeof stub === 'boolean'
            ? (stub as Stubs<T>[K])
            : stub || value;
    }

    private throws(method: K): boolean {
        return this.throwingMethods.some(
            (throwingMethod) => throwingMethod === method,
        );
    }
}
