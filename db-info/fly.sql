CREATE TABLE IF NOT EXISTS `typePerson` (
    `idType` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `typePerson` varchar(100) DEFAULT NULL,
    `create_at` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`idType`)
);

CREATE TABLE IF NOT EXISTS `person` (
    `idPerson` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `namePerson` varchar(100) DEFAULT NULL,
    `LastName` varchar(100) DEFAULT NULL,
    `phone` varchar(30) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `passwordPerson` varchar(100) DEFAULT NULL,
    `idType` int DEFAULT NULL,
    `statusPerson` tinyint(1) DEFAULT NULL,
    `create_at` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`idPerson`),
    KEY `idType_fgk` (`idType`),
    CONSTRAINT `idType_fgk` FOREIGN KEY (`idType`) REFERENCES `typePerson` (`idType`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `poll` (
    `idPerson` int COMMENT 'Primary Key',
    `namePoll` varchar(100) DEFAULT NULL,
    `rangeAge` varchar(50) DEFAULT NULL,
    `positionLife` varchar(100) DEFAULT NULL,
    `howAchivedUs` varchar(100) DEFAULT NULL,
    `create_at` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`idPerson`),
    KEY `idPerson_fgk` (`idPerson`),
    CONSTRAINT `idPerson_fgk` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `mailsModel` (
    `idMail` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `subtitle` varchar(100) DEFAULT NULL,
    `msgBody` varchar(1000) DEFAULT NULL,
    `attachment` varchar(100) DEFAULT NULL,
    `path_attachment` varchar(100) DEFAULT NULL,
    `create_at` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`idMail`)
);

CREATE TABLE IF NOT EXISTS `sendedMails` (
    `idSend` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `idMail` int DEFAULT NULL,
    `idPerson` int DEFAULT NULL,
    `statusMail` tinyint(1) DEFAULT NULL,
    `statusSmtp` varchar(10) DEFAULT NULL,
    `sendOfId` varchar(100) DEFAULT NULL,
    `create_at` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`idSend`),
    KEY `idMail_fgk` (`idMail`),
    KEY `idPerson2_fgk` (`idPerson`),
    CONSTRAINT `idMail_fgk` FOREIGN KEY (`idMail`) REFERENCES `mailsModel` (`idMail`),
    CONSTRAINT `idPerson2_fgk` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`)
);