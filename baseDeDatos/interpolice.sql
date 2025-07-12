-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2025 a las 07:38:08
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
('C27', 'kaila', 'gg', 'pro', '2025-07-10', 'Tierra', 'Tierra', NULL, 'qr_C27.png', 1),
('D8', 'jjjjjjjjjjjjjjjj', 'franco', 'black', '0000-00-00', 'namekusein', 'tierra', NULL, 'qr_D8.png', 1),
('J34', 'cristian', 'zapata', 'blasito', '2025-06-20', 'tierra', 'tierra', NULL, 'qr_J34.png', 1),
('L23', 'santi', 'ruiz', '1', '2025-06-06', 'planeta x', 'tierra', NULL, 'qr_L23.png', 0),
('L24', 'angel', 'Puertas', 'angel', '0000-00-00', 'Tierra', 'Marte', '', 'qr_L24.png', 1),
('LP23', 'walter', 'arias', 'walso', '2100-06-04', 'tierra', 'tierra', NULL, 'qr_LP23.png', 1),
('N23', 'pedro', 'dsf', '', '0000-00-00', 'Tierra', 'Marte', '', 'qr_N23.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`, `descripcion`) VALUES
(1, 'policia', 'es un policia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fechaIngreso` datetime NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `fechaIngreso`, `contrasena`, `correo`, `estado`, `idRol`) VALUES
(1, 'pedro', '2025-07-10 22:56:07', 'pedro123', 'pedro@gmail.com', 'Activo', 1),
(2, 'pepe', '0000-00-00 00:00:00', '$2b$11$aKENs.sVmP.K/X7HkYXA4.yTJiEEP/H/0ojdrqW.ncHo0hNurpdTu', 'pepe@gmail.com', 'Desactivado', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
