-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: physiome
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AIGenerationHistory`
--

DROP TABLE IF EXISTS `AIGenerationHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AIGenerationHistory` (
  `age` decimal(10,0) NOT NULL,
  `body_region` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `confidence_score` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `functional_limitation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_level` decimal(10,0) NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recovery_stage` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AIGenerationHistory`
--

LOCK TABLES `AIGenerationHistory` WRITE;
/*!40000 ALTER TABLE `AIGenerationHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `AIGenerationHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentHistory`
--

DROP TABLE IF EXISTS `AssessmentHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentHistory` (
  `assessment_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dates` text COLLATE utf8mb4_unicode_ci,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `scores` text COLLATE utf8mb4_unicode_ci,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentHistory`
--

LOCK TABLES `AssessmentHistory` WRITE;
/*!40000 ALTER TABLE `AssessmentHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssessmentHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentQuestions`
--

DROP TABLE IF EXISTS `AssessmentQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentQuestions` (
  `assessment_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_number` decimal(10,0) NOT NULL,
  `question_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `response_options` text COLLATE utf8mb4_unicode_ci,
  `response_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `scoring_value` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `help_text` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentQuestions`
--

LOCK TABLES `AssessmentQuestions` WRITE;
/*!40000 ALTER TABLE `AssessmentQuestions` DISABLE KEYS */;
INSERT INTO `AssessmentQuestions` VALUES ('NDI','default','2026-06-06 10:33:28.250Z','hqemgd1qtk6pag6',1,'Pain Intensity','\"{\'scale\': \'0-5\', \'labels\': [\'No pain\', \'Mild\', \'Moderate\', \'Fairly severe\', \'Very severe\', \'Worst imaginable\']}\"','scale',0,'2026-06-06 10:33:28.250Z',''),('NDI','default','2026-06-06 10:33:28.250Z','2udgi8qclr4yvou',2,'Personal Care (washing, dressing, etc.)','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.250Z',''),('NDI','default','2026-06-06 10:33:28.250Z','eerr6zz4tosvsnh',3,'Lifting','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.250Z',''),('NDI','default','2026-06-06 10:33:28.250Z','2ss3qc8tbiea9e3',4,'Reading','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.250Z',''),('NDI','default','2026-06-06 10:33:28.251Z','nopepa6z6ypg6es',5,'Headaches','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('NDI','default','2026-06-06 10:33:28.251Z','4m7bxeq50voqc38',6,'Concentration','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('NDI','default','2026-06-06 10:33:28.251Z','skejrenga2g88ud',7,'Work','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('NDI','default','2026-06-06 10:33:28.251Z','ot4dbk5egtm7miw',8,'Driving','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('NDI','default','2026-06-06 10:33:28.251Z','19jhiugk5tg377f',9,'Sleeping','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('NDI','default','2026-06-06 10:33:28.251Z','178b1w8gy2ul0z6',10,'Recreation','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('ODI','default','2026-06-06 10:33:28.251Z','3fabhq6kkfhv8sk',1,'Pain Intensity','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('ODI','default','2026-06-06 10:33:28.251Z','ftx8xmtv75fg72e',2,'Personal Care','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('ODI','default','2026-06-06 10:33:28.251Z','zf9gzqu1pcu7iyf',3,'Lifting','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.251Z',''),('ODI','default','2026-06-06 10:33:28.252Z','kgtfd88x8kr8rt5',4,'Walking','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','63gppwtqr93winb',5,'Sitting','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','2lcgjtfrm0g4iy6',6,'Standing','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','21p4wz0gr1l9xsc',7,'Sleeping','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','oyy7hy50n01qu8u',8,'Social Life','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','wc5b2y2c54lgu2j',9,'Traveling','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('ODI','default','2026-06-06 10:33:28.252Z','o5y6z09or1ctrzq',10,'Changing degree of pain','\"{\'scale\': \'0-5\'}\"','scale',0,'2026-06-06 10:33:28.252Z',''),('DASH','default','2026-06-06 10:33:40.851Z','orhd8cvexuopu6h',1,'Open a tight or new jar','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.851Z',''),('DASH','default','2026-06-06 10:33:40.851Z','s35c76euic47kpw',2,'Write','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.851Z',''),('DASH','default','2026-06-06 10:33:40.851Z','jn2pkvtiii5g0kd',3,'Turn a key','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.851Z',''),('DASH','default','2026-06-06 10:33:40.851Z','jvm2pv4hpfzf13h',4,'Prepare a meal','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.851Z',''),('DASH','default','2026-06-06 10:33:40.852Z','41h5ko2ijz2oo0g',5,'Push open a heavy door','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.852Z',''),('DASH','default','2026-06-06 10:33:40.852Z','2qq33lkja4keo2j',6,'Place an object on a shelf above your head','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.852Z',''),('DASH','default','2026-06-06 10:33:40.852Z','ueu8tofc3ydnzt8',7,'Do heavy household chores','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.852Z',''),('DASH','default','2026-06-06 10:33:40.852Z','k2w3rodeci6tzp0',8,'Garden or do yard work','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.852Z',''),('DASH','default','2026-06-06 10:33:40.852Z','7ewq75ns6579ze6',9,'Make a bed','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.852Z',''),('DASH','default','2026-06-06 10:33:40.853Z','kqvpg8y0vlg8sui',10,'Carry a shopping bag or briefcase','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.853Z',''),('DASH','default','2026-06-06 10:33:40.853Z','n2fjkc2xg5d5de8',11,'Carry a heavy object (over 10 lbs)','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.853Z',''),('DASH','default','2026-06-06 10:33:40.853Z','68h87v7p6x2wad7',12,'Change a light bulb overhead','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.853Z',''),('DASH','default','2026-06-06 10:33:40.853Z','xn6owa8911aqh8r',13,'Wash your hair','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.853Z',''),('DASH','default','2026-06-06 10:33:40.853Z','k3cct37i8ucbxhi',14,'Wash your back','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.853Z',''),('DASH','default','2026-06-06 10:33:40.854Z','rk6x9kq3hthmlh0',15,'Put on a pullover sweater','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.854Z',''),('DASH','default','2026-06-06 10:33:40.854Z','h9vgakbk7xtnwlu',16,'Use a knife to cut food','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.854Z',''),('DASH','default','2026-06-06 10:33:40.854Z','78309zkh2esyvu5',17,'Pick up a coin from a table','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.854Z',''),('DASH','default','2026-06-06 10:33:40.854Z','fmumbpi2ineb53c',18,'Perform sexual activity','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.854Z',''),('DASH','default','2026-06-06 10:33:40.854Z','pbe6ahd6fzxxkk8',19,'Dress yourself','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.854Z',''),('DASH','default','2026-06-06 10:33:40.855Z','pqakx802aciw057',20,'Throw a ball','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','i2b8qc3ie2i30ha',21,'Use a hammer','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','pey09qq27180slv',22,'Recreational activities which require some force or impact through your arm, shoulder or hand','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','pvpvt3sjrjmuqr9',23,'Work that requires you to move your arm or shoulder','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','qtiv8yzkitkf959',24,'Work that requires you to use a keyboard or mouse','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','gb0felyv9mfj9o7',25,'During the past week, to what extent has your arm, shoulder or hand problem interfered with your normal social activities with family, friends, groups, or community?','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','lq5vrvnzoqp7b5a',26,'During the past week, were you limited in your work or other regular daily activities as a result of your arm, shoulder or hand problem?','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.855Z','zhcmzy51oay8eil',27,'Arm, shoulder or hand pain','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.855Z',''),('DASH','default','2026-06-06 10:33:40.856Z','v2vcthablxpo0nh',28,'Tingling in your arm, shoulder or hand','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.856Z',''),('DASH','default','2026-06-06 10:33:40.856Z','boohx92gdn3sud7',29,'Difficulty sleeping due to arm, shoulder or hand pain','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.856Z',''),('DASH','default','2026-06-06 10:33:40.856Z','bzvdj6po8atl21f',30,'Weakness in your arm, shoulder or hand','\"{\'scale\': \'1-5\'}\"','scale',0,'2026-06-06 10:33:40.856Z',''),('LEFS','default','2026-06-06 10:33:52.270Z','gl2mcu5m48vpdab',1,'Any difficulty to do light activities in a house (dusting, washing dishes)?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.270Z',''),('LEFS','default','2026-06-06 10:33:52.271Z','wwa2i6wvq8kqkgj',2,'Any difficulty to do heavy household chores (scrubbing floors, lifting boxes)?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.271Z',''),('LEFS','default','2026-06-06 10:33:52.271Z','aq1vkh4kmxqz56y',3,'Any difficulty to do grocery shopping on your own?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.271Z',''),('LEFS','default','2026-06-06 10:33:52.271Z','u7ou99ewlwaymmu',4,'Any difficulty to get into or out of the bathtub?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.271Z',''),('LEFS','default','2026-06-06 10:33:52.271Z','0f0ag2hmi15f45a',5,'Any difficulty to walk for a mile?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.271Z',''),('LEFS','default','2026-06-06 10:33:52.271Z','d24vewgsbk5di91',6,'Any difficulty to walk for several blocks?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.271Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','0ydilcc688yyxxu',7,'Any difficulty to climb a flight of stairs?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','oembf9zbeb6h2za',8,'Any difficulty to climb up or down curbs?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','escj94m17i5md5b',9,'Any difficulty to walk on uneven surfaces?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','cficj86sna30pxb',10,'Any difficulty to keep up with others on foot?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','1a9nol162yt0qj7',11,'Any difficulty to go up or down stairs at a normal pace?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','iriq31eeww9ay23',12,'Any difficulty to stand on your tiptoes?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','agci0l6fjr889xu',13,'Any difficulty to stand on one leg?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','i2fdv1ngyp6n7mw',14,'Any difficulty to bend down and pick up an object from the floor?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.272Z','ab6exy3eacvaax8',15,'Any difficulty to get into or out of a car?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.273Z','zyeih8x63s4z4bm',16,'Any difficulty to put on shoes or socks?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.272Z',''),('LEFS','default','2026-06-06 10:33:52.273Z','eau0g118bmwn8xq',17,'Any difficulty to squat?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.273Z',''),('LEFS','default','2026-06-06 10:33:52.273Z','ittg3oevf4ozgw8',18,'Any difficulty to sit on your heels?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.273Z',''),('LEFS','default','2026-06-06 10:33:52.273Z','7w3v3gqee535jj6',19,'Any difficulty to sit in a chair for one hour?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.273Z',''),('LEFS','default','2026-06-06 10:33:52.273Z','hd54kpameq5qva8',20,'Any difficulty to stand for one hour?','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:33:52.273Z',''),('WOMAC','default','2026-06-06 10:34:04.947Z','e881yaie7q9u6wd',1,'Pain - Walking on flat surface','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.947Z',''),('WOMAC','default','2026-06-06 10:34:04.947Z','gtp3ni7ce5b3ctz',2,'Pain - Going up or down stairs','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.947Z',''),('WOMAC','default','2026-06-06 10:34:04.947Z','ncvaznaljhq6gxv',3,'Pain - At night while in bed','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.947Z',''),('WOMAC','default','2026-06-06 10:34:04.947Z','zm3w4h3tbo29gdq',4,'Pain - Sitting or lying','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.947Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','i84zjdpno9yontp',5,'Pain - Standing upright','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','s5mw7v99zb1fvlr',6,'Stiffness - Morning stiffness','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','44n7awyoz14m4gf',7,'Stiffness - Stiffness after sitting, lying, or resting later in the day','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','rq4xqw6jqc9hqs2',8,'Physical Function - Descending stairs','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','vz1dishqwethpz6',9,'Physical Function - Ascending stairs','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','8ruelkqe0xxihk1',10,'Physical Function - Rising from sitting','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','autthavijdqf3zz',11,'Physical Function - Standing','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.948Z','gcil6n6orw6xweg',12,'Physical Function - Bending to floor','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.948Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','pgqjt6y2dogrwhl',13,'Physical Function - Walking on flat','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','4om4glyb5jgm0ie',14,'Physical Function - Getting in/out of car','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','j97ral5k1ae0654',15,'Physical Function - Going shopping','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','xt7zbe6ca8uwf9e',16,'Physical Function - Putting on socks','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','5v6bferi27jql8q',17,'Physical Function - Rising from bed','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','a7j00n6d6ciz5oe',18,'Physical Function - Taking off socks','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','8ozdb42p1kvt7is',19,'Physical Function - Lying in bed','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.949Z','0vgb0kjqetga1vt',20,'Physical Function - Getting in/out of bath','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.949Z',''),('WOMAC','default','2026-06-06 10:34:04.950Z','gytyivwt03ut7bk',21,'Physical Function - Sitting','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.950Z',''),('WOMAC','default','2026-06-06 10:34:04.950Z','muod3badr8aqnuq',22,'Physical Function - Getting on/off toilet','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.950Z',''),('WOMAC','default','2026-06-06 10:34:04.950Z','7zo009ra7mwxmrt',23,'Physical Function - Heavy domestic duties','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.950Z',''),('WOMAC','default','2026-06-06 10:34:04.950Z','tfjr13kbbo1zvj0',24,'Physical Function - Light domestic duties','\"{\'scale\': \'0-4\'}\"','scale',0,'2026-06-06 10:34:04.950Z',''),('NDI','default','2026-06-06 10:36:24.475Z','6zap9kzccnicm9q',1,'Pain Intensity: How would you rate your pain on a scale of 0-5?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.475Z',''),('NDI','default','2026-06-06 10:36:24.475Z','6ce82coac9cd2gq',2,'Personal Care (washing, dressing): How much difficulty do you have with personal care?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.475Z',''),('NDI','default','2026-06-06 10:36:24.475Z','bmxombchg33cf2p',3,'Lifting: How much difficulty do you have lifting objects?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.475Z',''),('NDI','default','2026-06-06 10:36:24.475Z','ydg1ql790yvyvxk',4,'Reading: How much difficulty do you have reading?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.475Z',''),('NDI','default','2026-06-06 10:36:24.475Z','o3kq4cqb6wmeay0',5,'Headaches: How severe are your headaches?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.475Z',''),('NDI','default','2026-06-06 10:36:24.476Z','6ldqu69e1od7n9t',6,'Concentration: How much difficulty do you have concentrating?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.476Z',''),('NDI','default','2026-06-06 10:36:24.476Z','fcvrwxqfyw735ei',7,'Work: How much difficulty do you have with work activities?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.476Z',''),('NDI','default','2026-06-06 10:36:24.476Z','vuqwapfzxxrtcz5',8,'Driving: How much difficulty do you have driving?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.476Z',''),('NDI','default','2026-06-06 10:36:24.476Z','tkr6mxwyvew5r6s',9,'Sleeping: How much difficulty do you have sleeping?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.476Z',''),('NDI','default','2026-06-06 10:36:24.476Z','ap8crhd711741zi',10,'Recreation: How much difficulty do you have with recreational activities?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:24.476Z',''),('ODI','default','2026-06-06 10:36:31.171Z','kz4ceu820of3jjd',1,'Pain Intensity: How would you rate your pain on a scale of 0-5?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.171Z',''),('ODI','default','2026-06-06 10:36:31.171Z','1h504ku6emyqhb9',2,'Personal Care (washing, dressing): How much difficulty do you have with personal care?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.171Z',''),('ODI','default','2026-06-06 10:36:31.171Z','87bdjzxhk2t7xaf',3,'Lifting: How much difficulty do you have lifting objects?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.171Z',''),('ODI','default','2026-06-06 10:36:31.171Z','vidsq3g85myjqy6',4,'Walking: How much difficulty do you have walking?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.171Z',''),('ODI','default','2026-06-06 10:36:31.171Z','ha1kn0fq16xhvl7',5,'Sitting: How much difficulty do you have sitting?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.171Z',''),('ODI','default','2026-06-06 10:36:31.172Z','1jhwrwmk4g115ob',6,'Standing: How much difficulty do you have standing?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.172Z',''),('ODI','default','2026-06-06 10:36:31.172Z','foyhkkggialq5hc',7,'Sleeping: How much difficulty do you have sleeping?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.172Z',''),('ODI','default','2026-06-06 10:36:31.172Z','xnircayry436f8k',8,'Social Life: How much difficulty do you have with social activities?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.172Z',''),('ODI','default','2026-06-06 10:36:31.172Z','z3crz26sjhgzjxr',9,'Traveling: How much difficulty do you have traveling?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.172Z',''),('ODI','default','2026-06-06 10:36:31.172Z','f1yjdrb4t6t9bnl',10,'Changing Degree of Intensity of Pain: How much does your pain change throughout the day?','\"{\'scale\': [0, 1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:31.172Z',''),('DASH','default','2026-06-06 10:36:40.753Z','qoamu40z50qj7rt',1,'Opening a tight or new jar: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.753Z','479jkcl86kpq6i8',2,'Writing: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.753Z','o5ikziuibh2vllf',3,'Turning a key: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.753Z','4yzjcacsjee0xr3',4,'Preparing a meal: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.753Z','frrdp2ealugjxu5',5,'Pushing open a heavy door: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.753Z','1pfghn8siod3dxl',6,'Placing an object on a shelf above your head: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.753Z',''),('DASH','default','2026-06-06 10:36:40.754Z','i62aw1a41tlgclq',7,'Doing laundry: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.754Z',''),('DASH','default','2026-06-06 10:36:40.754Z','maxy1vemc7l9qy3',8,'Bathing and dressing: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.754Z',''),('DASH','default','2026-06-06 10:36:40.754Z','4jyblflvdj7lilk',9,'Fastening buttons: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.754Z',''),('DASH','default','2026-06-06 10:36:40.754Z','jmb7lpa7cr4886i',10,'Cutting meat using a knife in your dominant hand: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.754Z',''),('DASH','default','2026-06-06 10:36:40.755Z','r6ffr29k3fx3c1d',11,'Carrying a bag or object weighing 10 lbs: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.755Z',''),('DASH','default','2026-06-06 10:36:40.755Z','igw8aart5q0cyrg',12,'Picking up a coin from a table: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.755Z',''),('DASH','default','2026-06-06 10:36:40.755Z','aqky8347itk6ol0',13,'Answering phone and talking: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.755Z',''),('DASH','default','2026-06-06 10:36:40.755Z','kwy0ip7sqz1d279',14,'Going shopping for groceries: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.755Z',''),('DASH','default','2026-06-06 10:36:40.755Z','9dhp07e685m9yul',15,'Sleeping: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:40.755Z',''),('DASH','default','2026-06-06 10:36:49.769Z','5fhalfoz7mf6yts',16,'Participating in recreational activities: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.769Z',''),('DASH','default','2026-06-06 10:36:49.769Z','lmiezzouiu4xmv7',17,'Throwing a ball overhand: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.769Z',''),('DASH','default','2026-06-06 10:36:49.770Z','co96sb87c0nhx51',18,'Working with your hands using tools or controls: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','zdvpjw20lr0zcpp',19,'Fine hand work: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','k7snb03rhnr669k',20,'Gripping or holding objects steady: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','2l2rxktiaomtiq1',21,'Heavy work or activities: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','jw3ckxfbaybb2dt',22,'Your usual work activities: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','hzzrg3g674bdld6',23,'Your usual hobbies or recreational activities: Is this difficult or impossible?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','s5az3srgxcaju02',24,'Arm, shoulder or hand pain: How much pain do you experience?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.770Z','0xvqwxbnf9lidk0',25,'Tingling in your arm, shoulder or hand: How much tingling do you experience?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.770Z',''),('DASH','default','2026-06-06 10:36:49.771Z','ux9ya0ubipakcok',26,'Weakness in your arm, shoulder or hand: How much weakness do you experience?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.771Z',''),('DASH','default','2026-06-06 10:36:49.771Z','1cy7g7ux8ut1pko',27,'Difficulty with your usual social activities: How much difficulty?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.771Z',''),('DASH','default','2026-06-06 10:36:49.771Z','lbf1lvhxevj05ma',28,'Feeling less capable: How much do you feel less capable?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.771Z',''),('DASH','default','2026-06-06 10:36:49.771Z','wq7d4cuk2bhvpr7',29,'Difficulty with work or other regular daily activities: How much difficulty?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.771Z',''),('DASH','default','2026-06-06 10:36:49.771Z','vgjtpkveybhx15d',30,'Concern about permanent damage: How much concern?','\"{\'scale\': [1, 2, 3, 4, 5]}\"','scale',0,'2026-06-06 10:36:49.771Z',''),('LEFS','default','2026-06-06 10:37:00.583Z','68shzz1sqvllk4f',1,'Any difficulty to do light activities around the house: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.583Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','6uohp8fy7318t8j',2,'Any difficulty to do heavy household chores: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','ywn9ynle4nlfdiz',3,'Any difficulty to do grocery shopping: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','e8640dbbq92hr90',4,'Any difficulty to walk between rooms: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','pr7ml2biix7ixku',5,'Any difficulty to walk a block on flat ground: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','72hhj9mxz9y2n80',6,'Any difficulty to climb stairs: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','yliultt2i0a2zb6',7,'Any difficulty to descend stairs: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.584Z','a2zkf1wqduknia0',8,'Any difficulty to stand on your feet: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.584Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','4qsdog65gyyy6vk',9,'Any difficulty to get into or out of bed: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','zhjyvtimywd30c4',10,'Any difficulty to get into or out of a chair: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','ynt9k2yd85kpi15',11,'Any difficulty to put on pants: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','y90jlhx8viodbxy',12,'Any difficulty to put on shoes: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','ryct5c0gmp38wpr',13,'Any difficulty to pick up an object from the floor: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','qqm7rkskx830g8k',14,'Any difficulty to perform light activities: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','3nh3swoi8pzcgzs',15,'Any difficulty to perform moderate activities: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','k99nx7x7edx02pk',16,'Any difficulty to perform heavy activities: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','sbdu8u9x0nl80d4',17,'Any difficulty to walk more than a mile: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.585Z','uzatvxb5bl50bfy',18,'Any difficulty to walk on uneven surfaces: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.585Z',''),('LEFS','default','2026-06-06 10:37:00.586Z','ty4bnzaq5uayzwf',19,'Any difficulty to step up or down curbs: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.586Z',''),('LEFS','default','2026-06-06 10:37:00.586Z','ao1rcdmdi68df85',20,'Any difficulty to keep up with others when walking: How much difficulty?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:00.586Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','hiybmov76w47lkq',1,'Pain - Nocturnal pain: How much pain at night?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','5mnuavz9c3ae71i',2,'Pain - Pain on standing: How much pain when standing?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','3ol2dwjg1w20eym',3,'Pain - Pain on walking: How much pain when walking?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','yfq2x1lagt6stwv',4,'Pain - Pain on stairs: How much pain on stairs?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','0e6b2l2222iyo0d',5,'Pain - Pain in bed: How much pain in bed?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','q7kr2wj3awausel',6,'Stiffness - Morning stiffness: How much morning stiffness?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','lid099ncmt5f9td',7,'Stiffness - Stiffness after activity: How much stiffness after activity?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.138Z','9ht16p6eojtgd7f',8,'Function - Descending stairs: How much difficulty descending stairs?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.138Z',''),('WOMAC','default','2026-06-06 10:37:08.139Z','a6y5gp7iaicjwvo',9,'Function - Ascending stairs: How much difficulty ascending stairs?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.139Z',''),('WOMAC','default','2026-06-06 10:37:08.139Z','8wf9fg4dbjpimmx',10,'Function - Rising from sitting: How much difficulty rising from sitting?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.139Z',''),('WOMAC','default','2026-06-06 10:37:08.139Z','xoauf6mh2r22v7b',11,'Function - Standing: How much difficulty standing?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.139Z',''),('WOMAC','default','2026-06-06 10:37:08.139Z','j02k7b9t9yz6f9m',12,'Function - Bending to floor: How much difficulty bending to floor?','\"{\'scale\': [0, 1, 2, 3, 4]}\"','scale',0,'2026-06-06 10:37:08.139Z',''),('NDI','system','2026-06-06 10:49:37.162Z','4iilmxmeqn3t994',1,'Pain Intensity - How would you rate your neck pain on a scale of 0-5?','[{\"label\":\"No pain\",\"value\":0},{\"label\":\"Mild pain\",\"value\":1},{\"label\":\"Moderate pain\",\"value\":2},{\"label\":\"Fairly severe pain\",\"value\":3},{\"label\":\"Very severe pain\",\"value\":4},{\"label\":\"Worst imaginable pain\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.162Z','Rate your current neck pain intensity'),('NDI','system','2026-06-06 10:49:37.163Z','rqgmcpwe7efxiyv',2,'Personal Care (washing, dressing) - How much difficulty do you have with personal care?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to perform\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with washing and dressing'),('NDI','system','2026-06-06 10:49:37.163Z','xjdadzxbmj4qrzx',3,'Lifting - How much difficulty do you have lifting objects?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to lift\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with lifting activities'),('NDI','system','2026-06-06 10:49:37.163Z','f3hse5kxy5p8upg',4,'Reading - How much difficulty do you have reading?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to read\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with reading activities'),('NDI','system','2026-06-06 10:49:37.163Z','bcd5z9gkc2825ok',5,'Headaches - How often do you experience headaches?','[{\"label\":\"No headaches\",\"value\":0},{\"label\":\"Occasional headaches\",\"value\":1},{\"label\":\"Frequent headaches\",\"value\":2},{\"label\":\"Very frequent headaches\",\"value\":3},{\"label\":\"Constant headaches\",\"value\":4},{\"label\":\"Severe constant headaches\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate frequency of headaches'),('NDI','system','2026-06-06 10:49:37.163Z','5r3qqkvy3fl3mpu',6,'Concentration - How much difficulty do you have concentrating?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to concentrate\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with concentration'),('NDI','system','2026-06-06 10:49:37.163Z','gph6q6lu9ew553p',7,'Work - How much difficulty do you have with work activities?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to work\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with work-related activities'),('NDI','system','2026-06-06 10:49:37.163Z','s9rzd95taiizp3g',8,'Driving - How much difficulty do you have driving?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to drive\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.163Z','Rate difficulty with driving'),('NDI','system','2026-06-06 10:49:37.164Z','82qi2xmj6nrv56c',9,'Sleeping - How much difficulty do you have sleeping?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to sleep\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with sleep'),('NDI','system','2026-06-06 10:49:37.164Z','aiqbmtlapwtw0j1',10,'Recreation - How much difficulty do you have with recreational activities?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to participate\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with recreational activities'),('ODI','system','2026-06-06 10:49:37.164Z','sk0b55qxxkgsp6n',1,'Pain Intensity - How would you rate your back pain on a scale of 0-5?','[{\"label\":\"No pain\",\"value\":0},{\"label\":\"Mild pain\",\"value\":1},{\"label\":\"Moderate pain\",\"value\":2},{\"label\":\"Fairly severe pain\",\"value\":3},{\"label\":\"Very severe pain\",\"value\":4},{\"label\":\"Worst imaginable pain\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate your current back pain intensity'),('ODI','system','2026-06-06 10:49:37.164Z','d8u7w98tqop4xiz',2,'Personal Care - How much difficulty do you have with personal care?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to perform\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with washing and dressing'),('ODI','system','2026-06-06 10:49:37.164Z','onafnon5crk5tsu',3,'Lifting - How much difficulty do you have lifting objects?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to lift\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with lifting activities'),('ODI','system','2026-06-06 10:49:37.164Z','qah0t3xrfchvzjs',4,'Walking - How much difficulty do you have walking?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to walk\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with walking'),('ODI','system','2026-06-06 10:49:37.164Z','u7u1hiep76z9o6g',5,'Sitting - How much difficulty do you have sitting?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to sit\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with sitting'),('ODI','system','2026-06-06 10:49:37.164Z','s46xu8gqyf64wal',6,'Standing - How much difficulty do you have standing?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to stand\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.164Z','Rate difficulty with standing'),('ODI','system','2026-06-06 10:49:37.165Z','y2aifbc3o3uma4t',7,'Sleeping - How much difficulty do you have sleeping?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to sleep\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.165Z','Rate difficulty with sleep'),('ODI','system','2026-06-06 10:49:37.165Z','0lbutetvimo07r0',8,'Social Life - How much difficulty do you have with social activities?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to participate\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.165Z','Rate difficulty with social activities'),('ODI','system','2026-06-06 10:49:37.165Z','o2qyrup980bkxzf',9,'Traveling - How much difficulty do you have traveling?','[{\"label\":\"No difficulty\",\"value\":0},{\"label\":\"Slight difficulty\",\"value\":1},{\"label\":\"Moderate difficulty\",\"value\":2},{\"label\":\"Fairly severe difficulty\",\"value\":3},{\"label\":\"Very severe difficulty\",\"value\":4},{\"label\":\"Unable to travel\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.165Z','Rate difficulty with traveling'),('ODI','system','2026-06-06 10:49:37.165Z','au66o5ct0y04ntr',10,'Changing Degree of Intensity - How much does pain change with activity?','[{\"label\":\"No change\",\"value\":0},{\"label\":\"Slight change\",\"value\":1},{\"label\":\"Moderate change\",\"value\":2},{\"label\":\"Fairly severe change\",\"value\":3},{\"label\":\"Very severe change\",\"value\":4},{\"label\":\"Extreme change\",\"value\":5}]','scale',0,'2026-06-06 10:49:37.165Z','Rate how pain intensity changes with activity');
/*!40000 ALTER TABLE `AssessmentQuestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentResponses`
--

DROP TABLE IF EXISTS `AssessmentResponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentResponses` (
  `assigned_assessment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_number` decimal(10,0) NOT NULL,
  `response_value` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentResponses`
--

LOCK TABLES `AssessmentResponses` WRITE;
/*!40000 ALTER TABLE `AssessmentResponses` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssessmentResponses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentScores`
--

DROP TABLE IF EXISTS `AssessmentScores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentScores` (
  `assigned_assessment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `interpretation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentage_score` decimal(10,0) NOT NULL,
  `raw_score` decimal(10,0) NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_score` decimal(10,0) NOT NULL,
  `subscale_scores` text COLLATE utf8mb4_unicode_ci,
  `clinical_summary` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentScores`
--

LOCK TABLES `AssessmentScores` WRITE;
/*!40000 ALTER TABLE `AssessmentScores` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssessmentScores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentSummaries`
--

DROP TABLE IF EXISTS `AssessmentSummaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentSummaries` (
  `assessment_score_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinical_summary` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `next_assessment_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recommendations` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trend_analysis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentSummaries`
--

LOCK TABLES `AssessmentSummaries` WRITE;
/*!40000 ALTER TABLE `AssessmentSummaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssessmentSummaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssessmentTypes`
--

DROP TABLE IF EXISTS `AssessmentTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssessmentTypes` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `scale_max` decimal(10,0) NOT NULL,
  `scale_min` decimal(10,0) NOT NULL,
  `scoring_formula` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_items` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `questions_count` decimal(10,0) NOT NULL,
  `estimated_time` decimal(10,0) NOT NULL,
  `active` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssessmentTypes`
--

LOCK TABLES `AssessmentTypes` WRITE;
/*!40000 ALTER TABLE `AssessmentTypes` DISABLE KEYS */;
INSERT INTO `AssessmentTypes` VALUES ('default','2026-06-06 10:33:19.217Z','Neck Disability Index - measures functional limitation in patients with neck pain','slwdpu497vvfc3a','NDI',50,0,'Sum of all items (0-50), percentage = (raw_score/50)*100',10,'2026-06-06 10:33:19.217Z',0,0,0),('default','2026-06-06 10:33:19.217Z','Oswestry Disability Index - measures functional limitation in patients with low back pain','0qepcpiqq7sk7wr','ODI',50,0,'Sum of all items (0-50), percentage = (raw_score/50)*100',10,'2026-06-06 10:33:19.217Z',0,0,0),('default','2026-06-06 10:33:19.218Z','Disabilities of the Arm, Shoulder and Hand - measures upper extremity function','rr6895xuecwvudz','DASH',100,0,'[(sum of responses/30)-1]*25, range 0-100',30,'2026-06-06 10:33:19.218Z',0,0,0),('default','2026-06-06 10:33:19.218Z','Lower Extremity Functional Scale - measures lower extremity function','as5n118itw6i2bs','LEFS',80,0,'Sum of all items (0-80), percentage = (raw_score/80)*100',20,'2026-06-06 10:33:19.218Z',0,0,0),('default','2026-06-06 10:33:19.218Z','Western Ontario and McMaster Universities Osteoarthritis Index - measures knee/hip osteoarthritis','6f93oqy0r9w9lry','WOMAC',96,0,'Sum of all items (0-96), percentage = (raw_score/96)*100',24,'2026-06-06 10:33:19.218Z',0,0,0),('default','2026-06-06 10:33:19.218Z','Knee Injury and Osteoarthritis Outcome Score - comprehensive knee assessment','7nc8pk36vymojbu','KOOS',100,0,'Subscale scoring: Pain (0-100), Symptoms (0-100), ADL (0-100), Sport (0-100), QOL (0-100)',42,'2026-06-06 10:33:19.218Z',0,0,0),('default','2026-06-06 10:33:19.218Z','Hip Disability and Osteoarthritis Outcome Score - comprehensive hip assessment','rfrcpd0cix824zk','HOOS',100,0,'Subscale scoring: Pain (0-100), Symptoms (0-100), ADL (0-100), Sport (0-100), QOL (0-100)',40,'2026-06-06 10:33:19.218Z',0,0,0),('default','2026-06-06 10:36:15.239Z','Neck Disability Index','17tqmlat920z8sb','NDI',5,0,'',10,'2026-06-06 10:36:15.239Z',0,0,0),('default','2026-06-06 10:36:15.239Z','Oswestry Disability Index','oohjtfvfjugx3si','ODI',5,0,'',10,'2026-06-06 10:36:15.239Z',0,0,0),('default','2026-06-06 10:36:15.240Z','Disabilities of the Arm, Shoulder and Hand','12rh2tno3l4k3ku','DASH',5,1,'',30,'2026-06-06 10:36:15.240Z',0,0,0),('default','2026-06-06 10:36:15.240Z','Lower Extremity Functional Scale','6t0ost0za1xlx96','LEFS',4,0,'',20,'2026-06-06 10:36:15.240Z',0,0,0),('default','2026-06-06 10:36:15.240Z','Western Ontario and McMaster Universities Osteoarthritis Index','nk5xrl3cjlujdm4','WOMAC',4,0,'',24,'2026-06-06 10:36:15.240Z',0,0,0),('default','2026-06-06 10:36:15.240Z','Knee Injury and Osteoarthritis Outcome Score','dfxp9u2or5hj2s6','KOOS',4,0,'',42,'2026-06-06 10:36:15.240Z',0,0,0),('default','2026-06-06 10:36:15.240Z','Hip Disability and Osteoarthritis Outcome Score','f4l9c6xolnvm2br','HOOS',4,0,'',40,'2026-06-06 10:36:15.240Z',0,0,0),('system','2026-06-06 10:49:20.039Z','Neck Disability Index - Measures functional limitation in patients with neck pain','gm5rt6pzxejcbbu','NDI',50,0,'',10,'2026-06-06 10:49:20.039Z',10,5,1),('system','2026-06-06 10:49:20.040Z','Oswestry Disability Index - Measures functional limitation in patients with low back pain','86e9rnjicnk7g37','ODI',50,0,'',10,'2026-06-06 10:49:20.040Z',10,5,1),('system','2026-06-06 10:49:20.040Z','Disabilities of the Arm, Shoulder and Hand - Measures upper extremity function','krngjvznugml3hm','DASH',150,0,'',30,'2026-06-06 10:49:20.040Z',30,10,1),('system','2026-06-06 10:49:20.040Z','Lower Extremity Functional Scale - Measures lower extremity function','rqjnhm4kekrwmr4','LEFS',80,0,'',20,'2026-06-06 10:49:20.040Z',20,8,1),('system','2026-06-06 10:49:20.040Z','Western Ontario and McMaster Universities Osteoarthritis Index - Measures knee and hip osteoarthritis','m5djw1dekfw3kta','WOMAC',96,0,'',24,'2026-06-06 10:49:20.040Z',24,10,1),('system','2026-06-06 10:49:20.040Z','Knee Injury and Osteoarthritis Outcome Score - Comprehensive knee assessment with subscales','qenq5105woafrgi','KOOS',100,0,'',42,'2026-06-06 10:49:20.040Z',42,15,1),('system','2026-06-06 10:49:20.040Z','Hip Disability and Osteoarthritis Outcome Score - Comprehensive hip assessment with subscales','c7eixlc3mi5f9c5','HOOS',100,0,'',40,'2026-06-06 10:49:20.040Z',40,15,1);
/*!40000 ALTER TABLE `AssessmentTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AssignedAssessments`
--

DROP TABLE IF EXISTS `AssignedAssessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AssignedAssessments` (
  `assessment_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assessment_type_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinical_indication` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AssignedAssessments`
--

LOCK TABLES `AssignedAssessments` WRITE;
/*!40000 ALTER TABLE `AssignedAssessments` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssignedAssessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SOAPHistory`
--

DROP TABLE IF EXISTS `SOAPHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SOAPHistory` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` bigint NOT NULL,
  `generated_soap` text COLLATE utf8mb4_unicode_ci,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `input_notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SOAPHistory`
--

LOCK TABLES `SOAPHistory` WRITE;
/*!40000 ALTER TABLE `SOAPHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `SOAPHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SOAPNotes`
--

DROP TABLE IF EXISTS `SOAPNotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SOAPNotes` (
  `assessment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `objective` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `[plan]` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subjective` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SOAPNotes`
--

LOCK TABLES `SOAPNotes` WRITE;
/*!40000 ALTER TABLE `SOAPNotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `SOAPNotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_authOrigins`
--

DROP TABLE IF EXISTS `_authOrigins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_authOrigins` (
  `collectionRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fingerprint` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_authOrigins`
--

LOCK TABLES `_authOrigins` WRITE;
/*!40000 ALTER TABLE `_authOrigins` DISABLE KEYS */;
/*!40000 ALTER TABLE `_authOrigins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_collections`
--

DROP TABLE IF EXISTS `_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_collections` (
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `system` bigint NOT NULL,
  `type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fields` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `indexes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `listRule` text COLLATE utf8mb4_unicode_ci,
  `viewRule` text COLLATE utf8mb4_unicode_ci,
  `createRule` text COLLATE utf8mb4_unicode_ci,
  `updateRule` text COLLATE utf8mb4_unicode_ci,
  `deleteRule` text COLLATE utf8mb4_unicode_ci,
  `options` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_collections`
--

LOCK TABLES `_collections` WRITE;
/*!40000 ALTER TABLE `_collections` DISABLE KEYS */;
INSERT INTO `_collections` VALUES ('pbc_2279338944',1,'base','_mfas','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text455797646\",\"max\":0,\"min\":0,\"name\":\"collectionRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text127846527\",\"max\":0,\"min\":0,\"name\":\"recordRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1582905952\",\"max\":0,\"min\":0,\"name\":\"method\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":true,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":true,\"type\":\"autodate\"}]','[\"CREATE INDEX `idx_mfas_collectionRef_recordRef` ON `_mfas` (collectionRef,recordRef)\"]','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId',NULL,NULL,NULL,'{}','2026-06-06 09:00:21.318Z','2026-06-06 09:00:21.318Z'),('pbc_1638494021',1,'base','_otps','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text455797646\",\"max\":0,\"min\":0,\"name\":\"collectionRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text127846527\",\"max\":0,\"min\":0,\"name\":\"recordRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"cost\":8,\"help\":\"\",\"hidden\":true,\"id\":\"password901924565\",\"max\":0,\"min\":0,\"name\":\"password\",\"pattern\":\"\",\"presentable\":false,\"required\":true,\"system\":true,\"type\":\"password\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":true,\"id\":\"text3866985172\",\"max\":0,\"min\":0,\"name\":\"sentTo\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":true,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":true,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":true,\"type\":\"autodate\"}]','[\"CREATE INDEX `idx_otps_collectionRef_recordRef` ON `_otps` (collectionRef, recordRef)\"]','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId',NULL,NULL,NULL,'{}','2026-06-06 09:00:21.321Z','2026-06-06 09:00:21.321Z'),('pbc_2281828961',1,'base','_externalAuths','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text455797646\",\"max\":0,\"min\":0,\"name\":\"collectionRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text127846527\",\"max\":0,\"min\":0,\"name\":\"recordRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2462348188\",\"max\":0,\"min\":0,\"name\":\"provider\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1044722854\",\"max\":0,\"min\":0,\"name\":\"providerId\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":true,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":true,\"type\":\"autodate\"}]','[\"CREATE UNIQUE INDEX `idx_externalAuths_record_provider` ON `_externalAuths` (collectionRef, recordRef, provider)\",\"CREATE UNIQUE INDEX `idx_externalAuths_collection_provider` ON `_externalAuths` (collectionRef, provider, providerId)\"]','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId',NULL,NULL,'@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','{}','2026-06-06 09:00:21.322Z','2026-06-06 09:00:21.322Z'),('pbc_4275539003',1,'base','_authOrigins','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text455797646\",\"max\":0,\"min\":0,\"name\":\"collectionRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text127846527\",\"max\":0,\"min\":0,\"name\":\"recordRef\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4228609354\",\"max\":0,\"min\":0,\"name\":\"fingerprint\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":true,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":true,\"type\":\"autodate\"}]','[\"CREATE UNIQUE INDEX `idx_authOrigins_unique_pairs` ON `_authOrigins` (collectionRef, recordRef, fingerprint)\"]','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId',NULL,NULL,'@request.auth.id != \'\' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId','{}','2026-06-06 09:00:21.324Z','2026-06-06 09:00:21.324Z'),('pbc_3142635823',1,'auth','_superusers','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"cost\":0,\"help\":\"\",\"hidden\":true,\"id\":\"password901924565\",\"max\":0,\"min\":8,\"name\":\"password\",\"pattern\":\"\",\"presentable\":false,\"required\":true,\"system\":true,\"type\":\"password\"},{\"autogeneratePattern\":\"[a-zA-Z0-9]{50}\",\"help\":\"\",\"hidden\":true,\"id\":\"text2504183744\",\"max\":60,\"min\":30,\"name\":\"tokenKey\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"exceptDomains\":null,\"help\":\"\",\"hidden\":false,\"id\":\"email3885137012\",\"name\":\"email\",\"onlyDomains\":null,\"presentable\":false,\"required\":true,\"system\":true,\"type\":\"email\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool1547992806\",\"name\":\"emailVisibility\",\"presentable\":false,\"required\":false,\"system\":true,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool256245529\",\"name\":\"verified\",\"presentable\":false,\"required\":false,\"system\":true,\"type\":\"bool\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":true,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":true,\"type\":\"autodate\"}]','[\"CREATE UNIQUE INDEX `idx_tokenKey_pbc_3142635823` ON `_superusers` (`tokenKey`)\",\"CREATE UNIQUE INDEX `idx_email_pbc_3142635823` ON `_superusers` (`email`) WHERE `email` != \'\'\"]',NULL,NULL,NULL,NULL,NULL,'{\"authRule\":\"\",\"manageRule\":null,\"authAlert\":{\"enabled\":false,\"emailTemplate\":{\"subject\":\"Login from a new location\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eWe noticed a login to your {APP_NAME} account from a new location:\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003cem\\u003e{ALERT_INFO}\\u003c/em\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003cstrong\\u003eIf this wasn\'t you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.\\u003c/strong\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003eIf this was you, you may disregard this email.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}},\"oauth2\":{\"providers\":null,\"mappedFields\":{\"id\":\"\",\"name\":\"\",\"username\":\"\",\"avatarURL\":\"\"},\"enabled\":false},\"passwordAuth\":{\"enabled\":true,\"identityFields\":[\"email\"]},\"mfa\":{\"enabled\":false,\"duration\":600,\"rule\":\"\"},\"otp\":{\"enabled\":false,\"duration\":180,\"length\":8,\"emailTemplate\":{\"subject\":\"OTP for {APP_NAME}\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eYour one-time password is: \\u003cstrong\\u003e{OTP}\\u003c/strong\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask for the one-time password, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}},\"authToken\":{\"secret\":\"R3L6SRI64Qldr8AGJBiGNFLxpHD2aVwYDvqOrDGs7KjYfZUz30\",\"duration\":86400},\"passwordResetToken\":{\"secret\":\"mOb0YBP5K6o8bFLBayfRmYiN1a2t02EVVhTPt85hD6WpMH9220\",\"duration\":1800},\"emailChangeToken\":{\"secret\":\"bnQNiPpmPVmx6JJdEsAFmOC4LhgzTZJWDip3MT7eUmw0rvyOiO\",\"duration\":1800},\"verificationToken\":{\"secret\":\"PxBDB3lCMqdewGz9Pj40sx7ZZwkPMTCmQXEMUCjhbQ806zgaJn\",\"duration\":259200},\"fileToken\":{\"secret\":\"TPIvrZEiAp6WIeTLGAg2Xnm0wHyvZSqPyqcpUIiFrphZuMsom0\",\"duration\":180},\"verificationTemplate\":{\"subject\":\"Verify your {APP_NAME} email\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eThank you for joining us at {APP_NAME}.\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to verify your email address.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eVerify\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"},\"resetPasswordTemplate\":{\"subject\":\"Reset your {APP_NAME} password\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to reset your password.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eReset password\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask to reset your password, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"},\"confirmEmailChangeTemplate\":{\"subject\":\"Confirm your {APP_NAME} new email address\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to confirm your new email address.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eConfirm new email\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask to change your email address, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}}','2026-06-06 09:00:21.326Z','2026-06-06 09:00:21.536Z'),('_pb_users_auth_',0,'auth','users','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"cost\":0,\"help\":\"\",\"hidden\":true,\"id\":\"password901924565\",\"max\":0,\"min\":8,\"name\":\"password\",\"pattern\":\"\",\"presentable\":false,\"required\":true,\"system\":true,\"type\":\"password\"},{\"autogeneratePattern\":\"[a-zA-Z0-9]{50}\",\"help\":\"\",\"hidden\":true,\"id\":\"text2504183744\",\"max\":60,\"min\":30,\"name\":\"tokenKey\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":true,\"type\":\"text\"},{\"exceptDomains\":null,\"help\":\"\",\"hidden\":false,\"id\":\"email3885137012\",\"name\":\"email\",\"onlyDomains\":null,\"presentable\":false,\"required\":true,\"system\":true,\"type\":\"email\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool1547992806\",\"name\":\"emailVisibility\",\"presentable\":false,\"required\":false,\"system\":true,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool256245529\",\"name\":\"verified\",\"presentable\":false,\"required\":false,\"system\":true,\"type\":\"bool\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1579384326\",\"max\":255,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file376926767\",\"maxSelect\":1,\"maxSize\":0,\"mimeTypes\":[\"image/jpeg\",\"image/png\",\"image/svg+xml\",\"image/gif\",\"image/webp\"],\"name\":\"avatar\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":null,\"type\":\"file\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text214051540\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3687080900\",\"max\":0,\"min\":0,\"name\":\"full_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1864495378\",\"max\":0,\"min\":0,\"name\":\"invite_code\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1466534506\",\"maxSelect\":0,\"name\":\"role\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"admin\",\"therapist\",\"patient\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2342670727\",\"max\":0,\"min\":0,\"name\":\"medical_diagnosis\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1639485573\",\"max\":0,\"min\":0,\"name\":\"medical_history\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2367274779\",\"max\":0,\"min\":0,\"name\":\"allergies\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3466145612\",\"max\":0,\"min\":0,\"name\":\"emergency_contact_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3537274114\",\"max\":0,\"min\":0,\"name\":\"emergency_contact_phone\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2708992096\",\"max\":0,\"min\":0,\"name\":\"assigned_therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool556177805\",\"name\":\"notification_email\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool826740544\",\"name\":\"notification_sms\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool3875954014\",\"name\":\"notification_push\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"}]','[\"CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `users` (`tokenKey`)\",\"CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `users` (`email`) WHERE `email` != \'\'\"]','id = @request.auth.id','id = @request.auth.id','','id = @request.auth.id','id = @request.auth.id','{\"authRule\":\"\",\"manageRule\":null,\"authAlert\":{\"enabled\":false,\"emailTemplate\":{\"subject\":\"Login from a new location\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eWe noticed a login to your {APP_NAME} account from a new location:\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003cem\\u003e{ALERT_INFO}\\u003c/em\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003cstrong\\u003eIf this wasn\'t you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.\\u003c/strong\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003eIf this was you, you may disregard this email.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}},\"oauth2\":{\"providers\":null,\"mappedFields\":{\"id\":\"\",\"name\":\"name\",\"username\":\"\",\"avatarURL\":\"avatar\"},\"enabled\":false},\"passwordAuth\":{\"enabled\":true,\"identityFields\":[\"email\"]},\"mfa\":{\"enabled\":false,\"duration\":600,\"rule\":\"\"},\"otp\":{\"enabled\":false,\"duration\":180,\"length\":8,\"emailTemplate\":{\"subject\":\"OTP for {APP_NAME}\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eYour one-time password is: \\u003cstrong\\u003e{OTP}\\u003c/strong\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask for the one-time password, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}},\"authToken\":{\"secret\":\"0JmpLRYR8t6PDCLlzeIYGVEhTv2zqDTbD6qs62P7lXUWUGBNY9\",\"duration\":604800},\"passwordResetToken\":{\"secret\":\"llrKKyldego67F4IEw0ZGIlxr2gTkQkQVOOTUqC99YCshI2K9P\",\"duration\":1800},\"emailChangeToken\":{\"secret\":\"qoxK494y7mddcpb9bxXVHN75TnStWXkTRAcQNgJoqMCzpOV25g\",\"duration\":1800},\"verificationToken\":{\"secret\":\"dcncKuMOPCYCRzmj4ZxGUx5n6oL7FBF7sRpJyoWCEef7ttRboY\",\"duration\":259200},\"fileToken\":{\"secret\":\"n4IRKq0k8TfhdGZdYNR4b7jsCKTHA3jZwcLMrInipVxCMksHFZ\",\"duration\":180},\"verificationTemplate\":{\"subject\":\"Verify your {APP_NAME} email\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eThank you for joining us at {APP_NAME}.\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to verify your email address.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eVerify\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"},\"resetPasswordTemplate\":{\"subject\":\"Reset your {APP_NAME} password\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to reset your password.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eReset password\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask to reset your password, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"},\"confirmEmailChangeTemplate\":{\"subject\":\"Confirm your {APP_NAME} new email address\",\"body\":\"\\u003cp\\u003eHello,\\u003c/p\\u003e\\n\\u003cp\\u003eClick on the button below to confirm your new email address.\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  \\u003ca class=\\\"btn\\\" href=\\\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\"\\u003eConfirm new email\\u003c/a\\u003e\\n\\u003c/p\\u003e\\n\\u003cp\\u003e\\u003ci\\u003eIf you didn\'t ask to change your email address, you can ignore this email.\\u003c/i\\u003e\\u003c/p\\u003e\\n\\u003cp\\u003e\\n  Thanks,\\u003cbr/\\u003e\\n  {APP_NAME} team\\n\\u003c/p\\u003e\"}}','2026-06-06 09:00:21.329Z','2026-06-06 23:54:13.769Z'),('pbc_8190624404',0,'base','clinics','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1565584858\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4585730952\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0802215234\",\"max\":0,\"min\":0,\"name\":\"phone\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6042369312\",\"max\":0,\"min\":0,\"name\":\"address\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8200534585\",\"max\":0,\"min\":0,\"name\":\"city\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7580029161\",\"max\":0,\"min\":0,\"name\":\"created_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5626640291\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1437058887\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','created_by = @request.auth.id','created_by = @request.auth.id','@request.auth.id != \'\'','created_by = @request.auth.id','created_by = @request.auth.id','{}','2026-06-06 09:00:56.159Z','2026-06-06 09:00:56.159Z'),('pbc_2576830385',0,'base','therapists','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3942362429\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1822711184\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"exceptDomains\":[],\"help\":\"\",\"hidden\":false,\"id\":\"email1587405541\",\"name\":\"email\",\"onlyDomains\":[],\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"email\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4629877760\",\"max\":0,\"min\":0,\"name\":\"phone\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7227698183\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4687698703\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8954226282\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 09:00:58.964Z','2026-06-06 09:00:58.964Z'),('pbc_6112072486',0,'base','patients','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text6065189553\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4978071339\",\"max\":0,\"min\":0,\"name\":\"full_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select3960973273\",\"maxSelect\":1,\"name\":\"gender\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Male\",\"Female\",\"Other\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"date1438463238\",\"max\":\"\",\"min\":\"\",\"name\":\"date_of_birth\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3067426215\",\"max\":0,\"min\":0,\"name\":\"phone\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"exceptDomains\":[],\"help\":\"\",\"hidden\":false,\"id\":\"email9143290300\",\"name\":\"email\",\"onlyDomains\":[],\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"email\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0014985836\",\"max\":0,\"min\":0,\"name\":\"address\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3587282459\",\"max\":0,\"min\":0,\"name\":\"occupation\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4401972727\",\"max\":0,\"min\":0,\"name\":\"main_complaint\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1610711701\",\"max\":0,\"min\":0,\"name\":\"diagnosis\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select6330706755\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Inactive\",\"Discharged\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0352481756\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4493176051\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6023116228\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','@request.auth.id != \'\'','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:00:25.521Z','2026-06-06 10:00:25.521Z'),('pbc_4062534945',0,'base','appointments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8544585704\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0683839514\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2574717145\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date1214714015\",\"max\":\"\",\"min\":\"\",\"name\":\"date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1697125313\",\"max\":0,\"min\":0,\"name\":\"time\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8268220900\",\"max\":120,\"min\":30,\"name\":\"duration\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1611836609\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Scheduled\",\"Confirmed\",\"Completed\",\"Cancelled\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5981990802\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6671063000\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0429027333\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6262129716\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0547940642\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4049218805\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:05:00.658Z','2026-06-06 10:05:00.658Z'),('pbc_8653817219',0,'base','exercises','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7177989174\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1105050740\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7577012990\",\"maxSelect\":1,\"name\":\"body_region\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck\",\"Shoulder\",\"Elbow\",\"Wrist\",\"Upper Back\",\"Lower Back\",\"Hip\",\"Knee\",\"Ankle\",\"Balance\",\"Mobility\",\"Strengthening\",\"Stretching\",\"Post Operative\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select9138262742\",\"maxSelect\":1,\"name\":\"difficulty\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Beginner\",\"Intermediate\",\"Advanced\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select1307416341\",\"maxSelect\":1,\"name\":\"category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck\",\"Shoulder\",\"Elbow\",\"Wrist\",\"Upper Back\",\"Lower Back\",\"Hip\",\"Knee\",\"Ankle\",\"Balance\",\"Mobility\",\"Strengthening\",\"Stretching\",\"Post Operative\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1491128154\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3548444367\",\"max\":0,\"min\":0,\"name\":\"instructions\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9046197829\",\"max\":0,\"min\":0,\"name\":\"contraindications\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7975652627\",\"max\":0,\"min\":0,\"name\":\"progression_tips\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5263687802\",\"max\":0,\"min\":0,\"name\":\"target_muscles\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3266238044\",\"max\":0,\"min\":0,\"name\":\"thumbnail_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5198637815\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1897528489\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7471416890\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2560465762\",\"max\":0,\"min\":0,\"name\":\"slug\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json1678972570\",\"maxSize\":0,\"name\":\"equipment_needed\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1924002338\",\"max\":0,\"min\":0,\"name\":\"gif_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3796722044\",\"max\":null,\"min\":null,\"name\":\"times_assigned\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number927737069\",\"max\":null,\"min\":null,\"name\":\"completion_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text385774305\",\"max\":0,\"min\":0,\"name\":\"updated_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file250577066\",\"maxSelect\":1,\"maxSize\":104857600,\"mimeTypes\":null,\"name\":\"video_url\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":null,\"type\":\"file\"}]','[\"CREATE INDEX idx_exercises_clinic_id ON exercises (clinic_id)\",\"CREATE INDEX idx_exercises_name ON exercises (name)\",\"CREATE INDEX idx_exercises_body_region ON exercises (body_region)\",\"CREATE INDEX idx_exercises_category ON exercises (category)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','@request.auth.id != \'\'','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:10:54.564Z','2026-06-06 11:56:48.136Z'),('pbc_4294685650',0,'base','exercise_programs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5137435383\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2768838382\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0820669367\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8157174736\",\"max\":0,\"min\":0,\"name\":\"clinical_goal\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select8849423068\",\"maxSelect\":1,\"name\":\"body_region\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck\",\"Shoulder\",\"Elbow\",\"Wrist\",\"Upper Back\",\"Lower Back\",\"Hip\",\"Knee\",\"Ankle\",\"Balance\",\"Mobility\",\"Strengthening\",\"Stretching\",\"Post Operative\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select4788677584\",\"maxSelect\":1,\"name\":\"expected_duration\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"2 weeks\",\"4 weeks\",\"6 weeks\",\"8 weeks\",\"12 weeks\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json2223741900\",\"maxSize\":0,\"name\":\"exercises\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1999889665\",\"max\":0,\"min\":0,\"name\":\"created_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5565319213\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select6749541409\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Archived\",\"Draft\"]},{\"hidden\":false,\"id\":\"autodate1161838960\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2397951430\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool2302189941\",\"name\":\"ai_generated\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1648637086\",\"max\":100,\"min\":0,\"name\":\"ai_confidence_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1678077468\",\"max\":0,\"min\":0,\"name\":\"ai_prompt\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','@request.auth.id != \'\'','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:10:56.439Z','2026-06-06 10:21:20.124Z'),('pbc_1625589437',0,'base','program_assignments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1126631972\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2329090229\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6866045475\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9362066239\",\"name\":\"assigned_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date4720688940\",\"max\":\"\",\"min\":\"\",\"name\":\"start_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date5703457996\",\"max\":\"\",\"min\":\"\",\"name\":\"end_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5253429732\",\"max\":0,\"min\":0,\"name\":\"therapist_notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1638264207\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Completed\",\"Paused\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5480411340\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0068082840\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8356128219\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','@request.auth.id != \'\'','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:10:58.435Z','2026-06-06 10:10:58.435Z'),('pbc_3459757179',0,'base','exercise_completions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4135991600\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6493502337\",\"max\":0,\"min\":0,\"name\":\"assignment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0396551977\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date3781721570\",\"max\":\"\",\"min\":\"\",\"name\":\"date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool3321259829\",\"name\":\"completed\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1197679707\",\"max\":10,\"min\":0,\"name\":\"pain_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5150141911\",\"max\":0,\"min\":0,\"name\":\"comments\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0880904691\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5395865718\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7599707660\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id || @request.auth.id != \'\'','clinic_id = @request.auth.clinic_id || @request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:11:00.256Z','2026-06-06 10:11:00.256Z'),('pbc_1249363206',0,'base','categories','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1388066311\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4523760767\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9472242367\",\"max\":0,\"min\":0,\"name\":\"slug\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5900740722\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1677813487\",\"max\":0,\"min\":0,\"name\":\"parent_category_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1854752061\",\"max\":0,\"min\":0,\"name\":\"icon_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0409759398\",\"max\":0,\"min\":0,\"name\":\"color\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select4115731484\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Inactive\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"number0938624827\",\"max\":null,\"min\":null,\"name\":\"exercise_count\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0222715902\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4285957792\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1497044093\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_categories_clinic_id ON categories (clinic_id)\",\"CREATE UNIQUE INDEX idx_categories_slug ON categories (slug)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:16:18.268Z','2026-06-06 10:16:27.463Z'),('pbc_4435432641',0,'base','exercise_statistics','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7262092869\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7012587708\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1289247007\",\"max\":null,\"min\":null,\"name\":\"times_assigned\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2413827413\",\"max\":null,\"min\":null,\"name\":\"completion_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4047388692\",\"max\":null,\"min\":null,\"name\":\"average_pain_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date7327271005\",\"max\":\"\",\"min\":\"\",\"name\":\"last_assigned_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0377025932\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1568708033\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1485445430\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_exercise_statistics_exercise_id ON exercise_statistics (exercise_id)\",\"CREATE INDEX idx_exercise_statistics_clinic_id ON exercise_statistics (clinic_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:16:21.267Z','2026-06-06 11:28:25.257Z'),('pbc_1532537174',0,'base','_integratedAiMessages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2504183744\",\"max\":0,\"min\":0,\"name\":\"userId\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1847655498\",\"maxSelect\":1,\"name\":\"role\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"user\",\"assistant\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json4129592018\",\"maxSize\":0,\"name\":\"content\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"json\"},{\"hidden\":false,\"id\":\"autodate2990389176\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX `idx_WPAhfnyyQ7` ON `_integratedAiMessages` (`userId`)\"]','@request.auth.id != \'\' && userId = @request.auth.id',NULL,NULL,NULL,'@request.auth.id != \'\' && userId = @request.auth.id','{}','2026-06-06 10:20:40.820Z','2026-06-06 10:20:40.820Z'),('pbc_2232612556',0,'base','_integratedAiImages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3208210256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file1542800728\",\"maxSelect\":1,\"maxSize\":20971520,\"mimeTypes\":[\"image/jpeg\",\"image/png\",\"image/webp\"],\"name\":\"file\",\"presentable\":false,\"protected\":false,\"required\":true,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"hidden\":false,\"id\":\"autodate3332085495\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]',NULL,NULL,NULL,NULL,NULL,'{}','2026-06-06 10:20:40.824Z','2026-06-06 10:20:40.824Z'),('pbc_9271468987',0,'base','AIGenerationHistory','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7143421673\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5965151413\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0113539133\",\"max\":0,\"min\":0,\"name\":\"diagnosis\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6124157853\",\"max\":10,\"min\":0,\"name\":\"pain_level\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0818786371\",\"max\":null,\"min\":null,\"name\":\"age\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6930736115\",\"max\":0,\"min\":0,\"name\":\"body_region\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3941185123\",\"max\":0,\"min\":0,\"name\":\"functional_limitation\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5476450524\",\"max\":0,\"min\":0,\"name\":\"recovery_stage\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9474567770\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0230341157\",\"max\":100,\"min\":0,\"name\":\"confidence_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8354133732\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1755155339\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0889156349\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id && user_id = @request.auth.id','clinic_id = @request.auth.clinic_id && user_id = @request.auth.id','@request.auth.id != \'\'',NULL,'user_id = @request.auth.id','{}','2026-06-06 10:21:14.429Z','2026-06-06 10:21:14.429Z'),('pbc_9667452880',0,'base','pain_tracking','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2709527503\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5405452921\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0235298131\",\"max\":10,\"min\":0,\"name\":\"pain_score\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7360576247\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate8831311974\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0885075967\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4356593936\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_pain_tracking_patient_id ON pain_tracking (patient_id)\"]','patient_id = @request.auth.id','patient_id = @request.auth.id','@request.auth.id != \'\'','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 10:27:22.453Z','2026-06-06 10:27:30.884Z'),('pbc_9620352589',0,'base','recovery_notes','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3985142348\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4164707511\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9116137726\",\"max\":0,\"min\":0,\"name\":\"title\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8524529719\",\"max\":0,\"min\":0,\"name\":\"content\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file5711952259\",\"maxSelect\":1,\"maxSize\":20971520,\"mimeTypes\":[],\"name\":\"file\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"hidden\":false,\"id\":\"autodate2581426364\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2886164645\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3664704250\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_recovery_notes_patient_id ON recovery_notes (patient_id)\"]','patient_id = @request.auth.id','patient_id = @request.auth.id','@request.auth.id != \'\'','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 10:27:24.356Z','2026-06-06 10:27:32.850Z'),('pbc_1655113465',0,'base','patient_achievements','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8172748257\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6830081969\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3598913757\",\"max\":0,\"min\":0,\"name\":\"achievement_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5180902734\",\"name\":\"unlocked_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8259154906\",\"max\":100,\"min\":0,\"name\":\"progress\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate7034532442\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0509549644\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3018627582\",\"max\":0,\"min\":0,\"name\":\"achievement_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text883047599\",\"max\":0,\"min\":0,\"name\":\"achievement_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3248145858\",\"max\":0,\"min\":0,\"name\":\"badge_icon\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1843675174\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"}]','[\"CREATE INDEX idx_patient_achievements_patient_id ON patient_achievements (patient_id)\"]','patient_id = @request.auth.id','patient_id = @request.auth.id','@request.auth.id != \'\'','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 10:27:26.188Z','2026-06-06 23:53:40.823Z'),('pbc_6891620391',0,'base','AssessmentTypes','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3595372969\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9211124565\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6557815870\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3186423330\",\"max\":null,\"min\":1,\"name\":\"total_items\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4429480262\",\"max\":null,\"min\":null,\"name\":\"scale_min\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2496783281\",\"max\":null,\"min\":null,\"name\":\"scale_max\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1320219252\",\"max\":0,\"min\":0,\"name\":\"scoring_formula\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7534269352\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6141311601\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3166812000\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number10605598\",\"max\":null,\"min\":1,\"name\":\"questions_count\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number726478591\",\"max\":null,\"min\":null,\"name\":\"estimated_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool1260321794\",\"name\":\"active\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"}]','[]','','','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 10:32:32.739Z','2026-06-06 10:48:54.849Z'),('pbc_5377620414',0,'base','AssessmentQuestions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2350621687\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3007486390\",\"max\":0,\"min\":0,\"name\":\"assessment_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8488177396\",\"max\":null,\"min\":1,\"name\":\"question_number\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7614165861\",\"max\":0,\"min\":0,\"name\":\"question_text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select6461209966\",\"maxSelect\":1,\"name\":\"response_type\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"scale\",\"radio\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json9533168672\",\"maxSize\":0,\"name\":\"response_options\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2726013953\",\"max\":null,\"min\":null,\"name\":\"scoring_value\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1746151067\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6310090556\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1306430343\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2114032220\",\"max\":0,\"min\":0,\"name\":\"help_text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"}]','[]','','','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 10:32:34.652Z','2026-06-06 10:48:57.028Z'),('pbc_3033488539',0,'base','AssignedAssessments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7222672113\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6131864171\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7152168119\",\"max\":0,\"min\":0,\"name\":\"assessment_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date9803701352\",\"max\":\"\",\"min\":\"\",\"name\":\"due_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select0758672654\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"pending\",\"completed\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3128391134\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2602166663\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate3709545375\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7262006585\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1139199363\",\"name\":\"assigned_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2575139115\",\"max\":0,\"min\":0,\"name\":\"instructions\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1873943901\",\"max\":0,\"min\":0,\"name\":\"assessment_type_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text18952752\",\"max\":0,\"min\":0,\"name\":\"clinical_indication\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text18589324\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"}]','[]','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:32:36.467Z','2026-06-06 10:48:59.240Z'),('pbc_9253812449',0,'base','AssessmentResponses','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3832932854\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4306575351\",\"max\":0,\"min\":0,\"name\":\"assigned_assessment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5628657872\",\"max\":null,\"min\":1,\"name\":\"question_number\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0257809448\",\"max\":null,\"min\":null,\"name\":\"response_value\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7946101356\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6680875242\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0893453904\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3411191636\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2782324286\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:32:38.354Z','2026-06-06 10:49:01.232Z'),('pbc_4290443106',0,'base','AssessmentScores','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3847551960\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6439342358\",\"max\":0,\"min\":0,\"name\":\"assigned_assessment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6946826178\",\"max\":null,\"min\":null,\"name\":\"raw_score\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7055442241\",\"max\":100,\"min\":0,\"name\":\"percentage_score\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2895756227\",\"max\":0,\"min\":0,\"name\":\"interpretation\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0597853186\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1733434775\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7128074309\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1476891972\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7251258402\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3457991238\",\"name\":\"completed_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4058751331\",\"max\":null,\"min\":null,\"name\":\"total_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json621092528\",\"maxSize\":0,\"name\":\"subscale_scores\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text177920905\",\"max\":0,\"min\":0,\"name\":\"clinical_summary\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"}]','[]','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:32:40.315Z','2026-06-06 10:49:03.469Z'),('pbc_2135054699',0,'base','AssessmentSummaries','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1512428525\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3483027910\",\"max\":0,\"min\":0,\"name\":\"assessment_score_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1892931439\",\"max\":0,\"min\":0,\"name\":\"clinical_summary\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7954403338\",\"max\":0,\"min\":0,\"name\":\"recommendations\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5732257670\",\"max\":0,\"min\":0,\"name\":\"trend_analysis\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date6760153009\",\"max\":\"\",\"min\":\"\",\"name\":\"next_assessment_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1583946799\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3458592823\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4013202132\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9028268064\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:32:42.239Z','2026-06-06 10:32:42.239Z'),('pbc_4780102815',0,'base','AssessmentHistory','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3185292042\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0326803838\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6317117186\",\"max\":0,\"min\":0,\"name\":\"assessment_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json5531865792\",\"maxSize\":0,\"name\":\"scores\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json8206441727\",\"maxSize\":0,\"name\":\"dates\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6900776670\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0630228206\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2222705270\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id || patient_id = @request.auth.id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:32:44.154Z','2026-06-06 10:32:44.154Z'),('pbc_6538895783',0,'base','SOAPNotes','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text6982344118\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3848580592\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6468126931\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8516205076\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2524590668\",\"max\":0,\"min\":0,\"name\":\"subjective\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9674974007\",\"max\":0,\"min\":0,\"name\":\"objective\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3589974300\",\"max\":0,\"min\":0,\"name\":\"assessment\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8149264017\",\"max\":0,\"min\":0,\"name\":\"plan\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0408863133\",\"max\":0,\"min\":0,\"name\":\"original_notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5708246114\",\"name\":\"created_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7161650298\",\"name\":\"updated_date\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1111437696\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"draft\",\"finalized\"]},{\"hidden\":false,\"id\":\"autodate7464645686\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9962961422\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','therapist_id = @request.auth.id && clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:38:42.672Z','2026-06-06 10:38:42.672Z'),('pbc_3404452724',0,'base','SOAPHistory','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3751164439\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2862396549\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8534296114\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6452472255\",\"max\":0,\"min\":0,\"name\":\"input_notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json4210842646\",\"maxSize\":0,\"name\":\"generated_soap\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"hidden\":false,\"id\":\"autodate4780123921\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool3314762342\",\"name\":\"deleted\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"hidden\":false,\"id\":\"autodate4259998212\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5087077735\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','therapist_id = @request.auth.id','therapist_id = @request.auth.id','@request.auth.id != \'\'','therapist_id = @request.auth.id','therapist_id = @request.auth.id','{}','2026-06-06 10:38:44.555Z','2026-06-06 10:38:44.555Z'),('pbc_5928492048',0,'base','packages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3797281746\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1507601344\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1787208530\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5475193049\",\"max\":null,\"min\":1,\"name\":\"sessions\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7712411019\",\"max\":null,\"min\":1,\"name\":\"validity_days\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7423790779\",\"max\":null,\"min\":0,\"name\":\"price\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3535542012\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool3372490337\",\"name\":\"active\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"hidden\":false,\"id\":\"autodate7886692956\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0230833942\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_packages_clinic_id ON packages (clinic_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:08.137Z','2026-06-06 10:43:25.239Z'),('pbc_8899021625',0,'base','patientPackages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5116753202\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9447868967\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8345335385\",\"max\":0,\"min\":0,\"name\":\"package_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3101461063\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date2378509961\",\"max\":\"\",\"min\":\"\",\"name\":\"assigned_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date5779290544\",\"max\":\"\",\"min\":\"\",\"name\":\"expiry_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2603945525\",\"max\":null,\"min\":null,\"name\":\"sessions_used\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7283444243\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Expiring Soon\",\"Expired\",\"Completed\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8923904486\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4106376612\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3027920736\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_patientPackages_patient_id ON patientPackages (patient_id)\",\"CREATE INDEX idx_patientPackages_clinic_id ON patientPackages (clinic_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:10.113Z','2026-06-06 10:43:27.368Z'),('pbc_6808947062',0,'base','sessions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3337925972\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3118212498\",\"max\":0,\"min\":0,\"name\":\"patient_package_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date7603017414\",\"max\":\"\",\"min\":\"\",\"name\":\"session_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6675828418\",\"max\":0,\"min\":0,\"name\":\"session_time\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8116985674\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0702805391\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3457903541\",\"max\":null,\"min\":null,\"name\":\"duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0045801034\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2696489489\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3584599674\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_sessions_patient_package_id ON sessions (patient_package_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:12.062Z','2026-06-06 10:43:29.255Z'),('pbc_6850853595',0,'base','invoices','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1949550772\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7081406527\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0960952042\",\"max\":0,\"min\":0,\"name\":\"invoice_number\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6597809027\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3445852647\",\"max\":0,\"min\":0,\"name\":\"patient_package_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date2496042247\",\"max\":\"\",\"min\":\"\",\"name\":\"invoice_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date9956887893\",\"max\":\"\",\"min\":\"\",\"name\":\"due_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3299878230\",\"max\":null,\"min\":0,\"name\":\"subtotal\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6879006014\",\"max\":null,\"min\":null,\"name\":\"tax\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1356042657\",\"max\":null,\"min\":null,\"name\":\"discount\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2371723946\",\"max\":null,\"min\":0,\"name\":\"total\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select6513095622\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Paid\",\"Pending\",\"Partial\",\"Overdue\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2846959789\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9475655131\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6197576077\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_invoices_clinic_id ON invoices (clinic_id)\",\"CREATE INDEX idx_invoices_patient_id ON invoices (patient_id)\",\"CREATE UNIQUE INDEX idx_invoices_invoice_number ON invoices (invoice_number)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:14.147Z','2026-06-06 10:43:31.243Z'),('pbc_7608750174',0,'base','payments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2285804632\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7177975966\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5126855022\",\"max\":0,\"min\":0,\"name\":\"invoice_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6894844635\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date8483917328\",\"max\":\"\",\"min\":\"\",\"name\":\"payment_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1719697031\",\"max\":null,\"min\":0,\"name\":\"amount\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select0711840587\",\"maxSelect\":1,\"name\":\"method\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"Cash\",\"Card\",\"Bank Transfer\",\"Cheque\",\"Insurance\",\"Online\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8430423110\",\"max\":0,\"min\":0,\"name\":\"reference_number\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9028938932\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6621099095\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6020149495\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE INDEX idx_payments_clinic_id ON payments (clinic_id)\",\"CREATE INDEX idx_payments_invoice_id ON payments (invoice_id)\",\"CREATE INDEX idx_payments_patient_id ON payments (patient_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:15.962Z','2026-06-06 10:43:33.229Z'),('pbc_8323767996',0,'base','billingSettings','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0864525354\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0236000315\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool7310447105\",\"name\":\"tax_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8991493469\",\"max\":100,\"min\":0,\"name\":\"tax_percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8529500973\",\"max\":0,\"min\":0,\"name\":\"tax_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8846783346\",\"max\":0,\"min\":0,\"name\":\"invoice_prefix\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7388488218\",\"max\":0,\"min\":0,\"name\":\"payment_terms\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0498083058\",\"max\":null,\"min\":0,\"name\":\"late_fee_percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate9832107586\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1948438004\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE UNIQUE INDEX idx_billingSettings_clinic_id ON billingSettings (clinic_id)\"]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 10:43:17.862Z','2026-06-06 10:43:35.232Z'),('pbc_7683479304',0,'base','invite_codes','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1066020494\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0273722337\",\"max\":0,\"min\":0,\"name\":\"code\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select6260641291\",\"maxSelect\":1,\"name\":\"role\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"admin\",\"therapist\",\"patient\"]},{\"cascadeDelete\":false,\"collectionId\":\"_pb_users_auth_\",\"help\":\"\",\"hidden\":false,\"id\":\"relation6460948203\",\"maxSelect\":1,\"minSelect\":0,\"name\":\"created_by\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"relation\"},{\"cascadeDelete\":false,\"collectionId\":\"_pb_users_auth_\",\"help\":\"\",\"hidden\":false,\"id\":\"relation5662708134\",\"maxSelect\":1,\"minSelect\":0,\"name\":\"used_by\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"relation\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool8455421875\",\"name\":\"is_active\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date0223542922\",\"max\":\"\",\"min\":\"\",\"name\":\"expires_at\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"hidden\":false,\"id\":\"autodate4649650511\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2570455948\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[\"CREATE UNIQUE INDEX idx_invite_codes_code ON invite_codes (code)\"]','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','{}','2026-06-06 11:36:25.177Z','2026-06-06 11:36:29.719Z'),('pbc_5043673694',0,'base','videos','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7267281502\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3506406605\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8669985666\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1999160472\",\"maxSelect\":1,\"name\":\"category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck\",\"Shoulder\",\"Elbow\",\"Wrist\",\"Upper Back\",\"Lower Back\",\"Hip\",\"Knee\",\"Ankle\",\"Balance\",\"Mobility\",\"Strengthening\",\"Stretching\",\"Post Operative\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select1419722755\",\"maxSelect\":1,\"name\":\"body_region\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck\",\"Shoulder\",\"Elbow\",\"Wrist\",\"Upper Back\",\"Lower Back\",\"Hip\",\"Knee\",\"Ankle\",\"Balance\",\"Mobility\",\"Strengthening\",\"Stretching\",\"Post Operative\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select8985857243\",\"maxSelect\":1,\"name\":\"difficulty\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Easy\",\"Medium\",\"Hard\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1926042552\",\"max\":0,\"min\":0,\"name\":\"target_muscle\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7893441384\",\"max\":0,\"min\":0,\"name\":\"equipment\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json8008725883\",\"maxSize\":0,\"name\":\"tags\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file2547635929\",\"maxSelect\":1,\"maxSize\":104857600,\"mimeTypes\":[\"video/mp4\",\"video/quicktime\",\"video/webm\"],\"name\":\"video_file\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file2608225856\",\"maxSelect\":1,\"maxSize\":20971520,\"mimeTypes\":[],\"name\":\"thumbnail\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1402009288\",\"max\":null,\"min\":null,\"name\":\"duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4758759978\",\"max\":0,\"min\":0,\"name\":\"uploaded_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7231161402\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4197894424\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4864625090\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 14:33:40.455Z','2026-06-06 14:33:40.455Z'),('pbc_1699673318',0,'base','programs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5669948004\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6038823339\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1664248798\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json2976413510\",\"maxSize\":0,\"name\":\"exercises_list\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9219737981\",\"max\":0,\"min\":0,\"name\":\"created_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6711558634\",\"name\":\"created_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7049875121\",\"name\":\"updated_date\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select2823753583\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Archived\",\"Draft\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1850895985\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0336108050\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2959031330\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 14:33:42.437Z','2026-06-06 14:33:42.437Z'),('pbc_1050098672',0,'base','program_templates','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1950779288\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3346544000\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5800615130\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select8156480506\",\"maxSelect\":1,\"name\":\"category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck Pain\",\"Low Back Pain\",\"Frozen Shoulder\",\"ACL Rehabilitation\",\"Stroke Rehabilitation\",\"Knee Osteoarthritis\",\"Post Operative Rehabilitation\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json0217712991\",\"maxSize\":0,\"name\":\"exercises_list\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9411570562\",\"max\":null,\"min\":null,\"name\":\"estimated_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6880380549\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1117991936\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9503259580\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3725765462\",\"max\":0,\"min\":0,\"name\":\"created_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1052247818\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool1811784642\",\"name\":\"is_public\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number253175708\",\"max\":null,\"min\":null,\"name\":\"usage_count\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"}]','[]','is_public = true || created_by = @request.auth.id || @request.auth.role = \"admin\"','is_public = true || created_by = @request.auth.id || @request.auth.role = \"admin\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','created_by = @request.auth.id || @request.auth.role = \"admin\"','created_by = @request.auth.id || @request.auth.role = \"admin\"','{}','2026-06-06 14:33:44.441Z','2026-06-07 11:26:24.758Z'),('pbc_6031995613',0,'base','assigned_programs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8493528363\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3320238590\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3753076378\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6598701741\",\"name\":\"assigned_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7128854452\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Completed\",\"Paused\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"number7510789249\",\"max\":100,\"min\":0,\"name\":\"completion_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7026936697\",\"max\":100,\"min\":0,\"name\":\"adherence_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1128078431\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2386598790\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9769730470\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 14:33:46.358Z','2026-06-06 14:33:46.358Z'),('pbc_5026072458',0,'base','exercise_progress','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7756143675\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2032169881\",\"max\":0,\"min\":0,\"name\":\"assigned_program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9595325656\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4025674892\",\"max\":null,\"min\":null,\"name\":\"completion_count\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date5667414662\",\"max\":\"\",\"min\":\"\",\"name\":\"last_completed_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9511041836\",\"max\":10,\"min\":0,\"name\":\"pain_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4286383514\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1083126685\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5990739990\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','{}','2026-06-06 14:33:48.333Z','2026-06-06 14:33:48.333Z'),('pbc_1830866667',0,'base','patient_programs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0826705194\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3101803065\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4422795526\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4292033870\",\"name\":\"assigned_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1716230847\",\"max\":100,\"min\":0,\"name\":\"completion_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5933348723\",\"max\":100,\"min\":0,\"name\":\"adherence_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select9600693979\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Active\",\"Completed\",\"Paused\"]},{\"hidden\":false,\"id\":\"autodate2560379101\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3558098197\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 23:52:50.916Z','2026-06-06 23:52:50.916Z'),('pbc_3256167742',0,'base','patient_exercises','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5376987301\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2947157656\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0341238610\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0193435880\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4139340885\",\"max\":null,\"min\":null,\"name\":\"completed_count\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date0213612924\",\"max\":\"\",\"min\":\"\",\"name\":\"last_completed_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9131020325\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5563524716\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3907905208\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 23:52:54.456Z','2026-06-06 23:52:54.456Z'),('pbc_4934782366',0,'base','pain_logs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0307395745\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9669354476\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8520780522\",\"max\":10,\"min\":0,\"name\":\"pain_level\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1598996442\",\"max\":10,\"min\":0,\"name\":\"pain_before\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2500942337\",\"max\":10,\"min\":0,\"name\":\"pain_after\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7786608954\",\"max\":0,\"min\":0,\"name\":\"location\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1623713878\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0425597443\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3195366150\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7004514310\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 23:52:57.820Z','2026-06-06 23:52:57.820Z'),('pbc_2944266841',0,'base','patient_messages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0050041942\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9311916147\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0598233876\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5846818060\",\"max\":0,\"min\":0,\"name\":\"message\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1154858420\",\"max\":0,\"min\":0,\"name\":\"image_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6162659320\",\"name\":\"timestamp\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool8439443661\",\"name\":\"read\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select8576227341\",\"maxSelect\":1,\"name\":\"message_category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"General\",\"Exercise Feedback\",\"Recovery Updates\"]},{\"hidden\":false,\"id\":\"autodate4861110400\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1022701836\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || therapist_id = @request.auth.id','patient_id = @request.auth.id || therapist_id = @request.auth.id','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 23:53:01.171Z','2026-06-06 23:53:01.171Z'),('pbc_4806844455',0,'base','telehealth_sessions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7928424258\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5034205799\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2424491669\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date2986220326\",\"max\":\"\",\"min\":\"\",\"name\":\"session_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1125194909\",\"max\":0,\"min\":0,\"name\":\"session_time\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2171123313\",\"max\":0,\"min\":0,\"name\":\"join_link\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6816272429\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7565472231\",\"max\":0,\"min\":0,\"name\":\"recording_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7459900319\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Scheduled\",\"Completed\",\"Cancelled\"]},{\"hidden\":false,\"id\":\"autodate7108270546\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1773949863\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || therapist_id = @request.auth.id','patient_id = @request.auth.id || therapist_id = @request.auth.id','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 23:53:04.715Z','2026-06-06 23:53:04.715Z'),('pbc_6730366024',0,'base','patient_assessments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5100733263\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9238021050\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4354457869\",\"max\":0,\"min\":0,\"name\":\"assessment_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9540866842\",\"max\":null,\"min\":null,\"name\":\"score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate8204891281\",\"name\":\"date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9050710149\",\"max\":null,\"min\":null,\"name\":\"previous_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9734623642\",\"max\":0,\"min\":0,\"name\":\"interpretation\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate3491153913\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9630842165\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id','patient_id = @request.auth.id','@request.auth.id != \'\'','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 23:53:08.043Z','2026-06-06 23:53:08.043Z'),('pbc_6869983147',0,'base','education_content','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4074170486\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0689084529\",\"max\":0,\"min\":0,\"name\":\"title\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select0276057096\",\"maxSelect\":1,\"name\":\"category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck Pain\",\"Low Back Pain\",\"Shoulder Pain\",\"Knee Pain\",\"Post Surgery Recovery\",\"Sports Injury\",\"General Wellness\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select4443724857\",\"maxSelect\":1,\"name\":\"type\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Article\",\"Video\",\"FAQ\",\"Tip\",\"Resource\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7235017022\",\"max\":0,\"min\":0,\"name\":\"content\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4778576682\",\"max\":0,\"min\":0,\"name\":\"video_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5626656570\",\"max\":null,\"min\":null,\"name\":\"reading_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1571898289\",\"max\":0,\"min\":0,\"name\":\"pdf_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate8306361398\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3318199107\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','','','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-06 23:53:23.455Z','2026-06-06 23:53:23.455Z'),('pbc_9887868871',0,'base','patient_bookmarks','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2573547113\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4958347285\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1609986904\",\"max\":0,\"min\":0,\"name\":\"content_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0215577182\",\"name\":\"bookmarked_date\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9186015556\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9743456303\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-06 23:53:26.845Z','2026-06-06 23:53:26.845Z'),('pbc_5488171097',0,'base','recovery_timer_configs','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0376201560\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4001406030\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3274446645\",\"max\":null,\"min\":0,\"name\":\"prepare_time\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4494935768\",\"max\":null,\"min\":0,\"name\":\"work_time\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0102671430\",\"max\":null,\"min\":0,\"name\":\"rest_time\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0960145727\",\"max\":null,\"min\":1,\"name\":\"cycles\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0731212690\",\"max\":null,\"min\":1,\"name\":\"sets\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6077359388\",\"max\":null,\"min\":0,\"name\":\"rest_between_sets\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9970097103\",\"max\":null,\"min\":0,\"name\":\"hold_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3302988737\",\"max\":null,\"min\":0,\"name\":\"repetitions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select9194236463\",\"maxSelect\":1,\"name\":\"permission_mode\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Therapist Controlled\",\"Patient Adjustable\",\"Hybrid\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"number5017632625\",\"max\":null,\"min\":null,\"name\":\"min_value\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1120894952\",\"max\":null,\"min\":null,\"name\":\"max_value\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0582691908\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9484054814\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3481878224\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','{}','2026-06-07 01:04:30.280Z','2026-06-07 01:04:30.280Z'),('pbc_6915229381',0,'base','timer_templates','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3649192312\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8298996684\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5073767011\",\"max\":0,\"min\":0,\"name\":\"template_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json8082505684\",\"maxSize\":0,\"name\":\"template_config\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7305125514\",\"maxSelect\":1,\"name\":\"category\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"Neck Mobility\",\"ACL Rehab\",\"Stroke Rehab\",\"Balance Training\",\"Post Operative\",\"Low Back Pain\",\"Frozen Shoulder\",\"Custom\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8974024011\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6338690883\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2321820055\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','therapist_id = @request.auth.id || @request.auth.role = \"admin\"','therapist_id = @request.auth.id || @request.auth.role = \"admin\"','therapist_id = @request.auth.id','therapist_id = @request.auth.id || @request.auth.role = \"admin\"','therapist_id = @request.auth.id || @request.auth.role = \"admin\"','{}','2026-06-07 01:04:32.273Z','2026-06-07 11:25:50.846Z'),('pbc_3677695498',0,'base','auto_progression_plans','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3544669472\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3274351043\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2689387918\",\"max\":null,\"min\":1,\"name\":\"week_number\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4503580222\",\"max\":null,\"min\":null,\"name\":\"work_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1449821021\",\"max\":null,\"min\":null,\"name\":\"repetitions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1372932564\",\"max\":null,\"min\":null,\"name\":\"cycles\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8724155126\",\"max\":null,\"min\":null,\"name\":\"sets\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0218176107\",\"max\":null,\"min\":null,\"name\":\"hold_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3630490722\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1589739497\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9457577850\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','{}','2026-06-07 01:04:34.257Z','2026-06-07 11:25:53.215Z'),('pbc_1177802543',0,'base','session_data','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text9258623133\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0660617400\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0019102815\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date9590705577\",\"max\":\"\",\"min\":\"\",\"name\":\"session_date\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5598947318\",\"max\":null,\"min\":null,\"name\":\"exercises_completed\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4220908560\",\"max\":null,\"min\":null,\"name\":\"sets_completed\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8303289747\",\"max\":null,\"min\":null,\"name\":\"cycles_completed\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1296738855\",\"max\":10,\"min\":0,\"name\":\"pain_before\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2258822426\",\"max\":10,\"min\":0,\"name\":\"pain_after\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5076790821\",\"max\":100,\"min\":0,\"name\":\"completion_percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5306860465\",\"max\":null,\"min\":null,\"name\":\"duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1920258412\",\"max\":null,\"min\":null,\"name\":\"skipped_exercises\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6973051493\",\"max\":100,\"min\":0,\"name\":\"adherence_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3054967022\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3016555270\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9173691712\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0737350150\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || clinic_id = @request.auth.clinic_id','patient_id = @request.auth.id || clinic_id = @request.auth.clinic_id','patient_id = @request.auth.id','patient_id = @request.auth.id','patient_id = @request.auth.id','{}','2026-06-07 01:04:36.362Z','2026-06-07 01:04:36.362Z'),('pbc_3434926018',0,'base','user_language_preferences','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1491253917\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5686822301\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7193922698\",\"maxSelect\":1,\"name\":\"preferred_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select6382380530\",\"maxSelect\":1,\"name\":\"app_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select8246693670\",\"maxSelect\":1,\"name\":\"exercise_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select2786094748\",\"maxSelect\":1,\"name\":\"reminder_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"hidden\":false,\"id\":\"autodate0881125712\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0982144060\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','id = @request.auth.id','id = @request.auth.id','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.id != \'\'','{}','2026-06-07 01:37:13.833Z','2026-06-07 01:37:13.833Z'),('pbc_2787762547',0,'base','exercise_translations','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text5415239632\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3487657387\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7524144259\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1160198701\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2149371604\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0308878582\",\"max\":0,\"min\":0,\"name\":\"instructions\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3904970184\",\"max\":0,\"min\":0,\"name\":\"contraindications\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7744770370\",\"max\":0,\"min\":0,\"name\":\"warnings\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3882643414\",\"max\":0,\"min\":0,\"name\":\"progression_notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8453683022\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate3506301777\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9615242048\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','clinic_id = @request.auth.clinic_id','clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','{}','2026-06-07 01:37:16.044Z','2026-06-07 01:37:16.044Z'),('pbc_7055214192',0,'base','program_translations','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text3517238854\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0827052016\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select9343747894\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3393124844\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4146740439\",\"max\":0,\"min\":0,\"name\":\"instructions\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1517263859\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0232838396\",\"max\":0,\"min\":0,\"name\":\"recovery_guidance\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0050886663\",\"max\":0,\"min\":0,\"name\":\"clinic_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6301972148\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9733546449\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2341372968\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1130519967\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \'therapist\' && clinic_id = @request.auth.clinic_id','{}','2026-06-07 01:37:18.164Z','2026-06-07 11:26:26.968Z'),('pbc_3867713186',0,'base','notification_templates','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8154485008\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1351505521\",\"max\":0,\"min\":0,\"name\":\"notification_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select3264873176\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5623837038\",\"max\":0,\"min\":0,\"name\":\"template_text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9758595457\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6388347299\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','{}','2026-06-07 01:37:20.430Z','2026-06-07 01:37:20.430Z'),('pbc_6266880043',0,'base','voice_guidance_translations','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text6523134363\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0106209388\",\"max\":0,\"min\":0,\"name\":\"guidance_key\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select2330802940\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7712551852\",\"max\":0,\"min\":0,\"name\":\"text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate8783161057\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5192777878\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \'\'','@request.auth.id != \'\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','{}','2026-06-07 01:37:22.373Z','2026-06-07 01:37:22.373Z'),('pbc_2309829329',0,'base','translation_status','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1248797616\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select3484750849\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"number1554986833\",\"max\":null,\"min\":1,\"name\":\"total_fields\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3588739595\",\"max\":null,\"min\":0,\"name\":\"translated_fields\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1319592609\",\"max\":100,\"min\":0,\"name\":\"completion_percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate6439155125\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6187378095\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','@request.auth.role = \'admin\'','{}','2026-06-07 01:37:24.572Z','2026-06-07 01:37:24.572Z'),('pbc_1380327113',0,'base','user_roles','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0956863106\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4669735711\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1213244163\",\"maxSelect\":1,\"name\":\"role_name\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"admin\",\"therapist\",\"patient\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json7693732329\",\"maxSize\":0,\"name\":\"permissions\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"hidden\":false,\"id\":\"autodate9220878887\",\"name\":\"assigned_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4152736463\",\"max\":0,\"min\":0,\"name\":\"assigned_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate6597541627\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8573608912\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"','{}','2026-06-07 11:22:36.662Z','2026-06-07 11:22:36.662Z'),('pbc_8547971986',0,'base','user_permissions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text7158397074\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2246563603\",\"max\":0,\"min\":0,\"name\":\"role_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8686218262\",\"max\":0,\"min\":0,\"name\":\"permission_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9429658834\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9190979691\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5747465768\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2471030162\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"','{}','2026-06-07 11:22:40.163Z','2026-06-07 11:22:40.163Z'),('pbc_3442594053',0,'base','user_sessions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8657469002\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6126517529\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0769810422\",\"max\":0,\"min\":0,\"name\":\"token\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3113437877\",\"max\":0,\"min\":0,\"name\":\"refresh_token\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3495295584\",\"max\":0,\"min\":0,\"name\":\"ip_address\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9859971728\",\"max\":0,\"min\":0,\"name\":\"user_agent\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date2026709466\",\"max\":\"\",\"min\":\"\",\"name\":\"expires_at\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"hidden\":false,\"id\":\"autodate4379670479\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0702600545\",\"name\":\"last_activity\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8299400468\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0066811238\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','user_id = @request.auth.id','user_id = @request.auth.id','@request.auth.id != \"\"','user_id = @request.auth.id','user_id = @request.auth.id','{}','2026-06-07 11:22:43.735Z','2026-06-07 11:22:43.735Z'),('pbc_7564387619',0,'base','therapist_language_settings','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2518119331\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2151397525\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1275555175\",\"maxSelect\":1,\"name\":\"preferred_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select9770298114\",\"maxSelect\":1,\"name\":\"clinic_default_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select4894559611\",\"maxSelect\":1,\"name\":\"patient_default_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"select4447914147\",\"maxSelect\":1,\"name\":\"notification_language\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"hidden\":false,\"id\":\"autodate0913493744\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6612309379\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4571627006\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,'{}','2026-06-07 11:22:47.463Z','2026-06-07 11:22:47.463Z'),('pbc_1794246413',0,'base','patient_medical_history','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8161518274\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6657431906\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9074521634\",\"max\":0,\"min\":0,\"name\":\"condition_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date8510208693\",\"max\":\"\",\"min\":\"\",\"name\":\"diagnosis_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select5041925529\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"active\",\"resolved\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9489337932\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate1871703828\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5720979505\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8945199231\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1734880920\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || @request.auth.role = \"therapist\"','patient_id = @request.auth.id || @request.auth.role = \"therapist\"','patient_id = @request.auth.id || @request.auth.role = \"therapist\"','patient_id = @request.auth.id || @request.auth.role = \"therapist\"',NULL,'{}','2026-06-07 11:22:51.031Z','2026-06-07 11:22:51.031Z'),('pbc_4506742532',0,'base','appointment_reminders','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4986443566\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9816439533\",\"max\":0,\"min\":0,\"name\":\"appointment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8664763888\",\"max\":null,\"min\":null,\"name\":\"reminder_time\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select7650875638\",\"maxSelect\":1,\"name\":\"reminder_type\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"email\",\"sms\",\"in-app\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"bool2416835238\",\"name\":\"sent\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date9695510496\",\"max\":\"\",\"min\":\"\",\"name\":\"sent_at\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"hidden\":false,\"id\":\"autodate6071867815\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9335785424\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate9022990312\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:22:54.535Z','2026-06-07 11:22:54.535Z'),('pbc_7884801773',0,'base','exercise_favorites','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4619061256\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5217741617\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9355515184\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate4314700247\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0645898856\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7651635921\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','user_id = @request.auth.id || @request.auth.role = \"therapist\"','user_id = @request.auth.id || @request.auth.role = \"therapist\"','user_id = @request.auth.id || @request.auth.role = \"therapist\"',NULL,'user_id = @request.auth.id || @request.auth.role = \"therapist\"','{}','2026-06-07 11:22:58.043Z','2026-06-07 11:22:58.043Z'),('pbc_6686922866',0,'base','video_playback_history','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4558622695\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8228385761\",\"max\":0,\"min\":0,\"name\":\"video_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4334978503\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5202870275\",\"max\":null,\"min\":null,\"name\":\"watch_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7633616478\",\"max\":null,\"min\":null,\"name\":\"total_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8004201294\",\"max\":null,\"min\":null,\"name\":\"completion_percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate2243788934\",\"name\":\"last_watched_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2722329771\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6626056083\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6137202442\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8788574747\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','user_id = @request.auth.id || @request.auth.role = \"therapist\"','user_id = @request.auth.id || @request.auth.role = \"therapist\"','user_id = @request.auth.id','user_id = @request.auth.id',NULL,'{}','2026-06-07 11:23:01.745Z','2026-06-07 11:23:01.745Z'),('pbc_1044342917',0,'base','program_exercises','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4850654367\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7916717539\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6027748870\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7115982733\",\"max\":null,\"min\":null,\"name\":\"order\",\"onlyInt\":false,\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number5457727031\",\"max\":null,\"min\":null,\"name\":\"sets\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3101268664\",\"max\":null,\"min\":null,\"name\":\"repetitions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1599844708\",\"max\":null,\"min\":null,\"name\":\"hold_duration\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2190337696\",\"max\":null,\"min\":null,\"name\":\"work_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7161157000\",\"max\":null,\"min\":null,\"name\":\"rest_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6687162051\",\"max\":null,\"min\":null,\"name\":\"cycles\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number2537073454\",\"max\":null,\"min\":null,\"name\":\"rest_between_sets\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3792439389\",\"max\":null,\"min\":null,\"name\":\"prepare_time\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6570392279\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5581358271\",\"max\":0,\"min\":0,\"name\":\"notes_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9602158123\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5108385100\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3746775763\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0057732404\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"',NULL,'{}','2026-06-07 11:23:05.265Z','2026-06-07 11:23:05.265Z'),('pbc_7122190817',0,'base','program_assignment_progress','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1640494985\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7218240810\",\"max\":0,\"min\":0,\"name\":\"assignment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5639420162\",\"max\":0,\"min\":0,\"name\":\"exercise_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date0861623816\",\"max\":\"\",\"min\":\"\",\"name\":\"completed_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select1340442475\",\"maxSelect\":1,\"name\":\"completion_status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"completed\",\"skipped\",\"missed\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2147808257\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5334269353\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8202118782\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4937657648\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:23:43.934Z','2026-06-07 11:23:43.934Z'),('pbc_9245274959',0,'base','soap_note_attachments','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2345101775\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1231098604\",\"max\":0,\"min\":0,\"name\":\"soap_note_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file9026071060\",\"maxSelect\":1,\"maxSize\":52428800,\"mimeTypes\":[],\"name\":\"file\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1411629634\",\"max\":0,\"min\":0,\"name\":\"file_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3529031264\",\"max\":null,\"min\":null,\"name\":\"file_size\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate3637964818\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8603420663\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3466119979\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:24:45.423Z','2026-06-07 11:24:45.423Z'),('pbc_2686099769',0,'base','conversations','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1645665600\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8942375997\",\"max\":0,\"min\":0,\"name\":\"participant_1_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2575288439\",\"max\":0,\"min\":0,\"name\":\"participant_2_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8515849055\",\"max\":0,\"min\":0,\"name\":\"last_message_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate9611889523\",\"name\":\"last_message_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0029872366\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6399964493\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1870175651\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0798398127\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','participant_1_id = @request.auth.id || participant_2_id = @request.auth.id','participant_1_id = @request.auth.id || participant_2_id = @request.auth.id','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:24:49.943Z','2026-06-07 11:24:49.943Z'),('pbc_7223621626',0,'base','message_translations','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2148776764\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6240907081\",\"max\":0,\"min\":0,\"name\":\"message_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select9965446975\",\"maxSelect\":1,\"name\":\"language_code\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"id\",\"en\"]},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4180538621\",\"max\":0,\"min\":0,\"name\":\"translated_text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate0549048248\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7017733596\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4551690531\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:24:53.939Z','2026-06-07 11:24:53.939Z'),('pbc_7579726836',0,'base','telehealth_session_notes','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8855741132\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9469467804\",\"max\":0,\"min\":0,\"name\":\"session_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5497000287\",\"max\":0,\"min\":0,\"name\":\"notes\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8917797169\",\"max\":0,\"min\":0,\"name\":\"created_by\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate2600092070\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6640957858\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1369201300\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1439762687\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.id != \"\"',NULL,'{}','2026-06-07 11:24:57.452Z','2026-06-07 11:24:57.452Z'),('pbc_3534636871',0,'base','assessment_questions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0412451584\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4302421574\",\"max\":0,\"min\":0,\"name\":\"assessment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1419094329\",\"max\":0,\"min\":0,\"name\":\"question_text\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select4062815646\",\"maxSelect\":1,\"name\":\"question_type\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"select\",\"values\":[\"multiple_choice\",\"short_answer\",\"numeric\",\"scale\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"json3179307312\",\"maxSize\":0,\"name\":\"options\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text8457883322\",\"max\":0,\"min\":0,\"name\":\"correct_answer\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4813517328\",\"max\":null,\"min\":null,\"name\":\"points\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number6931970839\",\"max\":null,\"min\":null,\"name\":\"order\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate0257534947\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6874261665\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4226141088\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','@request.auth.role = \"therapist\" || @request.auth.role = \"admin\"',NULL,'{}','2026-06-07 11:25:01.215Z','2026-06-07 11:25:01.215Z'),('pbc_9165968837',0,'base','assessment_submissions','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text9660800382\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3541436122\",\"max\":0,\"min\":0,\"name\":\"assignment_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1657560050\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json4743447906\",\"maxSize\":0,\"name\":\"answers\",\"presentable\":false,\"required\":true,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8255006570\",\"max\":null,\"min\":null,\"name\":\"score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7634909022\",\"max\":null,\"min\":null,\"name\":\"max_score\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9213062415\",\"max\":null,\"min\":null,\"name\":\"percentage\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate1255978241\",\"name\":\"submitted_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2471407534\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5027387431\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3067714345\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || @request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','patient_id = @request.auth.id || @request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','patient_id = @request.auth.id',NULL,NULL,'{}','2026-06-07 11:25:04.935Z','2026-06-07 11:25:04.935Z'),('pbc_9014454198',0,'base','notification_preferences','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text9575407054\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6603035947\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool4197853964\",\"name\":\"exercise_reminders_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool9372555978\",\"name\":\"appointment_reminders_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool7781715882\",\"name\":\"progress_updates_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool8656749158\",\"name\":\"message_notifications_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool7523481015\",\"name\":\"email_notifications_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool5422352160\",\"name\":\"sms_notifications_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool1088705139\",\"name\":\"in_app_notifications_enabled\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5648143669\",\"max\":0,\"min\":0,\"name\":\"reminder_time\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate3729368684\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7544465002\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1757383793\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5329108592\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','user_id = @request.auth.id','user_id = @request.auth.id','user_id = @request.auth.id','user_id = @request.auth.id',NULL,'{}','2026-06-07 11:25:08.478Z','2026-06-07 11:25:08.478Z'),('pbc_6230684711',0,'base','analytics_events','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text2413473839\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9211825617\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1200331838\",\"max\":0,\"min\":0,\"name\":\"event_type\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6791915836\",\"max\":0,\"min\":0,\"name\":\"event_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json7221718107\",\"maxSize\":0,\"name\":\"event_data\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9933210889\",\"max\":0,\"min\":0,\"name\":\"page_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text4158230405\",\"max\":0,\"min\":0,\"name\":\"referrer_url\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3291648921\",\"max\":0,\"min\":0,\"name\":\"user_agent\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5282134863\",\"max\":0,\"min\":0,\"name\":\"ip_address\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate8086639274\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2341766910\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3903743617\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"','@request.auth.id != \"\"',NULL,NULL,'{}','2026-06-07 11:25:12.060Z','2026-06-07 11:25:12.060Z'),('pbc_2306712401',0,'base','patient_analytics','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text0792548958\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2973931668\",\"max\":0,\"min\":0,\"name\":\"patient_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0155391009\",\"max\":0,\"min\":0,\"name\":\"program_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4435357781\",\"max\":null,\"min\":null,\"name\":\"total_sessions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3311430003\",\"max\":null,\"min\":null,\"name\":\"completed_sessions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number0867768654\",\"max\":null,\"min\":null,\"name\":\"skipped_sessions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1112757318\",\"max\":null,\"min\":null,\"name\":\"missed_sessions\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7667729197\",\"max\":null,\"min\":null,\"name\":\"completion_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1834377670\",\"max\":null,\"min\":null,\"name\":\"average_pain_before\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1799186406\",\"max\":null,\"min\":null,\"name\":\"average_pain_after\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9036191185\",\"max\":null,\"min\":null,\"name\":\"pain_reduction\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7320584815\",\"max\":null,\"min\":null,\"name\":\"adherence_rate\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"date0702761434\",\"max\":\"\",\"min\":\"\",\"name\":\"last_session_date\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"date\"},{\"hidden\":false,\"id\":\"autodate7069350307\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6249001090\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate2577071544\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4920241453\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','patient_id = @request.auth.id || @request.auth.role = \"therapist\" || @request.auth.role = \"admin\"','patient_id = @request.auth.id || @request.auth.role = \"therapist\" || @request.auth.role = \"admin\"',NULL,NULL,NULL,'{}','2026-06-07 11:25:15.578Z','2026-06-07 11:25:15.578Z'),('pbc_6189706123',0,'base','therapist_analytics','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4546946846\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text6556272222\",\"max\":0,\"min\":0,\"name\":\"therapist_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7910470845\",\"max\":null,\"min\":null,\"name\":\"total_patients\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7721171325\",\"max\":null,\"min\":null,\"name\":\"active_patients\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number1330165808\",\"max\":null,\"min\":null,\"name\":\"completed_patients\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number7716128309\",\"max\":null,\"min\":null,\"name\":\"total_programs_created\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number4172233185\",\"max\":null,\"min\":null,\"name\":\"total_appointments\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number9728534210\",\"max\":null,\"min\":null,\"name\":\"completed_appointments\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number8557702064\",\"max\":null,\"min\":null,\"name\":\"average_patient_satisfaction\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate0889737986\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate6795409422\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate0659341044\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5990332812\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','therapist_id = @request.auth.id || @request.auth.role = \"admin\"','therapist_id = @request.auth.id || @request.auth.role = \"admin\"',NULL,NULL,NULL,'{}','2026-06-07 11:25:19.460Z','2026-06-07 11:25:19.460Z'),('pbc_8066618373',0,'base','achievements','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text8176909976\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text0509626436\",\"max\":0,\"min\":0,\"name\":\"name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text9938680060\",\"max\":0,\"min\":0,\"name\":\"description\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file4388374632\",\"maxSelect\":1,\"maxSize\":5242880,\"mimeTypes\":[],\"name\":\"icon\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2969743140\",\"max\":0,\"min\":0,\"name\":\"badge_color\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"json9191431897\",\"maxSize\":0,\"name\":\"unlock_criteria\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"json\"},{\"help\":\"\",\"hidden\":false,\"id\":\"number3252986692\",\"max\":null,\"min\":null,\"name\":\"points\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate6606933922\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7834588347\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8071577554\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"',NULL,'{}','2026-06-07 11:25:22.962Z','2026-06-07 11:25:22.962Z'),('pbc_4473523870',0,'base','education_articles','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text4000721166\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3706977162\",\"max\":0,\"min\":0,\"name\":\"title\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text7093222015\",\"max\":0,\"min\":0,\"name\":\"content\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1697187752\",\"max\":0,\"min\":0,\"name\":\"category\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":false,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3610396366\",\"max\":0,\"min\":0,\"name\":\"author_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"file3044033967\",\"maxSelect\":1,\"maxSize\":20971520,\"mimeTypes\":[],\"name\":\"featured_image\",\"presentable\":false,\"protected\":false,\"required\":false,\"system\":false,\"thumbs\":[],\"type\":\"file\"},{\"help\":\"\",\"hidden\":false,\"id\":\"select9125863316\",\"maxSelect\":1,\"name\":\"status\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"select\",\"values\":[\"published\",\"draft\",\"archived\"]},{\"help\":\"\",\"hidden\":false,\"id\":\"number9367989249\",\"max\":null,\"min\":null,\"name\":\"view_count\",\"onlyInt\":false,\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"number\"},{\"hidden\":false,\"id\":\"autodate2319271879\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3778316994\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate5808136546\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4951814159\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','status = \"published\" || author_id = @request.auth.id || @request.auth.role = \"admin\"','status = \"published\" || author_id = @request.auth.id || @request.auth.role = \"admin\"','@request.auth.id != \"\"','author_id = @request.auth.id || @request.auth.role = \"admin\"','author_id = @request.auth.id || @request.auth.role = \"admin\"','{}','2026-06-07 11:25:26.559Z','2026-06-07 11:25:26.559Z'),('pbc_9578128556',0,'base','education_article_favorites','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text6717179086\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text3915645884\",\"max\":0,\"min\":0,\"name\":\"user_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text2966838112\",\"max\":0,\"min\":0,\"name\":\"article_id\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"hidden\":false,\"id\":\"autodate5996227369\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate3875918374\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate8794683698\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','user_id = @request.auth.id || @request.auth.role = \"admin\"','user_id = @request.auth.id || @request.auth.role = \"admin\"','user_id = @request.auth.id',NULL,'user_id = @request.auth.id','{}','2026-06-07 11:25:30.468Z','2026-06-07 11:25:30.468Z'),('pbc_7141329940',0,'base','languages','[{\"autogeneratePattern\":\"[a-z0-9]{15}\",\"help\":\"\",\"hidden\":false,\"id\":\"text1719288803\",\"max\":15,\"min\":15,\"name\":\"id\",\"pattern\":\"^[a-z0-9]+$\",\"presentable\":false,\"primaryKey\":true,\"required\":true,\"system\":true,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text5234369427\",\"max\":0,\"min\":0,\"name\":\"language_code\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"autogeneratePattern\":\"\",\"help\":\"\",\"hidden\":false,\"id\":\"text1989389718\",\"max\":0,\"min\":0,\"name\":\"language_name\",\"pattern\":\"\",\"presentable\":false,\"primaryKey\":false,\"required\":true,\"system\":false,\"type\":\"text\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool5128226755\",\"name\":\"is_active\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"help\":\"\",\"hidden\":false,\"id\":\"bool6296448945\",\"name\":\"is_default\",\"presentable\":false,\"required\":false,\"system\":false,\"type\":\"bool\"},{\"hidden\":false,\"id\":\"autodate1146931286\",\"name\":\"created_at\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate1600172869\",\"name\":\"updated_at\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate4635228392\",\"name\":\"created\",\"onCreate\":true,\"onUpdate\":false,\"presentable\":false,\"system\":false,\"type\":\"autodate\"},{\"hidden\":false,\"id\":\"autodate7409203350\",\"name\":\"updated\",\"onCreate\":true,\"onUpdate\":true,\"presentable\":false,\"system\":false,\"type\":\"autodate\"}]','[]','@request.auth.id != \"\"','@request.auth.id != \"\"','@request.auth.role = \"admin\"','@request.auth.role = \"admin\"',NULL,'{}','2026-06-07 11:25:34.053Z','2026-06-07 11:25:34.053Z');
/*!40000 ALTER TABLE `_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_externalAuths`
--

DROP TABLE IF EXISTS `_externalAuths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_externalAuths` (
  `collectionRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_externalAuths`
--

LOCK TABLES `_externalAuths` WRITE;
/*!40000 ALTER TABLE `_externalAuths` DISABLE KEYS */;
/*!40000 ALTER TABLE `_externalAuths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_integratedAiImages`
--

DROP TABLE IF EXISTS `_integratedAiImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_integratedAiImages` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_integratedAiImages`
--

LOCK TABLES `_integratedAiImages` WRITE;
/*!40000 ALTER TABLE `_integratedAiImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `_integratedAiImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_integratedAiMessages`
--

DROP TABLE IF EXISTS `_integratedAiMessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_integratedAiMessages` (
  `content` text COLLATE utf8mb4_unicode_ci,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_integratedAiMessages`
--

LOCK TABLES `_integratedAiMessages` WRITE;
/*!40000 ALTER TABLE `_integratedAiMessages` DISABLE KEYS */;
/*!40000 ALTER TABLE `_integratedAiMessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_mfas`
--

DROP TABLE IF EXISTS `_mfas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_mfas` (
  `collectionRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_mfas`
--

LOCK TABLES `_mfas` WRITE;
/*!40000 ALTER TABLE `_mfas` DISABLE KEYS */;
/*!40000 ALTER TABLE `_mfas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_migrations`
--

DROP TABLE IF EXISTS `_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_migrations` (
  `file` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_migrations`
--

LOCK TABLES `_migrations` WRITE;
/*!40000 ALTER TABLE `_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_otps`
--

DROP TABLE IF EXISTS `_otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_otps` (
  `collectionRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordRef` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sentTo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_otps`
--

LOCK TABLES `_otps` WRITE;
/*!40000 ALTER TABLE `_otps` DISABLE KEYS */;
/*!40000 ALTER TABLE `_otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_params`
--

DROP TABLE IF EXISTS `_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_params` (
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_params`
--

LOCK TABLES `_params` WRITE;
/*!40000 ALTER TABLE `_params` DISABLE KEYS */;
INSERT INTO `_params` VALUES ('settings','CFuGwMQnY4Cq4kS4dFleGNDYF8n4hYXNNZ98CI4WSEFy1Dl3tWus1aa1eaLwis1CeD31jA6/jUFnfAXikfx7yI76rqyDdh1tYa0EkD0TtJCXTA/D3xZOsMArGLzxklC19pMrZKRHWh02AfE1Ai5VJ88j99NehFpu55R6d2J+WNDEAD3DZsDNMk2yaHiBDim6L7gHoa2Xp1KAChuDpa4lBR57c6H64Gr3DRD62Mq6C3rnyOoy1czMMOWyRgXxHWW8PFX6h+VNvrcCUMWMZRKLcPWTY4l/FRVModCt8pNvIRY7B4JHhT9dyPkq6Y0s+nsK4Rnx8olYfHnxy/0pG5ZEHpnyhPSAGlrA8o1/zsua8jDpQtCIpvPkJjfM4pyLXHwnRpRMe4bXHJn5Rkm+XvlK0lY8yIUwLRmaU/DnEmcpW/OuQSoie8LNXa8dFo1vT7NaK1PjxQ8GdYL2RgvZdz9mOt7liJWN+wPaOxyn7RBMgRL3JO+FuGtMBZtrVmV1imAtut9TErtZaoAFraIWGLfiq3yFvXc4bzH2ij5IIhFqwG0wNIqsUjRTFHPNCCCSb4EGQcuKwuWojJ07Q09pZ89sJacxGAf1XaO2IRL+Z1n3EZg6777N0QOmGsUn8il6UGDgVyP+nM8FnJMoe7YsqM7neAkK5bPT0ui3iUGPzarkQlt1PATBrnEfHtGpC3E+0rM/orayErWZ9XuYHL53G6ZerGtQxzRkODEWc99Hz3qInvmmQ3VhIiNW1wc57mzr15d+kMq+UJzzlbROhEmik5n7rdxuUIVH0EaOxzxG6NfNSyO2MS9tTZERL15b6eSh4x1kkhVKzq4grXEa/BblI4c47CzTCkZwNezCd/BBEmnC+EGNtK+S5CpUtPIBk8GDagJon7WZ2Qkq8vHq0c//90yJbFOxQUVh+glIVbF1YYTo1Gr8r4r9SPZcZC/fJawiXSwoiI2G6cf4PsBsyf2Qb0fSkKacyMwXhT7nNshr6zezRmqH7Q6gldzwmH43O7bn+zDZcuUpDZOl/jOJYt8AAaZIeQpHfoVcjpJk1AxQcGL0K+KGdw6kMbW2aMyKlWRPMhm/LopwnBJIZymcJ+x/IXacRr4/6YfqMpwAiFcSY5mMYpt1/D/2c3bLoFofVpxSy+UIayTDG8w+vNmcMK8u4LMyaZOKXqM/EsFXgDBsmBS6x5xdhjZj+aDnNYpmaQYdpc7XUAmp2jPgEWVbokI4u8eH4cug23bEq07hGx48Q9+zfoGeiCk5fy7K1VVz9N9WeSs9HH89xzItnKLwbUUJ/hIfI3cGJwLOYx+yF/1jSEZ9CK4Ur3lTkYRVPLNtXybIT7zGZIhmZL7ajw6czYtp5CBuCwjFm4McdjRPVYd2/x/mI+JRuOrNanUpjw1AvGFvMSkFeI0Stgjh0z59pHQWr87D4SSXPqybb/C/ZUGrTLiSFKqSJCq2JSbYWuu4tkRMbxnE83k9MNclX4Fdt3UEpA4xpI2F5MzSqnLJm3if4SgP1il+02RRxQSDVIWJYFCznJh2wSb1lchYNM3olz/fmyUWYwASgEjMoLSd5P1Wvd2fUnWVdMDodW7PWQ/Jghw4IVqgpKABDdOOYCWd4ordh81CdfYU0wrsaHiWk9V+5OeW4UZNT2IgNWr3rYqS3Z+v5ThGyoiLniT7GBE+fXoIgUZNTBZoM2VHjBBX3aXQQxUr1tO67/I4fhmiqMyl+B3MDYYQdmCJf69F2PghculRs4ZOCuZG7I+wLxoSsIBhkcmZhrACYemFeNg/tUSwmp0NDBhntEofGq/nn+oT97zLqjgNdf83tDfBjnBvCqzvsXcBWgl2ERPJM3DH4yd6MeVyTop/SjAKwHbyscrehgwIEvv+cieSf6Y2hWKsruchUHMawKvowu4u6XIhPvY2XNZ5Hsf2lHUAjizb2Ie7Xr4RDMWsXRDeXCCePgzzy22Jq+HYuJvHgQhYWCFgX4iDi+yM2mds/0q3a2ncY5Nvq2Mk7j1QwgfGWm+YOuR6rGPTEjB7va4PHkQOcUJZjP4+N/6OiCI=','2026-06-06 09:00:21.343Z','2026-06-06 10:20:40.827Z');
/*!40000 ALTER TABLE `_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_superusers`
--

DROP TABLE IF EXISTS `_superusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_superusers` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVisibility` bigint NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenKey` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_superusers`
--

LOCK TABLES `_superusers` WRITE;
/*!40000 ALTER TABLE `_superusers` DISABLE KEYS */;
INSERT INTO `_superusers` VALUES ('2026-06-06 09:00:21.535Z','physiomeid@gmail.com',0,'shbvy86v5hxs55t','$2a$10$b3rxNWLCM2U8TZmWnbc.iOpkiXB7/XG5Kank2MjLPS53D6sStzxsy','dVaX7MSssuhuh8R21vPt26iXefraxCuf3LASh1SFAq3IOoKnhP','2026-06-06 09:00:21.535Z',1);
/*!40000 ALTER TABLE `_superusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `badge_color` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` decimal(10,0) NOT NULL,
  `unlock_criteria` text COLLATE utf8mb4_unicode_ci,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analytics_events`
--

DROP TABLE IF EXISTS `analytics_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics_events` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_data` text COLLATE utf8mb4_unicode_ci,
  `event_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `referrer_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics_events`
--

LOCK TABLES `analytics_events` WRITE;
/*!40000 ALTER TABLE `analytics_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `analytics_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_reminders`
--

DROP TABLE IF EXISTS `appointment_reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_reminders` (
  `appointment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reminder_time` decimal(10,0) NOT NULL,
  `reminder_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sent` bigint NOT NULL,
  `sent_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_reminders`
--

LOCK TABLES `appointment_reminders` WRITE;
/*!40000 ALTER TABLE `appointment_reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment_reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_questions`
--

DROP TABLE IF EXISTS `assessment_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment_questions` (
  `assessment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `order` decimal(10,0) NOT NULL,
  `points` decimal(10,0) NOT NULL,
  `question_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_questions`
--

LOCK TABLES `assessment_questions` WRITE;
/*!40000 ALTER TABLE `assessment_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `assessment_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_submissions`
--

DROP TABLE IF EXISTS `assessment_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment_submissions` (
  `answers` text COLLATE utf8mb4_unicode_ci,
  `assignment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_score` decimal(10,0) NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentage` decimal(10,0) NOT NULL,
  `score` decimal(10,0) NOT NULL,
  `submitted_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_submissions`
--

LOCK TABLES `assessment_submissions` WRITE;
/*!40000 ALTER TABLE `assessment_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `assessment_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigned_programs`
--

DROP TABLE IF EXISTS `assigned_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_programs` (
  `adherence_rate` decimal(10,0) NOT NULL,
  `assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_rate` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_programs`
--

LOCK TABLES `assigned_programs` WRITE;
/*!40000 ALTER TABLE `assigned_programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `assigned_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auto_progression_plans`
--

DROP TABLE IF EXISTS `auto_progression_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auto_progression_plans` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cycles` decimal(10,0) NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hold_duration` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `repetitions` decimal(10,0) NOT NULL,
  `sets` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `week_number` decimal(10,0) NOT NULL,
  `work_time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auto_progression_plans`
--

LOCK TABLES `auto_progression_plans` WRITE;
/*!40000 ALTER TABLE `auto_progression_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `auto_progression_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billingSettings`
--

DROP TABLE IF EXISTS `billingSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billingSettings` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_prefix` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `late_fee_percentage` decimal(10,0) NOT NULL,
  `payment_terms` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax_enabled` bigint NOT NULL,
  `tax_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax_percentage` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billingSettings`
--

LOCK TABLES `billingSettings` WRITE;
/*!40000 ALTER TABLE `billingSettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `billingSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_count` decimal(10,0) NOT NULL,
  `icon_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_category_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinics` (
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics`
--

LOCK TABLES `clinics` WRITE;
/*!40000 ALTER TABLE `clinics` DISABLE KEYS */;
INSERT INTO `clinics` VALUES ('','','2026-06-06 10:55:19.042Z','aptnmqbkeb8qf3m','cbka8smyqy4sjli','kaffah physiotherapy','','2026-06-06 10:55:19.042Z'),('','','2026-06-06 11:45:57.675Z','qly55w8s12cautr','58612hwqacs4j79','kaffah physiotherapy','','2026-06-06 11:45:57.675Z'),('','','2026-06-07 00:03:56.250Z','rfnqxkp03q50gsw','6vjzirrhvp5y1kg','ads','','2026-06-07 00:03:56.250Z');
/*!40000 ALTER TABLE `clinics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_message_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_message_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `participant_1_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `participant_2_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education_article_favorites`
--

DROP TABLE IF EXISTS `education_article_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_article_favorites` (
  `article_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education_article_favorites`
--

LOCK TABLES `education_article_favorites` WRITE;
/*!40000 ALTER TABLE `education_article_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `education_article_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education_articles`
--

DROP TABLE IF EXISTS `education_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_articles` (
  `author_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `view_count` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education_articles`
--

LOCK TABLES `education_articles` WRITE;
/*!40000 ALTER TABLE `education_articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `education_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education_content`
--

DROP TABLE IF EXISTS `education_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_content` (
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdf_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reading_time` decimal(10,0) NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_url` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education_content`
--

LOCK TABLES `education_content` WRITE;
/*!40000 ALTER TABLE `education_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `education_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_completions`
--

DROP TABLE IF EXISTS `exercise_completions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_completions` (
  `assignment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` bigint NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_score` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_completions`
--

LOCK TABLES `exercise_completions` WRITE;
/*!40000 ALTER TABLE `exercise_completions` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_completions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_favorites`
--

DROP TABLE IF EXISTS `exercise_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_favorites` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_favorites`
--

LOCK TABLES `exercise_favorites` WRITE;
/*!40000 ALTER TABLE `exercise_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_programs`
--

DROP TABLE IF EXISTS `exercise_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_programs` (
  `body_region` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinical_goal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercises` text COLLATE utf8mb4_unicode_ci,
  `expected_duration` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ai_generated` bigint NOT NULL,
  `ai_confidence_score` decimal(10,0) NOT NULL,
  `ai_prompt` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_programs`
--

LOCK TABLES `exercise_programs` WRITE;
/*!40000 ALTER TABLE `exercise_programs` DISABLE KEYS */;
INSERT INTO `exercise_programs` VALUES ('Shoulder','cbka8smyqy4sjli','strnegt','2026-06-06 11:03:40.599Z','aptnmqbkeb8qf3m','tess',NULL,'4 weeks','o24jbahldxvfky2','penguatan','Active','2026-06-06 11:03:40.599Z',0,0,'');
/*!40000 ALTER TABLE `exercise_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_progress`
--

DROP TABLE IF EXISTS `exercise_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_progress` (
  `assigned_program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_count` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_completed_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_score` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_progress`
--

LOCK TABLES `exercise_progress` WRITE;
/*!40000 ALTER TABLE `exercise_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_statistics`
--

DROP TABLE IF EXISTS `exercise_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_statistics` (
  `average_pain_score` decimal(10,0) NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_rate` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `times_assigned` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_statistics`
--

LOCK TABLES `exercise_statistics` WRITE;
/*!40000 ALTER TABLE `exercise_statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_translations`
--

DROP TABLE IF EXISTS `exercise_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_translations` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contraindications` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `progression_notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `warnings` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_translations`
--

LOCK TABLES `exercise_translations` WRITE;
/*!40000 ALTER TABLE `exercise_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `body_region` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contraindications` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `progression_tips` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_muscles` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `equipment_needed` text COLLATE utf8mb4_unicode_ci,
  `gif_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `times_assigned` decimal(10,0) NOT NULL,
  `completion_rate` decimal(10,0) NOT NULL,
  `updated_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_url` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES ('Neck','Mobility','default_clinic','Severe cervical spine pathology','2026-06-06 10:11:54.173Z','Gentle neck exercise to improve posture and reduce neck tension','Beginner','s64c2kdl3i8z5e9','1. Sit upright 2. Gently tuck chin toward chest 3. Hold 5 seconds 4. Release','Chin Tuck','Add resistance with hand','Neck flexors, Anterior scalene','https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Shoulder','Strengthening','default_clinic','Acute shoulder injury','2026-06-06 10:11:54.173Z','Strengthen shoulder blade muscles','Beginner','ir617c57lf9s450','1. Sit upright 2. Pull shoulder blades back 3. Hold 5 seconds 4. Release','Scapular Retraction','Add resistance band','Rhomboids, Middle trapezius','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Shoulder','Mobility','default_clinic','Acute shoulder dislocation','2026-06-06 10:11:54.173Z','Gentle shoulder mobilization exercise','Beginner','1uk12wb9g66efvo','1. Bend forward at waist 2. Let arm hang freely 3. Make small circles 4. Gradually increase size','Shoulder Pendulum','Increase circle size and speed','Shoulder joint capsule','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Lower Back','Stretching','default_clinic','Acute hamstring strain','2026-06-06 10:11:54.174Z','Stretch hamstring muscles to improve flexibility','Beginner','y8ehuxziow6wzwi','1. Sit with legs extended 2. Bend forward at hips 3. Hold 30 seconds 4. Relax','Hamstring Stretch','Increase hold duration to 60 seconds','Hamstrings, Gastrocnemius','https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Hip','Strengthening','default_clinic','Severe lower back pain','2026-06-06 10:11:54.174Z','Strengthen glutes and lower back','Intermediate','kkho31swfwg1yu0','1. Lie on back with knees bent 2. Push through heels to lift hips 3. Hold 2 seconds 4. Lower down','Bridge Exercise','Add single leg variation','Gluteus maximus, Erector spinae','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Hip','Strengthening','default_clinic','Hip flexor strain','2026-06-06 10:11:54.174Z','Strengthen quadriceps and hip flexors','Intermediate','5tk2re3x6eqcdgt','1. Lie on back 2. Keep one leg bent 3. Raise straight leg to hip height 4. Lower slowly','Straight Leg Raise','Add ankle weights','Quadriceps, Iliopsoas','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Knee','Mobility','default_clinic','Severe knee arthritis','2026-06-06 10:11:54.174Z','Improve knee mobility and range of motion','Beginner','0wwg5i0g032d2v6','1. Lie on back with knees bent 2. Slide heel toward buttock 3. Hold 5 seconds 4. Slide back','Heel Slide','Increase speed of movement','Quadriceps, Hamstrings','https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Ankle','Stretching','default_clinic','Calf strain','2026-06-06 10:11:54.174Z','Stretch calf muscles to improve ankle flexibility','Beginner','1o3dy0g6mfxvnh0','1. Stand facing wall 2. Step back with one leg 3. Keep heel down 4. Lean forward 5. Hold 30 seconds','Calf Stretch','Bend back knee for deeper stretch','Gastrocnemius, Soleus','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Knee','Stretching','default_clinic','Knee ligament injury','2026-06-06 10:11:54.174Z','Stretch quadriceps muscles','Beginner','mrifza9lo2avtdt','1. Stand on one leg 2. Pull other foot toward buttock 3. Keep knees together 4. Hold 30 seconds','Quadriceps Stretch','Increase hold duration','Quadriceps','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop','2026-06-06 10:17:08.971Z','exercise-placeholder',NULL,'',0,0,'',''),('Hip','Strengthening','default_clinic','Severe lower back pain','2026-06-06 10:11:54.174Z','Strengthen glutes and improve hip stability','Intermediate','peam03kk3sccfdb','1. Lie on back with knees bent 2. Feet flat on floor 3. Push through heels to lift hips 4. Squeeze glutes at top','Glute Bridge','Add single leg variation or hold at top','Gluteus maximus, Gluteus medius','https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'',''),('Ankle','Stretching','default_clinic','Acute plantar fasciitis','2026-06-06 10:11:54.174Z','Stretch plantar fascia to relieve heel pain','Beginner','6752o03rt2e6fzp','1. Sit in chair 2. Cross one leg over other 3. Pull toes back toward shin 4. Hold 30 seconds','Plantar Fascia Stretch','Use massage ball under foot','Plantar fascia, Intrinsic foot muscles','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'',''),('Shoulder','Strengthening','default_clinic','Acute rotator cuff tear','2026-06-06 10:11:54.174Z','Strengthen rotator cuff muscles for shoulder stability','Intermediate','27nwiyl1ujfecuj','1. Stand with elbow bent 90 degrees 2. Hold light weight 3. Rotate forearm outward 4. Return slowly','Rotator Cuff Strengthening','Increase weight gradually','Infraspinatus, Supraspinatus, Teres minor','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'',''),('Hip','Strengthening','default_clinic','Hip labral tear','2026-06-06 10:11:54.175Z','Strengthen hip abductors and improve hip stability','Intermediate','0yqo7vjarnf4t9u','1. Place band around legs above knees 2. Slight squat position 3. Step sideways 4. Keep tension on band','Lateral Band Walk','Use stronger resistance band','Gluteus medius, Tensor fasciae latae','https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'',''),('Hip','Strengthening','default_clinic','Lower back pain','2026-06-06 10:11:54.175Z','Strengthen glutes and improve hip extension','Beginner','kzlk1x5j5jo3eun','1. Lie face down 2. Keep one leg straight 3. Lift leg toward ceiling 4. Hold 2 seconds 5. Lower slowly','Prone Hip Extension','Add ankle weight','Gluteus maximus, Hamstrings','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'',''),('Ankle','Mobility','default_clinic','Severe ankle sprain','2026-06-06 10:11:54.175Z','Improve ankle mobility and proprioception','Beginner','4ow1b2xuwqm7iip','1. Sit in chair 2. Extend one leg 3. Use toes to write alphabet letters 4. Repeat with other foot','Ankle Alphabet','Write larger letters','Ankle stabilizers, Intrinsic foot muscles','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop','2026-06-06 10:17:08.972Z','exercise-placeholder',NULL,'',0,0,'','');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite_codes`
--

DROP TABLE IF EXISTS `invite_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invite_codes` (
  `code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` bigint NOT NULL,
  `role` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `used_by` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite_codes`
--

LOCK TABLES `invite_codes` WRITE;
/*!40000 ALTER TABLE `invite_codes` DISABLE KEYS */;
INSERT INTO `invite_codes` VALUES ('12345qwer','2026-06-06 11:44:30.847Z','aptnmqbkeb8qf3m','','v9fafsfcgp3ynbt',1,'admin','2026-06-06 11:46:56.727Z','qly55w8s12cautr');
/*!40000 ALTER TABLE `invite_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `due_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_number` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_package_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(10,0) NOT NULL,
  `tax` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` bigint NOT NULL,
  `is_default` bigint NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_translations`
--

DROP TABLE IF EXISTS `message_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_translations` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `translated_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_translations`
--

LOCK TABLES `message_translations` WRITE;
/*!40000 ALTER TABLE `message_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_preferences`
--

DROP TABLE IF EXISTS `notification_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_preferences` (
  `appointment_reminders_enabled` bigint NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_notifications_enabled` bigint NOT NULL,
  `exercise_reminders_enabled` bigint NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `in_app_notifications_enabled` bigint NOT NULL,
  `message_notifications_enabled` bigint NOT NULL,
  `progress_updates_enabled` bigint NOT NULL,
  `reminder_time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sms_notifications_enabled` bigint NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_preferences`
--

LOCK TABLES `notification_preferences` WRITE;
/*!40000 ALTER TABLE `notification_preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_templates`
--

DROP TABLE IF EXISTS `notification_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_templates` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `template_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_templates`
--

LOCK TABLES `notification_templates` WRITE;
/*!40000 ALTER TABLE `notification_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `active` bigint NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `sessions` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `validity_days` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pain_logs`
--

DROP TABLE IF EXISTS `pain_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pain_logs` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_after` decimal(10,0) NOT NULL,
  `pain_before` decimal(10,0) NOT NULL,
  `pain_level` decimal(10,0) NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pain_logs`
--

LOCK TABLES `pain_logs` WRITE;
/*!40000 ALTER TABLE `pain_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `pain_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pain_tracking`
--

DROP TABLE IF EXISTS `pain_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pain_tracking` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_score` decimal(10,0) NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pain_tracking`
--

LOCK TABLES `pain_tracking` WRITE;
/*!40000 ALTER TABLE `pain_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `pain_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patientPackages`
--

DROP TABLE IF EXISTS `patientPackages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patientPackages` (
  `assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `package_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessions_used` decimal(10,0) NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patientPackages`
--

LOCK TABLES `patientPackages` WRITE;
/*!40000 ALTER TABLE `patientPackages` DISABLE KEYS */;
/*!40000 ALTER TABLE `patientPackages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_achievements`
--

DROP TABLE IF EXISTS `patient_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_achievements` (
  `achievement_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `progress` decimal(10,0) NOT NULL,
  `unlocked_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `achievement_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `achievement_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `badge_icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_achievements`
--

LOCK TABLES `patient_achievements` WRITE;
/*!40000 ALTER TABLE `patient_achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_analytics`
--

DROP TABLE IF EXISTS `patient_analytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_analytics` (
  `adherence_rate` decimal(10,0) NOT NULL,
  `average_pain_after` decimal(10,0) NOT NULL,
  `average_pain_before` decimal(10,0) NOT NULL,
  `completed_sessions` decimal(10,0) NOT NULL,
  `completion_rate` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_session_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `missed_sessions` decimal(10,0) NOT NULL,
  `pain_reduction` decimal(10,0) NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `skipped_sessions` decimal(10,0) NOT NULL,
  `total_sessions` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_analytics`
--

LOCK TABLES `patient_analytics` WRITE;
/*!40000 ALTER TABLE `patient_analytics` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_analytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_assessments`
--

DROP TABLE IF EXISTS `patient_assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_assessments` (
  `assessment_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `interpretation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `previous_score` decimal(10,0) NOT NULL,
  `score` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_assessments`
--

LOCK TABLES `patient_assessments` WRITE;
/*!40000 ALTER TABLE `patient_assessments` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_bookmarks`
--

DROP TABLE IF EXISTS `patient_bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_bookmarks` (
  `bookmarked_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_bookmarks`
--

LOCK TABLES `patient_bookmarks` WRITE;
/*!40000 ALTER TABLE `patient_bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_exercises`
--

DROP TABLE IF EXISTS `patient_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_exercises` (
  `completed_count` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_completed_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_exercises`
--

LOCK TABLES `patient_exercises` WRITE;
/*!40000 ALTER TABLE `patient_exercises` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_medical_history`
--

DROP TABLE IF EXISTS `patient_medical_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_medical_history` (
  `condition_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `diagnosis_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_medical_history`
--

LOCK TABLES `patient_medical_history` WRITE;
/*!40000 ALTER TABLE `patient_medical_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_medical_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_messages`
--

DROP TABLE IF EXISTS `patient_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_messages` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` bigint NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_messages`
--

LOCK TABLES `patient_messages` WRITE;
/*!40000 ALTER TABLE `patient_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_programs`
--

DROP TABLE IF EXISTS `patient_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_programs` (
  `adherence_rate` decimal(10,0) NOT NULL,
  `assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_rate` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_programs`
--

LOCK TABLES `patient_programs` WRITE;
/*!40000 ALTER TABLE `patient_programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_complaint` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `occupation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `amount` decimal(10,0) NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_number` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_assignment_progress`
--

DROP TABLE IF EXISTS `program_assignment_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_assignment_progress` (
  `assignment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_assignment_progress`
--

LOCK TABLES `program_assignment_progress` WRITE;
/*!40000 ALTER TABLE `program_assignment_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_assignment_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_assignments`
--

DROP TABLE IF EXISTS `program_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_assignments` (
  `assigned_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_assignments`
--

LOCK TABLES `program_assignments` WRITE;
/*!40000 ALTER TABLE `program_assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_exercises`
--

DROP TABLE IF EXISTS `program_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_exercises` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cycles` decimal(10,0) NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hold_duration` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` decimal(10,0) NOT NULL,
  `prepare_time` decimal(10,0) NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `repetitions` decimal(10,0) NOT NULL,
  `rest_between_sets` decimal(10,0) NOT NULL,
  `rest_time` decimal(10,0) NOT NULL,
  `sets` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_exercises`
--

LOCK TABLES `program_exercises` WRITE;
/*!40000 ALTER TABLE `program_exercises` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_templates`
--

DROP TABLE IF EXISTS `program_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_templates` (
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimated_duration` decimal(10,0) NOT NULL,
  `exercises_list` text COLLATE utf8mb4_unicode_ci,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_public` bigint NOT NULL,
  `usage_count` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_templates`
--

LOCK TABLES `program_templates` WRITE;
/*!40000 ALTER TABLE `program_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_translations`
--

DROP TABLE IF EXISTS `program_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_translations` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recovery_guidance` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_translations`
--

LOCK TABLES `program_translations` WRITE;
/*!40000 ALTER TABLE `program_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercises_list` text COLLATE utf8mb4_unicode_ci,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recovery_notes`
--

DROP TABLE IF EXISTS `recovery_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recovery_notes` (
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recovery_notes`
--

LOCK TABLES `recovery_notes` WRITE;
/*!40000 ALTER TABLE `recovery_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `recovery_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recovery_timer_configs`
--

DROP TABLE IF EXISTS `recovery_timer_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recovery_timer_configs` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cycles` decimal(10,0) NOT NULL,
  `exercise_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hold_duration` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_value` decimal(10,0) NOT NULL,
  `min_value` decimal(10,0) NOT NULL,
  `permission_mode` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prepare_time` decimal(10,0) NOT NULL,
  `repetitions` decimal(10,0) NOT NULL,
  `rest_between_sets` decimal(10,0) NOT NULL,
  `rest_time` decimal(10,0) NOT NULL,
  `sets` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_time` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recovery_timer_configs`
--

LOCK TABLES `recovery_timer_configs` WRITE;
/*!40000 ALTER TABLE `recovery_timer_configs` DISABLE KEYS */;
/*!40000 ALTER TABLE `recovery_timer_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_data`
--

DROP TABLE IF EXISTS `session_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_data` (
  `adherence_rate` decimal(10,0) NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_percentage` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cycles_completed` decimal(10,0) NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `exercises_completed` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pain_after` decimal(10,0) NOT NULL,
  `pain_before` decimal(10,0) NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sets_completed` decimal(10,0) NOT NULL,
  `skipped_exercises` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_data`
--

LOCK TABLES `session_data` WRITE;
/*!40000 ALTER TABLE `session_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_package_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soap_note_attachments`
--

DROP TABLE IF EXISTS `soap_note_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soap_note_attachments` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` decimal(10,0) NOT NULL,
  `file_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `soap_note_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soap_note_attachments`
--

LOCK TABLES `soap_note_attachments` WRITE;
/*!40000 ALTER TABLE `soap_note_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `soap_note_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telehealth_session_notes`
--

DROP TABLE IF EXISTS `telehealth_session_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telehealth_session_notes` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telehealth_session_notes`
--

LOCK TABLES `telehealth_session_notes` WRITE;
/*!40000 ALTER TABLE `telehealth_session_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `telehealth_session_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telehealth_sessions`
--

DROP TABLE IF EXISTS `telehealth_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telehealth_sessions` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `join_link` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recording_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telehealth_sessions`
--

LOCK TABLES `telehealth_sessions` WRITE;
/*!40000 ALTER TABLE `telehealth_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `telehealth_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapist_analytics`
--

DROP TABLE IF EXISTS `therapist_analytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapist_analytics` (
  `active_patients` decimal(10,0) NOT NULL,
  `average_patient_satisfaction` decimal(10,0) NOT NULL,
  `completed_appointments` decimal(10,0) NOT NULL,
  `completed_patients` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_appointments` decimal(10,0) NOT NULL,
  `total_patients` decimal(10,0) NOT NULL,
  `total_programs_created` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist_analytics`
--

LOCK TABLES `therapist_analytics` WRITE;
/*!40000 ALTER TABLE `therapist_analytics` DISABLE KEYS */;
/*!40000 ALTER TABLE `therapist_analytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapist_language_settings`
--

DROP TABLE IF EXISTS `therapist_language_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapist_language_settings` (
  `clinic_default_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_default_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist_language_settings`
--

LOCK TABLES `therapist_language_settings` WRITE;
/*!40000 ALTER TABLE `therapist_language_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `therapist_language_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapists`
--

DROP TABLE IF EXISTS `therapists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapists` (
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapists`
--

LOCK TABLES `therapists` WRITE;
/*!40000 ALTER TABLE `therapists` DISABLE KEYS */;
INSERT INTO `therapists` VALUES ('cbka8smyqy4sjli','2026-06-06 10:55:19.286Z','pratama.fisioterapis@gmail.com','sr5samflfuwc147','ADI PRATAMA','','2026-06-06 10:55:19.286Z'),('58612hwqacs4j79','2026-06-06 11:45:57.962Z','gogok@ti.com','3ld638761j64o32','gogok','','2026-06-06 11:45:57.962Z');
/*!40000 ALTER TABLE `therapists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timer_templates`
--

DROP TABLE IF EXISTS `timer_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timer_templates` (
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `template_config` text COLLATE utf8mb4_unicode_ci,
  `template_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timer_templates`
--

LOCK TABLES `timer_templates` WRITE;
/*!40000 ALTER TABLE `timer_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `timer_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translation_status`
--

DROP TABLE IF EXISTS `translation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translation_status` (
  `completion_percentage` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_fields` decimal(10,0) NOT NULL,
  `translated_fields` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translation_status`
--

LOCK TABLES `translation_status` WRITE;
/*!40000 ALTER TABLE `translation_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `translation_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_language_preferences`
--

DROP TABLE IF EXISTS `user_language_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_language_preferences` (
  `app_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `exercise_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reminder_language` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_language_preferences`
--

LOCK TABLES `user_language_preferences` WRITE;
/*!40000 ALTER TABLE `user_language_preferences` DISABLE KEYS */;
INSERT INTO `user_language_preferences` VALUES ('en','2026-06-07 01:42:38.554Z','en','cdnh27rc96fwy27','en','en','2026-06-07 01:42:38.554Z','bgtaxum2sxt4rue'),('id','2026-06-07 01:42:46.023Z','id','ry8b287twgbxdzx','id','id','2026-06-07 01:42:46.023Z','bgtaxum2sxt4rue'),('en','2026-06-07 01:43:46.693Z','en','iow5ng9fwo4y6zm','en','en','2026-06-07 01:43:46.693Z','tyfuwrr0molbyno'),('id','2026-06-07 01:43:48.108Z','id','l8t9qlp7bnzm2nw','id','id','2026-06-07 01:43:48.108Z','tyfuwrr0molbyno'),('en','2026-06-07 11:18:59.911Z','en','lvu5m3kehn5qdxn','en','en','2026-06-07 11:18:59.911Z','tyfuwrr0molbyno');
/*!40000 ALTER TABLE `user_language_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permissions` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `assigned_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `role_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sessions` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `avatar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVisibility` bigint NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenKey` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` bigint NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `invite_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `medical_diagnosis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `medical_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `allergies` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `emergency_contact_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `emergency_contact_phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_therapist_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_email` bigint NOT NULL,
  `notification_sms` bigint NOT NULL,
  `notification_push` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','2026-06-06 10:54:33.424Z','pratama.fisioterapis@gmail.com',1,'aptnmqbkeb8qf3m','adi pratama','$2a$10$iKqXNYHgSNFnz7jdxaFllukUpzPl5K/4UZXNGlYbBWD47bFVXKoZ.','QHInGy8BUGscMx1TWPjM4fup9vAoIXxzH8o5XgbBX7iVwaipZ4','2026-06-06 11:52:16.571Z',1,'cbka8smyqy4sjli','','','admin','','','','','','',0,0,0),('','2026-06-06 11:45:15.685Z','physiome@gmail.com',0,'qly55w8s12cautr','','$2a$10$StVK2FmrREB3s9cKFlYKvOwtFpbi32cToZ673FaVlqAY9TK3NtRr6','n3XtgD5JfbUPKDWT8pjd4ENLXgGCPkHLSVgAKdxhsVqmdxkWdb','2026-06-06 11:45:58.211Z',0,'58612hwqacs4j79','','v9fafsfcgp3ynbt','','','','','','','',0,0,0),('','2026-06-06 14:40:27.209Z','adi@kaffah.com',1,'rfnqxkp03q50gsw','adi physio','$2a$10$J6V.UF9mrKzFuE8RIk/6gexhlqvbCVPxcMJmF9AZliLupBGQoh.dm','KQsvmVPgu29U2wBJqDwIIbyPQTrMj21i1XN4eGXalrjkhHQvLU','2026-06-06 14:40:27.209Z',1,'','','','patient','','','','','','',0,0,0),('','2026-06-07 00:05:22.108Z','patient@demo.com',0,'bgtaxum2sxt4rue','','$2a$10$f2MvliY2OKhUYTtMk37ABOetFnMlvtrumm1Ttd.WMEmfRuTFFV3Ba','wv9gO81hfQvYfxRHAzrL1uAQzLd0TXoE58Vghpwi4DvsBZNWLE','2026-06-07 00:05:22.108Z',1,'','','','patient','','','','','','',0,0,0),('','2026-06-07 00:05:24.277Z','therapist@demo.com',0,'tyfuwrr0molbyno','','$2a$10$uJRrnH9Up6oUEHPpXT4/je/h4J/Yu1le6X9gAh6bNiXJO.3un9upq','FPFXc8d7Kj4ThRQepiB4mimim2kQhCjy6R8izO9dLZeeX1KNkx','2026-06-07 00:05:24.277Z',1,'','','','therapist','','','','','','',0,0,0),('','2026-06-07 00:05:26.476Z','admin@demo.com',0,'o8ulxiqjx2x9tz6','','$2a$10$xjpxDrSmXZ6KhIwb8YCepOGrrtmoXaTPmV.pEqHrpXuzIu6jsuX4G','cTB5PxUpDiqkWzRX9AV579KPAeWJ5dON8q1ri30xBFsX3sFJuS','2026-06-07 00:05:26.476Z',1,'','','','admin','','','','','','',0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_playback_history`
--

DROP TABLE IF EXISTS `video_playback_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_playback_history` (
  `completion_percentage` decimal(10,0) NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_watched_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_duration` decimal(10,0) NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `watch_duration` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_playback_history`
--

LOCK TABLES `video_playback_history` WRITE;
/*!40000 ALTER TABLE `video_playback_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_playback_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `body_region` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `clinic_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `equipment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` text COLLATE utf8mb4_unicode_ci,
  `target_muscle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_by` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_file` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice_guidance_translations`
--

DROP TABLE IF EXISTS `voice_guidance_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice_guidance_translations` (
  `created` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `guidance_key` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice_guidance_translations`
--

LOCK TABLES `voice_guidance_translations` WRITE;
/*!40000 ALTER TABLE `voice_guidance_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `voice_guidance_translations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 17:42:54
