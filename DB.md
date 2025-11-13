**users**
| name | type | comment | Description |
|-|-|-|-|
| id | integer | primary key | Уникальный id пользователя |
| email | string | unique | Email пользователя  |
| password | string | not null | Пароль пользователя |
| name | string | | Отображаемое имя пользователя |
| role | string | | Участник, Вип, Вип+, Спонсор, Контролёр, Админка, Организатор | 
| tags | string | | Заблокирован(Ban Hummer), Ожидает подтверждения, Активирован (куплен билет), Аннулирован |
| status | string | | Прибыл, |

**tikets**
| name | type | comment | Description |
|-|-|-|-|
| id | integer | primary key | Уникальный id билета |
| user_id | int | - | id Пользователя|

**tags**
|-|-|-|-|
| user_id | int | primary key | id Пользователя|
| availability | boolean | not null | Статус прибытя true, false|
| defile | boolean | not null | Участник дефиле (true, false)|
| merch | boolean | not null | Выдан ли мерч (true, false)|