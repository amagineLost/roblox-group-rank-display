const rolesApiUrl = '/api/group-roles'; // Make sure this matches the server endpoint

async function fetchGroupRoles() {
    try {
        const response = await fetch(rolesApiUrl);
        if (!response.ok) throw new Error(`API Request Error: ${response.status} ${response.statusText}`);
        const data = await response.json();

        const roles = data.roles; // Make sure this matches the structure of the response data

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
        for (const member of data.data) { // Make sure this matches the structure of the response data
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

// Fetch roles and members on page load
fetchGroupRoles();

// Add event listener for the search bar input
document.getElementById('search-bar').addEventListener('input', filterMembers);
