# -*- coding: utf8 -*-
# Copyright (c) 2014 by Ecreall under licence AGPL terms
# avalaible on http://www.gnu.org/licenses/agpl.html

# licence: AGPL
# author: Amen Souissi
from substanced.util import get_oid

from dace.util import get_obj

from novaideo.views.filter import (
    find_entities)
from novaideo.utilities.util import (
    deepcopy)
from novaideo.views.filter.util import QUERY_OPERATORS


def get_adapted_filter(folder, user):
    return {'select': ['metadata_filter',
                       'contribution_filter', 'temporal_filter',
                       'text_filter', 'other_filter']}


def get_folder_content(folder, user,
                       add_query=None,
                       **args):
    _filters = deepcopy(getattr(folder, 'filters', []))
    objects = []
    if _filters:
        query = None
        if add_query:
            query = QUERY_OPERATORS['and'](query, add_query)

        objects = find_entities(
            user=user,
            add_query=query,
            filters=_filters,
            filter_op='or',
            **args)

    oids = [get_oid(c) for c in folder.contents]
    if args:
        contents = find_entities(
            user=user,
            intersect=oids,
            **args)
        oids = contents.ids if not isinstance(contents, list) else contents

    if isinstance(objects, list):
        objects.extend([get_obj(o) for o in oids])
    else: # ResultSet
        objects.ids = list(objects.ids)
        objects.ids.extend(oids)
        objects.numids += len(oids)

    return objects
