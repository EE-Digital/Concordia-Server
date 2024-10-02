-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: concordia
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1
--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;  
CREATE TABLE `channels` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `type` int(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
CREATE TABLE `logins` (
  `id` varchar(30) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL,
  `text` varchar(300) NOT NULL,
  `channel` int(10) unsigned NOT NULL,
  `user` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `channel` (`channel`),
  KEY `user` (`user`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`channel`) REFERENCES `channels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `token` varchar(60) NOT NULL,
  `id` varchar(30) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `fk_users_logins` (`id`),
  CONSTRAINT `fk_users_logins` FOREIGN KEY (`id`) REFERENCES `logins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(30) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `profilePicture` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `logins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump completed on 2024-10-02 11:59:43
