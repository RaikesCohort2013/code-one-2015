from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


<<<<<<< HEAD
def loans(request):
    return render(request, 'pages/loans.html')

def retirement(request):
	return render(request, 'pages/retirement.html')
=======
def debts(request):
    return render(request, 'pages/debts.html')
>>>>>>> develop
