import { css, SerializedStyles } from "@emotion/react";

type StyleProps = {
  margin?: string
}

type Props = { propCss?: SerializedStyles } & StyleProps

const style = ({ margin }: StyleProps) => css`
  height: 1px;
  width: 100%;
  background: #E8E8E8;
  margin: ${margin};
`

const Divider = ({ propCss, ...styles }: Props) => {
  return <div css={[style(styles), propCss]}></div>
}

export default Divider;