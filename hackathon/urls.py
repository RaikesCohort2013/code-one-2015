from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from web import views


urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index),
    url(r'^retirement/$', views.retirement),
    url(r'^investment/$', views.investment),
    url(r'^debt/$', views.debt)
)
