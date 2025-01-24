type Stubs<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R
        ? Awaited<R>
        : never;
};

type Calls<T> = {
    [K in keyof T]: {
        count: number;
        history: any[];
    };
};

type Throws<T> = Array<keyof T>;

export class Spy<T, K extends keyof T = keyof T> {
    private stubs = {} as Stubs<T>;
    private throwingMethods: Throws<T> = [];

    calls = {} as Calls<T>;

    makeThrow(method: K): void {
        this.throwingMethods.push(method);
    }

    stub(method: K, value: Stubs<T>[K]): void {
        this.stubs[method] = value;
    }

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
