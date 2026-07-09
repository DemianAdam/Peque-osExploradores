$ErrorActionPreference = "Stop"

$certDir = ".cert"
$keyFile = Join-Path $certDir "key.pem"
$certFile = Join-Path $certDir "cert.pem"

function Find-OpenSSL {
    $cmd = Get-Command openssl -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    $paths = @(
        "${env:ProgramFiles}\OpenSSL\bin\openssl.exe",
        "${env:ProgramFiles}\OpenSSL-Win64\bin\openssl.exe",
        "${env:ProgramFiles}\OpenSSL-Win32\bin\openssl.exe",
        "${env:ProgramFiles(x86)}\OpenSSL\bin\openssl.exe",
        "${env:ProgramFiles(x86)}\OpenSSL-Win32\bin\openssl.exe",
        "${env:LOCALAPPDATA}\Microsoft\WinGet\Packages\ShiningLight.OpenSSL.Light_Microsoft.Winget.Source_8wekyb3d8bbwe\openssl.exe"
    )
    $found = Get-ChildItem -Path $paths -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { return $found.FullName }
    $found = Get-ChildItem -Path "${env:ProgramFiles}" -Filter "openssl.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { return $found.FullName }
    $found = Get-ChildItem -Path "${env:ProgramFiles(x86)}" -Filter "openssl.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { return $found.FullName }
    return $null
}

# 1. Check/install OpenSSL
$opensslPath = Find-OpenSSL
if (-not $opensslPath) {
    Write-Host "OpenSSL not found. Installing via winget..." -ForegroundColor Yellow
    winget install ShiningLight.OpenSSL.Light --accept-source-agreements --silent
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    $opensslPath = Find-OpenSSL
    if (-not $opensslPath) {
        Write-Host "OpenSSL was installed but could not be located automatically." -ForegroundColor Red
        Write-Host "Please add 'C:\Program Files\OpenSSL\bin' to your system PATH manually, then run 'npm run serve' again." -ForegroundColor Yellow
        pause
        exit 1
    }
    $opensslDir = Split-Path $opensslPath -Parent
    $env:Path = "$opensslDir;$env:Path"
    Write-Host "OpenSSL found at $opensslPath" -ForegroundColor Green
}

# 2. Generate SSL cert if missing
if (-not (Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir | Out-Null
}
if (-not (Test-Path $keyFile) -or -not (Test-Path $certFile)) {
    Write-Host "Generating self-signed SSL certificate..." -ForegroundColor Yellow
    & $opensslPath req -x509 -newkey rsa:4096 -keyout $keyFile -out $certFile -days 365 -nodes -subj "/CN=localhost"
    Write-Host "Certificate generated at .cert/" -ForegroundColor Green
}

# 3. Get local IP
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.1[6-9].*" -or $_.IPAddress -like "172.2[0-9].*" -or $_.IPAddress -like "172.3[0-1].*" }).IPAddress | Select-Object -First 1
if (-not $ip) {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.PrefixOrigin -eq "Dhcp" }).IPAddress | Select-Object -First 1
}
if (-not $ip) {
    Write-Host "Could not detect local IP. Using 'localhost'." -ForegroundColor Yellow
    $ip = "localhost"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Server will be available at:" -ForegroundColor Cyan
Write-Host "  https://$($ip):5173" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# 4. Start Vite with serve mode
$env:VITE_SERVE = "true"
Start-Process "https://$($ip):5173"
& npx vite --host