import { Dispatch, SetStateAction } from "react";

export declare interface SetMode {
  setMode: Dispatch<SetStateAction<"login" | "register">>;
}
