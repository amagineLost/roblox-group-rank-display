const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/group-members', (req, res) => {
    const apiUrl = 'https://groups.roblox.com/v1/groups/YOUR_GROUP_ID/roles';
    request(apiUrl).pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
