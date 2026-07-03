import React from "react";
import PropTypes from "prop-types";

function SMicon(props) {
  return (
    <>
      <IconButton
        bg="unset"
        icon={<FaLinkedinIn color="#FFFFFF" size="20px" />}
        _hover={{ bg: "#000000" }}
        borderRadius="100%"
      />
    </>
  );
}

SMicon.propTypes = {};

export default SMicon;
