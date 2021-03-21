import {
  Box,
  Button,
  Code,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import EmailEditor, { HtmlExport } from "react-email-editor";

const designInit = {
  counters: {},
  body: { rows: [], values: {} },
};

const htmlExportinit = { html: "", design: designInit };

const EmailEditorComp = () => {
  const emailEditorRef: any = useRef(null);
  const toast = useToast();
  const [htmlExport, setHtmlExport] = useState<HtmlExport>(htmlExportinit);
  const [display, setDisplay] = useState<string>("");
  const [clickHTML, setClickHTML] = useState<boolean>(true);
  const [showExport, setShowExport] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (clickHTML) setDisplay(htmlExport.html);
    else setDisplay(JSON.stringify(htmlExport.design));
  }, [clickHTML, htmlExport]);

  const onClickButton = (clickOnHTML: boolean) => {
    clickOnHTML ? setClickHTML(true) : setClickHTML(false);
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data: HtmlExport) => {
      setHtmlExport(data);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: `Successfully copied to clipboard`,
      variant: "subtle",
      duration: 1000,
      // isClosable: true,
    });
  };

  const onLoad = () => {
    // you can load your template here;
    setShowExport(true);
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  return (
    <>
      <Flex
        direction="row-reverse"
        m={4}
        p={2}
        borderWidth="1px"
        borderRadius="lg"
      >
        {!showExport ? (
          <Box w="150px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </Box>
        ) : (
          <>
            <Button
              ml={4}
              mr={2}
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                exportHtml();
                onOpen();
              }}
            >
              Export HTML
            </Button>
            <Button
              // mr={4}
              colorScheme="blue"
              variant="outline"
              // onClick={exportHtml}
            >
              Save as Template
            </Button>
          </>
        )}
        {/* <button onClick={exportHtml}>Export HTML</button> */}
      </Flex>
      <Box m={4} p={4} borderWidth="1px" borderRadius="lg">
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} minHeight={700} />
      </Box>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              size="sm"
              ml={4}
              colorScheme="blue"
              variant={clickHTML ? "solid" : "outline"}
              onClick={() => onClickButton(true)}
            >
              Show HTML
            </Button>
            <Button
              size="sm"
              ml={4}
              colorScheme="blue"
              variant={clickHTML ? "outline" : "solid"}
              onClick={() => onClickButton(false)}
            >
              Show JSON
            </Button>
            <Box
              h="xl"
              m={4}
              p={2}
              overflow="auto"
              borderWidth="1px"
              bg="gray.100"
              // borderRadius="lg"
            >
              <Code>{display}</Code>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              mr={4}
              colorScheme="blue"
              variant="outline"
              onClick={copyToClipboard}
            >
              Save to Clipboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmailEditorComp;
