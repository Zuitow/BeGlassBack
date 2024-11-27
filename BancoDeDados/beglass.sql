-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27/11/2024 às 12:00
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `beglass`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `passcode` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `admin`
--

INSERT INTO `admin` (`id`, `username`, `passcode`, `email`) VALUES
(1, 'Paulo', '123', '123@example.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`) VALUES
(6, 43, 1),
(7, 43, 3),
(8, 43, 11),
(9, 43, 12),
(10, 43, 19),
(11, 43, 20),
(12, 44, 1),
(14, 44, 5),
(15, 44, 11),
(17, 45, 1),
(30, 45, 2),
(16, 45, 3),
(29, 45, 15),
(19, 46, 1),
(20, 46, 2),
(21, 46, 3),
(26, 46, 8),
(22, 46, 11),
(23, 46, 13),
(27, 46, 16),
(28, 46, 18),
(24, 46, 21),
(25, 46, 22);

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `recipe` text NOT NULL,
  `comofazer` text NOT NULL,
  `imagem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `recipe`, `comofazer`, `imagem`) VALUES
(1, 'Caipirinha', 'Uma versão sem álcool da mais famosa bebida brasileira.', '1 limão cortado em rodelas ou cubos\r\n2 colheres de sopa de açúcar (ou a gosto)\r\n1/4 xícara de água com gás ou refrigerante de limão\r\nGelo picado a gosto\r\nFolhas de hortelã para decorar (opcional)', 'Em um copo baixo, adicione os pedaços de limão e o açúcar.\r\nUsando um pilão, amasse bem o limão com o açúcar, liberando o suco e combinando-o com o açúcar.\r\nEncha o copo com gelo picado.\r\nComplete com a água com gás ou refrigerante de limão, misturando suavemente para incorporar todos os sabores.\r\nDecore com folhas de hortelã, se desejar.\r\nSirva imediatamente e aproveite a refrescância!', 'a'),
(2, 'Moscow Mule', 'Experimente esse delicioso moscow mule sem álcool que é simplesmente a receita mais saborosa, sendo a opção perfeita para você!', '1/2 xícara de cerveja de gengibre (ginger beer) sem álcool\r\n1/4 xícara de suco de limão fresco\r\n1/4 xícara de água com gás\r\n1 colher de sopa de xarope de gengibre (opcional, para um sabor extra de gengibre)\r\nGelo a gosto\r\nFatias de limão e raminhos de hortelã para decorar', 'Encha uma caneca de cobre ou um copo alto com gelo.\r\nAdicione o suco de limão fresco e o xarope de gengibre, se estiver usando.\r\nComplete com a cerveja de gengibre sem álcool e a água com gás.\r\nMexa suavemente para combinar os ingredientes.\r\nDecore com uma fatia de limão e um raminho de hortelã.\r\nSirva imediatamente e aproveite a refrescância!', ''),
(3, 'Sangria  Tropical Sem Álcool', 'Uma bebida refrescante e colorida, perfeita para qualquer ocasião. Feita com uma combinação de sucos de frutas e uma seleção vibrante de frutas frescas, esta Sangria não alcoólica oferece todo o sabor e diversão da versão tradicional, mas sem álcool. Ideal para dias quentes ou para servir em reuniões familiares e festas.', '1 litro de suco de uva\r\n500 ml de suco de laranja\r\n250 ml de suco de abacaxi\r\n250 ml de água com gás ou refrigerante de limão (opcional)\r\n1 laranja cortada em rodelas\r\n1 limão cortado em rodelas\r\n1 maçã cortada em cubos\r\n1 pêssego cortado em fatias finas\r\n1 xícara de morangos fatiados\r\n1/2 xícara de uvas sem sementes cortadas ao meio\r\n1 pau de canela\r\n1 colher de sopa de mel ou açúcar (opcional)\r\nFolhas de hortelã para decorar\r\nGelo a gosto', 'Em uma jarra grande, misture o suco de uva, o suco de laranja e o suco de abacaxi.\r\nAdicione as rodelas de laranja, limão, os cubos de maçã, as fatias de pêssego, os morangos, as uvas e o pau de canela.\r\nSe desejar, acrescente o mel ou açúcar para adoçar a bebida a gosto.\r\nMisture bem e leve à geladeira por pelo menos 2 horas para que os sabores se integrem.\r\nAntes de servir, adicione a água com gás ou o refrigerante de limão para dar um toque efervescente (opcional).\r\nSirva a Sangria em copos altos com bastante gelo e decore com folhas de hortelã.\r\n', 'a'),
(4, 'Margarita Refrescante Sem Álcool', 'Uma versão sem álcool da clássica Margarita, esta bebida refrescante combina o sabor cítrico do limão com o toque suave da laranja. Ideal para quem quer desfrutar do sabor e da vibração de uma Margarita sem o álcool. Perfeita para festas ou para uma tarde relaxante.', '1/2 xícara de suco de limão fresco\r\n1/4 xícara de suco de laranja fresco\r\n1/4 xícara de água com gás ou refrigerante de limão\r\n1 colher de sopa de néctar de agave ou mel\r\n1 colher de sopa de suco de limão para borda do copo\r\nSal grosso para borda do copo\r\nFatias de limão e laranja para decorar\r\nGelo a gosto', 'Em um prato pequeno, coloque o suco de limão reservado para a borda. Em outro prato, espalhe o sal grosso.\r\nMergulhe a borda de um copo no suco de limão e, em seguida, pressione-a no sal grosso para criar a borda salgada clássica da Margarita.\r\nEm uma coqueteleira ou jarra, misture o suco de limão, o suco de laranja e o néctar de agave ou mel.\r\nAdicione gelo à mistura e agite ou mexa bem até que todos os ingredientes estejam bem misturados e gelados.\r\nDespeje a mistura no copo preparado com a borda salgada.\r\nComplete o copo com a água com gás ou refrigerante de limão para adicionar um toque efervescente.\r\nDecore com uma fatia de limão e uma de laranja na borda do copo.\r\n', 'a'),
(5, 'Virgin On The Beach', 'Uma bebida vibrante e colorida, ideal para quem quer saborear um coquetel tropical sem álcool. A Virgin on the Beach combina sabores frutados de pêssego, laranja e cranberry, resultando em uma mistura deliciosa e refrescante. Perfeita para dias quentes de verão ou para qualquer ocasião festiva.', '1/2 xícara de suco de cranberry\r\n1/2 xícara de suco de laranja\r\n1/4 xícara de suco de pêssego ou néctar de pêssego\r\n1/4 xícara de refrigerante de limão ou água com gás\r\nGelo a gosto\r\nFatias de laranja e cerejas para decorar', 'Encha um copo alto com gelo.\r\nDespeje o suco de cranberry, o suco de laranja e o suco de pêssego no copo, um após o outro, criando um efeito de camadas.\r\nComplete o copo com o refrigerante de limão ou água com gás para adicionar um toque efervescente.\r\nMexa suavemente para combinar os sabores sem perder o efeito de camadas.\r\nDecore com uma fatia de laranja e uma cereja no topo.\r\nSirva imediatamente e desfrute!', 'a'),
(6, 'Mojito Refrescante Sem Álcool', 'Uma versão sem álcool do clássico Mojito cubano, esta bebida é perfeita para quem deseja desfrutar do sabor fresco e revigorante da combinação de hortelã, limão e um toque de efervescência. Ideal para os dias quentes de verão ou para servir em festas e reuniões familiares.', '10 folhas de hortelã fresca\r\n1 colher de sopa de açúcar\r\n1/2 limão cortado em cubos\r\n1 xícara de água com gás ou soda limonada\r\nGelo picado a gosto\r\nRodelas de limão para decorar\r\nRaminhos de hortelã para decorar', 'Em um copo alto, coloque as folhas de hortelã e o açúcar.\r\nUsando um pilão, macere levemente as folhas de hortelã com o açúcar para liberar os óleos da hortelã e dissolver o açúcar.\r\nAdicione os cubos de limão ao copo e macere novamente para liberar o suco de limão.\r\nEncha o copo com gelo picado.\r\nComplete com água com gás ou soda limonada e misture suavemente para incorporar todos os sabores.\r\nDecore com rodelas de limão e raminhos de hortelã.\r\nSirva imediatamente e aproveite a refrescância!', 'a'),
(7, 'Piña Colada Tropical Sem Álcool', 'Uma versão sem álcool da clássica Piña Colada, esta bebida combina o sabor cremoso do coco com o toque doce do abacaxi. Perfeita para quem deseja uma bebida tropical e refrescante, esta Piña Colada é ideal para relaxar à beira da piscina ou para adicionar um toque exótico a qualquer festa.', '1 xícara de suco de abacaxi\r\n1/2 xícara de leite de coco\r\n1/4 xícara de creme de coco\r\n1/4 xícara de leite condensado (opcional para mais doçura)\r\nGelo a gosto\r\nRodelas de abacaxi e cerejas para decorar\r\nCoco ralado para decorar (opcional)', 'Em um liquidificador, adicione o suco de abacaxi, o leite de coco, o creme de coco e o leite condensado (se estiver usando).\r\nAdicione uma boa quantidade de gelo e bata até que a mistura fique homogênea e cremosa.\r\nDespeje a mistura em um copo alto.\r\nDecore com uma rodela de abacaxi, uma cereja e polvilhe com coco ralado, se desejar.\r\nSirva imediatamente e aproveite!', 'a'),
(8, 'Blue Hawaiian Sem Álcool', 'Uma versão sem álcool do clássico Blue Hawaiian, esta bebida tropical é vibrante, refrescante e fácil de fazer. Combinando sabores de abacaxi e coco com um toque de limão e um lindo tom azul, é perfeita para festas de verão ou qualquer momento em que você queira uma bebida divertida e colorida.', '1/2 xícara de suco de abacaxi\r\n1/4 xícara de leite de coco\r\n1/4 xícara de limonada (ou suco de limão fresco)\r\n1 colher de sopa de xarope de curaçau azul sem álcool (pode ser substituído por xarope de blueberry para cor e sabor)\r\nGelo a gosto\r\nRodelas de abacaxi e cerejas para decorar\r\nCoco ralado para decorar (opcional)', 'Em um liquidificador, adicione o suco de abacaxi, o leite de coco, a limonada e o xarope de curaçau azul.\r\nAdicione gelo suficiente para preencher o liquidificador até a metade e bata até a mistura ficar homogênea e espumante.\r\nDespeje a mistura em um copo alto.\r\nDecore com uma rodela de abacaxi, uma cereja no topo e, se desejar, uma pitada de coco ralado.\r\nSirva imediatamente e desfrute!', 'a'),
(9, 'Flower Refrescante Sem Álcool', 'A \"Flower\" é uma bebida elegante e floral, ideal para quem busca algo sofisticado e refrescante sem álcool. Feita com infusão de chá de hibisco, suco de limão e um toque de xarope de rosas, esta bebida é perfeita para eventos especiais ou para relaxar em um dia quente.', '1 xícara de chá de hibisco (frio)\r\n1/2 xícara de suco de limão fresco\r\n1/4 xícara de xarope de rosas (ou xarope de flor de sabugueiro)\r\n1/4 xícara de água com gás\r\n1 colher de sopa de mel ou xarope de agave (opcional, para mais doçura)\r\nGelo a gosto\r\nPétalas de rosa comestíveis ou flores comestíveis para decorar\r\nRodelas de limão para decorar', 'Em uma jarra, misture o chá de hibisco frio, o suco de limão e o xarope de rosas.\r\nAdicione o mel ou xarope de agave se preferir a bebida mais doce, e misture bem até que o adoçante esteja completamente dissolvido.\r\nAdicione gelo à jarra ou aos copos individuais.\r\nComplete com água com gás para dar um toque efervescente.\r\nDespeje a bebida em copos altos e decore com pétalas de rosa comestíveis ou flores comestíveis e rodelas de limão.\r\nSirva imediatamente e aprecie o sabor floral e refrescante!', 'a'),
(10, 'Watermelon Slushie Refrescante Sem Álcool', 'Uma bebida deliciosa e refrescante feita com melancia fresca e suco de limão. Este Watermelon Slushie é perfeito para dias quentes de verão, proporcionando uma explosão de sabor frutado e frescor sem adição de álcool.', '4 xícaras de melancia cortada em cubos (sem sementes)\r\n1/4 xícara de suco de limão fresco\r\n2 colheres de sopa de mel ou xarope de agave (opcional, para mais doçura)\r\n1/2 xícara de água com gás ou água de coco (opcional, para um toque efervescente)\r\nGelo a', 'Coloque os cubos de melancia em um saco plástico e leve ao freezer por pelo menos 2 horas, ou até que estejam completamente congelados.\r\nEm um liquidificador, adicione a melancia congelada, o suco de limão e o mel ou xarope de agave, se estiver usando.\r\nB', 'a'),
(11, 'Cappuccino ', 'Uma bebida de café deliciosa e reconfortante, o Cappuccino é a combinação perfeita de café expresso com leite vaporizado e espuma. É uma ótima escolha para começar o dia ou para uma pausa relaxante à tarde.', '1 xícara de café expresso (ou café bem forte)\r\n1/2 xícara de leite integral\r\nAçúcar a gosto (opcional)\r\nCanela ou cacau em pó para polvilhar', 'Prepare o café expresso ou um café bem forte.\r\nAqueça o leite, mas não deixe ferver. Com a ajuda de um batedor manual ou vaporizador de leite, faça espuma até dobrar de volume.\r\nDespeje o café em uma xícara.\r\nAdicione o leite vaporizado, segurando a espuma com uma colher para que ela fique por cima.\r\nComplete com a espuma de leite.\r\nPolvilhe com canela ou cacau em pó e sirva imediatamente.', 'a'),
(12, 'Affogato Italiano', 'O Affogato é uma sobremesa simples e deliciosa que combina uma bola de sorvete de baunilha com café expresso quente. Essa combinação irresistível é perfeita para aqueles que amam sobremesas à base de café.', '1 bola de sorvete de baunilha\r\n1 xícara de café expresso quente (ou café forte)\r\nChocolate ralado ou calda de chocolate (opcional)', 'Coloque uma bola generosa de sorvete de baunilha em uma xícara ou tigela pequena.\r\nDespeje o café expresso quente sobre o sorvete.\r\nSe desejar, finalize com chocolate ralado ou um fio de calda de chocolate.\r\nSirva imediatamente e desfrute da deliciosa combinação de quente e frio.', 'a'),
(13, 'Mochaccino', 'O Mochaccino é uma versão deliciosa e cremosa do cappuccino, com uma adição irresistível de chocolate. Ideal para quem gosta de café com um toque doce e achocolatado.', '1 xícara de café expresso (ou café forte)\r\n1/2 xícara de leite vaporizado\r\n2 colheres de sopa de chocolate em pó ou calda de chocolate\r\nChantilly para decorar (opcional)\r\nChocolate ralado ou cacau em pó para polvilhar', 'Prepare o café expresso.\r\nAqueça o leite e faça espuma com um vaporizador ou batedor manual.\r\nEm uma xícara, adicione o chocolate em pó ou calda de chocolate.\r\nDespeje o café sobre o chocolate e misture bem.\r\nComplete com o leite vaporizado e uma generosa camada de espuma.\r\nDecore com chantilly e polvilhe chocolate ralado ou cacau em pó por cima.', 'a'),
(14, 'Macchiato', 'O Macchiato é uma bebida à base de café simples e elegante, composta por uma pequena quantidade de leite vaporizado adicionada ao café expresso. É forte e marcante, com apenas um toque suave de leite.', '1 xícara de café expresso\r\n1 colher de sopa de leite vaporizado\r\nEspuma de leite (opcional)', 'Prepare o café expresso e despeje-o em uma xícara pequena.\r\nAqueça o leite e faça espuma com um vaporizador.\r\nAdicione uma colher de leite vaporizado sobre o café expresso.\r\nFinalize com um toque de espuma de leite, se desejar.\r\nSirva imediatamente.', 'a'),
(15, 'Latte Clássico', 'O Café Latte é uma bebida suave e cremosa, feita com uma proporção maior de leite em relação ao expresso, o que proporciona um sabor mais leve e suave.', '1 xícara de café expresso\r\n3/4 xícara de leite vaporizado\r\nAçúcar a gosto (opcional)', 'Prepare o café expresso.\r\nAqueça o leite e faça uma leve espuma com um vaporizador.\r\nEm uma xícara grande, despeje o café e adicione o leite vaporizado por cima.\r\nAdoce a gosto, se desejar.\r\nSirva imediatamente.', 'a'),
(16, 'Frappé de Café', 'O Frappé é uma bebida gelada e espumante, perfeita para dias quentes. Feito com café forte, gelo e leite, é refrescante e cheio de sabor.', '1 xícara de café forte gelado\r\n1/2 xícara de leite\r\n1 colher de chá de açúcar (opcional)\r\nGelo a gosto\r\nChantilly para decorar (opcional)', 'No liquidificador, adicione o café gelado, o leite, o açúcar e o gelo.\r\nBata até que o gelo esteja triturado e a mistura fique espumosa.\r\nDespeje em um copo grande.\r\nDecore com chantilly, se desejar, e sirva imediatamente.', 'a'),
(17, 'Smoothie de Café', 'Uma versão saudável e energizante do café, o Smoothie de Café é uma mistura de café, leite e banana, ideal para um café da manhã rápido e nutritivo.', '1/2 xícara de café forte gelado\r\n1 banana madura\r\n1/2 xícara de leite ou leite de amêndoas\r\n1 colher de chá de mel ou xarope de agave\r\nGelo a gosto', 'No liquidificador, coloque o café, a banana, o leite e o mel.\r\nAdicione gelo e bata até obter uma mistura homogênea e cremosa.\r\nDespeje em um copo e sirva imediatamente.', 'a'),
(18, 'Iced Mocha', 'O Iced Mocha combina o sabor intenso do café com o doce do chocolate, criando uma bebida gelada e irresistível. Perfeita para os dias quentes, mas com todo o sabor de um Mocha tradicional.', '1 xícara de café forte gelado\r\n1/2 xícara de leite\r\n2 colheres de sopa de calda de chocolate ou chocolate em pó\r\nGelo a gosto\r\nChantilly para decorar (opcional)', 'Em um copo grande, adicione a calda de chocolate.\r\nDespeje o café gelado e misture bem.\r\nAdicione o leite e mexa até combinar.\r\nComplete com gelo.\r\nDecore com chantilly, se desejar, e um fio de calda de chocolate por cima.\r\nSirva imediatamente.', 'a'),
(19, 'Coffee Clássico', 'O Coffee Clássico é uma bebida simples e reconfortante, ideal para aqueles que apreciam o sabor puro do café. Perfeito para começar o dia com energia ou para uma pausa revigorante.', '1 xícara de café coado (ou expresso, se preferir)\r\nAçúcar a gosto\r\nLeite ou creme (opcional)', 'Prepare o café usando o método de sua preferência (coado, expresso, etc.).\r\nAdoce a gosto com açúcar.\r\nAdicione leite ou creme, se desejar, e mexa bem.\r\nSirva quente e aproveite.', 'a'),
(20, 'Iced Coffee', 'O Iced Coffee é uma versão gelada e refrescante do café clássico, ideal para dias quentes. Combina o sabor intenso do café com o frescor do gelo.', '1 xícara de café forte, resfriado\r\n1/4 xícara de leite (ou creme)\r\n1 colher de sopa de açúcar (opcional)\r\nGelo a gosto\r\nChantilly para decorar (opcional)', 'Prepare o café forte e deixe esfriar completamente.\r\nEm um copo grande, adicione o gelo.\r\nDespeje o café resfriado sobre o gelo.\r\nAdicione o leite e mexa bem.\r\nAdoce com açúcar se desejar.\r\nDecore com chantilly, se desejar, e sirva imediatamente.\r\n', 'a'),
(21, 'Green Juice', 'O Green Juice é um suco nutritivo e refrescante, repleto de vitaminas e minerais. Feito com uma combinação de vegetais e frutas verdes, é perfeito para um impulso saudável no seu dia.', '2 folha de couve\r\n2 maracujá\r\n2 limões\r\n1 hortelã (a gosto)\r\n(opcional)\r\nÁgua a gosto', 'Lave bem todos os ingredientes.\r\nCorte o maracujá, os limões em pedaços pequenos.\r\nNo liquidificador, adicione todos os ingredientes e bata até obter uma mistura homogênea.\r\nCoe se desejar um suco mais liso, e ajuste a doçura com água.\r\nDecore com as folhas de hortelã.\r\nSirva gelado.', 'a'),
(22, 'Orange Carrot Juice', 'O Orange Carrot Juice é um suco vibrante e saboroso, com um perfil de sabor doce e cítrico, ideal para um início de dia energizante.', '2 cenouras médias\r\n2 laranjas\r\n1 maçã (opcional, para mais doçura)\r\n1 pedaço pequeno de gengibre fresco (opcional)', 'Descasque as cenouras e as laranjas. Se estiver usando, corte a maçã e o gengibre.\r\nNo liquidificador, adicione todos os ingredientes e bata até ficar homogêneo.\r\nCoe se preferir um suco mais liso.\r\nSirva imediatamente.', 'a'),
(23, 'Suco Tropical', 'O Tropical Juice é uma mistura refrescante de frutas tropicais que traz o sabor do verão para qualquer época do ano.', '1/2 abacaxi\r\n2 limões\r\n1/2 maracujá (suco)\r\nGelo a gosto', 'Descasque e corte o abacaxi e a manga em pedaços.\r\nNo liquidificador, adicione todos os ingredientes e bata até obter uma mistura suave.\r\nAdicione gelo e bata novamente se desejar um suco mais gelado.\r\nSirva imediatamente.', 'a'),
(24, 'Suco de Abacaxi com Maracujá', 'O Pineapple Passion Juice combina o doce do abacaxi com a acidez do maracujá, resultando em um suco delicioso e refrescante.', '1/2 abacaxi\r\n1 maracujá (suco)\r\n1/2 limão (suco)\r\n1 colher de sopa de mel (opcional)', 'Descasque e corte o abacaxi em pedaços.\r\nNo liquidificador, adicione o abacaxi, o suco de maracujá e o suco de limão.\r\nBata até ficar homogêneo.\r\nAdoce com mel se desejar e sirva com gelo.', 'a'),
(25, 'Suco de Frutas Vermelhas com Manga', 'O Mango Red Juice é um suco vibrante e exótico, combinando a doçura da manga com o sabor intenso de frutas vermelhas.', '1 manga madura\r\n1/2 xícara de morangos\r\n1/2 xícara de framboesas\r\n1/2 xícara de blueberrys\r\n1 colher de sopa de suco de limão', 'Descasque e corte a manga em pedaços.\r\nNo liquidificador, adicione todos os ingredientes e bata até ficar homogêneo.\r\nCoe se preferir um suco mais liso.\r\nSirva gelado.', 'a'),
(26, 'Suco de Limão com Chá', 'O Suco de Limão com Chá é uma combinação refrescante de chá gelado com um toque de limão, ideal para um refresco em dias quentes.', '1 xícara de chá matte gelado\r\n1/2 limão (suco)\r\n1 colher de sopa de mel ou xarope de agave\r\nGelo a gosto', 'Prepare o chá preto e deixe esfriar completamente.\r\nNo liquidificador, adicione o chá gelado, o suco de limão e o mel.\r\nBata até que tudo esteja bem combinado.\r\nSirva com gelo.', 'a'),
(27, 'Suco de Kiwi com Uva', 'O Suco de Kiwi com Uva é um suco refrescante e saboroso que combina o doce das uvas com a acidez do kiwi, perfeito para uma bebida revitalizante.', '1 xícara de uvas verdes\r\n2 kiwis\r\n1 colher de sopa de suco de limão\r\n1/2 xícara de água', 'Lave bem as uvas e descasque os kiwis.\r\nNo liquidificador, adicione todos os ingredientes e bata até obter uma mistura homogênea.\r\nCoe se preferir um suco mais liso.\r\nSirva imediatamente.', 'a'),
(28, 'Suco de Limão com Amora\r\n', 'O Suco de Limão com Amora combina o sabor ácido do limão com o doce das amoras, criando um suco refrescante e levemente adocicado.', '1 xícara de amoras\r\n1/2 limão (suco)\r\n1 colher de sopa de mel ou xarope de agave\r\n1/2 xícara de água', 'Lave bem as amoras e esprema o limão.\r\nNo liquidificador, adicione as amoras, o suco de limão e o mel.\r\nBata até obter uma mistura homogênea.\r\nCoe se desejar e sirva com gelo.', ''),
(29, 'Pink Lemonade', 'O Pink Lemon Juice é um suco vibrante e refrescante com um toque de limão e frutas vermelhas, ideal para uma bebida leve e saborosa.', '1/2 xícara de morangos\r\n1/2 xícara de framboesas\r\n1/2 limão (suco)\r\n1 colher de sopa de mel (opcional)\r\nÁgua a gosto', 'Lave bem os morangos e framboesas.\r\nNo liquidificador, adicione as frutas, o suco de limão e o mel.\r\nBata até ficar homogêneo.\r\nAjuste a consistência com água se desejar.\r\nSirva gelado.', 'a'),
(30, 'Suco de Pitaya', 'O Suco de Pitaya é um suco exótico e colorido, feito com a fruta do dragão (pitaya) e outras frutas tropicais, resultando em uma bebida refrescante e vibrante.', '1 fruta do dragão (pitaya) rosa\r\n1/2 manga madura\r\n1/2 limão (suco)\r\n1 colher de sopa de mel (opcional)', 'Descasque e corte a fruta do dragão e a manga em pedaços.\r\nNo liquidificador, adicione as frutas e o suco de limão.\r\nBata até obter uma mistura homogênea.\r\nAdoce com mel se desejar e sirva com gelo.', 'a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) DEFAULT NULL,
  `ingredient` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `recipes`
--

INSERT INTO `recipes` (`id`, `id_prod`, `ingredient`, `amount`, `imagem`) VALUES
(1, 1, 'Limão', '1 Limão', 'Lemon.png'),
(2, 1, 'Açúcar', '2 colheres a gosto', 'Sugar.png'),
(3, 1, 'Água com Gás', '1 copo, cerca de 250ml', 'SparklingWater.png'),
(4, 1, 'Gelo', 'Picado(Opicional)', 'Ice.png'),
(5, 2, 'Limão', '1/4 de Limão', 'Lemon.png'),
(6, 2, 'Xarope de Gengibre', '1/2 (cerca de 250ml)', 'GingerSyrup.png'),
(7, 2, 'Espuma de Gengibre', 'A Gosto', 'GingerFoam.png'),
(8, 2, 'Açúcar', 'A Gosto', 'Sugar.png'),
(9, 2, 'Gelo Picado', 'Opcional', 'Ice.png'),
(10, 3, 'Suco de Uva', '375ml', 'GrapeJuice.png'),
(11, 3, 'Água Tônica', '1 lata', 'TonicWater.png'),
(12, 3, 'Suco de Laranja', '1/2 Xícara de Chá', 'Orange.png'),
(13, 3, 'Maçã', '1 Maçã', 'Apple.png'),
(14, 3, 'Abacaxi', '1/2 Cubos congelados', 'Pineapple.png'),
(15, 3, 'Açúcar', 'A Gosto', 'Sugar.png'),
(16, 3, 'Gelo', 'Opcional', 'Ice.png'),
(17, 4, 'Suco de Limão', '30ml', 'LemonJuice.png'),
(18, 4, 'Suco de Laranja', '60ml', 'Orange.png'),
(19, 4, 'Xarope', '30ml', 'Syrup.png'),
(20, 4, 'Água com Gás', '30ml', 'SparklingWater.png'),
(21, 4, 'Sal', 'A Gosto', 'Salt.png'),
(22, 4, 'Gelo', 'Opcional', 'Ice.png'),
(23, 5, 'Água com Gás', '50ml', 'SparklingWater.png'),
(24, 5, 'Suco de Pêssego', '50ml', 'Peach.png'),
(25, 5, 'Laranja', '50ml', 'Orange.png'),
(26, 5, 'Xarope de Groselha', '25ml', 'Gooseberry.png'),
(27, 5, 'Açúcar', 'A Gosto', 'Sugar.png'),
(28, 5, 'Gelo', 'Opcional', 'Ice.png'),
(29, 6, 'Água com Gás', '350ml', 'SparklingWater.png'),
(30, 6, 'Limão', '1 limão', 'Lemon.png'),
(31, 6, 'Hortelã', '3 Ramos', 'Mint.png'),
(32, 6, 'Açúcar', 'A Gosto', 'Sugar.png'),
(33, 6, 'Gelo', 'Opcional', 'Ice.png'),
(34, 7, 'Leite de Coco', '200ml', 'CoconutMilk.png'),
(35, 7, 'Suco de Abacaxi', '200ml', 'Pineapple.png'),
(36, 7, 'Leite Condensado', '3 Colheres', 'CondensedMilk.png'),
(37, 7, 'Gelo', 'Opcional', 'Ice.png'),
(38, 8, 'Suco de Abacaxi', '100ml', 'Pineapple.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `produto` varchar(255) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `nota` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `reviews`
--

INSERT INTO `reviews` (`id`, `autor`, `produto`, `comentario`, `nota`) VALUES
(20, '', '', '', ''),
(21, '111', '2', '111', '111'),
(22, '111', '2', '111', '111'),
(23, 'Paulo', '2', 'Super interessante único, nunca vi igual, viria mais vezes certezz', ''),
(24, 'Professor ', '2', 'Interessante', '4'),
(25, 'Milena', '2', 'Bom', '5'),
(26, '11', '2', '111', '111'),
(27, '', '1', 'Teste', '1'),
(28, '', '1', 'Teste', '3'),
(29, '', '1', 'Teste', '3'),
(30, 'gigi', '1', 'Testedenovo', '5'),
(31, 'gigi', '1', 'Gostei ein', '4'),
(32, 'gigi', '1', 'Achei refrescante', '3'),
(33, 'gigi', '1', 'teste1', '4'),
(34, 'gigi', '2', 'veiga', '5'),
(35, 'gigi', '2', '123123', '5'),
(36, 'gigi', '1', 'Kakaka', '4'),
(37, 'gigi', '1', 'Kakaka', '4'),
(38, 'gigi', '1', 'amiwdjuawd', '5'),
(39, 'Milena', 'Mojito', 'Gostei da receita!Tambem é possível fazer com outras frutas', '4'),
(40, 'gigi', '1', 'Saboroso e Refrescante', '5'),
(41, 'gigi', '1', 'Gostosa deMAIS', '5'),
(42, 'gigi', '1', 'não gostei', '2'),
(43, 'gigi', '4', 'Bom Demais', '4'),
(44, 'gigi', '3', '2', '2'),
(45, 'gigi', '7', 'ruim demais!', '1'),
(46, 'gigi', '6', 'razoável', '4'),
(47, 'gigi', '6', 'nossa', '2'),
(48, 'gigi', '5', 'Adorei este drink! Um dos melhores que já tomei na vida', '5'),
(49, 'gigi', '5', 'Gostei muito, recomendo!!!!!', '5'),
(50, 'gigi', '5', 'Horrível, não recomendo para ninguém!', '1'),
(51, 'gigi', '7', 'muito branco', '4'),
(52, 'gigi', '5', 'legal', '3'),
(53, 'wellington', '1', 'Minha primeira Review', '5'),
(54, 'wellington', '3', 'Bem Legal', '4'),
(55, 'wellington', '7', 'Muito bom', '5'),
(56, 'wellington', '6', 'gostei bastante', '5'),
(59, 'wellington', '11', 'Não sei bem.', '3'),
(60, 'wellington', '10', 'Não gostei tanto.', '1'),
(61, 'wellington', '20', 'Gosto de café', '5'),
(62, 'wellington', '14', 'jhyu', '5'),
(63, 'wellington', '16', '', '4'),
(64, 'Matthew', '1', 'UMA DELICIA', '5'),
(65, 'sasuke', '3', 'muito bom fiquei bebinho', '0'),
(66, 'sasuke', '3', '', '5'),
(67, 'sasuke', '3', '', '1'),
(68, 'sasuke', '1', 'muito ruim muuto limao', '5'),
(69, 'Caki', '11', 'Bom, mas da para ser melhorado.', '3'),
(70, 'Caki', '3', 'muito bom, fiz sem pêssego e ficou gostoso', '4'),
(71, 'Caki', '18', 'Muito forte este Mocha', '5'),
(72, 'sasuke', '15', 'O café ficou muito bom, e também é possível personaliza-la ao seu gosto❤️', '5'),
(73, 'sasuke', '2', 'Legaaaall', '4'),
(74, 'Paulo Cesar ', '1', 'Sensacional ', '5');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `foto`) VALUES
(1, 'Paulo', 'paulo@example.com', '', 'sim'),
(42, 'gigi', 'gigi@example.com', '123', ''),
(43, 'wellington', 'wellington@gmail.com', '12345678', ''),
(44, 'Matthew', 'matthew@gmail.com', '12345678', ''),
(45, 'sasuke', 'naruto@gmail.com', '12345678', ''),
(46, 'Caki', 'caikehenry12@gmail.com', 'Caki2007', ''),
(47, 'Tiotoji', 'dinizmatheus249@gmail.com', '12345678', ''),
(48, 'Paulo Cesar ', 'pcc25.venon@gmail.com', '12345678', '/uploads/1731090522192.jpeg'),
(49, 'Gigi', 'giovannavarjao427@gmail.com', '12345678', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prod` (`id_prod`);

--
-- Índices de tabela `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`id_prod`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
