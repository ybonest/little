export const EmitterEvent = {
    listens: [],
    on(listen) {
        if (typeof listen === 'function') {
            this.listens.push(listen);
        }
    },
    emit(...args) {
        this.listens.forEach(listen => listen(...args));
    }
}