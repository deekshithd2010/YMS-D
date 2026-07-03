import React from "react";
import PropTypes from "prop-types";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Textbox from "./Textbox";

function Passwordbox(props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <InputGroup>
        <Textbox  w={props.w} ph={props.ph} ty={show ? "text" : "password"} value={props.value} onChange={props.onChange} />
        <InputRightElement paddingTop="30px">
          <IconButton
            background="unset"
            onClick={handleClick}
            marginRight={{ base: 50, sm: 100 }}
          >
            {show ? (
              <AiFillEyeInvisible size="30px" />
            ) : (
              <AiFillEye size="30px" />
            )}
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </>
  );
}

Passwordbox.propTypes = {};

export default Passwordbox;
