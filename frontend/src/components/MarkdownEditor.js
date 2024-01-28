// import React, { useEffect, useRef, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from '@editorjs/header'; 
// import SimpleImage from "@editorjs/simple-image";
// import List from "@editorjs/list";
// import RawTool from '@editorjs/raw';
// import "../index.css";
// import { Indicator } from "@chakra-ui/react";
// import { postAPI, getAPI } from '../utils/util';


// class MyHeader extends Header {
//     /**
//      * Return Tool's view
//      * @returns {HTMLHeadingElement}
//      * @public
//      */
//     render() {
//         const extrawrapper = document.createElement('div');
//         extrawrapper.classList.add('content');
//         extrawrapper.appendChild(this._element);
//         console.log(extrawrapper);

//         return extrawrapper;
//     }
// }

// const DEFAULT_INITIAL_DATA =  {
//   "time": 1706427406946,
//   "blocks": [
//       {
//           "id": "UDxZPHInku",
//           "type": "header",
//           "data": {
//               "text": "Welcome",
//               "level": 1
//           }
//       },
//       {
//           "id": "SC1DCdAfX-",
//           "type": "header",
//           "data": {
//               "text": "to your home on the internet!",
//               "level": 4
//           }
//       },
//       {
//           "id": "X8eCxOi0OU",
//           "type": "image",
//           "data": {
//               "url": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FoF46gZeO37KmY%2Fgiphy.gif&amp;f=1&amp;nofb=1&amp;ipt=85ff568093670a86a7b78453e8dca49846913f225119dd9f539a7905bfde5af4&amp;ipo=images.jpg",
//               "caption": "heyo~ - petr",
//               "withBorder": true,
//               "withBackground": true,
//               "stretched": true
//           }
//       },
//       {
//           "id": "yhp9wECeTy",
//           "type": "header",
//           "data": {
//               "text": "You can add:",
//               "level": 2
//           }
//       },
//       {
//           "id": "emXPVMr8g_",
//           "type": "header",
//           "data": {
//               "text": "lists",
//               "level": 4
//           }
//       },
//       {
//           "id": "UiIwGQ3OVd",
//           "type": "list",
//           "data": {
//               "style": "unordered",
//               "items": [
//                   "one",
//                   "two",
//                   "three"
//               ]
//           }
//       },
//       {
//           "id": "BdPXJ_AYdC",
//           "type": "header",
//           "data": {
//               "text": "headers and text",
//               "level": 4
//           }
//       },
//       {
//           "id": "q1aMOGB5jy",
//           "type": "paragraph",
//           "data": {
//               "text": "Rem eos velit excepturi nostrum voluptatibus libero. Enim veniam alias delectus. Consequatur exercitationem omnis ut."
//           }
//       },
//       {
//           "id": "dIgJCU_wOD",
//           "type": "paragraph",
//           "data": {
//               "text": "Amet qui pariatur a. Id est reiciendis consequatur aut libero. Aut est veniam labore et quis sit quia sunt. Velit quia qui id veritatis quia sint dolorum cumque. Temporibus officia ea ex laborum et in iure. Qui velit earum at tempore deserunt."
//           }
//       },
//       {
//           "id": "zEvsGUITRW",
//           "type": "header",
//           "data": {
//               "text": "and code blocks",
//               "level": 4
//           }
//       },
//       {
//           "id": "Ap7DJ8DAwb",
//           "type": "raw",
//           "data": {
//               "html": "AntEater by Win Kang\n\n    Z   z                            //////////////_               the\n           Z   O         __\\\\\\\\@   //^^        _-    \\///////    sleeping\n    Z    z   o   _____((_     \\-/ ____/ /   {   { \\\\       }     ant\n           o    0__________\\\\\\---//____/----//__|-^\\\\\\\\\\\\\\\\     eater"
//           }
//       }
//   ],
//   "version": "2.29.0"
// }
  
  

// const EditorComponent = ({readOnly, pageContents, updatePageContents, username}) => {
//   const [thisPageContents, updadeThisPageContents] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   const ejInstance = useRef();

//     const initEditor = () => {
//        const editor = new EditorJS({
//           holder: 'editorjs',
//           onReady: () => {
//             ejInstance.current = editor;

//             // const importPageData = (pageJson) => {
//             //   console.log("pageJSON", pageJson);
//             //   updadeThisPageContents(pageJson);
//             //   // let pageData = JSON.parse(pageJson);
//             //   // console.log(pageData);
//             //   // updadeThisPageContents(pageData)
//             // }

//             // const handleLoadLogic = async () => {
//             //   try {
//             //     const response = await getAPI(`/load_page?username=${"Bowen"}`);
//             //     importPageData(response);
//             //     return true;
//             //   } catch (err) {
//             //     console.log(err);
//             //     return false;
//             //   } finally {
//             //     console.log("done loading");
//             //     setIsLoaded(true);
//             //   }
//             // };

//             // let result = handleLoadLogic();
//             // if (result) {
//             //   console.log("loaded");
//             // }

//             // console.log("initial", thisPageContents);

//             if (readOnly) {
//               if (!editor.readOnly.isEnabled) {
//                 editor.readOnly.toggle();
//               }
//             } else {
//               if (editor.readOnly.isEnabled) {
//                 editor.readOnly.toggle();
//               }
//             }
//           },
//           autofocus: true,
//           // data: initialData ? (initialData) : (DEFAULT_INITIAL_DATA),
//           data: thisPageContents,
//           onChange: async () => {
//             if (!readOnly) {
//               let content = await editor.saver.save();
//               updatePageContents(content);
//               console.log(content);
//             }

//             // console.log(content);
//           },
//           tools: { 
//             header: MyHeader, 
//             image: SimpleImage,
//             list: {
//                 class: List,
//                 inlineToolbar: true,
//                 config: {
//                   defaultStyle: 'unordered'
//                 }
//             },
//             raw: RawTool,
//           },
//         });
//       };

//       // This will run only once
//   useEffect(() => {
//     if (ejInstance.current === null) {
//       const importPageData = (pageJson) => {
//         console.log("pageJSON", pageJson);
//         updadeThisPageContents(pageJson);
//         // let pageData = JSON.parse(pageJson);
//         // console.log(pageData);
//         // updadeThisPageContents(pageData)
//       }

//       const handleLoadLogic = async () => {
//         try {
//           const response = await getAPI(`/load_page?username=${"Bowen"}`);
//           importPageData(response);
//           return true;
//         } catch (err) {
//           console.log(err);
//           return false;
//         } finally {
//           console.log("done loading");
//           setIsLoaded(true);
//         }
//       };

//       let result = handleLoadLogic();
//       if (result) {
//         console.log("loaded");
//       }

//       console.log("initial", thisPageContents);



//       if (!isLoaded) {
//         console.log("try load")
//         handleLoadLogic();
//         initEditor();
//       }
//     }

//     return () => {
//       if (!isLoaded) {
//         ejInstance?.current?.destroy();
//         ejInstance.current = null;
//       }
//       // ejInstance?.current?.destroy();
//       // ejInstance.current = null;
//     };
//   }, [initEditor, isLoaded, thisPageContents]);

//     return  <><div id='editorjs'></div></>;
// }

// export default EditorComponent;



import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import RawTool from '@editorjs/raw';
import "../index.css";
import { Indicator } from "@chakra-ui/react";
import { postAPI, getAPI } from '../utils/util';
import { set } from "lodash";


const DEFAULT_INITIAL_DATA =  {
  "time": 1706427406946,
  "blocks": [
      {
          "id": "UDxZPHInku",
          "type": "header",
          "data": {
              "text": "Welcome",
              "level": 1
          }
      },
      {
          "id": "SC1DCdAfX-",
          "type": "header",
          "data": {
              "text": "to your home on the internet!",
              "level": 4
          }
      },
      {
          "id": "X8eCxOi0OU",
          "type": "image",
          "data": {
              "url": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FoF46gZeO37KmY%2Fgiphy.gif&amp;f=1&amp;nofb=1&amp;ipt=85ff568093670a86a7b78453e8dca49846913f225119dd9f539a7905bfde5af4&amp;ipo=images.jpg",
              "caption": "heyo~ - petr",
              "withBorder": true,
              "withBackground": true,
              "stretched": true
          }
      },
      {
          "id": "yhp9wECeTy",
          "type": "header",
          "data": {
              "text": "You can add:",
              "level": 2
          }
      },
      {
          "id": "emXPVMr8g_",
          "type": "header",
          "data": {
              "text": "lists",
              "level": 4
          }
      },
      {
          "id": "UiIwGQ3OVd",
          "type": "list",
          "data": {
              "style": "unordered",
              "items": [
                  "one",
                  "two",
                  "three"
              ]
          }
      },
      {
          "id": "BdPXJ_AYdC",
          "type": "header",
          "data": {
              "text": "headers and text",
              "level": 4
          }
      },
      {
          "id": "q1aMOGB5jy",
          "type": "paragraph",
          "data": {
              "text": "Rem eos velit excepturi nostrum voluptatibus libero. Enim veniam alias delectus. Consequatur exercitationem omnis ut."
          }
      },
      {
          "id": "dIgJCU_wOD",
          "type": "paragraph",
          "data": {
              "text": "Amet qui pariatur a. Id est reiciendis consequatur aut libero. Aut est veniam labore et quis sit quia sunt. Velit quia qui id veritatis quia sint dolorum cumque. Temporibus officia ea ex laborum et in iure. Qui velit earum at tempore deserunt."
          }
      },
      {
          "id": "zEvsGUITRW",
          "type": "header",
          "data": {
              "text": "and code blocks",
              "level": 4
          }
      },
      {
          "id": "Ap7DJ8DAwb",
          "type": "raw",
          "data": {
              "html": "AntEater by Win Kang\n\n    Z   z                            //////////////_               the\n           Z   O         __\\\\\\\\@   //^^        _-    \\///////    sleeping\n    Z    z   o   _____((_     \\-/ ____/ /   {   { \\\\       }     ant\n           o    0__________\\\\\\---//____/----//__|-^\\\\\\\\\\\\\\\\     eater"
          }
      }
  ],
  "version": "2.29.0"
}

const EditorComponent = ({readOnly, updatePageContents, username}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ejInstance = useRef();

  useEffect(() => {
    const initEditor = async () => {
      setIsLoaded(true);
      const initialData = await getAPI(`/load_page?username=${username}`);

      const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
          ejInstance.current = editor;

          if (readOnly) {
            if (!editor.readOnly.isEnabled) {
              editor.readOnly.toggle();
            }
          } else {
            if (editor.readOnly.isEnabled) {
              editor.readOnly.toggle();
            }
          }
        },
        autofocus: false,
        data: !isLoaded ? (initialData || DEFAULT_INITIAL_DATA) : ({}),
        onChange: async () => {
          if (!readOnly) {
            let content = await editor.saver.save();
            updatePageContents(content);
            console.log(content);
          }
        },
        tools: { 
          header: Header, 
          image: SimpleImage,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          raw: RawTool,
        },
      });
    };

    initEditor();
    // initEditor();
    // setIsLoaded(true);

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [readOnly, updatePageContents, username, isLoaded, setIsLoaded]);

  // if (!isLoaded) {
  //   return <div id='editorjs'>{setIsLoaded(true)}</div>;
  // }
  return <div id='editorjs'></div>;
}

export default EditorComponent;
