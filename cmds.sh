#!/usr/bin/env bash
script_dir="$(cd "$(dirname "${BASH_SOURCE:-${(%):-%N}}")"; pwd)"
cd $script_dir

function usage {
    cat <<EOF
$(basename ${0}) is a tool for your app.

Usage:
    $(basename ${0}) [command] [<options>]

Options:
    [開発側用タスク]
        upload               ソースコードをアップロード

    [Raspberry Pi用タスク]
        start                プログラムの開始
        stop                 プログラムの停止
EOF
}

case ${1} in

    upload)
        npm run build

        # 必要なリソースのみを転送
        rsync -avz \
            --exclude *.js.map \
            build tsl2561.py \
            cmds.sh package.json package-lock.json \
            pi@hack00.local:/home/pi/lights
    ;;

    start)
        pm2 start ./build/index.js --name lights-sensor
    ;;

    stop)
        pm2 stop lights-sensor
    ;;

    *)
        echo "[ERROR] Invalid subcommand '${1}'"
        usage
        exit 1
    ;;
esac
