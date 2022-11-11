import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Square, Text, Center, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, InputLeftElement, Stack, Button, Input, InputGroup, InputLeftAddon, Box, Flex, StackDivider, VStack, HStack, FormControl, FormLabel, RadioGroup, Radio, FormHelperText } from '@chakra-ui/react';

import Canvas from './Canvas';
import { format } from 'path';

const { log } = console;

export default function Home() {

  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [endX, setEndX] = useState();
  const [endY, setEndY] = useState();
  const [method, setMethod] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      startX,
      startY,
      endX,
      endY,
      method
    }

    log("Payload: ", payload);

  }

  return (
    <VStack>

      <Center>
        <Text>Computação Gráfica - Algoritmos Linha</Text>
      </Center>

      <Flex>

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
                  <RadioGroup defaultValue='Analitico' value={method} onChange={setMethod} direction="1">
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

              {/* Botton Submit */}
              <Box w={'full'} padding={2}>
                <Button w={'full'} colorScheme='blue' variant='solid' onClick={handleSubmit}> Plotar </Button>
              </Box>
            </VStack>
          </Center>

        </Center>

        {/* Canvas */}
        <Center flex='1'>
          <Canvas />
        </Center>
      </Flex>

    </VStack>
  )
}
