from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def retirement(request):
	return render(request, 'pages/retirement.html')


def debts(request):
    return render(request, 'pages/debts.html')
