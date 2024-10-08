const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Endpoint to get group roles
app.get('/api/group-roles', async (req, res) => {
    const groupId = '11592051'; // Replace with your actual group ID
    const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data); // Send roles data as JSON
    } catch (error) {
        console.error('Error fetching group roles:', error);
        res.status(500).send('Error fetching group roles');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
