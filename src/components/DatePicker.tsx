import { css, Interpolation, Theme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ja from 'date-fns/locale/ja'
import Box from '@mui/material/Box';
import {
  PickersDay,
  PickersDayProps,
  pickersDayClasses
} from "@mui/x-date-pickers";

const LabelTextCss = css`
  padding: 0 0 10px 0;
`
type Props = {
  style?: Interpolation<Theme>;
  handleChange: (date: Date | null) => void;
  value: Date | null;
  onKeyDown?: (e: any) => void;
  labelText?: string;
};

const renderWeekPickerDay = (
  date: Date,
  selectedDates: Array<Date | null>,
  pickersDayProps: PickersDayProps<Date>
) => {
  return (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          color: "#fff"
        }
      }}
    />
  );
};

const DatePicker = (props: Props) => {

  return (
    <>
    <div css={LabelTextCss}>{props?.labelText}</div>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
     <Box sx={{ m: 2, background: "#ededed", borderRadius: "5px" , margin: "0", width: "max-content"}}>
       <MuiDatePicker
         value={props.value}
         onChange={props.handleChange}
         inputFormat='yyyy年MM月dd日'
         mask='____年__月__日'
         renderInput={
          (params) => <TextField
           {...params}
           />
        }
        renderDay={renderWeekPickerDay}
       />
     </Box>
   </LocalizationProvider>
    </>
  );
};

export default DatePicker;
