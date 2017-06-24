-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2017 at 10:09 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baron`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_barber`
--

CREATE TABLE `tb_barber` (
  `id_barber` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `barber_img` blob NOT NULL,
  `barber_phone` varchar(12) NOT NULL,
  `barber_addr` varchar(100) NOT NULL,
  `barber_about` varchar(300) NOT NULL,
  `barber_stat` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_barber`
--

INSERT INTO `tb_barber` (`id_barber`, `id_user`, `barber_img`, `barber_phone`, `barber_addr`, `barber_about`, `barber_stat`) VALUES
(2, 5, 0x352e6a7067, '081081081081', 'Jatinangor, Default ini weeq', 'Lorem ipsum dolor et simet', 0),
(3, 7, 0x372e6a7067, '123123', 'adalah jadi', 'adaapa aja yaaa aaaaa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_order`
--

CREATE TABLE `tb_order` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_barber` int(11) NOT NULL,
  `id_style` int(11) NOT NULL,
  `ord_address` varchar(100) NOT NULL,
  `ord_phone` varchar(13) NOT NULL,
  `dt_order` datetime NOT NULL,
  `dt_finished` datetime NOT NULL,
  `ord_price` varchar(20) NOT NULL,
  `ord_status` varchar(10) NOT NULL,
  `new` tinyint(1) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_order`
--

INSERT INTO `tb_order` (`id_order`, `id_user`, `id_barber`, `id_style`, `ord_address`, `ord_phone`, `dt_order`, `dt_finished`, `ord_price`, `ord_status`, `new`, `rating`) VALUES
(16, 6, 3, 8, 'qqq', '111', '2017-06-24 01:07:00', '0000-00-00 00:00:00', 'Rp 20.000', 'selesai', 1, 0),
(17, 6, 3, 8, '[[', '00', '2017-06-24 01:15:00', '0000-00-00 00:00:00', 'Rp 20.000', 'selesai', 1, 0),
(18, 6, 3, 8, 'qqq', '123', '2017-06-24 01:43:00', '0000-00-00 00:00:00', 'Rp 20.000', 'selesai', 1, 0),
(19, 6, 3, 8, 'aaa', '111', '2017-06-24 01:46:00', '0000-00-00 00:00:00', 'Rp 20.000', 'ditolak', 1, 0),
(20, 6, 3, 8, 'aaa', '111', '2017-06-24 01:47:00', '0000-00-00 00:00:00', 'Rp 20.000', 'selesai', 1, 0),
(21, 6, 3, 8, 'aaa', '111', '2017-06-24 02:01:00', '0000-00-00 00:00:00', 'Rp 20.000', 'batal', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_style`
--

CREATE TABLE `tb_style` (
  `id_style` int(11) NOT NULL,
  `id_barber` int(11) NOT NULL,
  `sty_name` varchar(20) NOT NULL,
  `sty_img` blob NOT NULL,
  `sty_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_style`
--

INSERT INTO `tb_style` (`id_style`, `id_barber`, `sty_name`, `sty_img`, `sty_price`) VALUES
(8, 3, 'Undercut', 0x556e6465726375742e6a7067, '20000'),
(9, 3, 'asdtagfirullah', 0x6173642e706e67, '12300'),
(10, 2, 'Spike', 0x5370696b652e6a7067, '15000'),
(11, 3, 'Test', 0x546573742e706e67, '20000');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `akses` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id_user`, `username`, `email`, `password`, `akses`) VALUES
(5, 'cccc', 'ccc@cc.cc', 'c1f68ec06b490b3ecb4066b1b13a9ee9', 'barber'),
(6, 'aaaa', 'aaa@aa.aaa', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', 'user'),
(7, 'Brother', 'brod@ther.com', 'd0970714757783e6cf17b26fb8e2298f', 'barber'),
(8, 'Admin', 'admin@adm.in', 'f6fdffe48c908deb0f4c3bd36c032e72', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_barber`
--
ALTER TABLE `tb_barber`
  ADD PRIMARY KEY (`id_barber`);

--
-- Indexes for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexes for table `tb_style`
--
ALTER TABLE `tb_style`
  ADD PRIMARY KEY (`id_style`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `user_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_barber`
--
ALTER TABLE `tb_barber`
  MODIFY `id_barber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tb_order`
--
ALTER TABLE `tb_order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `tb_style`
--
ALTER TABLE `tb_style`
  MODIFY `id_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
