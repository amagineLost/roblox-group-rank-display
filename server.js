const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Endpoint to get roles
app.get('/api/group-roles', async (req, res) => {
    const groupId = '11592051'; // Replace with your actual group ID
    const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

    try {
        const response = await axios.get(apiUrl);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching group roles:', error);
        res.status(500).send('Error fetching group roles');
    }
});

// Endpoint to get members of a role
app.get('/api/role-members/:roleId', async (req, res) => {
    const groupId = '11592051'; // Replace with your actual group ID
    const roleId = req.params.roleId;
    const apiUrl = `https://api.roblox.com/groups/${groupId}/roles/${roleId}/members`;

    try {
        const response = await axios.get(apiUrl);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching role members:', error);
        res.status(500).send('Error fetching role members');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
