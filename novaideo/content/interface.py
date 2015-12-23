# Copyright (c) 2014 by Ecreall under licence AGPL terms 
# avalaible on http://www.gnu.org/licenses/agpl.html 

# licence: AGPL
# author: Amen Souissi

from zope.interface import Interface

from dace.interfaces import Attribute, IUser, IEntity as IEntityO, IApplication

from pontus.interfaces import IVisualisableElement

from novaideo.utilities.data_manager import (
    interface_config,
    OBJECTTYPE,
    IMAGETYPE,
    FILETYPE,
    file_deserializer)


class IEntity(IEntityO):
    pass


class ICorrection(IEntity):
    pass


class IPresentableEntity(IEntity):
    pass


class IVote(IEntity):
    pass


class IBallotType(IEntity):
    pass


class IReport(IEntity):
    pass


class IBallot(IEntity):
    pass


class IBallotBox(IEntity):
    pass


class ICorrelableEntity(IEntity):
    pass


class ISearchableEntity(IEntity):
    pass


class IVersionableEntity(IEntity):
    pass


class IDuplicableEntity(IEntity):
    pass


class ICommentable(IEntity):
    pass


class IComment(ICommentable):
    pass


class IAmendment(ICommentable, 
                 ICorrelableEntity,
                 IPresentableEntity,
                 IDuplicableEntity,
                 ISearchableEntity):
    pass


class Iidea(ICommentable,
            IDuplicableEntity,
            IVersionableEntity,
            ISearchableEntity,
            ICorrelableEntity,
            IPresentableEntity):
    pass


class IFile(ISearchableEntity):
    pass


class ICorrelation(ICommentable):
    pass


class IInvitation(IEntity):
    pass


class IKeyword(IEntity):
    pass


class ICandidacy(IEntity):
    pass


class IToken(IEntity):
    pass


class IPerson(ISearchableEntity,
              ICorrelableEntity):
    pass


class IBaseUser(IEntity):

    first_name = Attribute('first_name')

    last_name = Attribute('last_name')

    user_title = Attribute('user_title')


@interface_config(type_id='person')
class IPerson(IVisualisableElement,
              ISearchableEntity,
              ICorrelableEntity,
              IBaseUser,
              IUser):

    picture = Attribute('picture', type=IMAGETYPE)


class IPreregistration(IBaseUser):
    pass


class IProposal(ICommentable,
                ISearchableEntity,
                ICorrelableEntity,
                IDuplicableEntity,
                IPresentableEntity):
    pass


class IWorkingGroup(IEntity):
    pass


class IWorkspace(IVisualisableElement,
                 IEntity):
    pass


class IOrganization(IEntity):
    pass


class INovaIdeoApplication(IEntity, IApplication):
    pass


class IAlert(IVisualisableElement,
             IEntity):
    pass
