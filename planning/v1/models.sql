CREATE TABLE `User` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `firstName` string NOT NULL,
  `lastName` string NOT NULL,
  `email` string UNIQUE NOT NULL,
  `roles` array(ObjectID -> roles) DEFAULT (["reader"]),
  `verifiedType` integer COMMENT '0-Normal, 1-Insti Verified, 2-MM, 3-Faculty',
  `nitrMail` string,
  `picture` string DEFAULT NULL,
  `bio` string COMMENT 'Only for MM & Faculty',
  `facebook` string COMMENT 'Only for MM & Faculty',
  `twitter` string COMMENT 'Only for MM & Faculty',
  `instagram` string COMMENT 'Only for MM & Faculty',
  `linkedin` string COMMENT 'Only for MM & Faculty',
  `website` string COMMENT 'Only for MM & Faculty',
  `github` string COMMENT 'GH token, only MM tech team',
  `contributions` array(object) COMMENT '{onModel, ObjectID}',
  `positions` array(object) COMMENT 'Only for MM & Faculty',
  `ban` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `email`, `nitrMail`)
);

CREATE TABLE `Role` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `role` string UNIQUE NOT NULL,
  `permissions` array(string) NOT NULL,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `role`)
);

CREATE TABLE `Club` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `name` string NOT NULL,
  `website` string,
  `instagram` string,
  `facebook` string,
  `linkedin` string,
  `twitter` string,
  `logo` string,
  `executive` array(object) COMMENT '{userid, designation}',
  `society` string,
  `description` string,
  `facAd` string,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Event` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `name` string NOT NULL,
  `startTS` timestamp,
  `endTS` timestamp,
  `type` integer NOT NULL DEFAULT 0 COMMENT '0-club, 1-insti, 2-fest, 3-holiday',
  `host` ObjectID,
  `url` string,
  `venue` string,
  `hits` integer,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `TeamStruct` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `cc` Array(ObjectID) NOT NULL,
  `tc` Array(ObjectID) NOT NULL,
  `pc` Array(ObjectID) NOT NULL,
  `dc` Array(ObjectID) NOT NULL,
  `mentors` Array(ObjectID) NOT NULL,
  `content` Array(ObjectID),
  `technical` Array(ObjectID),
  `design` Array(ObjectID),
  `photography` Array(ObjectID),
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `cc`, `tc`, `pc`, `dc`, `mentors`)
);

CREATE TABLE `Article` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `type` integer NOT NULL DEFAULT 0 COMMENT '0-normal, 1-witsdom, 2-photostory',
  `title` string NOT NULL,
  `content` array(object) NOT NULL,
  `inshort` string NOT NULL,
  `author` array(ObjectID),
  `category` integer NOT NULL COMMENT 'cache map table on frontend',
  `subcategory` integer NOT NULL,
  `tags` array(ObjectID),
  `coverMedia` array(ObjectID) COMMENT 'index 0-square, 1-rectangle',
  `status` integer COMMENT '0-unpublished, 1-published, 2-archived, 3-trash',
  `restrict` boolean,
  `engagementCount` object,
  `views` integer COMMENT 'read longer than 10% of readTime',
  `hits` integer,
  `readTime` integer COMMENT 'in minutes',
  `timeSpent` integer COMMENT 'in minutes',
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `type`, `category`, `subcategory`)
);

CREATE TABLE `Tag` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `name` string,
  `admin` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `admin`)
);

CREATE TABLE `CategoryMap` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `categoryNumber` integer NOT NULL,
  `name` string NOT NULL,
  `parent` integer,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `categoryNumber`)
);

CREATE TABLE `Comment` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `content` array(object),
  `user` ObjectID NOT NULL,
  `onModel` string NOT NULL DEFAULT "Article" COMMENT 'Article/Comment',
  `modelRef` ObjectID NOT NULL,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `user`, `modelRef`)
);

CREATE TABLE `Reaction` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `type` integer NOT NULL COMMENT '0-like, 1-upvote',
  `user` ObjectID NOT NULL,
  `onModel` string NOT NULL DEFAULT "Article" COMMENT 'Article/Comment',
  `modelRef` ObjectID NOT NULL,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `user`, `modelRef`)
);

CREATE TABLE `Media` (
  `_id` ObjectID NOT NULL COMMENT 'automatic by mongodb',
  `users` array(ObjectID) NOT NULL,
  `storePath` string NOT NULL,
  `type` integer NOT NULL DEFAULT 0 COMMENT '0-image, 1-video',
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1,
  PRIMARY KEY (`_id`, `users`)
);

CREATE TABLE `Album` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `name` string NOT NULL,
  `tags` array(ObjectID),
  `cover` ObjectID NOT NULL,
  `media` array(ObjectID),
  `users` array(ObjectID),
  `hits` integer NOT NULL DEFAULT 0,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Poll` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `question` string NOT NULL,
  `options` array(string) NOT NULL,
  `optionCount` array(integer) NOT NULL DEFAULT 0,
  `expiry` timestamp NOT NULL,
  `article` ObjectID,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `PollVote` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `user` ObjectID,
  `poll` ObjectID,
  `vote` integer,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Issue` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `name` string NOT NULL,
  `publishedAt` timestamp,
  `articles` array(ObjectID),
  `featured` array(ObjectID),
  `poll` ObjectID,
  `thumbnail` string,
  `description` string COMMENT 'Optional',
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `MMSession` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `startTS` timestamp NOT NULL,
  `endTS` timestamp NOT NULL,
  `issues` array(ObjectID),
  `team` Object(TeamStrcut) NOT NULL COMMENT 'Embedded Document in TeamStruct',
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `ForumThread` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `title` string NOT NULL,
  `content` array(object),
  `author` ObjectID,
  `authority` string,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `ForumMessage` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `content` array(ObjectID),
  `validated` boolean DEFAULT false,
  `author` ObjectID,
  `parentThread` ObjectID,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Squiggle` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `content` array(object),
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Company` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `name` string,
  `alias` string,
  `location` string,
  `avatar` string,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `Live` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `type` integer COMMENT '0-Cat0,1-Cat1, 2-Cat2, 3-Cat3, 4-Internship',
  `company` ObjectID,
  `recruits` integer,
  `studentsRecruited` array(object) COMMENT '{name, rollno, branch, degree}',
  `ctc` string,
  `benefits` string COMMENT 'internship duration',
  `date` date,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

CREATE TABLE `shareInternship` (
  `_id` ObjectID PRIMARY KEY NOT NULL COMMENT 'automatic by mongodb',
  `internYear` integer,
  `student` ObjectID,
  `studentYear` integer,
  `ogranization` string,
  `duration` integer,
  `applyProcess` string,
  `experience` string,
  `approved` boolean DEFAULT false,
  `createdAt` timestamp COMMENT 'automatic by mongodb',
  `createdBy` ObjectID,
  `updatedAt` timestamp COMMENT 'automatic by mongodb',
  `updatedBy` ObjectID,
  `schemaVersion` integer DEFAULT 1
);

ALTER TABLE `Role` ADD FOREIGN KEY (`_id`) REFERENCES `User` (`roles`);

ALTER TABLE `Club` ADD FOREIGN KEY (`executive`) REFERENCES `User` (`_id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`host`) REFERENCES `Club` (`_id`);

ALTER TABLE `TeamStruct` ADD FOREIGN KEY (`_id`) REFERENCES `MMSession` (`team`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`cc`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`tc`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`pc`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`dc`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`mentors`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`content`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`technical`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`design`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `TeamStruct` (`photography`);

ALTER TABLE `User` ADD FOREIGN KEY (`_id`) REFERENCES `Article` (`author`);

ALTER TABLE `Tag` ADD FOREIGN KEY (`_id`) REFERENCES `Article` (`tags`);

ALTER TABLE `Article` ADD FOREIGN KEY (`category`) REFERENCES `CategoryMap` (`categoryNumber`);

ALTER TABLE `Article` ADD FOREIGN KEY (`subcategory`) REFERENCES `CategoryMap` (`categoryNumber`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`user`) REFERENCES `User` (`_id`);

ALTER TABLE `Reaction` ADD FOREIGN KEY (`user`) REFERENCES `User` (`_id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`modelRef`) REFERENCES `Article` (`_id`);

ALTER TABLE `Reaction` ADD FOREIGN KEY (`modelRef`) REFERENCES `Article` (`_id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`modelRef`) REFERENCES `Comment` (`_id`);

ALTER TABLE `Media` ADD FOREIGN KEY (`users`) REFERENCES `User` (`_id`);

ALTER TABLE `Media` ADD FOREIGN KEY (`_id`) REFERENCES `Article` (`content`);

ALTER TABLE `Media` ADD FOREIGN KEY (`_id`) REFERENCES `Album` (`media`);

ALTER TABLE `Media` ADD FOREIGN KEY (`_id`) REFERENCES `Album` (`cover`);

ALTER TABLE `Tag` ADD FOREIGN KEY (`_id`) REFERENCES `Album` (`tags`);

ALTER TABLE `Article` ADD FOREIGN KEY (`_id`) REFERENCES `Poll` (`article`);

ALTER TABLE `PollVote` ADD FOREIGN KEY (`poll`) REFERENCES `Poll` (`_id`);

ALTER TABLE `PollVote` ADD FOREIGN KEY (`user`) REFERENCES `User` (`_id`);

ALTER TABLE `Poll` ADD FOREIGN KEY (`_id`) REFERENCES `Issue` (`poll`);

ALTER TABLE `Article` ADD FOREIGN KEY (`_id`) REFERENCES `Issue` (`articles`);

ALTER TABLE `Article` ADD FOREIGN KEY (`_id`) REFERENCES `Issue` (`featured`);

ALTER TABLE `Issue` ADD FOREIGN KEY (`_id`) REFERENCES `MMSession` (`issues`);

ALTER TABLE `ForumMessage` ADD FOREIGN KEY (`_id`) REFERENCES `User` (`_id`);

ALTER TABLE `ForumThread` ADD FOREIGN KEY (`author`) REFERENCES `User` (`_id`);

ALTER TABLE `ForumMessage` ADD FOREIGN KEY (`parentThread`) REFERENCES `ForumThread` (`_id`);

ALTER TABLE `Live` ADD FOREIGN KEY (`company`) REFERENCES `Company` (`_id`);

ALTER TABLE `Album` ADD FOREIGN KEY (`users`) REFERENCES `User` (`_id`);

ALTER TABLE `CategoryMap` ADD FOREIGN KEY (`categoryNumber`) REFERENCES `CategoryMap` (`parent`);

