-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 07:12 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk_kasircafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `id` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_transaksis`
--

INSERT INTO `detail_transaksis` (`id`, `id_transaksi`, `id_menu`, `harga`, `createdAt`, `updatedAt`) VALUES
(14, 36, 7, 20000, '2023-05-23 02:24:53', '2023-05-23 02:24:53'),
(15, 37, 7, 35000, '2023-05-23 02:32:17', '2023-05-23 02:32:17'),
(16, 38, 8, 15000, '2023-05-23 03:31:29', '2023-05-23 03:31:29'),
(17, 39, 7, 20000, '2023-05-23 12:00:04', '2023-05-23 12:00:04'),
(18, 40, 8, 15000, '2023-05-24 01:49:06', '2023-05-24 01:49:06'),
(19, 41, 7, 20000, '2023-05-24 03:14:51', '2023-05-24 03:14:51'),
(20, 42, 9, 33000, '2023-05-24 03:22:17', '2023-05-24 03:22:17'),
(21, 43, 8, 15000, '2023-05-24 03:22:38', '2023-05-24 03:22:38'),
(22, 44, 8, 30000, '2023-05-24 04:13:09', '2023-05-24 04:13:09'),
(23, 45, 8, 15000, '2023-05-24 04:29:38', '2023-05-24 04:29:38'),
(24, 46, 7, 20000, '2023-05-24 04:33:13', '2023-05-24 04:33:13'),
(25, 47, 7, 20000, '2023-05-24 04:35:13', '2023-05-24 04:35:13'),
(26, 48, 8, 15000, '2023-05-24 04:37:27', '2023-05-24 04:37:27'),
(27, 49, 8, 15000, '2023-05-24 04:39:07', '2023-05-24 04:39:07'),
(28, 50, 7, 20000, '2023-05-24 04:47:58', '2023-05-24 04:47:58'),
(29, 51, 7, 40000, '2023-05-24 04:48:31', '2023-05-24 04:48:31'),
(30, 52, 7, 20000, '2023-05-24 05:06:13', '2023-05-24 05:06:13');

-- --------------------------------------------------------

--
-- Table structure for table `mejas`
--

CREATE TABLE `mejas` (
  `id` int(11) NOT NULL,
  `nomor_meja` varchar(255) DEFAULT NULL,
  `status` enum('tersedia','tidak_tersedia') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mejas`
--

INSERT INTO `mejas` (`id`, `nomor_meja`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'tidak_tersedia', '2023-05-16 05:54:28', '2023-05-24 04:47:58'),
(3, '2', 'tidak_tersedia', '2023-05-16 06:34:09', '2023-05-24 04:29:38'),
(4, '3', 'tidak_tersedia', '2023-05-16 06:35:15', '2023-05-24 01:49:06'),
(5, '4', 'tidak_tersedia', '2023-05-16 06:36:06', '2023-05-24 03:22:17'),
(7, '5', 'tidak_tersedia', '2023-05-22 13:09:55', '2023-05-24 03:22:38'),
(9, '9', 'tidak_tersedia', '2023-05-23 23:59:46', '2023-05-24 04:33:13'),
(12, '10', 'tidak_tersedia', '2023-05-24 04:10:48', '2023-05-24 04:48:31'),
(13, '6', 'tidak_tersedia', '2023-05-24 05:05:41', '2023-05-24 05:06:13'),
(14, '7', 'tersedia', '2023-05-24 05:05:45', '2023-05-24 05:05:45');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `nama_menu` varchar(255) DEFAULT NULL,
  `jenis` enum('makanan','minuman') DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `nama_menu`, `jenis`, `deskripsi`, `gambar`, `harga`, `createdAt`, `updatedAt`) VALUES
(7, 'Smoothie Bowl', 'makanan', 'fruit & granola ', 'foto-1684763790671.jpg', 20000, '2023-05-22 13:56:30', '2023-05-22 13:56:30'),
(8, 'Salad Wrap', 'makanan', 'veggie salad wrap', 'foto-1684763826292.jpg', 15000, '2023-05-22 13:57:06', '2023-05-22 13:57:06'),
(9, 'Strawberry Juice', 'minuman', 'strawberries', 'foto-1684767322038.jpg', 13000, '2023-05-22 13:57:44', '2023-05-22 14:55:22'),
(13, 'samsul sego', 'makanan', 'penak\r\n', 'foto-1684901479800.jpg', 10000, '2023-05-24 04:11:19', '2023-05-24 04:11:19');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230116135446-create-user.js'),
('20230116141307-create-menu.js'),
('20230116141550-create-meja.js'),
('20230116141627-create-transaksi.js'),
('20230116141745-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksis`
--

CREATE TABLE `transaksis` (
  `id` int(11) NOT NULL,
  `tgl_transaksi` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_meja` int(11) NOT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `alamat` varchar(100) NOT NULL,
  `total` int(11) NOT NULL,
  `status` enum('belum_bayar','lunas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksis`
--

INSERT INTO `transaksis` (`id`, `tgl_transaksi`, `id_user`, `id_meja`, `nama_pelanggan`, `alamat`, `total`, `status`, `createdAt`, `updatedAt`) VALUES
(36, '2023-05-23 02:24:52', 11, 4, 'p', '', 20000, 'lunas', '2023-05-23 02:24:53', '2023-05-23 02:24:55'),
(37, '2023-05-23 02:32:17', 11, 3, 'subhan', '', 35000, 'lunas', '2023-05-23 02:32:17', '2023-05-23 02:32:20'),
(38, '2023-05-23 03:31:29', 11, 5, 'Dipo', '', 15000, 'belum_bayar', '2023-05-23 03:31:29', '2023-05-23 03:31:29'),
(39, '2023-05-23 12:00:04', 11, 3, 'test', '', 20000, 'lunas', '2023-05-23 12:00:04', '2023-05-23 12:00:14'),
(40, '2023-05-24 01:49:06', 11, 4, 'p', '', 15000, 'lunas', '2023-05-24 01:49:06', '2023-05-24 01:49:08'),
(41, '2023-05-24 03:14:51', 11, 1, 'test', '', 20000, 'lunas', '2023-05-24 03:14:51', '2023-05-24 03:14:53'),
(42, '2023-05-24 03:22:17', 11, 5, 'dini', '', 33000, 'lunas', '2023-05-24 03:22:17', '2023-05-24 03:22:20'),
(43, '2023-05-24 03:22:38', 11, 7, 'test', '', 15000, 'belum_bayar', '2023-05-24 03:22:38', '2023-05-24 03:22:38'),
(44, '2023-05-24 04:13:09', 18, 1, 'jar ot', '', 30000, 'lunas', '2023-05-24 04:13:09', '2023-05-24 04:13:34'),
(45, '2023-05-24 04:29:38', 18, 3, 'ivan', '', 15000, 'belum_bayar', '2023-05-24 04:29:38', '2023-05-24 04:29:38'),
(46, '2023-05-24 04:33:13', 18, 9, 'test', '', 20000, 'belum_bayar', '2023-05-24 04:33:13', '2023-05-24 04:33:13'),
(47, '2023-05-24 04:35:13', 18, 1, 'test', '', 20000, 'belum_bayar', '2023-05-24 04:35:13', '2023-05-24 04:35:13'),
(48, '2023-05-24 04:37:27', 18, 1, 'test', '', 15000, 'belum_bayar', '2023-05-24 04:37:27', '2023-05-24 04:37:27'),
(49, '2023-05-24 04:39:07', 18, 1, 'test', '', 15000, 'belum_bayar', '2023-05-24 04:39:07', '2023-05-24 04:39:07'),
(50, '2023-05-24 04:47:58', 18, 1, 'test', 'test', 20000, 'belum_bayar', '2023-05-24 04:47:58', '2023-05-24 04:47:58'),
(51, '2023-05-24 04:48:31', 18, 12, 'test', 'test', 40000, 'lunas', '2023-05-24 04:48:31', '2023-05-24 04:48:36'),
(52, '2023-05-24 05:06:13', 18, 13, 'eka', 'danau ranau', 20000, 'belum_bayar', '2023-05-24 05:06:13', '2023-05-24 05:06:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir','manajer') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama_user`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(11, 'razan', 'kasir', 'arifin', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-19 07:07:38', '2023-05-22 16:11:22'),
(12, 'eko', 'admin', 'koyub', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-22 16:16:37', '2023-05-23 03:06:24'),
(13, 'andini', 'admin', 'andin', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-22 16:20:26', '2023-05-23 03:05:22'),
(14, 'ditok', 'admin', 'ditokkkk', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-23 03:05:04', '2023-05-23 03:05:04'),
(17, 'fadhil', 'manajer', 'putut', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-24 03:04:24', '2023-05-24 03:04:24'),
(18, 'ivan', 'kasir', 'ivan', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-24 03:35:31', '2023-05-24 03:35:31'),
(19, 'fahriza', 'admin', 'fahriza', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-24 03:35:47', '2023-05-24 03:35:47'),
(20, 'putra', 'manajer', 'putra', '827ccb0eea8a706c4c34a16891f84e7b', '2023-05-24 03:36:05', '2023-05-24 03:36:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `mejas`
--
ALTER TABLE `mejas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_meja` (`id_meja`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `mejas`
--
ALTER TABLE `mejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD CONSTRAINT `detail_transaksis_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksis` (`id`);

--
-- Constraints for table `transaksis`
--
ALTER TABLE `transaksis`
  ADD CONSTRAINT `transaksis_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
