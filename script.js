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
            // Use the correct endpoint if available
            const roleMembersUrl = `https://api.roblox.com/groups/${groupId}/roles/${role.id}/members`;
            const roleResponse = await fetch(roleMembersUrl);
            if (!roleResponse.ok) throw new Error(`Error: ${roleResponse.statusText}`);
            const roleData = await roleResponse.json();

            for (const member of roleData.data) {
                const listItem = document.createElement('li');
                listItem.textContent = `${member.username} - ${role.name}`;
                listItem.dataset.username = member.username; // Store username for search
                membersList.appendChild(listItem);
            }
        }
    } catch (error) {
        console.error('Error fetching group members:', error);
        document.getElementById('members-list').textContent = 'Failed to load group members.';
    }
}

function filterMembers() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const members = document.querySelectorAll('#members-list li');

    members.forEach(member => {
        const username = member.dataset.username.toLowerCase();
        if (username.includes(searchQuery)) {
            member.style.display = '';
        } else {
            member.style.display = 'none';
        }
    });
}

// Fetch members on page load
fetchGroupMembers();

// Add event listener for the search bar input
document.getElementById('search-bar').addEventListener('input', filterMembers);
