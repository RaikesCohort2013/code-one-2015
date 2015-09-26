from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def student_loans(request):
    return render(request, 'pages/student-loans.html')
