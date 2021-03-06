# -*- coding: utf8 -*-
# Copyright (c) 2017 by Ecreall under licence AGPL terms
# available on http://www.gnu.org/licenses/agpl.html

# licence: AGPL
# author: Amen Souissi

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from pyramid.renderers import get_renderer

from dace.util import getSite
from dace.processinstance.core import DEFAULTMAPPING_ACTIONS_VIEWS
from pontus.view import BasicView, ViewError

from novaideo import _
from novaideo.connectors.core import YAMMER_CONNECTOR_ID
from novaideo.connectors.yammer.content.behaviors import LogIn
from novaideo.content.novaideo_application import NovaIdeoApplication
from novaideo.utilities.util import generate_navbars
from novaideo.connectors.core import CONNECTOR_PROCESSES


@view_config(
    name='yammerlogin',
    context=NovaIdeoApplication,
    renderer='pontus:templates/views_templates/grid.pt',
    )
class LoginView(BasicView):
    title = _('Log in')
    name = 'login'
    behaviors = [LogIn]
    template = 'novaideo:views/user_management/templates/login.pt'
    wrapper_template = 'pontus:templates/views_templates/simple_view_wrapper.pt'
    viewid = 'login'

    def update(self):
        code = self.params('code')
        error = self.params('error')
        message = None
        messages = {}
        request = self.request
        root = getSite()
        yammer_connectors = list(root.get_connectors(YAMMER_CONNECTOR_ID))
        yammer_connector = yammer_connectors[0] if yammer_connectors else None
        login_url = request.resource_url(request.context, 'login')
        login_url2 = request.resource_url(request.context, '@@login')
        referrer = self.params('came_from')
        if not referrer:
            referrer = request.path_url

        if '/auditstream-sse' in referrer:
            return HTTPForbidden()

        if login_url in referrer or login_url2 in referrer:
            # never use the login form itself as came_from
            referrer = request.resource_url(root)

        came_from = request.session.setdefault(
            'novaideo.came_from', referrer)
        error_message = _("Failed login")
        if yammer_connector and code:
            trusted_networks = getattr(yammer_connector, 'networks', [])
            source_data, user_data = yammer_connector.extract_data(code)
            if not trusted_networks or \
               any(n in trusted_networks for n in source_data['network_domains']):
                result = self.execute({
                    'source_data': source_data,
                    'user_data': user_data,
                    'came_from': came_from
                })
                if result[0].get('logged', False):
                    return result[0].get('redirect')

            elif trusted_networks:
                error_message = _("You don't have the right to login with this account.")

            error = True

        if error:
            error = ViewError()
            error.principalmessage = error_message
            message = error.render_message(request)
            messages.update({error.type: [message]})
            self.finished_successfully = False

        # Pass this through FBO views (e.g., forbidden) which use its macros.
        template = get_renderer(
            'novaideo:views/user_management/templates/login.pt').implementation()
        login_bodies = []
        try:
            login_navbars = generate_navbars(
                request, request.root,
                process_id=CONNECTOR_PROCESSES,
                node_id='login',
                descriminators=['body-action'])
            login_bodies = login_navbars['body_actions']
        except Exception:
            pass

        values = dict(
            url=request.resource_url(request.virtual_root, 'login'),
            came_from=came_from,
            login='',
            password='',
            login_template=template,
            logins=login_bodies
            )
        body = self.content(args=values, template=self.template)['body']
        item = self.adapt_item(body, self.viewid)
        item['messages'] = messages
        result = {}
        result['coordinates'] = {self.coordinates: [item]}
        return result


DEFAULTMAPPING_ACTIONS_VIEWS.update(
    {LogIn: LoginView})
