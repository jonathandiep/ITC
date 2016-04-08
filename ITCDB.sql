-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: ITC
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bid`
--

DROP TABLE IF EXISTS `Bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bid` (
  `idBid` int(11) NOT NULL AUTO_INCREMENT,
  `serviceRequestID` int(11) NOT NULL,
  `providerID` varchar(45) NOT NULL,
  `priceType` varchar(45) NOT NULL,
  `priceValue` double NOT NULL,
  `note` varchar(200) DEFAULT NULL,
  `bidStatus` varchar(45) NOT NULL,
  `bidDate` datetime NOT NULL,
  PRIMARY KEY (`idBid`),
  UNIQUE KEY `idBid_UNIQUE` (`idBid`),
  KEY `serviceReqID_idx` (`serviceRequestID`),
  KEY `providerFK_idx` (`providerID`),
  CONSTRAINT `providerFK` FOREIGN KEY (`providerID`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `serviceReqFK` FOREIGN KEY (`serviceRequestID`) REFERENCES `ServiceRequest` (`idServiceRequest`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bid`
--

LOCK TABLES `Bid` WRITE;
/*!40000 ALTER TABLE `Bid` DISABLE KEYS */;
INSERT INTO `Bid` VALUES (2,3,'570482d585f0e71008852f32','Fixed',101,'This is my note.','Declined','0000-00-00 00:00:00'),(4,3,'5705d82c1035bf8d32b71d2d','Hourly',20,'I do a good job ;)','Accepted','0000-00-00 00:00:00'),(6,10,'5705d82c1035bf8d32b71d2d','Fixed',11,'test','Accepted','2016-04-08 04:14:18'),(7,2,'5705d82c1035bf8d32b71d2d','Hourly',1,'CHEEP TUTOR 4 U','Pending','2016-04-08 04:14:57'),(8,11,'5702c9d72edb6451994185ce','Hourly',100,'PAY ME','Accepted','2016-04-08 04:39:16'),(9,12,'5702c9d72edb6451994185ce','Fixed',123,'good deal yo','Accepted','2016-04-08 08:00:29'),(10,14,'570805b929dd73e6547c1ae9','Fixed',1000,'Suprise good deal.','Accepted','2016-04-08 20:45:15');
/*!40000 ALTER TABLE `Bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review` (
  `idReview` int(11) NOT NULL AUTO_INCREMENT,
  `serviceRequestID` varchar(45) NOT NULL,
  `reviewAs` varchar(45) NOT NULL,
  `reviewerID` varchar(45) NOT NULL,
  `revieweeID` varchar(45) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `heading` varchar(45) DEFAULT NULL,
  `message` text NOT NULL,
  `reviewDate` datetime NOT NULL,
  PRIMARY KEY (`idReview`),
  UNIQUE KEY `idReview_UNIQUE` (`idReview`),
  KEY `reviewFK_idx` (`reviewerID`,`revieweeID`),
  KEY `revieweeFK_idx` (`revieweeID`),
  CONSTRAINT `revieweeFK` FOREIGN KEY (`revieweeID`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `reviewerFK` FOREIGN KEY (`reviewerID`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES (4,'3','Provider','5705d82c1035bf8d32b71d2d','5702c9d72edb6451994185ce','5','Gr8 CLYENT','BEST CUSTOMER OF MY LIFE!!!','2016-04-08 11:10:30'),(5,'12','Client','5705d82c1035bf8d32b71d2d','5702c9d72edb6451994185ce','1','SUCKY PICS','NEVER USE THIS GUY','2016-04-08 17:17:50'),(6,'11','Provider','5702c9d72edb6451994185ce','5705d82c1035bf8d32b71d2d','5','Great Client','Enjoyed working with this person!','2016-04-08 18:58:52'),(7,'14','Client','57081639737f732b59a0f7e2','570805b929dd73e6547c1ae9','5','SUGOI','SUGOI','2016-04-08 20:47:59'),(8,'14','Provider','570805b929dd73e6547c1ae9','57081639737f732b59a0f7e2','5','SUGOI','SUGOI','2016-04-08 20:48:28'),(9,'14','Provider','570805b929dd73e6547c1ae9','57081639737f732b59a0f7e2','5','Another Review','This is a test','2016-04-08 21:30:12');
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceRequest`
--

DROP TABLE IF EXISTS `ServiceRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ServiceRequest` (
  `idServiceRequest` int(11) NOT NULL AUTO_INCREMENT,
  `clientID` varchar(45) NOT NULL,
  `serviceTitle` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `serviceStatus` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`idServiceRequest`),
  UNIQUE KEY `idServiceRequest_UNIQUE` (`idServiceRequest`),
  KEY `serviceKey_idx` (`clientID`),
  CONSTRAINT `serviceFK` FOREIGN KEY (`clientID`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceRequest`
--

LOCK TABLES `ServiceRequest` WRITE;
/*!40000 ALTER TABLE `ServiceRequest` DISABLE KEYS */;
INSERT INTO `ServiceRequest` VALUES (2,'5702c9d72edb6451994185ce','Tutoring','I need help for my biology class.','Open','0000-00-00 00:00:00'),(3,'5702c9d72edb6451994185ce','Farming','I need someone to help feed my chickens','Closed','0000-00-00 00:00:00'),(4,'5702c9d72edb6451994185ce','Cleaning','Wiling to pay someone to clean my room!','Closed','2016-04-06 22:25:16'),(5,'5702c9d72edb6451994185ce','Testing','Another one','Closed','2016-04-06 22:26:40'),(6,'5702c9d72edb6451994185ce','Test','asdf','Closed','2016-04-06 22:54:21'),(7,'5702c9d72edb6451994185ce','Mopping','SOMEONE MOP THE FLOOR','Open','2016-04-06 22:58:13'),(8,'5702c9d72edb6451994185ce','Moving','I need help moving my furniture.','Open','2016-04-07 00:17:57'),(10,'5702c9d72edb6451994185ce','asdf','asdf','Closed','2016-04-07 02:56:05'),(11,'5705d82c1035bf8d32b71d2d','Planting','I need to plant new plants. Prefer strong men.','Closed','2016-04-08 01:40:27'),(12,'5705d82c1035bf8d32b71d2d','Photographers wanted','TAKE SOME PICS','Closed','2016-04-08 04:38:31'),(13,'570805b929dd73e6547c1ae9','Working Out','I need a personal trainer. Will pay extremely well.','Open','2016-04-08 20:02:47'),(14,'57081639737f732b59a0f7e2','Boxing Training','I need someone willing to train me for boxing on the weekends. Email me for more details.','Closed','2016-04-08 20:41:01');
/*!40000 ALTER TABLE `ServiceRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `idUser` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('5702c9d72edb6451994185ce','Hugo','Lam','1234 Street St.','12344321'),('570482d585f0e71008852f32','First','Last',NULL,NULL),('5705d82c1035bf8d32b71d2d','first','last','1234 Main St.','12341234'),('5705e249e63afcf7333e0c3e','fefefe','fefefe',NULL,NULL),('570805b929dd73e6547c1ae9','Jonathan','Diep',NULL,NULL),('57081639737f732b59a0f7e2','Edward','Tu',NULL,NULL),('57081bd84027875c59c30e80','asdf','asdf',NULL,NULL),('57081c1e39044a6759edbe90','Jason','Squarepants',NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-08 16:26:07
