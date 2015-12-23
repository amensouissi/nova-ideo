# -*- coding: utf8 -*-
# Copyright (c) 2014 by Ecreall under licence AGPL terms
# avalaible on http://www.gnu.org/licenses/agpl.html

# licence: AGPL
# author: Amen Souissi

"""
This module represent all of behaviors used in the
Comment management process definition.
"""
from pyramid.httpexceptions import HTTPFound

from dace.util import getSite
from dace.objectofcollaboration.principal.util import get_current
from dace.processinstance.activity import InfiniteCardinality

from novaideo.ips.mailer import mailer_send
from novaideo.content.interface import IComment
from novaideo import _
from novaideo.content.alert import CommentAlert


VALIDATOR_BY_CONTEXT = {}


def respond_relation_validation(process, context):
    subject = context.subject
    try:
        if subject.__class__ in VALIDATOR_BY_CONTEXT:
            comment_action = VALIDATOR_BY_CONTEXT[subject.__class__]
            return comment_action.relation_validation.__func__(process, subject)
    except Exception:
        return True


def respond_roles_validation(process, context):
    subject = context.subject
    try:
        if subject.__class__ in VALIDATOR_BY_CONTEXT:
            comment_action = VALIDATOR_BY_CONTEXT[subject.__class__]
            return comment_action.roles_validation.__func__(process, subject)
    except Exception:
        return True


def respond_processsecurity_validation(process, context):
    subject = context.subject
    try:
        if subject.__class__ in VALIDATOR_BY_CONTEXT:
            comment_action = VALIDATOR_BY_CONTEXT[subject.__class__]
            return comment_action.processsecurity_validation.__func__(
                process, subject)
    except Exception:
        return True


def respond_state_validation(process, context):
    subject = context.subject
    try:
        if subject.__class__ in VALIDATOR_BY_CONTEXT:
            comment_action = VALIDATOR_BY_CONTEXT[subject.__class__]
            return comment_action.state_validation.__func__(process, subject)
    except Exception:
        return True


class Respond(InfiniteCardinality):
    title = _('Replay')
    access_controled = True
    context = IComment
    relation_validation = respond_relation_validation
    roles_validation = respond_roles_validation
    processsecurity_validation = respond_processsecurity_validation
    state_validation = respond_state_validation

    def start(self, context, request, appstruct, **kw):
        comment = appstruct['_object_data']
        context.addtoproperty('comments', comment)
        user = get_current()
        comment.setproperty('author', user)
        content = comment.subject
        author = getattr(content, 'author', None)
        root = getSite()
        localizer = request.localizer
        if author is not user and getattr(author, 'email', ''):
            alert = CommentAlert()
            root.addtoproperty('alerts', alert)
            alert.init_alert([author], [content])
            mail_template = root.get_mail_template('alert_comment')
            subject = mail_template['subject'].format(
                subject_title=content.title)
            message = mail_template['template'].format(
                recipient_title=localizer.translate(
                    _(getattr(author, 'user_title', ''))),
                recipient_first_name=getattr(author, 'first_name', author.name),
                recipient_last_name=getattr(author, 'last_name', ''),
                subject_title=content.title,
                subject_url=request.resource_url(content, "@@index"),
                novaideo_title=root.title
            )
            mailer_send(
                subject=subject,
                recipients=[author.email],
                sender=root.get_site_sender(),
                body=message)

        comment_author = getattr(context, 'author', None)
        if comment_author not in (user, author) and \
           getattr(comment_author, 'email', ''):
            alert = CommentAlert(is_respons=True)
            root.addtoproperty('alerts', alert)
            alert.init_alert([comment_author], [content])
            mail_template = root.get_mail_template('alert_respons')
            subject = mail_template['subject'].format(
                subject_title=content.title)
            message = mail_template['template'].format(
                recipient_title=localizer.translate(
                    _(getattr(comment_author, 'user_title', ''))),
                recipient_first_name=getattr(
                    comment_author, 'first_name', comment_author.name),
                recipient_last_name=getattr(comment_author, 'last_name', ''),
                subject_title=content.title,
                subject_url=request.resource_url(content, "@@index"),
                novaideo_title=root.title
            )
            mailer_send(
                subject=subject,
                recipients=[comment_author.email],
                sender=root.get_site_sender(),
                body=message)

        return {'newcontext': comment.subject}

    def redirect(self, context, request, **kw):
        return HTTPFound(request.resource_url(kw['newcontext'], '@@index'))


#TODO behaviors
