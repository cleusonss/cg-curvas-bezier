import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Flex } from '@chakra-ui/react';

import Canvas from './Canvas'

export default function Home() {
  return (
    <Flex align="center" justify="center">
      <Canvas/>
    </Flex>
  )
}
