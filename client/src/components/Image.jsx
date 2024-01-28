/* eslint-disable react/prop-types */
import { imageAddress } from "../../utils";
export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : imageAddress+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }

  