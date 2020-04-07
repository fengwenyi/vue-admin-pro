<h1 align="center">
  Vue Admin Pro
</h1>

<p align="center">
  <strong>基于iView-Admin，最懂后端程序员的后台管理系统，View UI 4.0.2</strong>
</p>

Vue Admin Pro，这是一个简单的后端管理系统，适用于后端程序员写一写简单的后端管理系统，逻辑较简单，也不涉及权限只有简单的登录Token认证。

## 预览

2020，再次优化了登录页，增加了校验

![重写登录页面](./images/login-2020.png)

> 预览图 https://images.fengwenyi.com/1247653275613884417

## 目录

```
.
├── LICENSE
├── README.md   // 说明
├── cypress.json
├── images      // github图片说明
│   └── login.png // 登录图
├── package.json  // 依赖包
├── public
│   ├── favicon.png  // 浏览器图标
│   └── index.html   // 首页index代码
├── src
│   ├── App.vue     // App
│   ├── api           // 与服务器交互的接口存放位置
│   │   ├── data.js   // 数据接口示例
│   │   └── login.js  // 登录/登出 接口
│   ├── assets        // 资源 字体，图片，图标等
│   │   ├── fonts     // 字体
│   │   ├── icons     // 图标
│   │   └── images    // 图片
│   ├── components    // 组件
│   │   ├── charts
│   │   ├── common
│   │   ├── common-icon
│   │   ├── count-to
│   │   ├── cropper
│   │   ├── drag-drawer
│   │   ├── drag-list
│   │   ├── editor
│   │   ├── icons
│   │   ├── info-card
│   │   ├── login-form  // 登录表单组件
│   │   ├── main
│   │   ├── markdown
│   │   ├── parent-view
│   │   ├── paste-editor
│   │   ├── split-pane
│   │   ├── tables       // table组件
│   │   └── tree-select
│   ├── config           // 配置
│   │   └── index.js
│   ├── directive
│   │   ├── directives.js
│   │   ├── index.js
│   │   └── module
│   ├── index.less        // index的样式文件
│   ├── libs                // 库
│   │   ├── api.request.js  // api
│   │   ├── axios.js        // axios
│   │   ├── excel.js
│   │   ├── render-dom.js
│   │   ├── tools.js
│   │   └── util.js
│   ├── locale              // 国际化
│   │   ├── index.js 
│   │   └── lang            // 多语言
│   ├── main.js             // main
│   ├── mock                // 模拟后端接口
│   │   ├── data
│   │   ├── data.js         // 数据接口
│   │   ├── index.js        // index
│   │   ├── login.js        // 登录接口
│   │   └── user.js         // 用户接口
│   ├── plugin
│   │   ├── error-store
│   │   └── index.js
│   ├── router              // 路由
│   │   ├── before-close.js
│   │   ├── index.js        // 路由策略
│   │   └── routers.js      // 路由配置
│   ├── store               // 全局存储
│   │   ├── index.js        // index
│   │   └── module          // Module
│   └── view                // 前端页面
│       ├── Home            // 首页
│       ├── Login           // 登录页
│       └── Table           // 表单也示例
├── tests
│   ├── e2e
│   │   ├── plugins
│   │   ├── specs
│   │   └── support
│   └── unit
│       └── HelloWorld.spec.js
└── vue.config.js           // vue 配置
```

## 登录

路径：

```
src/api/login.js
```

内容：

```javascript
import axios from '@/libs/api.request'

/**
 * 登录
 * @param account
 * @param password
 * @returns {http.ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
export const login = (account, password) => {
  const data = {
    account,
    password
  }
  return axios.request({
    url: 'auth/login',
    method: 'post',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: data
  })
}

/**
 * 退出登录
 * @param token
 * @returns {http.ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
export const logout = (token) => {
  const data = {}
  return axios.request({
    url: 'auth/logout',
    method: 'get',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': token
    },
    data: data
  })
}

```

接口写法

```java
import com.fengwenyi.vueadminproapi.entity.Login;
import net.iutil.ApiResult;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 认证
 * @author Erwin Feng
 * @since 2019-06-08 10:21
 */
@RestController
@RequestMapping(value = "/auth",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AuthController {

    @PostMapping("/login")
    public ApiResult login(@RequestBody Login login) {
        String account = login.getAccount();
        String password = login.getPassword();
        if (StringUtils.isEmpty(account))
            return ApiResult.error().setCode(10001).setMsg("账号不能为空");
        if (StringUtils.isEmpty(password))
            return ApiResult.error().setCode(10002).setMsg("密码不能为空");
        if (!account.equals("admin"))
            return ApiResult.error().setCode(10003).setMsg("账号不存在");
        if (!password.equals("admin@1234"))
            return ApiResult.error().setCode(10004).setMsg("密码不正确");
        Map<String, String> map = new HashMap<>();
        map.put("token", UUID.randomUUID().toString());
        map.put("uid", UUID.randomUUID().toString());
        return ApiResult.success(map);
    }

    @GetMapping("/logout")
    public ApiResult logout(@RequestHeader String token) {
        return ApiResult.success();
    }

}
```

## 接口示例

[vue-admin-pro-api](https://github.com/fengwenyi/vue-admin-pro-api)

## token

token格式推荐：`uid_token`

在API请求的时候如何携带发起请求？

如下示例：

```javascript
import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const data = (d1, d2) => {
  const data = {
    d1,
    d2
  }
  return axios.request({
    url: 'auth/login',
    method: 'post',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': getToken()
    },
    data: data
  })
}
```

## API请求

重新封装API接口请求

[sess request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)


示例

```javascript
import request from '@/libs/request'

export function apiDataTest (data) {
  const param = JSON.stringify(data)
  return request({
    url: '/data/test',
    method: 'post',
    data: param
  })
}
```

配置：

```javascript
export default {
  // ...
  /**
   * 接口请求配置
   */
  api: {
    /**
     * header配置
     */
    header: {
      /**
       * 是否携带token(当token存在时)
       */
      token: true,
      /**
       * 自定义token key
       */
      tokenKey: 'token',
      /**
       * 是否采用JSON方式提交
       */
      json: true
    }
  }
}
```

接口示例代码：

[DataController.java](https://github.com/fengwenyi/vue-admin-pro-api/blob/master/src/main/java/com/fengwenyi/vueadminproapi/controller/DataController.java)

```java
package com.fengwenyi.vueadminproapi.controller;

import lombok.extern.slf4j.Slf4j;
import net.iutil.ApiResult;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author Erwin Feng
 * @since 2019-07-29 09:31
 */
@Slf4j
@RestController
@RequestMapping(value = "/data",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class DataController {

    @PostMapping("/test")
    public ApiResult test(@RequestHeader String token, @RequestBody Object data) {
        log.info("token: {}", token);
        log.info("data: {}", data);
        return ApiResult.success("这是服务响应的数据-test");
    }

}
```

