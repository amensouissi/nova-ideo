import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile';
import classNames from 'classnames';

import TextBoxField from './widgets/TextBoxField';
import FilesPicker from './widgets/FilesPicker';

export const renderTextBoxField = ({ input: { name, value, onChange }, placeholder, onCtrlEnter }) => {
  return <TextBoxField onCtrlEnter={onCtrlEnter} name={name} placeholder={placeholder} value={value} onChange={onChange} />;
};

export const renderAnonymousCheckbox = ({ input: { value, onChange }, label, classes }) => {
  return (
    <Checkbox
      icon={<Icon className={classNames(classes.maskIcon, 'mdi-set mdi-guy-fawkes-mask')} />}
      checkedIcon={<Icon className={classNames(classes.maskIcon, 'mdi-set mdi-guy-fawkes-mask')} />}
      label={label}
      value={value}
      onChange={onChange}
      classes={{
        default: classes.maskDefault,
        checked: classes.maskChecked
      }}
    />
  );
};

export const renderFilesList = ({ input: { value, onChange } }) => {
  return (
    <FilesPicker
      className="files-dropzone-list"
      style={{ height: '100px' }}
      value={value}
      onChange={onChange}
      onError={this.onFilesError}
      multiple
      maxFiles={10}
      maxFileSize={10000000}
      minFileSize={0}
      clickable
    >
      <InsertDriveFileIcon />
    </FilesPicker>
  );
};

// export const renderSelect = ({ input: { name, value, onChange }, options, label, canAdd, errors, displayErrors, style }) => {
//   const hasError = displayErrors && errors && name in errors;
//   const inputStyle = style || { labelColor: '#a2a4a2ff' };
//   const labelColor = hasError ? '#f00' : inputStyle.labelColor || '#a2a4a2ff';
//   return (
//     <Select
//       options={options}
//       label={hasError ? errors[name] : label}
//       labelColor={labelColor}
//       canAdd={canAdd}
//       value={value || []}
//       onChange={onChange}
//     />
//   );
// };