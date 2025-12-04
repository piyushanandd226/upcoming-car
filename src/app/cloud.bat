ECHO OFF
CLS
set INSTALL_PATH=c:\Users\Public\Cloud SDK
set PROXY=http://z029198:1428Pado@cosmos-vip.intra.renault.fr:3128

set HTTPS_PROXY=%PROXY%
set HTTP_PROXY=%PROXY%
set https_proxy=%PROXY%
set http_proxy=%PROXY%

set no_proxy=127.0.0.1,localhost

set CLOUDSDK_PROXY_USERNAME=z029198

set CLOUDSDK_PROXY_PASSWORD=1428Pado

set PATH=%INSTALL_PATH%\google-cloud-sdk\bin;%PATH%
cd %INSTALL_PATH%
@echo Welcome to the Google Cloud SDK! Run "gcloud -h" to get the list of available commands.
cmd /k
PAUSE