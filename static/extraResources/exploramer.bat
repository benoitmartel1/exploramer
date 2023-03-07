@echo off
title exploramer
taskkill /f /im explorer.exe
%LocalAppData%\Programs\exploramer\exploramer.exe
start explorer.exe