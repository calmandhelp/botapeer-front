import { css, SerializedStyles } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { createRef, useCallback } from 'react';
import Dropzone, {DropzoneRef, useDropzone} from 'react-dropzone';

type Props = {
  css?: SerializedStyles
  setFiles: (file: File[]) => void
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
  props.setFiles(acceptedFiles);
}, [props.setFiles]);
  return (
    <Dropzone onDrop={onDrop}>
      {({getRootProps, getInputProps, isDragActive}) => (
      <div {...getRootProps()} css={[inputStyleCss, props?.css]}>
      <input {...getInputProps()} />
        {
            isDragActive ?
                <p>アップロードします</p> :
                <p>選択かドラッグアンドドロップで写真を追加できます。</p>
        }
      </div>
    )}
    </Dropzone>
  );
}
export default FileUploader;