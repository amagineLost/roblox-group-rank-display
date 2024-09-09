const rolesApiUrl = '/api/group-roles'; // Ensure this matches the server endpoint

async function fetchGroupRoles() {
    try {
        const response = await fetch(rolesApiUrl);
        if (!response.ok) throw new Error(`API Request Error: ${response.status} ${response.statusText}`);
        const data = await response.json();

        const roles = data.roles; // Ensure this matches the structure of the response data

        for (const role of roles) {
            const roleMembersUrl = `/api/role-members/${role.id}`;
            await fetchAndDisplayMembers(roleMembersUrl, role.name);
        }
    } catch (error) {
        console.error('Error fetching group roles:', error);
        document.getElementById('members-list').textContent = 'Failed to load group roles. Please check the console for details.';
    }
}

async function fetchAndDisplayMembers(url, roleName) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API Request Error: ${response.status} ${response.statusText}`);
        const data = await response.json();

        const membersList = document.getElementById('members-list');
        for (const member of data.data) { // Ensure this matches the structure of the response data
            const listItem = document.createElement('li');
            listItem.textContent = `${member.username} - ${roleName}`;
            listItem.dataset.username = member.username; // Store username for search
            membersList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching role members:', error);
        document.getElementById('members-list').textContent = 'Failed to load role members. Please check the console for details.';
    }
}

// Fetch roles and members on page load
fetchGroupRoles();

// Add event listener for the search bar input
document.getElementById('search-bar').addEventListener('input', filterMembers);
