/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import CreateIcon from 'material-ui-icons/Create';
import Badge from 'material-ui/Badge';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import { red } from 'material-ui/colors';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

import { updateApp } from '../../actions/actions';

const styles = (theme) => {
  return {
    listItemActive: {
      backgroundColor: theme.palette.tertiary.color,
      '&:hover': {
        backgroundColor: theme.palette.tertiary.color
      }
    },
    text: {
      color: 'white',
      fontSize: 13,
      opacity: 0.8,
      padding: 0,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    textActive: {
      opacity: 1,
      fontWeight: '700'
    },
    textSelected: {
      color: theme.palette.tertiary.hover.color,
      '&:hover': {
        color: theme.palette.tertiary.hover.color
      }
    },
    icon: {
      width: 17,
      height: 18,
      color: 'white',
      opacity: 0.7,
      marginRight: 5
    },
    iconActive: {
      opacity: 1
    },
    iconSelected: {
      color: theme.palette.tertiary.hover.color,
      '&:hover': {
        color: theme.palette.tertiary.hover.color
      }
    },
    avatar: {
      width: 20,
      height: 20,
      marginRight: 10
    },
    badge: {
      right: 15,
      marginTop: -15,
      fontWeight: '700'
    },
    badgeColor: {
      color: 'white',
      backgroundColor: red['500']
    },
    unreadComment: {
      color: 'white',
      fontWeight: '700'
    }
  };
};

const smallWidth = ['sm', 'xs'];

export class DumbChannelItem extends React.Component {
  handleClickOpen = () => {
    const { openChannel, node, channelsDrawer, width } = this.props;
    this.setState({ open: true }, () => {
      return openChannel('chatApp', {
        open: true,
        drawer: smallWidth.includes(width) ? false : channelsDrawer,
        channel: node.id,
        subject: node.subject.id,
        right: { open: false, componentId: undefined }
      });
    });
  };
  renderIcon = (isActive, isSelected) => {
    const { classes, node, itemdata, currentMessage } = this.props;
    const channelPicture = node.subject.picture;
    const hasMessage = currentMessage && currentMessage.values && currentMessage.values.comment;
    if (!isSelected && hasMessage) {
      return (
        <ListItemIcon>
          <CreateIcon
            className={classNames(classes.icon, {
              [classes.iconActive]: isActive,
              [classes.iconSelected]: isSelected
            })}
          />
        </ListItemIcon>
      );
    }
    return itemdata && itemdata.isDiscussion
      ? <Avatar className={classes.avatar} src={channelPicture ? `${channelPicture.url}/profil` : ''} />
      : <ListItemIcon>
        <Icon
          className={classNames('mdi-set mdi-pound', classes.icon, {
            [classes.iconActive]: isActive,
            [classes.iconSelected]: isSelected
          })}
        />
      </ListItemIcon>;
  };
  render() {
    const { classes, node, activeChannel } = this.props;
    const lenUnreadComments = node.unreadComments.length;
    const hasUnread = lenUnreadComments > 0;
    const isSelected = activeChannel === node.id;
    const isActive = isSelected || hasUnread;
    const textClasses = classNames(classes.text, { [classes.textActive]: isActive, [classes.textSelected]: isSelected });
    return (
      <ListItem onClick={this.handleClickOpen} dense button classes={isSelected && { root: classes.listItemActive }}>
        {this.renderIcon(isActive, isSelected)}
        <ListItemText classes={{ text: textClasses }} className={textClasses} primary={node.title} />
        {hasUnread &&
          <ListItemSecondaryAction className={classes.badge}>
            <Badge classes={{ colorAccent: classes.badgeColor }} badgeContent={lenUnreadComments} color="accent" />
          </ListItemSecondaryAction>}
      </ListItem>
    );
  }
}

export const mapDispatchToProps = {
  openChannel: updateApp
};

export const mapStateToProps = (state, props) => {
  return {
    currentMessage: state.form[props.node.id],
    activeChannel: state.apps.chatApp.channel,
    channelsDrawer: state.apps.chatApp.drawer
  };
};

export default compose(withStyles(styles, { withTheme: true }), withWidth())(
  connect(mapStateToProps, mapDispatchToProps)(DumbChannelItem)
);