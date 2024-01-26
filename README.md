# exploramer

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
# $ yarn build
$ yarn start

# generate static project
$ yarn generate
```

<!-- ## Démarrer exploramer-server avant // yarn serve dans bash

## Le serveur est sur localhost:3030 -->

scp -r dist/\* benoitma@50.87.233.33:public_html/dev/exploramer
scp -r "app/exploramer Setup 1.0.0.exe" benoitma@50.87.233.33:public_html/dev/exploramer/exploramer-setup.exe
scp -r "exploramer.bat" benoitma@50.87.233.33:public_html/dev/exploramer/

#OVH
lftp -f "
open ftp.cluster051.hosting.ovh.net
user benoitx jmGqn2dRDuS6
mirror -R --only-newer --verbose --use-cache $ExcludeParams --parallel=10 --use-cache dist/ /www/dev/exploramer
bye
"
