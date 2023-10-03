import React from "react";
import {ScrollShadow} from "@nextui-org/react";
import {Content} from "./Content";
  
export default function App() {
  return (
    <ScrollShadow hideScrollBar className="w-[300px] h-[400px]">
      <Content />
    </ScrollShadow>
  );
}
