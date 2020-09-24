import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import messages from 'common-messages';
import formFieldsMsg from 'components/FormFields/messages';

import { TEXT_SECONDARY } from 'style-constants';

import { strLength25x30000 } from 'components/FormFields/validate';

import Base from 'components/Base/BaseRounded';
import {
  TextEditorWrapper,
  TextEditorWarning,
  TextEditorTitle,
} from 'components/FormFields/TextEditorField';
import Wrapper from 'components/FormFields/Wrapper';
import TextBlock from 'components/FormFields/TextBlock';
import Span from 'components/Span';

export const PreviewWrapper = styled.div`
  background: linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 8px 1px, 1px 8px;
  padding: 12px 0;

  blockquote {
    padding: 15px;
    margin-bottom: 10px;

    background: rgb(250, 250, 250);
  }

  pre {
    padding: 15px;
    margin-bottom: 10px;

    font-family: monospace;
    font-size: inherit;
  }
`;

const TextEditor = styled.div`
  .ql-editor {
    min-height: 230px;
  }
`;

const TextEditorTestPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const config = {
    // useSearch: false,
    // spellcheck: false,
    // toolbarButtonSize: 'large',
    // enter: 'BR',
    // toolbarAdaptive: false,
    // toolbarSticky: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // saveModeInStorage: true,
    buttons:
      'bold,italic,|,paragraph,source,|,ul,ol,|,eraser,link,image,hr,,undo,redo',
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['undo'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code-block',
    'undo',
  ];

  console.log('---content---', content);

  return (
    <React.Fragment>
      <Base>
        {/* <JoditEditor
          ref={editor}
          // value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={e => {
            console.log(e);
            // setContent(e.target.textContent);
            setContent(e.target.innerHTML);
          }}
          onChange={value => {
            // console.log(value);
            // setContent(value);
          }}
        /> */}
        <TextEditor>
          <ReactQuill
            value={content}
            onChange={value => {
              // console.log(value);
              setContent(value);
            }}
            modules={modules}
            formats={formats}
            // style={{ height: 230, marginBottom: 80 }}
          />
        </TextEditor>

        {/* <textarea
          onChange={e => {
            console.log(e.currentTarget.value);
            setPreviewContent(e.currentTarget.value);
          }}
          style={{ width: '100%', height: '150px', border: '1px solid red' }}
        >
          {previewContent}
        </textarea> */}

        {strLength25x30000(content) && (
          <TextEditorWarning>
            <FormattedMessage {...formFieldsMsg.wrongLength25x30000} />
          </TextEditorWarning>
        )}
        <Wrapper label={'Preview'} className="mt-3">
          <PreviewWrapper>
            {content ? (
              <TextBlock className="my-2" content={content} />
            ) : (
              <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
                <FormattedMessage {...messages.nothingToSeeYet} />
              </Span>
            )}
          </PreviewWrapper>
        </Wrapper>
      </Base>
    </React.Fragment>
  );
};

TextEditorTestPage.propTypes = {};

export default TextEditorTestPage;
