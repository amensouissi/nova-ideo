/* eslint-disable react/no-array-index-key, no-confusing-arrow */
import React from 'react';
import { graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { goTo, get } from '../../../../utils/routeMap';
import { deleteIdea } from '../../../../graphql/processes/ideaProcess';
import { deleteMutation } from '../../../../graphql/processes/ideaProcess/delete';
import { closeChatApp } from '../../../../actions/actions';
import Button, { CancelButton } from '../../../styledComponents/Button';
import Form from '../../Form';

const styles = {
  container: {
    padding: '15px 11px',
    borderBottom: 'none',
    display: 'flex'
  },
  form: {
    flex: 1,
    marginLeft: 10
  },
  button: {
    marginLeft: '5px !important'
  }
};

export class DumbDelete extends React.Component {
  form = null;

  handleSubmit = () => {
    const { idea, previousLocation } = this.props;
    this.props
      .deleteIdea({
        context: idea
      })
      .then(() => {
        this.props.closeChatApp();
        goTo(previousLocation || get('root'));
      });
    this.closeForm();
  };

  closeForm = () => {
    this.form.close();
  };

  render() {
    const { action, classes, theme, onFormClose } = this.props;
    return (
      <Form
        initRef={(form) => {
          this.form = form;
        }}
        open
        appBar={action.description}
        onClose={onFormClose}
        footer={[
          <CancelButton onClick={this.closeForm}>
            {I18n.t('forms.cancel')}
          </CancelButton>,
          <Button onClick={this.handleSubmit} background={theme.palette.danger.primary} className={classes.button}>
            {action.title}
          </Button>
        ]}
      >
        <div className={classes.container}>
          <div className={classes.form}>
            {I18n.t('forms.removeComment')}
          </div>
        </div>
      </Form>
    );
  }
}

export const mapDispatchToProps = {
  closeChatApp: closeChatApp
};

export const mapStateToProps = (state) => {
  return {
    previousLocation: state.history.navigation.previous
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    graphql(deleteMutation, {
      props: function (props) {
        return {
          deleteIdea: deleteIdea(props)
        };
      }
    })(DumbDelete)
  )
);