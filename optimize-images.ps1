# Image Optimization Script
# Bu script büyük resim dosyalarını optimize eder

Write-Host "Starting image optimization..." -ForegroundColor Green

# Define paths
$imageDir = "d:\projeler\sftw\assets\img"
$backupDir = "d:\projeler\sftw\assets\img\backup"

# Create backup directory if it doesn't exist
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Yellow
}

# Get large image files (>1MB)
$largeImages = Get-ChildItem -Path $imageDir -Recurse -File | Where-Object { 
    $_.Length -gt 1MB -and $_.Extension -match '\.(jpg|jpeg|png|gif)$' 
} | Sort-Object Length -Descending

Write-Host "Found $($largeImages.Count) large image files to optimize:" -ForegroundColor Cyan

foreach ($image in $largeImages) {
    $sizeKB = [math]::Round($image.Length / 1KB, 2)
    Write-Host "  - $($image.Name): ${sizeKB}KB" -ForegroundColor White
    
    # Backup original
    $backupPath = Join-Path $backupDir $image.Name
    if (!(Test-Path $backupPath)) {
        Copy-Item $image.FullName $backupPath -Force
        Write-Host "    Backed up to: $backupPath" -ForegroundColor Gray
    }
}

Write-Host "`nImage analysis complete. Manual optimization recommendations:" -ForegroundColor Green
Write-Host "1. Use online tools like TinyPNG, Squoosh, or ImageOptim to compress images" -ForegroundColor Yellow
Write-Host "2. Convert large JPEGs to WebP format for better compression" -ForegroundColor Yellow
Write-Host "3. Resize images to actual display dimensions" -ForegroundColor Yellow
Write-Host "4. Use lazy loading for images below the fold" -ForegroundColor Yellow

# Generate optimization report
$reportPath = "d:\projeler\sftw\image-optimization-report.txt"
$largeImages | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}}, FullName | 
    Format-Table -AutoSize | Out-File $reportPath -Encoding UTF8

Write-Host "`nOptimization report saved to: $reportPath" -ForegroundColor Green