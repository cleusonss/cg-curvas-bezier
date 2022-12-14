// http://bert.stuy.edu/pbrooks/graphics/demos/BresenhamDemo.htm

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Text,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Button,
  InputGroup,
  InputLeftAddon,
  Box,
  Flex,
  VStack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import axios from "axios";

import Canvas from "./Canvas";

const { log } = console;

export default function Home() {
  const [startX, setStartX] = useState(-40);
  const [startY, setStartY] = useState(0);
  const [control1X, setControl1X] = useState(-20);
  const [control1Y, setControl1Y] = useState(20);
  const [control2X, setControl2X] = useState(20);
  const [control2Y, setControl2Y] = useState(-20);
  const [endX, setEndX] = useState(40);
  const [endY, setEndY] = useState(0);
  const [curveAlgorithm, setCurveAlgorithm] = useState("parametrico");

  return (
    <VStack>
      <Center>
        <Text>Computação Gráfica - Algoritmos Linha</Text>
      </Center>

      <Flex width={"full"} h="100vh">
        {/* Menu */}
        <Center flex="1" h="100vh">
          <Center w="80" py={6}>
            <VStack
              w={"full"}
              boxShadow={"2xl"}
              borderWidth="1px"
              rounded={"md"}
              overflow={"hidden"}
              padding={2}
            >
              {/* Método */}
              <Box
                w={"full"}
                borderColor="gray.400"
                borderWidth={1}
                borderRadius={"2"}
              >
                <Center bgColor={"gray.400"}>
                  <Text color={"white"} fontSize={"md"} fontWeight="semibold">
                    Método
                  </Text>
                </Center>
                <Box padding={2}>
                  <RadioGroup
                    defaultValue="Analitico"
                    value={curveAlgorithm}
                    onChange={setCurveAlgorithm}
                    direction="1"
                  >
                    <Stack>
                      <Radio value="parametrico">Paramétrico</Radio>
                      <Radio value="casteljau">Casteljau</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>

              {/* Start */}
              <Box
                w={"full"}
                borderColor="gray.400"
                borderWidth={1}
                borderRadius={"2"}
              >
                <Center bgColor={"gray.400"}>
                  <Text color={"white"} fontSize={"md"} fontWeight="semibold">
                    P0
                  </Text>
                </Center>

                {/* Start X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children="x" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
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
                    <InputLeftAddon children="y" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
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

              {/* P2 */}
              <Box
                w={"full"}
                borderColor="gray.400"
                borderWidth={1}
                borderRadius={"2"}
              >
                <Center bgColor={"gray.400"}>
                  <Text color={"white"} fontSize={"md"} fontWeight="semibold">
                    P1
                  </Text>
                </Center>

                {/* End X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children="x" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setControl1X}
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
                    <InputLeftAddon children="y" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setControl1Y}
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
              <Box
                w={"full"}
                borderColor="gray.400"
                borderWidth={1}
                borderRadius={"2"}
              >
                <Center bgColor={"gray.400"}>
                  <Text color={"white"} fontSize={"md"} fontWeight="semibold">
                    P2
                  </Text>
                </Center>

                {/* End X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children="x" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setControl2X}
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
                    <InputLeftAddon children="y" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
                      defaultValue={0}
                      min={-40}
                      max={40}
                      onChange={setControl2Y}
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
              <Box
                w={"full"}
                borderColor="gray.400"
                borderWidth={1}
                borderRadius={"2"}
              >
                <Center bgColor={"gray.400"}>
                  <Text color={"white"} fontSize={"md"} fontWeight="semibold">
                    P3
                  </Text>
                </Center>

                {/* End X */}
                <Box padding={2}>
                  <InputGroup>
                    <InputLeftAddon children="x" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
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
                    <InputLeftAddon children="y" />
                    <NumberInput
                      w={"full"}
                      variant="outline"
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
            </VStack>
          </Center>
        </Center>

        {/* Canvas */}
        <Center flex="1">
          <VStack
            boxShadow={"2xl"}
            borderWidth="1px"
            rounded={"md"}
            overflow={"hidden"}
            padding={6}
          >
            <Canvas
              curveAlgorithm={curveAlgorithm}
              startX={startX}
              startY={startY}
              control1X={control1X}
              control1Y={control1Y}
              control2X={control2X}
              control2Y={control2Y}
              endX={endX}
              endY={endY}
            />
          </VStack>
        </Center>
      </Flex>
    </VStack>
  );
}
