use database pickemtest;

insert into `groups` (`name`, createdAt, updatedAt) values ("Group #1", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #2", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #3", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #4", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #5", now(), now());

insert into `users` (email, `password`, createdAt, updatedAt) values ("tony@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("don@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("walt@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("chandler@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("ross@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("monica@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("joey@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("phoebe@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("rachel@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("perot@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("clinton@test.com", "test_pw", now(), now());
insert into `users` (email, `password`, createdAt, updatedAt) values ("bush@test.com", "test_pw", now(), now());


-- create table members (
--     id int(10) primary key auto_increment not null,
--     user_id int(10) not null,
--     group_id int(10 not null)
-- )

insert into members (UserId, GroupId, createdAt, updatedAt) values (1, 1, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (2, 1, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (3, 1, now(), now());

insert into members (UserId, GroupId, createdAt, updatedAt) values (1, 2, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (2, 2, now(), now());

insert into members (UserId, GroupId, createdAt, updatedAt) values (3, 3, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (4, 3, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (5, 3, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (16, 3, now(), now());

insert into members (UserId, GroupId, createdAt, updatedAt) values (7, 4, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (8, 4, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (9, 4, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (10, 4, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (11, 4, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (12, 4, now(), now());

insert into members (UserId, GroupId, createdAt, updatedAt) values (12, 5, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (13, 5, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (14, 5, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (15, 5, now(), now());
insert into members (UserId, GroupId, createdAt, updatedAt) values (16, 5, now(), now());

insert into members (UserId, GroupId, createdAt, updatedAt) values (7, 1, now(), now());

-- adding week 1 picks for steve@test.com (password: test)
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 1, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 2, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 3, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 4, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (1, 2, 1, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (1, 2, 2, false, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (1, 2, 3, false, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (1, 2, 4, true, now(), now());

-- week 1 results
insert into results (week, game_number, winner, winner_name, loser_name, createdAt, updatedAt) values (1, 1, true, 'DC Defenders', 'Seattle Dragons', now(), now());
insert into results (week, game_number, winner, winner_name, loser_name, createdAt, updatedAt) values (1, 2, true, 'Houston Roughnecks', 'LA Wildcats', now(), now());
insert into results (week, game_number, winner, winner_name, loser_name, createdAt, updatedAt) values (1, 3, true, 'NY Guardians', 'Tampa Bay Vipers', now(), now());
insert into results (week, game_number, winner, winner_name, loser_name, createdAt, updatedAt) values (1, 4, false, 'DC Defenders', 'Seatle Dragons', now(), now());