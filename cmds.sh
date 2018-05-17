#!/usr/bin/env bash
script_dir="$(cd "$(dirname "${BASH_SOURCE:-${(%):-%N}}")"; pwd)"
cd $script_dir

function usage {
    cat <<EOF
$(basename ${0}) is a tool for your app.

Usage:
    $(basename ${0}) [command] [<options>]

Options:
    upload               ラズパイにソースコードをアップロード
    start                ラズパイ上で実行
EOF
}

case ${1} in

    upload)
        npm run build
        rsync -avz \
            --delete \
            --exclude /.git \
            --exclude /.gitignore \
            --exclude /src \
            --exclude /node_modules \
            ./ pi@hack00.local:/home/pi/lights
    ;;

    start)
        pm2 start ./build/index.js
    ;;

    *)
        echo "[ERROR] Invalid subcommand '${1}'"
        usage
        exit 1
    ;;
esac
