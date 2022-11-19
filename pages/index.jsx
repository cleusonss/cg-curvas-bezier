// http://bert.stuy.edu/pbrooks/graphics/demos/BresenhamDemo.htm

import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Text, Center, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Button, InputGroup, InputLeftAddon, Box, Flex, VStack, RadioGroup, Radio } from '@chakra-ui/react';

import axios from 'axios';

import Canvas from './Canvas';

const { log } = console;



export default function Home() {

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [lineAlgorithm, setLineAlgorithm] = useState('Analitico');
  
  const [circleAlgorithm, setCircleAlgorithm] = useState('Bresenham');
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [radius, setRadius] = useState(0);

  // const [line, setLine] = useState();

  // const handleSubmit = async (event) => {

  //   event.preventDefault();

  //   const payload = {
  //     lineaAlgorithm,
  //     startX,
  //     startY,
  //     endX,
  //     endY
  //   }

  //   try {

  //     const { data } = await axios({
  //       url: "/api/line",
  //       method: "POST",
  //       data: payload
  //     });

  //     setLine( data );
  //   } catch (error) {
  //     return error;
  //   }

  // }

  return (
    <VStack>

      <Center>
        <Text>Computação Gráfica - Algoritmos Linha</Text>
      </Center>

      <Flex width={'full'} h="100vh">

        {/* Menu */}
        <Center flex='1' h="100vh">

          <Center w="80" py={6}>
            <VStack
              w={'full'}
              boxShadow={'2xl'}
              borderWidth='1px'
              rounded={'md'}
              overflow={'hidden'}
              padding={2}
            >
              {/* Método */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Método</Text>
                </Center>
                <Box padding={2}>
                  <RadioGroup defaultValue='Analitico' value={lineAlgorithm} onChange={setLineAlgorithm} direction="1">
                    <Stack>
                      <Radio value='Analitico'>Analitico</Radio>
                      <Radio value='Bresenham'>Bresenham</Radio>
                      <Radio value='DDA'>DDA</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              {/* Start */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Início</Text>
                </Center>

                {/* Start X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='x' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setStartX}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>

                {/* Start Y */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='y' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setStartY}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>
              </Box>


              {/* End */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Fim</Text>
                </Center>


                {/* End X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='x' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setEndX}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>

                {/* End Y */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='y' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setEndY}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>
              </Box>

              {/* Circulo */}
              {/* Método */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Método</Text>
                </Center>
                <Box padding={2}>
                  <RadioGroup defaultValue='Bresenham' value={circleAlgorithm} onChange={setCircleAlgorithm} direction="1">
                    <Stack>
                      <Radio value='Bresenham'>Bresenham</Radio>
                      <Radio value='Incremental'>Incremental</Radio>
                      <Radio value='Parametrico'>Paramétrico</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              {/* Center */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Centro</Text>
                </Center>

                {/* Center X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='x' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setCenterX}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>

                {/* Center Y */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='y' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setCenterY}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>
              </Box>

              {/* Center */}
              <Box w={'full'} borderColor="gray.400" borderWidth={1} borderRadius={'2'}>
                <Center bgColor={'gray.400'}>
                  <Text color={'white'} fontSize={'md'} fontWeight='semibold'>Raio</Text>
                </Center>

                {/* Raio */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children='r' />
                    <NumberInput
                      w={'full'}
                      variant='outline'
                      defaultValue={0}
                      min={0}
                      max={20}
                      onChange={ setRadius }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Box>
              </Box>

              {/* Botton Submit */}
              {/* 
              <Box w={'full'} padding={2}>
                <Button w={'full'} colorScheme='blue' variant='solid' onClick={handleSubmit}> Plotar </Button>
              </Box> 
              */}
            </VStack>
          </Center>

        </Center>

        {/* Canvas */}
        <Center flex='1'>
          <VStack
            boxShadow={'2xl'}
            borderWidth='1px'
            rounded={'md'}
            overflow={'hidden'}
            padding={6}
          >
            <Canvas

              lineAlgorithm={ lineAlgorithm }
              startX={startX}
              startY={startY}
              endX={endX}
              endY={endY}

              circleAlgorithm = { circleAlgorithm }
              centerX = { centerX }
              centerY = { centerY }
              radius = { radius }
              
            />
          </VStack>
        </Center>
      </Flex>

    </VStack>
  )
}
