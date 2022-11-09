import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Flex, StackDivider, VStack, HStack, FormControl, FormLabel, RadioGroup, Radio, FormHelperText } from '@chakra-ui/react';

import Canvas from './Canvas'

export default function Home() {
  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      align='stretch'
    >
      <Box>
        <Flex align="center" justify="center" >        Computação Gráfica - Algoritmos Linha
        </Flex>
      </Box>
      <Box>
        <Flex align="center" justify="center" >
          <FormControl as='fieldset'>
            <RadioGroup defaultValue='Analitico'>
              <HStack>
                <Radio value='Analitico'>Analitico</Radio>
                <Radio value='Bresenham'>Bresenham</Radio>
                <Radio value='DDA'>DDA</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Flex>
      </Box>
      <Box>
        <Flex align="center" justify="center" >
          <Canvas />
        </Flex>
      </Box>
    </VStack>
  )
}
