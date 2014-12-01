# Copyright (c) 2014 by Ecreall under licence AGPL terms 
# avalaible on http://www.gnu.org/licenses/agpl.html 

# licence: AGPL
# author: Amen Souissi

from pyramid.view import view_config

from dace.processinstance.core import DEFAULTMAPPING_ACTIONS_VIEWS
from pontus.view import BasicView

from novaideo.content.processes.user_management.behaviors import  Activate
from novaideo.content.person import Person
from novaideo import _


@view_config(
    name='activate',
    context=Person,
    renderer='pontus:templates/view.pt',
    )
class ActivateView(BasicView):
    title = _('Activate the member')
    name = 'activate'
    behaviors = [Activate]
    viewid = 'activateview'


    def update(self):
        self.execute(None)        
        return list(self.behaviorinstances.values())[0].redirect(
                                       self.context, self.request)


DEFAULTMAPPING_ACTIONS_VIEWS.update({Activate:ActivateView})