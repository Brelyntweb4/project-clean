// filehub-agent.js
<<<<<<< HEAD
=======
// Usage: run `node filehub-agent.js` to expose a minimal file API on port 3040
// limited to the `public` directory.
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const ROOT_DIR = path.resolve(__dirname, 'public'); // Корневая директория
const app = express();
app.use(cors());
app.use(express.json());

// Получить дерево файлов
function getTree(dir) {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) return null;
    return {
        name: path.basename(dir),
        path: path.relative(ROOT_DIR, dir),
        type: 'folder',
        children: fs.readdirSync(dir).map(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                return getTree(fullPath);
            }
            return {
                name: file,
                path: path.relative(ROOT_DIR, fullPath),
                type: 'file'
            };
        })
    };
}

// Получить дерево файлов
app.get('/api/tree', (req, res) => {
    res.json(getTree(ROOT_DIR));
});

// Прочитать файл
app.get('/api/file', (req, res) => {
<<<<<<< HEAD
    const filePath = path.join(ROOT_DIR, req.query.path);
    if (!fs.existsSync(filePath)) return res.status(404).send('Not found');
=======
    const requestedPath = req.query.path || '';
    const filePath = path.resolve(ROOT_DIR, requestedPath);
    if (!filePath.startsWith(ROOT_DIR)) {
        return res.status(400).send('Invalid path');
    }
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
    res.send(fs.readFileSync(filePath, 'utf-8'));
});

// Записать (изменить или создать) файл
app.post('/api/file', (req, res) => {
<<<<<<< HEAD
    const filePath = path.join(ROOT_DIR, req.query.path);
=======
    const requestedPath = req.body.path || '';
    const filePath = path.resolve(ROOT_DIR, requestedPath);
    if (!filePath.startsWith(ROOT_DIR)) {
        return res.status(400).send('Invalid path');
    }
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
    fs.writeFileSync(filePath, req.body.content, 'utf-8');
    res.send('OK');
});

// Удалить файл
app.delete('/api/file', (req, res) => {
<<<<<<< HEAD
    const filePath = path.join(ROOT_DIR, req.query.path);
    if (!fs.existsSync(filePath)) return res.status(404).send('Not found');
=======
    const requestedPath = req.body.path || '';
    const filePath = path.resolve(ROOT_DIR, requestedPath);
    if (!filePath.startsWith(ROOT_DIR)) {
        return res.status(400).send('Invalid path');
    }
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
    fs.unlinkSync(filePath);
    res.send('Deleted');
});

app.listen(3040, () => {
    console.log('FileHub Agent работает на http://localhost:3040');
});
