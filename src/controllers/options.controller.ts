import IController from './interface.controller';

class OptionsController implements IController {
    async find(req, res) {
        return res.json({ message: 'find' });
    }

    async list(req, res) {
        return res.json({ message: 'list' });
    }

    async create(req, res) {
        return res.json({ message: 'create' });
    }

    async update(req, res) {
        return res.json({ message: 'update' });
    }

    async delete(req, res) {
        return res.json({ message: 'delete' });
    }
}

export default new OptionsController();