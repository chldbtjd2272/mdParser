#!/bin/bash

BASHRC=~/.bashrc
ZSHRC=~/.zshrc
PWD_DIR=`pwd`
ALIAS_MD="alias md"

npm install

make_alias_setting(){
    echo "info : $1 exist"
    echo "info : PWD = node $PWD_DIR/app.js"
    if [[ -z `grep "$ALIAS_MD" $1` ]]
    then 
        echo "info : md alias를 추가합니다."
        echo "alias md='node $PWD_DIR/app.js'" >> $1
        source $1
    else 
        echo "warn : md alias가 이미 존재합니다."
    fi
}

if [ -f "$ZSHRC" ]
then
    make_alias_setting $ZSHRC

elif [ -f "$BASHRC" ]
then
    make_alias_setting $BASHRC

else
    echo "don't find ~/.bashrc or ~/.zshrc please make someone"
    echo "=== make some one by using one of those commands"
    echo "touch ~/.bashrc touch ~/.zshrc"
fi



