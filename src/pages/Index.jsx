import React, { useState, useEffect } from "react";
import { Container, VStack, Text, Button, Select, Box, HStack, Input, Progress } from "@chakra-ui/react";
import { FaPlay, FaStop, FaRecordVinyl, FaMusic } from "react-icons/fa";

const instruments = ["Piano", "Guitar", "Drums", "Violin"];
const notes = ["C", "D", "E", "F", "G", "A", "B"];

const Index = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [playbackProgress, setPlaybackProgress] = useState(0);

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

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordedNotes([]);
    }
    console.log(isRecording ? "Stopped recording" : "Started recording");
  };

  const handleNotePlay = (note) => {
    setCurrentNote(note);
    if (isRecording) {
      setRecordedNotes((prevNotes) => [...prevNotes, note]);
    }
    console.log(`Playing note: ${note}`);
  };

  useEffect(() => {
    if (currentNote) {
      const timer = setTimeout(() => setCurrentNote(""), 500);
      return () => clearTimeout(timer);
    }
  }, [currentNote]);

  useEffect(() => {
    if (isPlaying && recordedNotes.length > 0) {
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= recordedNotes.length) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500); // Adjust the interval as needed
      return () => clearInterval(interval);
    }
  }, [isPlaying, recordedNotes]);

  const VirtualTracks = ({ notes, progress }) => (
    <Box width="100%" mt={4}>
      <Text fontSize="lg" mb={2}>Virtual Tracks:</Text>
      <HStack spacing={2}>
        {notes.map((note, index) => (
          <Box key={index} width="40px" height="40px" bg={index < progress ? "blue.500" : "gray.300"} display="flex" alignItems="center" justifyContent="center">
            <FaMusic color="white" />
          </Box>
        ))}
      </HStack>
      <Progress value={(progress / notes.length) * 100} size="xs" colorScheme="blue" mt={2} />
    </Box>
  );

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
          <Button leftIcon={<FaRecordVinyl />} colorScheme="yellow" onClick={handleRecord} ml={4}>
            {isRecording ? "Stop Recording" : "Record"}
          </Button>
        </Box>
        <HStack spacing={2}>
          {notes.map((note) => (
            <Button key={note} onClick={() => handleNotePlay(note)} colorScheme={currentNote === note ? "blue" : "gray"}>
              {note}
            </Button>
          ))}
        </HStack>
        {recordedNotes.length > 0 && (
          <Box mt={4}>
            <Text fontSize="lg">Recorded Notes:</Text>
            <Input value={recordedNotes.join(", ")} isReadOnly />
          </Box>
        )}
        {recordedNotes.length > 0 && (
          <VirtualTracks notes={recordedNotes} progress={playbackProgress} />
        )}
      </VStack>
    </Container>
  );
};

export default Index;