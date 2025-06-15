# ---- fix-merge-markers.ps1 ----
# удаляет строки-маркеры <<<<<<<, =======, >>>>>>> во всех текстовых файлах проекта

Write-Host "Поиск файлов с маркерами конфликта…"

Get-ChildItem -Path . -Recurse -File -Include *.js,*.ts,*.json,*.md,*.html |
    ForEach-Object {
        $file = $_.FullName
        $content = Get-Content $file
        if ($content -match '<<<<<<< HEAD') {
            Write-Host "  очищаю $file"
            $clean = $content | Where-Object { $_ -notmatch '^(<<<<<<<|=======|>>>>>>>)' }
            $clean | Set-Content $file -Encoding UTF8
        }
    }

Write-Host "Готово. Все маркеры убраны."
# --------------------------------
