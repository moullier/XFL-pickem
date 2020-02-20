-- Join group name, user email, and member id
select `name`, email, members.id from `groups`
left join members on `groups`.id = members.group_id
left join `users` on members.user_id = `users`.id;

-- Get list of groups that a user with a specific id is in (with access to user table as well)
select `name`, email, members.id, `users`.id AS 'USERID' from `groups`
left join members on `groups`.id = members.group_id
left join `users` on members.user_id = `users`.id
where `users`.id = 16;

-- Get list of groups that a user with a specific id is in (without joining to users table)
select `name`, members.id, members.user_id from `groups`
left join members on `groups`.id = members.group_id
where members.user_id = 16;