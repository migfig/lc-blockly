import React from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = (props) => {
    const { icon, size, className, color } = props;

    return (
        <FontAwesomeIcon
            icon={icon} 
            size={size} 
            className={className}
            color={color} />
    );
}
Icon.propTypes = {
    icon: PropTypes.object.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
}
Icon.defaultProps = {
    size: "lg",
    className: "mr-2",
    color: "#666",
}

export default Icon;
