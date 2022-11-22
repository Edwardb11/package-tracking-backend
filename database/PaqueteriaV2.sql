-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-11-2022 a las 16:25:35
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_paqueteriaV2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `celular` varchar(50) NOT NULL,
  `correo_electronico` varchar(90) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `token` text DEFAULT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombres`, `apellidos`, `sexo`, `celular`, `correo_electronico`, `contraseña`, `fecha_nacimiento`, `token`, `creado`, `actualizado`) VALUES
(1, 'Edward', 'Diaz', 'm', '183882', 'manuel@hotmail.com', '$2a$10$wYqK0PCCrCtOe0ni9cMeU.3tXVifTYzVyygu9D4Pe4stXRfx2dfky', '2000-01-01', NULL, '2022-09-13 18:04:10', '2022-09-13 18:04:10'),
(3, 'Prueba1', 'Prueba1', 'm', '809-888-9912', 'prueba1@hotmail.com', '$2a$10$gDq2oCbJfdFrGIBMh61lVeUtY12eR6gpeqDieouyb8vxdm9gMqb0W', '2000-11-03', NULL, '2022-11-14 13:47:00', '2022-11-14 13:47:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `nombre`) VALUES
(0, 'Pendiente'),
(1, 'Recogido'),
(2, 'Envalijado'),
(3, 'Proceso de logistica'),
(4, 'Pendiente de pago'),
(5, 'Pendiente de envio'),
(6, 'Enviado'),
(7, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_factura` int(11) NOT NULL,
  `id_paquete` varchar(30) NOT NULL,
  `cantidad_a_pagar` int(55) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id_factura`, `id_paquete`, `cantidad_a_pagar`, `creado`, `actualizado`) VALUES
(1, '11HAaDDD', 500, '2022-09-14 18:24:26', '2022-09-13 18:24:26'),
(19, '1663960330378', 300, '2022-10-17 15:57:21', '2022-10-17 15:57:21'),
(24, '1668433660588', 400, '2022-11-14 13:50:32', '2022-11-14 13:50:32'),
(25, '1669042707122', 800, '2022-11-21 15:46:49', '2022-11-21 15:46:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_de_pagos`
--

CREATE TABLE `metodos_de_pagos` (
  `id_metodo_de_pago` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `metodos_de_pagos`
--

INSERT INTO `metodos_de_pagos` (`id_metodo_de_pago`, `nombre`) VALUES
(1, 'PayPal'),
(2, 'Tarjetas de débito y crédito'),
(3, 'Cheques'),
(4, 'Transferencias bancarias'),
(5, 'Tarjetas prepago');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `id_paquete` varchar(30) NOT NULL,
  `id_usuario_final` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `peso` varchar(30) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id_paquete`, `id_usuario_final`, `id_cliente`, `nombre`, `peso`, `cantidad`, `ubicacion`, `creado`, `actualizado`) VALUES
('112222', 21, 1, 'Iphone 12', '3', 2, 'Moca', '2022-10-31 21:08:52', '2022-10-31 21:08:52'),
('11HAaDDD', 21, 1, 'Estuche de lente', '11', 11, 'La Vega, Rio verde arriba, Casa:2', '2022-09-13 18:05:15', '2022-09-13 18:05:15'),
('1663960330378', 21, 1, 'Mesa Gaming', '10', 1, 'La Vega, Rio verde arriba, Casa:1', '2022-09-23 19:12:10', '2022-09-23 19:12:10'),
('1668433660588', 23, 3, 'Silla gamer', '10', 1, 'La Vega, Rio verder arriba, Casa:1', '2022-11-14 13:47:40', '2022-11-14 13:47:40'),
('1669042707122', 24, 1, 'Prueba', '10', 25, 'La Vega, La Vega, Casa:3399', '2022-11-21 14:58:27', '2022-11-21 14:58:27'),
('1669042727673', 25, 1, 'Prueba', '10', 25, 'La Vega, La Vega, Casa:3399', '2022-11-21 14:58:47', '2022-11-21 14:58:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquetes_estados`
--

CREATE TABLE `paquetes_estados` (
  `id_paquetes` varchar(30) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paquetes_estados`
--

INSERT INTO `paquetes_estados` (`id_paquetes`, `id_estado`, `id_personal`, `ubicacion`, `activo`, `creado`, `actualizado`) VALUES
('112222', 0, 0, 'Moca', 0, '2022-10-31 21:08:52', '2022-10-31 21:08:52'),
('112222', 1, 1, 'Moca', 0, '2022-11-01 17:50:26', '2022-11-01 17:50:26'),
('112222', 2, 1, 'Moca', 1, '2022-11-01 18:23:19', '2022-11-01 18:23:19'),
('11HAaDDD', 0, 0, 'Moca', 0, '2022-10-10 13:09:50', '2022-11-08 13:09:50'),
('11HAaDDD', 1, 2, 'Moca', 0, '2022-10-04 18:38:59', '2022-10-04 18:38:59'),
('11HAaDDD', 2, 2, 'Moca', 0, '2022-10-04 18:43:40', '2022-10-04 18:43:40'),
('11HAaDDD', 3, 1, 'Santiago', 0, '2022-10-11 13:49:55', '2022-10-11 13:49:55'),
('11HAaDDD', 4, 2, 'Moca', 0, '2022-10-04 18:46:36', '2022-10-04 18:46:36'),
('11HAaDDD', 5, 4, 'Moca', 0, '2022-10-04 18:46:30', '2022-10-04 18:46:30'),
('11HAaDDD', 6, 1, 'Moca', 0, '2022-10-25 17:48:26', '2022-10-25 17:48:26'),
('11HAaDDD', 7, 6, 'Moca', 1, '2022-10-26 10:17:11', '2022-10-26 10:17:11'),
('1663960330378', 0, 0, 'Moca', 0, '2022-10-26 10:15:00', '2022-10-26 10:15:00'),
('1663960330378', 1, 2, 'La Vega', 0, '2022-10-06 14:35:25', '2022-10-06 14:35:25'),
('1663960330378', 2, 2, 'La Vega', 0, '2022-10-12 13:56:12', '2022-10-12 13:56:12'),
('1663960330378', 3, 4, 'La Vega', 0, '2022-10-26 09:39:03', '2022-10-26 09:39:03'),
('1663960330378', 4, 4, 'Prueba', 1, '2022-10-26 09:39:56', '2022-10-26 09:39:56'),
('1668433660588', 0, 0, 'La Vega, Rio verder arriba, Casa:1', 0, '2022-11-14 13:47:40', '2022-11-14 13:47:40'),
('1668433660588', 1, 1, 'La Vega, Rio verder arriba, Casa:1', 0, '2022-11-14 13:49:40', '2022-11-14 13:49:40'),
('1668433660588', 2, 1, 'La Vega, Rio verder arriba, Casa:1', 0, '2022-11-14 13:50:03', '2022-11-14 13:50:03'),
('1668433660588', 3, 1, 'La Vega, Rio verder arriba, Casa:1', 0, '2022-11-14 13:50:14', '2022-11-14 13:50:14'),
('1668433660588', 4, 1, 'SUCURSAL', 0, '2022-11-14 13:50:32', '2022-11-14 13:50:32'),
('1668433660588', 5, 0, 'BILL: Pago de usuario', 0, '2022-11-14 13:51:31', '2022-11-14 13:51:31'),
('1668433660588', 6, 2, 'BILL: Pago de usuario', 0, '2022-11-14 13:53:53', '2022-11-14 13:53:53'),
('1668433660588', 7, 2, 'BILL: Pago de usuario', 1, '2022-11-14 13:54:06', '2022-11-14 13:54:06'),
('1669042707122', 0, 0, 'La Vega, La Vega, Casa:3399 ', 0, '2022-11-21 11:43:03', '2022-11-21 11:43:03'),
('1669042707122', 1, 1, 'La Vega, La Vega, Casa:3399 ', 0, '2022-11-21 15:23:12', '2022-11-21 15:23:12'),
('1669042707122', 2, 1, 'La Vega, La Vega, Casa:3399 ', 0, '2022-11-21 15:40:03', '2022-11-21 15:40:03'),
('1669042707122', 3, 1, 'La Vega, La Vega, Casa:3399 ', 0, '2022-11-21 15:43:58', '2022-11-21 15:43:58'),
('1669042707122', 4, 1, 'SUCURSAL', 1, '2022-11-21 15:46:49', '2022-11-21 15:46:49'),
('1669042707122', 5, 2, 'Envio en curso: MOCA, Juan Lopez, Casa:22', 1, '2022-11-21 18:12:45', '2022-11-21 18:12:45'),
('1669042727673', 0, 0, 'La Vega, La Vega, Casa:3399', 1, '2022-11-21 14:58:47', '2022-11-21 14:58:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id_personal` int(11) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `sexo` varchar(30) NOT NULL,
  `niveles_estudios` varchar(30) NOT NULL,
  `correo_electronico` varchar(90) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  `token` text DEFAULT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id_personal`, `nombres`, `apellidos`, `sexo`, `niveles_estudios`, `correo_electronico`, `contraseña`, `fecha_nacimiento`, `celular`, `activo`, `token`, `creado`, `actualizado`) VALUES
(0, 'user', 'user', 'user', 'user', 'user@hotmail.com', '$2a$10$v.0AnP/McJmYYSAbY.CUOeqwUa8eaHIhp1rgGhzcTuV6dwE77T4na', '2022-09-19', '93749283', 1, NULL, '2022-10-26 14:00:03', '2022-10-26 14:00:03'),
(1, 'Edward', 'Diaz', 'm', 'Secundarios', 'edward@hotmail.com', '$2a$10$jIuqfK5ai2XPhWYOr4NeLOPJbWA/dg.k6r54N/ZVW8OXio7jBcice', '2001-10-01', NULL, 1, NULL, '2022-09-13 18:05:49', '2022-09-13 18:05:49'),
(2, 'Jose', 'Diaz', 'm', 'Secundarios', 'delivery@hotmail.com', '$2a$10$1WOMDN1EsOi8y9zq4EgztewGzAaKe/GzRfy4P0cLvIW0le3H6IK/G', '2001-10-01', NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoyLCJuYW1lIjoiSm9zZSIsImVtYWlsIjoiZGVsaXZlcnlAaG90bWFpbC5jb20iLCJzZXhvIjoibSIsInJvbCI6W3siaWRfcm9sZXMiOjMsIm5vbWJyZSI6IlJlcGFydGlkb3IiLCJwZXJzb25hbF9yb2xlcyI6eyJpZF9wZXJzb25hbCI6MiwiaWRfcm9sZXMiOjMsImNyZWFkbyI6IjIwMjItMDktMjlUMTY6NTc6MzguMDAwWiIsImFjdHVhbGl6YWRvIjoiMjAyMi0wOS0yOVQxNjo1NzozOC4wMDBaIn19XSwiaWF0IjoxNjY5MDUxOTkwLCJleHAiOjE2NjkwNTU1OTB9.ubS0H4J91gsf3rArNvN_r70xbjkbjv7Qk0csHZZ1c6Y', '2022-09-13 18:09:56', '2022-09-13 18:09:56'),
(4, 'Cecilia', 'Castillo', 'f', 'Secundarios', 'trabajador@hotmail.com', '$2a$10$gd14p/tfIscAgS7HB6pO9eiuDJlDJfpk9f6npV7hv0Tzo2VdvhihO', '2001-10-01', '93749283', 1, NULL, '2022-09-29 16:48:00', '2022-09-29 16:48:00'),
(6, 'Edward', 'Brito Diaz', 'm', 'Primario', 'edwardbro11@hotmail.com', '$2a$10$JUZfFJ.Hu/lx54S0/89DleY7bgAsNao2oye7xL0DCTUj6aVTtQi9i', '2001-10-01', '8498564014', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjo2LCJuYW1lIjoiRWR3YXJkIiwiZW1haWwiOiJlZHdhcmRicm8xMUBob3RtYWlsLmNvbSIsInNleG8iOiJtIiwicm9sIjpbeyJpZF9yb2xlcyI6Miwibm9tYnJlIjoiUmVwYXJ0aWRvciIsInBlcnNvbmFsX3JvbGVzIjp7ImlkX3BlcnNvbmFsIjo2LCJpZF9yb2xlcyI6MiwiY3JlYWRvIjoiMjAyMi0wOS0yOVQxNzowMTo1My4wMDBaIiwiYWN0dWFsaXphZG8iOiIyMDIyLTA5LTI5VDE3OjAxOjUzLjAwMFoifX1dLCJpYXQiOjE2NjcyMzY1NjMsImV4cCI6MTY2NzI0MDE2M30.aIWK9kOAXAmAHSDh02k3Cu2zoAA9uPLCdSZfQDya-Ro', '2022-09-29 17:01:53', '2022-09-29 17:01:53'),
(10, 'Edward', 'Diaz', 'm', 'Secundarios', 'aaaaa@hotmail.com', '$2a$10$Tx4f4XG98Dh9wOQS7QX4kec29X9SQJgaFL94GVy5Opy3rMN5z8Kjy', '2001-10-01', '93749283', 0, NULL, '2022-09-30 17:55:25', '2022-09-30 17:55:25'),
(16, 'Edward', 'Diaz', 'm', 'Secundarios', 'user@hotmail.com', '$2a$10$5OIZuEuahSthXDsOihaltuSFOjHYWLffGgUqhD6M.7msEdsVYP9iy', '2022-09-19', '93749283', 1, NULL, '2022-10-26 14:06:02', '2022-10-26 14:06:02'),
(18, 'Edward', 'Brito Diaz', 'm', 'Primario', 'edwaraadbrito11@hotmail.com', '$2a$10$mndZxmge6Bus8qAI79/wdO5dpapdAphPhuHpRMktBiB48aFML1S02', '2022-11-04', '8498564014', 1, NULL, '2022-11-21 14:06:55', '2022-11-21 14:06:55'),
(19, 'Edward', 'Brito Diaz', 'm', 'f', 'edwaraadbrito11@hotmail.com', '$2a$10$BYQo/Y/OSe02iYP/IHDxEu0ukOkE0LHo/OFDJZb5c0HULEQ.s1qOa', '2022-11-04', '8498564014', 1, NULL, '2022-11-21 14:07:23', '2022-11-21 14:07:23'),
(20, 'Edward', 'Brito Diaz', 'm', 'f', 'edwardbrito11@hotmail.com', '$2a$10$PQJUSCLg5.O/uvTh/IHR0eMx6nVOqwXHkfCUiTBNu7wgdk9HKTctS', '2022-11-17', '8498564014', 1, NULL, '2022-11-21 14:10:30', '2022-11-21 14:10:30'),
(21, 'Edward', 'Brito Diaz', 'm', 'm', 'edwardbrito11@hotmail.com', '$2a$10$Tol9apibd0ttY72CmwIU/.sE3N6xfV/z6YOOj5V.jVG4C2SXeGlGa', '2022-11-17', '8498564014', 1, NULL, '2022-11-21 14:10:35', '2022-11-21 14:10:35'),
(22, 'Edward', 'Brito Diaz', 'm', 'Primario', 'edwardbrito11@hotmail.com', '$2a$10$CA8C/nUgJBUZB0ygLoP2iOK2A1s1NJmVGYAYN9LqTyoMF.00unG16', '2022-11-11', '8498564014', 1, NULL, '2022-11-21 14:15:13', '2022-11-21 14:15:13'),
(23, 'Edward', 'Brito Diaz', 'm', 'primario', 'edwardbrito11@hotmail.com', '$2a$10$MPiJZYvyt9uUq85HemBOBOa.RZ6LKB07N4Ja0EJS0XAIBeyE45saO', '2022-11-14', '8498564014', 1, NULL, '2022-11-21 14:23:52', '2022-11-21 14:23:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_roles`
--

CREATE TABLE `personal_roles` (
  `id_personal` int(11) NOT NULL,
  `id_roles` int(11) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personal_roles`
--

INSERT INTO `personal_roles` (`id_personal`, `id_roles`, `creado`, `actualizado`) VALUES
(1, 1, '2022-09-13 14:16:06', '2022-09-13 14:16:06'),
(2, 3, '2022-09-29 16:57:38', '2022-09-29 16:57:38'),
(4, 2, '2022-10-25 14:15:51', '2022-10-25 14:15:51'),
(6, 2, '2022-09-29 17:01:53', '2022-09-29 17:01:53'),
(10, 2, '2022-09-30 13:55:44', '2022-09-30 13:55:44'),
(20, 2, '2022-11-21 14:10:30', '2022-11-21 14:10:30'),
(21, 2, '2022-11-21 14:10:35', '2022-11-21 14:10:35'),
(22, 1, '2022-11-21 14:15:13', '2022-11-21 14:15:13'),
(23, 1, '2022-11-21 14:23:52', '2022-11-21 14:23:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_roles` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_roles`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Trabajador'),
(3, 'Repartidor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `id_transaccion` int(11) NOT NULL,
  `id_metodo_de_pago` int(11) NOT NULL,
  `id_factura` int(11) NOT NULL,
  `monto` int(55) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`id_transaccion`, `id_metodo_de_pago`, `id_factura`, `monto`, `creado`, `actualizado`) VALUES
(1, 1, 1, 500, '2022-09-18 18:31:45', '2022-09-13 18:31:45'),
(40, 1, 24, 400, '2022-11-14 13:51:31', '2022-11-14 13:51:31'),
(43, 1, 25, 800, '2022-11-21 17:31:15', '2022-11-21 17:31:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_finales`
--

CREATE TABLE `usuario_finales` (
  `id_usuario_final` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `celular` varchar(50) NOT NULL,
  `ubicacion` varchar(90) NOT NULL,
  `creado` datetime DEFAULT current_timestamp(),
  `actualizado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_finales`
--

INSERT INTO `usuario_finales` (`id_usuario_final`, `nombres`, `apellidos`, `sexo`, `celular`, `ubicacion`, `creado`, `actualizado`) VALUES
(21, 'Edward', 'Brito Diaz', 'm', '8498564014', 'Azua, Guayabal, Casa:1', '2022-09-23 19:12:10', '2022-09-23 19:12:10'),
(22, 'Edward', 'Brito Diaz', 'm', '8498564014', 'Azua, CUTUPU, Casa:1', '2022-11-01 19:18:19', '2022-11-01 19:18:19'),
(23, 'Edward', 'Brito Diaz', 'm', '8498564014', 'MOCA, Guayabal, Casa:1', '2022-11-14 13:47:40', '2022-11-14 13:47:40'),
(24, 'Edward', 'Brito Diaz', 'm', '8498564014', 'MOCA, Juan Lopez, Casa:22', '2022-11-21 14:58:27', '2022-11-21 14:58:27'),
(25, 'Edward', 'Brito Diaz', 'm', '8498564014', 'MOCA, Juan Lopez, Casa:22', '2022-11-21 14:58:47', '2022-11-21 14:58:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_factura`,`id_paquete`),
  ADD KEY `fk_factura_paquete1` (`id_paquete`);

--
-- Indices de la tabla `metodos_de_pagos`
--
ALTER TABLE `metodos_de_pagos`
  ADD PRIMARY KEY (`id_metodo_de_pago`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`id_paquete`,`id_usuario_final`,`id_cliente`),
  ADD KEY `fk_paquetes_usuario_final1` (`id_usuario_final`),
  ADD KEY `fk_paquetes_clientes1` (`id_cliente`);

--
-- Indices de la tabla `paquetes_estados`
--
ALTER TABLE `paquetes_estados`
  ADD PRIMARY KEY (`id_paquetes`,`id_estado`,`id_personal`),
  ADD KEY `fk_paquetes_has_estados_estados1` (`id_estado`),
  ADD KEY `fk_paquetes_estados_personal1` (`id_personal`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id_personal`);

--
-- Indices de la tabla `personal_roles`
--
ALTER TABLE `personal_roles`
  ADD PRIMARY KEY (`id_personal`,`id_roles`),
  ADD KEY `fk_personal_has_roles_roles1` (`id_roles`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_roles`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id_transaccion`,`id_factura`,`id_metodo_de_pago`),
  ADD KEY `fk_transacciones_factura2` (`id_factura`),
  ADD KEY `fk_transacciones_metodos_de_pagos2` (`id_metodo_de_pago`);

--
-- Indices de la tabla `usuario_finales`
--
ALTER TABLE `usuario_finales`
  ADD PRIMARY KEY (`id_usuario_final`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `metodos_de_pagos`
--
ALTER TABLE `metodos_de_pagos`
  MODIFY `id_metodo_de_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_roles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id_transaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `usuario_finales`
--
ALTER TABLE `usuario_finales`
  MODIFY `id_usuario_final` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_paquete1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD CONSTRAINT `fk_paquetes_clientes1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_paquetes_usuario_final1` FOREIGN KEY (`id_usuario_final`) REFERENCES `usuario_finales` (`id_usuario_final`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `paquetes_estados`
--
ALTER TABLE `paquetes_estados`
  ADD CONSTRAINT `fk_paquetes_estados_personal1` FOREIGN KEY (`id_personal`) REFERENCES `personal` (`id_personal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_paquetes_has_estados_estados1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_paquetes_has_estados_paquetes1` FOREIGN KEY (`id_paquetes`) REFERENCES `paquete` (`id_paquete`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `personal_roles`
--
ALTER TABLE `personal_roles`
  ADD CONSTRAINT `fk_personal_has_roles_personal1` FOREIGN KEY (`id_personal`) REFERENCES `personal` (`id_personal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personal_has_roles_roles1` FOREIGN KEY (`id_roles`) REFERENCES `roles` (`id_roles`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `fk_transacciones_factura2` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transacciones_metodos_de_pagos2` FOREIGN KEY (`id_metodo_de_pago`) REFERENCES `metodos_de_pagos` (`id_metodo_de_pago`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
