npm -g list --depth 0
npm link route-animation

Можно перейти в dist папку и набрать npm link <имя библиотеки указанной в package.josn>
npm unlink route-animation
npm -g rm route-animation удалить из node_modules 

# "prepack": "json -f package.json -I -e \"delete this.devDependencies; delete this.dependencies\"",

https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma


<!--
   Для использования своей библиотеки в локальном пространстве перед выгрузкой в npm использовать yalc

  
 -->
- Установка
```cmd 
    npm install -g yalc
```
- Опубликуйте свой пакет. Перейдите в каталог своего пакета и запустите:
```cmd
    yalc publish 
```
- Добавьте свой пакет в проект. В потребляющем проекте выполните:
```cmd
   yalc add <package-name> 
```
- Push Updates После внесения изменений в пакет, отправьте обновления с помощью:
```cmd
   yalc push 
```

- Удалить после завершения. После завершения тестирования удалите пакет:
```cmd
    yalc remove <package-name>
    npm install    
```

Синхронизируйте версии Yalc: убедитесь, что все члены команды используют одну и ту же версию Yalc, чтобы избежать несоответств