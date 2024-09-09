-- Roblox Script (Server Script)

local GroupService = game:GetService("GroupService")
local HttpService = game:GetService("HttpService")
local groupId = 11592051 -- Replace with your actual group ID

-- Function to get group info and roles
local function getGroupInfo()
    local groupInfo = GroupService:GetGroupInfoAsync(groupId)
    local roles = groupInfo.Roles
    return roles
end

-- Function to get members of a specific role
local function getRoleMembers(roleId)
    local roleMembers = GroupService:GetRoleMembersAsync(groupId, roleId)
    return roleMembers
end

-- Example usage:
local roles = getGroupInfo()
for _, role in ipairs(roles) do
    local members = getRoleMembers(role.Id)
    for _, member in ipairs(members) do
        print(member.Username, role.Name)
    end
end
