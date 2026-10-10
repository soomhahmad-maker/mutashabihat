@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "GH=C:\Program Files\GitHub CLI\gh.exe"
set "GIT=C:\Program Files\Git\bin\git.exe"

echo ============================================
echo  نشر موقع المتشابهات على GitHub Pages
echo ============================================

"%GH%" auth status >nul 2>&1
if errorlevel 1 (
  echo [1/4] سجل الدخول الى GitHub من المتصفح...
  "%GH%" auth login
) else (
  echo [1/4] تم التحقق من تسجيل الدخول ✓
)

echo [2/4] انشاء المستودع ورفع الملفات...
"%GH%" repo create mutashabihat --public --source=. --push --remote=origin
if errorlevel 1 (
  echo المستودع موجود مسبقا - سادفع التحديثات...
  "%GIT%" push -u origin main
)

echo [3/4] تفعيل GitHub Pages...
for /f "delims=" %%U in ('"%GH%" api user -q .login') do set "OWNER=%%U"
"%GH%" api "repos/%OWNER%/mutashabihat/pages" -X POST -f source[branch]=main -f source[path]=/ --silent >nul 2>&1

echo [4/4] تم! ✓
echo.
echo موقعك سيكون متاحا خلال دقيقة على:
echo https://%OWNER%.github.io/mutashabihat/
echo.
pause
