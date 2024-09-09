const groupId = '11592051'; // Replace with your group ID
const apiUrl = `https://groups.roblox.com/v1/groups/${groupId}/roles`;

async function fetchGroupMembers() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const membersList = document.getElementById('members-list');

    data.roles.forEach(role => {
        // Fetch each role's members
        fetch(`https://groups.roblox.com/v1/groups/${groupId}/roles/${role.id}/users?limit=100`)
            .then(res => res.json())
            .then(membersData => {
                membersData.data.forEach(member => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${member.username} - ${role.name}`;
                    membersList.appendChild(listItem);
                });
            });
    });
}

fetchGroupMembers();
