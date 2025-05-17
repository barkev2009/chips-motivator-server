const { Record } = require("../models/models");

class Storage {
    timers = new Map();

    constructor() {
        this.getDbTimers();
    }

    async getDbTimers() {
        const dbTimers = await Record.findAll();
        for (const timer of dbTimers) {
            this.timers.set(timer.device_id, timer.seconds);
        }
        setInterval(() => this.updateTimers(), 1000)
    }

    async updateTimers() {
        this.timers.forEach(
            async (value, key) => {
                this.timers.set(key, value + 1);
                Record.update(
                    { seconds: value + 1 },
                    { where: { device_id: key } }
                );
            }
        );
    }

    async registerTimer(device_id) {
        const candidate = await Record.findOne({ where: { device_id } });
        if (!!candidate) return { success: true };
        await Record.create({ device_id, seconds: 0 });
        this.timers.set(device_id, 0);
        return { success: true }
    }

    async unregisterTimer(device_id) {
        await Record.destroy({ where: { device_id } });
        this.timers.delete(device_id);
        return { success: true }
    }

    getTimers() {
        return Object.fromEntries(this.timers);
    }

    getTimer(device_id) {
        return this.timers.get(device_id);
    }
}

module.exports = new Storage();