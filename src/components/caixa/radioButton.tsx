import { Box, useColorModeValue, useRadio, } from "@chakra-ui/react";

export function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'ml="8px" alignSelf="flex-start">
      <input {...input} />
      <Box
        {...checkbox}
        height='48px'
        width="120px"
        fontWeight='550'
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#007AFF",
          color: "white",
          borderColor: useColorModeValue("gray.200", "gray.700"),
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
