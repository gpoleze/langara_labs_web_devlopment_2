-- MySQL dump 10.13  Distrib 5.5.53, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: gabriel_dvdstore
-- ------------------------------------------------------
-- Server version	5.5.53-0+deb8u1

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customers_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  PRIMARY KEY (`customers_id`),
  UNIQUE KEY `ID` (`customers_id`),
  KEY `phone` (`phone`),
  KEY `ID_2` (`customers_id`),
  KEY `ID_3` (`customers_id`),
  KEY `phone_2` (`phone`),
  KEY `phone_3` (`phone`),
  KEY `phone_4` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Clark','Kent','111-222-00001','1, A street','Metropolis','A1A-1A1'),(2,'Bruce','Wayne','111-222-00002','101, A street','Metropolis','A1A-1A1'),(3,'Bruce','Banner','111-222-00003','2, A street','Metropolis','A1A-1A1'),(4,'Tony','Stark','111-222-00004','201, A street','Metropolis','A1A-1A1'),(5,'Peter','Parker','111-222-00005','201, A street','Metropolis','A1A-1A1');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dvds`
--

DROP TABLE IF EXISTS `dvds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dvds` (
  `dvds_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  PRIMARY KEY (`dvds_id`),
  KEY `ID` (`dvds_id`),
  KEY `ID_2` (`dvds_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dvds`
--

LOCK TABLES `dvds` WRITE;
/*!40000 ALTER TABLE `dvds` DISABLE KEYS */;
INSERT INTO `dvds` VALUES (7,'Zootopia (2016)',110),(8,'Hell or High Water (2016)',103),(10,'Arrival (2016)',118),(11,'La La Land (2016)',128),(13,'Love & Friendship (2016)',93),(14,'Finding Dory (2016)',100),(15,'Kubo and the Two Strings (2016)',102),(17,'Hunt for the Wilderpeople (2016)',101),(18,'Moana (2016)',113),(19,'Paterson (2016)',118),(20,'Captain America: Civil War (2016)',147),(21,'Don\' Think Twice (2016)',92),(22,'Sing Street (2016)',106),(23,'Tower (2016)',98),(24,'Weiner (2016)',96),(25,'Little Men (2016)',90),(26,'The Nice Guys (2016)',116),(27,'Cameraperson (2016)',103),(28,'Eye In The Sky (2016)',103),(47,'Matrix',150),(48,'Matrix Reloaded',138),(49,'sdf',34);
/*!40000 ALTER TABLE `dvds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rentals` (
  `rentals_id` int(11) NOT NULL AUTO_INCREMENT,
  `dvds_ID` int(11) NOT NULL,
  `customers_id` int(11) NOT NULL,
  `due_date` date NOT NULL,
  PRIMARY KEY (`rentals_id`),
  KEY `rentals_ibfk_1` (`dvds_ID`),
  KEY `rentals_ibfk_2` (`customers_id`),
  CONSTRAINT `rentals_ibfk_2` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`customers_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`dvds_ID`) REFERENCES `dvds` (`dvds_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (23,22,3,'2017-03-18'),(24,27,1,'2017-03-20'),(25,14,3,'2017-03-20'),(26,24,1,'2017-03-19'),(27,27,4,'2017-03-21'),(29,20,1,'2017-03-20'),(30,15,4,'2017-03-22');
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-05 15:59:20
