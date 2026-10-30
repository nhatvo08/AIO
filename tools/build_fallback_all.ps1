$ErrorActionPreference = "Stop"

$workspace = (Resolve-Path "$PSScriptRoot\..").Path
$fallbackPath = "$workspace\js\file-fallback.js"
$lessonsDir = "$workspace\data\lessons"

Write-Host "Assembling full fallback bundle..."

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("/**")
[void]$sb.AppendLine(" * Auto-generated Fallback Bundle for direct file:// protocol opening")
[void]$sb.AppendLine(" * When served via HTTP (npx serve / python -m http.server), native ES modules in ./js/app.js are used instead.")
[void]$sb.AppendLine(" */")
[void]$sb.AppendLine("(function() {")
[void]$sb.AppendLine("  window.__PRELOADED_LESSONS__ = {};")

# 1. Process all lesson files
$lessonFiles = Get-ChildItem -Path "$lessonsDir\*.js" | Sort-Object Name
foreach ($f in $lessonFiles) {
    $lessonId = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $raw = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    # Replace `export default {` with `window.__PRELOADED_LESSONS__['<id>'] = {`
    $converted = $raw -replace "(?m)^export\s+default\s*\{", "window.__PRELOADED_LESSONS__['$lessonId'] = {"
    [void]$sb.AppendLine($converted.Trim())
    [void]$sb.AppendLine("")
}

Write-Host "Total lessons bundled: $($lessonFiles.Count)"

# Helper function to strip imports and exports
function Process-Module([string]$filePath) {
    $raw = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    # Remove top-level imports
    $noImports = $raw -replace "(?ms)^import\s+.*?;\r?\n", ""
    # Remove export keywords
    $noExports = $noImports -replace "(?m)^export\s+(const|let|var|function|class)\s+", '$1 '
    $noDefault = $noExports -replace "(?m)^export\s+default\s+", ""
    return $noDefault.Trim()
}

# 2. Append modules
[void]$sb.AppendLine("// --- Module: curriculum.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\data\curriculum.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("// --- Module: methods.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\data\methods.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("// --- Module: storage.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\js\storage.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("// --- Module: highlighter.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\js\highlighter.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("// --- Module: widgets.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\js\widgets.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("// --- Module: app.js ---")
[void]$sb.AppendLine((Process-Module "$workspace\js\app.js"))
[void]$sb.AppendLine("")

[void]$sb.AppendLine("})();")

[System.IO.File]::WriteAllText($fallbackPath, $sb.ToString(), [System.Text.Encoding]::UTF8)

Write-Host "Successfully rebuilt file-fallback.js! Total size: " ([System.IO.FileInfo]$fallbackPath).Length "bytes"
