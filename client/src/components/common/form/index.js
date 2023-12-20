import TextField from './TextField';
import DropDown from './DropDown';
import CheckBox from './CheckBox';
import PhoneField from './PhoneField';
import {ImageDropZone} from './ImageDropZone';
import {Calendar} from './Calendar';
import {Button} from './Button';

const TextAreaField = ({...props}) => <TextField type="textarea" {...props} />;
const NumberField = ({...props}) => <TextField type="number" {...props} />;
const EmailField = ({...props}) => <TextField type="email" {...props} />;
const PasswordField = ({...props}) => <TextField type="password" {...props} />;
const LinkField = ({...props}) => <TextField type="url" {...props} />;

export {
  EmailField,
  PasswordField,
  LinkField,
  TextAreaField,
  NumberField,
  DropDown,
  CheckBox,
  TextField,
  ImageDropZone,
  Calendar,
  Button,
  PhoneField
};
