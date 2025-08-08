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



## [1.1.28] - 2025-07-25
### Fixed
*   className popup-routes в CustomTransitionGroup



## [1.1.29] - 2025-07-25
### Remover
*   Удален задний фон у CustomTransitionGroup при использовании isPopup



## [1.1.30] - 2025-07-25
### Added
*   Добавлена плавная анимация заднего фона CustomTransitionGroup при использовании isPopup



## [1.1.32] - 2025-07-28
### Fixed
*   Мелкие доработки



## [1.1.33] - 2025-07-30
### Changed
*   Для анимации теперь не обязательно передавать в handle значение parentRelation



## [1.1.34] - 2025-08-08
### Added
*   Добавлено событие onEnd которое отрабатывает по завершению анимации отображаемого блока

### Fixed
*   Исправлена ошибка передачи свойства duration в анимацию mode="fade" 

### Changed
*   Анимация в mode="fade" перешла в StyledComponent
