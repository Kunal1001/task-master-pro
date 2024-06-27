-- Create Data Base
CREATE DATABASE taskmanager

-- User table
CREATE TABLE IF NOT EXISTS users (
  username varchar(20),
  email varchar(40) primary key unique,
  userrole varchar(10),
  password text
);

-- projects and task table
CREATE TYPE tasks AS(
	touser varchar(40),
	content text,
	createdon date,
	iscompleted bool
);

CREATE TABLE IF NOT EXISTS projects (
  projectid serial primary key unique,
  projectname text unique,
  createdby varchar(40),
  createdon date,
  tasks tasks[]
);

