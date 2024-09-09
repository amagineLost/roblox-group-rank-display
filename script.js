const groupId = '11592051'; // Replace with your actual group ID
const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

async function fetchGroupMembers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();

        const membersList = document.getElementById('members-list');
        membersList.innerHTML = ''; // Clear existing content

        for (const role of data.roles) {
            const roleMembersUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles/${role.id}/users?limit=100`;
            const roleResponse = await fetch(roleMembersUrl);
            if (!roleResponse.ok) throw new Error(`Error: ${roleResponse.statusText}`);
            const roleData = await roleResponse.json();

            for (const member of roleData.data) {
                const listItem = document.createElement('li');
                listItem.textContent = `${member.username} - ${role.name}`;
                membersList.appendChild(listItem);
            }
        }
    } catch (error) {
        console.error('Error fetching group members:', error);
        document.getElementById('members-list').textContent = 'Failed to load group members.';
    }
}

fetchGroupMembers();
