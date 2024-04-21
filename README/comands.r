npm -g list --depth 0
npm link route-animation

Можно перейти в dist папку и набрать npm link <имя библиотеки указанной в package.josn>
npm unlink route-animation
npm -g rm route-animation удалить из node_modules 

# "prepack": "json -f package.json -I -e \"delete this.devDependencies; delete this.dependencies\"",

https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
