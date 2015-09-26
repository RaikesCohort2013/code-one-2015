from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def loans(request):
    return render(request, 'pages/loans.html')
