-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-08-2025 a las 00:24:20
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delito`
--

CREATE TABLE `delito` (
  `idDelito` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` int(200) NOT NULL,
  `nivel` varchar(70) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_delitos`
--

CREATE TABLE `historial_delitos` (
  `idRegistroDelito` int(11) NOT NULL,
  `idCiudadano` varchar(50) NOT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_delito`
--

CREATE TABLE `registro_delito` (
  `idRegistroDelito` int(11) NOT NULL,
  `fechaDelito` datetime DEFAULT NULL,
  `lugarDelito` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `idDelito` int(11) NOT NULL,
  `valor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `delito`
--
ALTER TABLE `delito`
  ADD PRIMARY KEY (`idDelito`);

--
-- Indices de la tabla `historial_delitos`
--
ALTER TABLE `historial_delitos`
  ADD PRIMARY KEY (`idRegistroDelito`,`idCiudadano`),
  ADD KEY `fk_registro_delito_has_ciudadano_ciudadano1_idx` (`idCiudadano`),
  ADD KEY `fk_registro_delito_has_ciudadano_registro_delito1_idx` (`idRegistroDelito`);

--
-- Indices de la tabla `registro_delito`
--
ALTER TABLE `registro_delito`
  ADD PRIMARY KEY (`idRegistroDelito`),
  ADD KEY `fk_registro_delito_delito1_idx` (`idDelito`);

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
-- AUTO_INCREMENT de la tabla `delito`
--
ALTER TABLE `delito`
  MODIFY `idDelito` int(11) NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `historial_delitos`
--
ALTER TABLE `historial_delitos`
  ADD CONSTRAINT `fk_registro_delito_has_ciudadano_ciudadano1` FOREIGN KEY (`idCiudadano`) REFERENCES `ciudadano` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_registro_delito_has_ciudadano_registro_delito1` FOREIGN KEY (`idRegistroDelito`) REFERENCES `registro_delito` (`idRegistroDelito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registro_delito`
--
ALTER TABLE `registro_delito`
  ADD CONSTRAINT `fk_registro_delito_delito1` FOREIGN KEY (`idDelito`) REFERENCES `delito` (`idDelito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
