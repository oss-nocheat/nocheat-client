import React, {createContext} from "react";
import {SERVER_URL} from "./config";

export let socket = io(SERVER_URL)
createContext(socket)