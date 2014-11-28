# Copyright (c) 2014 by Ecreall under licence AGPL terms 
# avalaible on http://www.gnu.org/licenses/agpl.html 

# licence: AGPL
# author: Amen Souissi

from pyramid.view import view_config

from dace.processinstance.core import DEFAULTMAPPING_ACTIONS_VIEWS
from pontus.default_behavior import Cancel
from pontus.form import FormView
from pontus.schema import select
from pontus.view_operation import MultipleView

from novaideo.content.processes.idea_management.behaviors import  EditIdea
from novaideo.content.idea import IdeaSchema, Idea
from novaideo import _
from .compare_idea import CompareIdeaView


class EditIdeaFormView(FormView):

    title = _('Edit idea')
    schema = select(IdeaSchema(), ['intention',
                                  'title',
                                  'text',
                                  'keywords',
                                  'attached_files'])
    behaviors = [EditIdea, Cancel]
    formid = 'formeditidea'
    item_template = 'pontus:templates/subview_sample.pt'
    name = 'editIdea'

    def default_data(self):
        return self.context


class EditIdeaActionsView(MultipleView):
    title = _('Actions')
    name = 'editiactionsdea'
    template = 'novaideo:views/idea_management/templates/panel_group.pt'
    views = (CompareIdeaView,)

    def _activate(self, items):
        pass


@view_config(
    name='editidea',
    context=Idea,
    renderer='pontus:templates/view.pt',
    )
class EditIdeaView(MultipleView):
    title = _('Edit idea')
    name = 'editidea'
    item_template = 'novaideo:views/templates/subview.pt'
    template = 'pontus.dace_ui_extension:templates/sample_mergedmultipleview.pt'
    views = (EditIdeaFormView, EditIdeaActionsView)


DEFAULTMAPPING_ACTIONS_VIEWS.update({EditIdea:EditIdeaView})
