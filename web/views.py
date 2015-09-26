from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def debts(request):
    return render(request, 'pages/debts.html')
