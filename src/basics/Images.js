import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GatsbyImage from "gatsby-image";

const FigureEl = styled.figure`
  margin: 0;
`;
const CaptionEl = styled.figcaption`
  color: ${({ theme }) => theme.lightGrey};
  line-height: 2;
  font-size: 0.9rem;
`;

const basicImageStyles = `
  max-width: 100%;
`;

export const GatsbyImageEl = styled(GatsbyImage)`
  ${basicImageStyles};
`;

export const BasicImage = styled.img`
  ${basicImageStyles};
`;

export const Image = ({ src, imgStyle, ...props }) =>
  src ? (
    <BasicImage {...props} src={src} style={imgStyle} />
  ) : (
    <GatsbyImageEl {...props} />
  );

Image.propTypes = {
  imgStyle: PropTypes.object,
  src: PropTypes.string,
};

export const Figure = ({ caption, ...props }) => (
  <FigureEl>
    <Image {...props} />
    <CaptionEl>{caption}</CaptionEl>
  </FigureEl>
);

Figure.propTypes = {
  caption: PropTypes.string.isRequired,
};
