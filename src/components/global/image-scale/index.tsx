import { memo } from "react";
import "./style.css";
import { Image, ImageProps } from "antd";
import { cn as bem } from "@bem-react/classname";
import fullIcon from "./full.svg";

interface IImageScaleProps {
}

function ImageScale(props: ImageProps) {
  const cn = bem("ImageScale");

  return (
    <Image
      preview={{
        mask: <img src={fullIcon} className={cn()}></img>,
      }}
      {...props}
    />
  );
}

export default memo(ImageScale);
