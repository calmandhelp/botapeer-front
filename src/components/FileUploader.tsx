import { css, SerializedStyles } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

type Props = {
  css?: SerializedStyles
}

const FileUploader = (props: Props) => {

const theme = useTheme();

const inputStyleCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background: ${theme.palette.background.default};
  cursor: pointer;
  border-radius: 5px;
  color: #b2b2b2;
  font-weight: bold;
`

const onDrop = useCallback((acceptedFiles: File[]) => {

}, []);
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
return (
  <div {...getRootProps()} css={[inputStyleCss, props?.css]}>
      <input {...getInputProps()} />
      {
          isDragActive ?
              <p>写真を選択してください。</p> :
              <p>選択かドラッグアンドドロップで写真を追加できます。</p>
      }
  </div>
);
}

export default FileUploader;