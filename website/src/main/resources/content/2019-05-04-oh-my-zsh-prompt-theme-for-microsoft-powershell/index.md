---
date: 2019-05-04
title: Oh My Zsh prompt theme for Windows Powershell!
slug: /windows-powershell-oh-my-zsh
tags:
  - snippets
  - windows
---

I do most of my programming in my mac these days, but once in a while my gaming desktop becomes the testground for some code bashing. Since I use git on the terminal, on windows I use powershell instead of a sweet zsh shell.

Working with powershell is not that bad, but I terribly miss not having the git branches on my prompt. Since I really enjoy the [Oh My Zsh](https://ohmyz.sh/) theme on my Mac, here’s a snippet that changes your power shell prompt!

```powershell
function prompt {
\$ESC = [char]27

$p = Split-Path -leaf -path (Get-Location)
  $branch = $(git symbolic-ref -q HEAD) -replace "refs/heads/"
  if ($branch) {
$branch = "$ESC[34mgit:($ESC[0m$ESC[31m$branch$ESC[0m$ESC[34m)$ESC[0m "
}

"$ESC[1m$ESC[32m$([char]0x279C)$ESC[0m $ESC[36m$p$ESC[0m $branch\$ESC[0m"
}
```

This code lands in the `$profile` file, which probably needs to be created:

```powershell
new-item -itemtype file -path $profile -force
notepad $PROFILE
```

Notepad should open up and you can copy paste the snipped there!
