# -*- coding: utf8 -*-
import deform
from zope.interface import invariant
from pyramid.view import view_config

from dace.processinstance.core import DEFAULTMAPPING_ACTIONS_VIEWS

from novaideo.content.processes.proposal_management.behaviors import  CompareProposal
from novaideo.content.proposal import Proposal
from novaideo import _
from novaideo.views.idea_management.compare_idea import  CompareIdeaFormView, CompareIdeaView, DiffView as DiffViewIdea


class DiffView(DiffViewIdea):
    template = 'novaideo:views/proposal_management/templates/diff_result.pt'
    validators = [CompareProposal.get_validator()]
    

class CompareProposalFormView(CompareIdeaFormView):

    title = _('Compare proposal form')
    behaviors = [CompareProposal]
    formid = 'formcompareproposal'
    name='compareproposalform'

    def before_update(self):
        formwidget = deform.widget.FormWidget(css_class='compareform')
        formwidget.template = 'novaideo:views/templates/ajax_form.pt'
        self.schema.widget = formwidget
        view_name = 'compareproposal'
        formwidget.ajax_url = self.request.resource_url(self.context, '@@'+view_name)


@view_config(
    name='compareproposal',
    context=Proposal,
    renderer='pontus:templates/view.pt',
    )
class CompareProposalView(CompareIdeaView):
    title = _('Compare the proposal')
    name='compareproposal'
    views = (CompareProposalFormView, DiffView)


DEFAULTMAPPING_ACTIONS_VIEWS.update({CompareProposal:CompareProposalView})
