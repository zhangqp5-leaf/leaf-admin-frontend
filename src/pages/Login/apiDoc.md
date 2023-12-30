### 获取验证码

> 请求方式：get

> 请求地址：/api/admin/base/open/captcha

> 请求参数：

| 参数名 | 类型   | 是否必填 | 说明   |
| ------ | ------ | -------- | ------ |
| height | number | 是       | 图片高 |
| width  | number | 是       | 图片宽 |
| color  | string | 是       | 颜色   |

> 返回示例：

```json
{
  "code": 200,
  "success": true,
  "data": {
    "captchaId": "1234567890",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAACAkElEQVR4nO3dw4AQBCF4YcWgqCYCQKCQKCQKCQKCQKCQKCQKCQKCQKCQKCQKCQKC"
  },
  "msg": "操作成功"
}
```

> 返回参数说明：

| 参数名    | 类型   | 说明        |
| --------- | ------ | ----------- |
| captchaId | string | 验证码 ID   |
| image     | string | 图片 base64 |

### 登录接口

> 请求方式：post

> 请求地址：/api/admin/base/open/login

> 请求参数：

| 参数名    | 类型   | 是否必填 | 说明      |
| --------- | ------ | -------- | --------- |
| username  | string | 是       | 用户名    |
| password  | string | 是       | 密码      |
| captchaId | string | 是       | 验证码 ID |

> 返回示例：

```json
{
  "code": 200,
  "success": true,
  "data": {},
  "msg": "操作成功"
}
```

> 返回参数说明：

| 参数名 | 类型   | 说明  |
| ------ | ------ | ----- |
| token  | string | token |
