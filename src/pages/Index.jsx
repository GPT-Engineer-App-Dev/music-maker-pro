import React, { useState } from "react";
import { Container, VStack, Text, Button, Select, Box } from "@chakra-ui/react";
import { FaPlay, FaStop } from "react-icons/fa";

const instruments = ["Piano", "Guitar", "Drums", "Violin"];

const Index = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInstrumentChange = (event) => {
    setSelectedInstrument(event.target.value);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Logic to play the selected instrument
    console.log(`Playing ${selectedInstrument}`);
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Logic to stop playing
    console.log(`Stopped playing ${selectedInstrument}`);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Music Maker</Text>
        <Select value={selectedInstrument} onChange={handleInstrumentChange}>
          {instruments.map((instrument) => (
            <option key={instrument} value={instrument}>
              {instrument}
            </option>
          ))}
        </Select>
        <Box>
          <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handlePlay} isDisabled={isPlaying}>
            Play
          </Button>
          <Button leftIcon={<FaStop />} colorScheme="red" onClick={handleStop} isDisabled={!isPlaying} ml={4}>
            Stop
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;