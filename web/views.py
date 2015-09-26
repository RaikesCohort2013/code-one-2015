from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def retirement(request):
	return render(request, 'pages/retirement.html')


def investment(request):
    return render(request, 'pages/investment.html')


def debt(request):
    return render(request, 'pages/debt.html')
