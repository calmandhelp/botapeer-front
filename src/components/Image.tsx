import React from "react";
import NextImage, { ImageProps } from "next/image";
import { SerializedStyles } from "@emotion/react";

type Props = {
  css?: SerializedStyles
} & ImageProps

const Image = ({src, objectFit, alt, layout, css, width, height}: Props) => {
  return <NextImage src={src} objectFit={objectFit} alt={alt} layout={layout} width={width} height={height} css={css} priority />;
};

export default React.memo(Image);