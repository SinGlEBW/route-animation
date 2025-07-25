# Changelog



## [1.1.27] - 2025-07-25

### Added
*   Добавлены свойства и методы для mode="slide": 
    isPopup?: boolean
    direction: 'forward' | 'back'
    onPopup?(status: boolean) => void 

### Changed
*   При использовании isPopup компонент переноситься в body. Открытие/закрытие popup по соответствующей ссылке переданной в useRoutes. Можно скинуть ссылку с открытым    popup. 
    Если isPopup в typeAnimation 2 режима "destroy" | "no-destroy"




