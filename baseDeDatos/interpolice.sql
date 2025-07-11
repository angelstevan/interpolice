-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2025 a las 00:35:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudadano`
--

CREATE TABLE `ciudadano` (
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `apodo` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `planeta_origen` varchar(100) NOT NULL,
  `planeta_residencia` varchar(100) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `codigoQR` varchar(200) NOT NULL,
  `estado` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudadano`
--

INSERT INTO `ciudadano` (`codigo`, `nombre`, `apellido`, `apodo`, `fecha_nacimiento`, `planeta_origen`, `planeta_residencia`, `foto`, `codigoQR`, `estado`) VALUES
('C27', 'kaila', 'lo', 'tank', '2025-06-11', 'Tierra', 'Tierra', NULL, 'qr_C27.png', 1),
('D8', 'jjjjjjjjjjjjjjjj', 'franco', 'black', '0000-00-00', 'namekusein', 'tierra', NULL, 'qr_D8.png', 1),
('J34', 'cristian', 'zapata', 'blasito', '2025-06-20', 'tierra', 'tierra', NULL, 'qr_J34.png', 1),
('L23', 'santi', 'ruiz', '1', '2025-06-06', 'planeta x', 'tierra', NULL, 'qr_L23.png', 0),
('LP23', 'walter', 'arias', 'walso', '2100-06-04', 'tierra', 'tierra', NULL, 'qr_LP23.png', 1),
('N23', 'pedro', 'dsf', '', '0000-00-00', 'Tierra', 'Marte', '', 'qr_N23.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
