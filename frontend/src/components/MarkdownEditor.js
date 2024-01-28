import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import RawTool from '@editorjs/raw';
import "../index.css";


class MyHeader extends Header {
    /**
     * Return Tool's view
     * @returns {HTMLHeadingElement}
     * @public
     */
    render() {
        const extrawrapper = document.createElement('div');
        extrawrapper.classList.add('content');
        extrawrapper.appendChild(this._element);
        console.log(extrawrapper);

        return extrawrapper;
    }
}

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
        {
            "type": "image",
            "data": {
              "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
              "caption": "Roadster // tesla.com",
              "withBorder": false,
              "withBackground": false,
              "stretched": true
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
            header: MyHeader, 
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
