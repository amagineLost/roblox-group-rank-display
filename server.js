const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/group-members', (req, res) => {
    const groupId = '11592051'; // Replace with your actual group ID
    const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

    request(apiUrl, (error, response, body) => {
        if (error) {
            console.error('Error fetching group members:', error);
            return res.status(500).send('Error fetching group members');
        }

        if (response.statusCode !== 200) {
            console.error(`API Request Error: ${response.statusCode}`);
            return res.status(response.statusCode).send('Error fetching group members');
        }

        res.send(body);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
