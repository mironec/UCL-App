-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: fdb14.freehostingeu.com
-- Generation Time: Apr 27, 2016 at 05:31 PM
-- Server version: 5.5.38-log
-- PHP Version: 5.5.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2104533_atosdb`
--
CREATE DATABASE IF NOT EXISTS `2104533_atosdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `2104533_atosdb`;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `datetime_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rating_id`, `service_id`, `user_id`, `rating`, `comment`, `datetime_added`) VALUES
(15, 1, 1, 3, 'Adding comments 3/10.', '2016-04-14 14:11:14'),
(14, 1, 1, 5, 'Great!', '2016-04-14 14:11:00'),
(13, 1, 1, 2, 's', '2016-04-14 14:10:50'),
(16, 1, 1, 4, 'Adding comments 4/10.', '2016-04-14 14:11:22'),
(17, 1, 1, 5, 'Adding comments 5/10.', '2016-04-14 14:11:31'),
(18, 1, 1, 1, 'Adding comments 6/10.', '2016-04-14 14:11:40'),
(19, 1, 1, 2, 'Adding comments 7/10.', '2016-04-14 14:11:51'),
(20, 1, 1, 3, 'Adding comments 8/10.', '2016-04-14 14:11:59'),
(21, 1, 1, 4, 'Adding comments 9/10.', '2016-04-14 14:12:07'),
(22, 1, 1, 5, 'Adding comments 10/10.', '2016-04-14 14:12:16'),
(23, 1, 1, 5, 'This comment should displace s.', '2016-04-14 14:12:32'),
(24, 1, 1, 5, 'A comment from a different domain!', '2016-04-14 16:10:25'),
(25, 1, 1, 4, 'A comment from my android.', '2016-04-14 16:24:10'),
(26, 1, 4, 4, 'Added comment', '2016-04-14 17:17:47'),
(27, 1, 1, 3, 'Nice', '2016-04-14 17:18:15'),
(28, 1, 1, 4, 'A comment from the same domain.', '2016-04-20 15:28:44');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(128) NOT NULL,
  `country` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `password`, `email`, `country`) VALUES
(1, 'miron', '$2y$10$f3WmxqJg2gLYBmtCgLwga.Oj5t0xiWOG5Iwkyvn5ops43Bli1FqbS', 'm@m.com', 'sk'),
(3, 'miron', '$2y$10$fyLjwbBNxaB.jKKD7r6yq.IZHZOKWNzrBfWzoVaKIRcSEORWRT1Du', 'miron@miron.com', 'sk'),
(4, 'Raja', '$2y$10$/7jVMQHKvuGNYE8FaAJWuupqbAncDzn9TyLSNtuflW2SmKb0C7fV6', 'upadhyayaraja@gmail.com', 'UK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `id` (`user_id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
