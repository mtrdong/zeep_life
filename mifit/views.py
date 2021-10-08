from django.http import JsonResponse
from django.views import View

from mifit.mifit import MiFit


class MifitView(View):

    def post(self, request, *args, **kwargs):
        account = request.POST.get('account')
        password = request.POST.get('password')
        steps = request.POST.get('steps')
        ms = MiFit()
        try:
            res = ms.login(account, password, steps)
        except Exception as e:
            return JsonResponse({'error': str(e), 'code': 0})
        return JsonResponse({'message': res, 'code': 1})
