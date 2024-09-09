const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/group-members', async (req, res) => {
    const groupId = '11592051'; // Replace with your actual group ID
    const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

    try {
        const response = await axios.get(apiUrl);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).send('Error fetching group members');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
