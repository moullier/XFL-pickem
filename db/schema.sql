drop database if exists passport_demo;
create database passport_demo;

insert into `groups` (`name`, createdAt, updatedAt) values ("Group #1", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #2", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #3", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #4", now(), now());
insert into `groups` (`name`, createdAt, updatedAt) values ("Group #5", now(), now());

insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("tony@test.com", "Tony Soprano", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("don@test.com", "Don Draper", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("walt@test.com", "Walter White", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("chandler@test.com", "Chandler Bing", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("ross@test.com", "Ross Gellar", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("monica@test.com", "Monica Gellar", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("joey@test.com", "Joey Tribbiani", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("phoebe@test.com", "Phoebe Buffay", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("rachel@test.com", "Rachel Green", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("perot@test.com", "Ross Perot", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("clinton@test.com", "Bill Clinton", "test_pw", now(), now());
insert into `users` (email, display_name, `password`, createdAt, updatedAt) values ("bush@test.com", "George Bush", "test_pw", now(), now());


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






-- adding week 1 picks for steve@test.com (password: test)
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 1, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 2, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 3, true, now(), now());
insert into picks (member_fk, week, game_number, prediction, createdAt, updatedAt) values (16, 1, 4, true, now(), now());
