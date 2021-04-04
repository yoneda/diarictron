import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import {
  action,
  computed,
  createStore,
  StoreProvider,
  useStoreState,
  useStoreActions,
  thunk
} from "easy-peasy";
import Editor from "./Editor";
import NoteList from "./NoteList2";
import Layout from "./Layout";
import Control from "./Control";
import { isSame } from "./helper";
import Popup from "./Popup";
import Dialog from "./Dialog";
import Button from "./Button";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import List from "./List";
import ListRow from "./ListRow";
import OpenInNew from "./OpenInNew";
import * as color from "./color";
import mousetrap from "mousetrap";
import dbClient from "./dbClient";
// const { ipcRenderer, shell } = window.require("electron");
import { Router } from "@reach/router";
import Top from "./Top";
import Cancel from "./Cancel";
import Logo from "./Logo";
import Link from "./Link";
import Banner from "./Banner";
import Warning from "./Warning";
import IconButton from "./IconButton";
import Batu from "./Batu";
import Flex from "./Flex";
import Text from "./Text";
import Favorite from "./Favorite";
import DeleteForever from "./DeleteForever";

const Center = styled.div`
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const store = createStore({
  notes: [],
  ids: [],
  creation: "",
  selecteds: computed(state =>
    state.notes.filter(note => state.ids.some(id => id === note.id))
  ),
  length: computed(state => state.selecteds.length),
  targetNote: computed(state => (state.length === 1 ? state.selecteds[0] : {})),
  setNotes: action((state, payload) => {
    state.notes = payload;
  }),
  setCreation: action(state => {
    state.creation = nanoid(8);
  }),
  numByDate: computed(state => date =>
    state.notes.reduce(
      (acc, note) =>
        isSame(dayjs(note.createdAt), dayjs(date)) ? acc + 1 : acc,
      0
    )
  ),
  getAll: thunk(actions => {
    /*
    ipcRenderer.invoke("all").then(({ notes, user }) => {
      actions.setNotes(notes);
      actions.setUser(user);
    });*/
    const { notes, user } = dbClient.getAll();
    actions.setNotes(notes);
    actions.setUser(user);
  }),
  touch: action((state, payload) => {
    const { id } = payload;
    state.ids = [id];
  }),
  detouch: action((state, payload) => {
    const { id } = payload;
    state.ids = state.ids.filter(targetId => !targetId === id);
  }),
  append: action((state, payload) => {
    const { id } = payload;
    state.ids.push(id);
  }),
  grep: action((state, payload) => {
    const { date } = payload;
    state.ids = state.notes
      .filter(
        note =>
          dayjs(note.createdAt).isSame(dayjs(date), "year") &&
          dayjs(note.createdAt).isSame(dayjs(date), "month")
      )
      .map(note => note.id);
  }),
  addNote: thunk((actions, payload) => {
    const { body } = payload;
    const note = {
      id: nanoid(8),
      body,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss")
    };
    const notes = dbClient.addNote({ note });
    actions.setCreation();
    actions.setNotes(notes);
    actions.touch({ id: note.id });
    /*
    ipcRenderer.invoke("add-note", { note }).then(notes => {
      actions.setCreation();
      actions.setNotes(notes);
      actions.touch({ id: note.id });
    });*/
  }),
  editNote: thunk((actions, payload) => {
    const { id, body, tags, favorite } = payload;
    const notes = dbClient.editNote({ id, body, tags, favorite });
    actions.setNotes(notes);
    /*
    ipcRenderer
      .invoke("edit-note", { id, body, tags })
      .then(notes => actions.setNotes(notes));*/
  }),
  removeNote: thunk((actions, payload) => {
    const { ids } = payload;
    const notes = dbClient.removeNote({ ids });
    actions.setNotes(notes);
    /*
    ipcRenderer
      .invoke("remove-note", { ids })
      .then(notes => actions.setNotes(notes));*/
  }),
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  updateUser: thunk((actions, payload) => {
    const user = dbClient.updateUser(payload);
    actions.setUser(user);
    /*
    ipcRenderer
      .invoke("update-user", payload)
      .then(user => actions.setUser(user));
      */
  }),
  modal: "",
  contextPoint: { x: 0, y: 0 },
  setModal: action((state, payload) => {
    state.modal = payload;
  }),
  setContextPoint: action((state, payload) => {
    state.contextPoint = payload;
  }),
  menuRect: { x: 0, y: 0, width: 0, height: 0 },
  setMenuRect: action((state, payload) => {
    state.menuRect = payload;
  }),
  preview: false,
  setPreview: action((state, payload) => {
    state.preview = payload;
  })
});

/*
ipcRenderer.on("show-about", () => {
  store.getActions().setModal("ABOUT_DIALOG");
});
*/

const GlobalStyle = createGlobalStyle`
  html{
    font-size: ${props => {
      if (props.theme.fontSize === "large") return 26;
      else if (props.theme.fontSize === "midium") return 18;
      else return 10;
    }}px;
  }
  body{
    user-select: none;
  }
`;

function Main() {
  const [
    ids,
    user,
    modal,
    contextPoint,
    menuRect,
    length,
    targetNote
  ] = useStoreState(state => [
    state.ids,
    state.user,
    state.modal,
    state.contextPoint,
    state.menuRect,
    state.length,
    state.targetNote
  ]);
  const [
    removeNote,
    updateUser,
    getAll,
    setModal,
    setContextPoint,
    editNote
  ] = useStoreActions(actions => [
    actions.removeNote,
    actions.updateUser,
    actions.getAll,
    actions.setModal,
    actions.setContextPoint,
    actions.editNote
  ]);
  useKeyboard();
  useEffect(() => {
    getAll();
  }, []);
  const [banner, setBanner] = useState("");
  useEffect(() => {
    setBanner("USERDATA_WARNING");
  }, []);
  return (
    <ThemeProvider
      theme={{
        fontSize: user.fontSize,
        dark: user.dark,
        showBanner: !(banner === "")
      }}
    >
      <GlobalStyle />
      <Layout>
        {/*
        <Layout.TopLeft />
        <Layout.TopRight />
        */}
        {banner === "USERDATA_WARNING" && (
          <Layout.Banner>
            <Banner color="orange">
              <Flex>
                <Warning />
                <Text size="24" weight="500" color="white">
                  デモのため、データはブラウザ終了後に削除されます。
                </Text>
              </Flex>
              <IconButton
                icon={<Batu size={48} />}
                onClick={() => setBanner("")}
              />
            </Banner>
          </Layout.Banner>
        )}
        <Layout.Notes>
          <NoteList />
        </Layout.Notes>
        <Layout.ButtonBar>
          <Control />
        </Layout.ButtonBar>
        <Layout.Editor>
          {length === 0 ? (
            <Center>
              <Logo size={96} color="rgba(100,100,100,0.2)" />
              {/* TODO: シンプルすぎるのでここで操作方法の説明などをするとよい */}
            </Center>
          ) : length === 1 ? (
            <Editor />
          ) : length >= 2 ? (
            <Center>
              <Text size="24" weight="500" color="black">
                {length} notes selected
              </Text>
              <Button
                type="outlined"
                color={color.RED_500}
                onClick={() => removeNote({ ids: ids })}
              >
                <Text size="20" weight="500" color={color.RED_500}>
                  削除
                </Text>
              </Button>
            </Center>
          ) : null}
        </Layout.Editor>
        {modal === "ABOUT_DIALOG" && (
          <Layout.FullView>
            <Dialog
              onClose={() => setModal("")}
              buttons={
                <Button type="text" onClick={() => setModal("")}>
                  CLOSE
                </Button>
              }
            >
              <Center>
                <Logo size="100" color="dodgerblue" />
                <h3>Diarictron</h3>
                <p>v1.0.0</p>
                <Link path="https://github.com/yoneda/easy-diary" color="black">
                  利用規約
                </Link>
                <Link
                  path="https://github.com/yoneda/easy-diary/blob/master/privacy.md"
                  color="black"
                >
                  プライバシーポリシー
                </Link>
              </Center>
            </Dialog>
          </Layout.FullView>
        )}
        {modal === "DROPDOWN_MENU" && (
          <Layout.FullView>
            <Popup
              onClose={() => {
                setModal("");
              }}
              left={
                menuRect.x -
                192 /* current dropdown width. TODO: ドロップダウンメニューの横幅を計算してポップアップ表示位置を調整する*/ +
                menuRect.width
              }
              top={menuRect.y + menuRect.height}
            >
              <Menu>
                <MenuItem
                  onClick={() =>
                    editNote({ ...targetNote, favorite: !targetNote.favorite })
                  }
                >
                  <>
                    <Favorite
                      size="40"
                      color={targetNote.favorite ? "dodgerblue" : "gray"}
                      type={targetNote.favorite ? "filled" : "border"}
                    />
                    <Text size="24" weight="400">
                      お気に入り
                    </Text>
                  </>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    removeNote({ ids: ids });
                    setModal("");
                  }}
                >
                  <>
                    <DeleteForever size="40" color="gray" />
                    <Text size="24" weight="400">
                      削除
                    </Text>
                  </>
                </MenuItem>
              </Menu>
            </Popup>
          </Layout.FullView>
        )}
        {modal === "SETTING_MODAL" && (
          <Layout.FullView>
            <Dialog
              title={<h3>設定</h3>}
              close={
                <span onClick={() => setModal("")}>
                  <Cancel onClick={() => setModal("")} />
                </span>
              }
              onClose={() => setModal("")}
            >
              <List>
                <ListRow
                  onClick={() => updateUser({ dark: !user.dark })}
                  clickable
                  control={
                    <input
                      id="dark"
                      type="checkbox"
                      checked={user.dark}
                      onClick={() => updateUser({ dark: !user.dark })}
                    />
                  }
                >
                  <label htmlFor="dark">Dark Mode</label>
                </ListRow>
                <ListRow
                  control={
                    <select
                      id="uiStyle"
                      onChange={e => updateUser({ uiStyle: e.target.value })}
                      value={user.uiStyle}
                    >
                      <option value="normal">Normal</option>
                      <option value="dayone">Dayone</option>
                    </select>
                  }
                >
                  <label htmlFor="uiStyle">UI Style</label>
                </ListRow>
                <ListRow
                  control={
                    <select
                      id="fontSize"
                      onChange={e => updateUser({ fontSize: e.target.value })}
                      value={user.fontSize}
                    >
                      <option value="small">small</option>
                      <option value="midium">midium</option>
                      <option value="large">large</option>
                    </select>
                  }
                >
                  <label htmlFor="fontSize">Font Size</label>
                </ListRow>
                <ListRow
                  clickable
                  onClick={() => console.log("export notes")}
                  control={<OpenInNew />}
                >
                  Export Notes
                </ListRow>
              </List>
            </Dialog>
          </Layout.FullView>
        )}
        {modal === "CONTEXT_MODAL" && (
          <Layout.FullView>
            <Popup
              onClose={() => {
                setModal("");
                setContextPoint({ x: 0, y: 0 });
              }}
              left={contextPoint.x}
              top={contextPoint.y}
            >
              <Menu>
                <MenuItem
                  onClick={() => {
                    removeNote({ ids: ids });
                    setModal("");
                    setContextPoint({ x: 0, y: 0 });
                  }}
                >
                  <>
                    <DeleteForever size="40" color="gray" />
                    <Text size="24" weight="400">
                      削除
                    </Text>
                  </>
                </MenuItem>
              </Menu>
            </Popup>
          </Layout.FullView>
        )}
      </Layout>
    </ThemeProvider>
  );
}

function useKeyboard() {
  const [modal, user, preview, ids] = useStoreState(state => [
    state.modal,
    state.user,
    state.preview,
    state.ids
  ]);
  const [
    addNote,
    setModal,
    updateUser,
    setPreview,
    removeNote
  ] = useStoreActions(actions => [
    actions.addNote,
    actions.setModal,
    actions.updateUser,
    actions.setPreview,
    actions.removeNote
  ]);
  useEffect(() => {
    mousetrap.bind("command+/", () =>
      modal === "" ? setModal("SETTING_MODAL") : setModal("")
    );
    mousetrap.bind("command+shift+/", () =>
      modal === "" ? setModal("ABOUT_DIALOG") : setModal("")
    );
    mousetrap.bind("command+shift+n", () => addNote({ body: "New" }));
    mousetrap.bind("command+shift+m", () => updateUser({ dark: !user.dark }));
    mousetrap.bind("command+shift+p", () => setPreview(!preview));
    mousetrap.bind("command+shift+o", () => console.log("output all notes"));
    mousetrap.bind("backspace", () => removeNote({ ids: ids }));
    return () => [
      mousetrap.unbind("command+/"),
      mousetrap.unbind("command+shift+/"),
      mousetrap.unbind("command+shift+n"),
      mousetrap.unbind("command+shift+m"),
      mousetrap.unbind("command+shift+p"),
      mousetrap.unbind("command+shift+o"),
      mousetrap.unbind("backspace")
    ];
  }, [modal, user, preview, ids]);
}

function App() {
  return (
    <StoreProvider store={store}>
      <Reset />
      <Router>
        <Top path="/" />
        <Main path="/app" />
      </Router>
    </StoreProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
