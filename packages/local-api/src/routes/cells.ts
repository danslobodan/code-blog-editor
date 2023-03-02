import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code';
}

interface LocalApiError {
    code: string;
}

const isLocalApiError = (err: any): err is LocalApiError => {
    return typeof err.code === 'string';
};

export const createCellsRouter = (fileName: string, dir: string) => {
    const router = express.Router();
    router.use(express.json());
    const fullPath = path.join(dir, fileName);

    router.get('/cells', async (req, res) => {
        try {
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code === 'ENOENT') {
                    await fs.writeFile(fullPath, '[]', 'utf-8');
                    res.send([]);
                }
            } else {
                throw error;
            }
        }
    });

    router.post('/cells', async (req, res) => {
        const { cells }: { cells: Cell[] } = req.body;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'OK' });
    });

    return router;
};
