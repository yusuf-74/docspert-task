from django.db.models import ForeignKey, ManyToManyField, ManyToOneRel, Model, QuerySet
from rest_framework.request import Request


def query_optimizer(model: Model, request: Request) -> QuerySet:
    """
    This function is used to optimize the query by utilizing the expand query parameter to select_related and prefetch_related
    """
    expand = request.query_params.get('expand', None)
    queryset = model.objects.all()
    if expand:
        expand = expand.split(',')
        select_related_args = []
        prefetch_related_args = []
        for field in expand:
            if isinstance(model._meta.get_field(field), ManyToManyField) or isinstance(
                model._meta.get_field(field), ManyToOneRel
            ):
                prefetch_related_args.append(field)
            elif isinstance(model._meta.get_field(field), ForeignKey):
                select_related_args.append(field)
        if select_related_args:
            queryset = queryset.select_related(*select_related_args)
        if prefetch_related_args:
            queryset = queryset.prefetch_related(*prefetch_related_args)
    return queryset
