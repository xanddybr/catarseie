-- fly_pigeon.person definition
CREATE TABLE `typePerson` (
  `idType` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `tpPerson` varchar(100) DEFAULT NULL,
  `create_at` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idType`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `person` (
  `idPerson` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `fristName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `passwordPerson` varchar(100) DEFAULT NULL,
  `idType` int DEFAULT NULL,
  `statusPerson` tinyint(1) DEFAULT NULL,
  `agreeNotify` tinyint DEFAULT '1',
  `giveUpMotive` varchar(200) DEFAULT NULL,
  `create_at` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`idPerson`),
  KEY `idType_fgk` (`idType`),
  CONSTRAINT `idType_fgk` FOREIGN KEY (`idType`) REFERENCES `typePerson` (`idType`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `poll` (
  `idPerson` int NOT NULL AUTO_INCREMENT,
  `namePoll` varchar(100) DEFAULT NULL,
  `yourState` varchar(100) DEFAULT NULL,
  `rangeAge` varchar(50) DEFAULT NULL,
  `positionLife` varchar(100) DEFAULT NULL,
  `howWeMet` varchar(100) DEFAULT NULL,
  `create_at` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idPerson`),
  KEY `idPerson_fgk` (`idPerson`),
  CONSTRAINT `idPerson_fgk` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mailsModel` (
  `idMail` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `subtitle` varchar(100) DEFAULT NULL,
  `msgBody` varchar(1000) DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `path_attachment` varchar(100) DEFAULT NULL,
  `create_at` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idMail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sendedMails` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `idMailModel` int DEFAULT NULL,
  `idOfSend` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `accepted` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `queued` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `responseSmtp` varchar(10) DEFAULT NULL,
  `create_at` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idMail_fgk` (`idMailModel`),
  CONSTRAINT `idMail_fgk` FOREIGN KEY (`idMailModel`) REFERENCES `mailsModel` (`idMail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;