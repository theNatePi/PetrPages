import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 

const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "level": 1
          }
        },
      ]
  }

const EditorComponent = ({readOnly}) => {
  const ejInstance = useRef();

    const initEditor = () => {
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
          autofocus: true,
          data: DEFAULT_INITIAL_DATA,
          onChange: async () => {
            if (!readOnly) {
              let content = await editor.saver.save();
            }

            // console.log(content);
          },
          tools: { 
            header: Header, 
          },
        });
      };

      // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return  <><div id='editorjs'></div></>;
}

export default EditorComponent;
