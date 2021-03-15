import React, { Fragment, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { humanDate } from "./helper";
import TrashIcon from "./TrashIcon";
import TagEditor from "./TagEditor";
import Button from "./Button";
import Menu from "./Menu";
import IconButton from "./IconButton";
import MoreVert from "./MoreVert";
import Info from "./Info";
import * as color from "./color";
import dayjs from "dayjs";
import marked from "marked";

function Editor(){
  return <div>editor main</div>
}

export default Editor;