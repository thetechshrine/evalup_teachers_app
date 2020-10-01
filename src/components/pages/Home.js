import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, Heading, SimpleGrid, Text } from '@chakra-ui/core';

import getRandomThemeColor from '../../utils/get-random-theme-color';

import Icons from '../layout/sidebar_menu/Icons';

function generateHomeBlocks() {
  return [
    {
      title: 'Evaluations',
      description:
        'Consulter les évaluations qui vous ont été assignées, consulter les rendus des étudiants et attribuer des notes à chaque rendu',
      icon: Icons.ASSESSMENTS,
      color: getRandomThemeColor()
    }
  ];
}

function HomeBlock({ homeBlock }) {
  return (
    <Stack padding={6} alignItems='center' textAlign='center' borderWidth={1} borderRadius='lg' overflow='hidden'>
      <Box as={homeBlock.icon} size={72} color={homeBlock.color} />
      <Heading size='md' color={homeBlock.color}>
        {homeBlock.title}
      </Heading>
      <Text>{homeBlock.description}</Text>
    </Stack>
  );
}

HomeBlock.propTypes = {
  homeBlock: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.any,
    color: PropTypes.string
  })
};

function Home() {
  function displayHomeBlocks() {
    const homeBlocks = generateHomeBlocks();

    return homeBlocks.map((homeBlock, index) => <HomeBlock key={index} homeBlock={homeBlock} />);
  }

  return (
    <Stack>
      <Heading>Accueil</Heading>

      <SimpleGrid columns={4} spacing={10} pt={5}>
        {displayHomeBlocks()}
      </SimpleGrid>
    </Stack>
  );
}

export default Home;
