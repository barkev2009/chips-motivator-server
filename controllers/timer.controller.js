const ApiError = require('../error/ApiError');
const storage = require('../store')

class RecordController {
    async registerTimer(req, resp, next) {
        const { device_id } = req.params;
        const message = await storage.registerTimer(device_id);
        return resp.json({ message })
    }

    async unregisterTimer(req, resp, next) {
        const { device_id } = req.params;
        const message = await storage.unregisterTimer(device_id);
        return resp.json({ message })
    }

    async getTimers(req, resp, next) {
        return resp.json({ message: storage.getTimers() })
    }

    async getTimer(req, resp, next) {
        const { device_id } = req.params;
        return resp.json({ message: storage.getTimer(device_id) || null })
    }
}

module.exports = new RecordController();