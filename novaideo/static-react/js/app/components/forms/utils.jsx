import React from 'react';
import { I18n } from 'react-redux-i18n';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';
import Input, { InputAdornment } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';

import TextBoxField from './widgets/TextBoxField';
import FilesPicker from './widgets/FilesPicker';
import Select from './widgets/Select';

export const renderTextBoxField = ({ input: { name, value, onChange }, placeholder, onCtrlEnter, autoFocus, style }) => {
  return (
    <TextBoxField
      autoFocus={autoFocus}
      style={style}
      onCtrlEnter={onCtrlEnter}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export const renderAnonymousCheckboxField = ({ input: { value, onChange }, classes }) => {
  const anonymous = Boolean(value);
  return (
    <Tooltip title={anonymous ? I18n.t('forms.disableAnonymity') : I18n.t('forms.remainAnonymous')} placement="top">
      <Checkbox
        icon={<Icon className={classNames(classes.maskIcon, 'mdi-set mdi-guy-fawkes-mask')} />}
        checkedIcon={<Icon className={classNames(classes.maskIcon, 'mdi-set mdi-guy-fawkes-mask')} />}
        value={value}
        onChange={onChange}
        classes={{
          default: classes.maskDefault,
          checked: classes.maskChecked
        }}
      />
    </Tooltip>
  );
};

export const renderFilesListField = ({ input: { value, onChange }, node, initRef }) => {
  return (
    <FilesPicker initRef={initRef} className="files-dropzone-list" value={value} onChange={onChange} multiple clickable>
      {node}
    </FilesPicker>
  );
};

export const renderSelect = ({ input: { value, onChange }, options, label, canAdd, initRef }) => {
  return <Select initRef={initRef} label={label} options={options} value={value} onChange={onChange} canAdd={canAdd} />;
};

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid #a0a0a2',
    borderRadius: 4,
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
    alignItems: 'center',
    height: 35
  },
  container: {
    marginBottom: 10
  },
  input: {
    padding: '10px 10px 10px',
    fontSize: 15,
    '&::placeholder': {
      color: '#000',
      fontSize: 15,
      fontWeight: 400,
      opacity: '.375'
    }
  },
  helper: {
    marginTop: 4,
    fontSize: 11
  },
  label: {
    fontWeight: 700,
    margin: '0 0 .25rem',
    display: 'block',
    fontSize: 13
  },
  labelOptional: {
    fontWeight: '400 !important',
    color: '#717274 !important'
  }
};
export const renderTextInput = withStyles(
  styles
)(({ input: { name, value, onChange }, placeholder, endAdornment, endAdornmentPosition, label, helper, optional, classes }) => {
  return (
    <div className={classes.container}>
      {label &&
        <label className={classes.label} htmlFor={name}>
          {label}
          {optional &&
            <span className={classes.labelOptional}>
              {' '}{I18n.t('forms.optional')}
            </span>}
        </label>}
      <Input
        fullWidth
        disableUnderline
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        classes={{
          root: classes.root,
          input: classes.input
        }}
        endAdornment={
          <InputAdornment position={endAdornmentPosition}>
            {endAdornment}
          </InputAdornment>
        }
      />
      {helper &&
        <FormHelperText className={classes.helper} id={name}>
          {helper}
        </FormHelperText>}
    </div>
  );
});