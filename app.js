const express = require('express');
const app = express();
const port = 3000;

let toDoList = [];

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/add', (req, res) => {
    const { item } = req.body;
    if (item) {
        toDoList.push(item);
        res.status(200).json({ success: true, items: toDoList });
    } else {
        res.status(400).json({ success: false, message: "Item is required" });
    }
});

app.get('/items', (req, res) => {
    res.status(200).json({ success: true, items: toDoList });
});

app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < toDoList.length) {
        toDoList.splice(index, 1);
        res.status(200).json({ success: true, items: toDoList });
    } else {
        res.status(400).json({ success: false, message: "Invalid index" });
    }
});

app.listen(port, () => {
    console.log(`To-Do app listening at http://localhost:${port}`);
});
