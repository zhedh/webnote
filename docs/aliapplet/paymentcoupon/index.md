# 支付宝小程序支付券开发

## 一、开发前准备

- 成员管理 @管理员
  - 设置开发者权限
  - 设置体验版权限
- 开发设置 @开发
  - 服务器域名白名单配置
  - H5 域名白名单
  - 应用网关（支付宝异步消息回掉）@后端
  - 可调用产品 API
    - 配置支付券接口权限
  - 接口内容加密（调用小程序 API 必需）@后端
- 小程序隐私政策 @产品运营
  - 用户昵称
  - 用户头像
  - 用户手机号
  - 地理位置
  - 剪贴板
  - 相册（访问）
  - 相册（保存）
- 支付宝备案 @产品运营

## 二、支付宝小程序对接

### 授权登录

[文档地址](https://opendocs.alipay.com/mini/05dxgc?pathHash=1a3ecb13)

流程：

- 调用 my.getAuthCode 获取 authCode [文档](https://opendocs.alipay.com/mini/api/openapi-authorize?pathHash=22642781)
- 使用 authCode 调用业务服务端接口换取用户基础信息 [文档](https://opendocs.alipay.com/mini/05dxgc?pathHash=1a3ecb13)
- 服务端根据 scope 类型返回用户基础数据

接口开发：

- 静默授权。根据 code 获取用户 open_id、user_id
- 用户授权。根据 code 获取用户 open_id、user_id 等，再调用支付宝 API 获取昵称头像和手机号等信息。

注意事项：

- 静默授权只能获取 open_id
- 用户授权需要隐私申请，开通获取会员信息权限

### 获取 unionid

[文档地址](https://opendocs.alipay.com/common/0ai2i8)

unionid 数据互通配置完善后再静默授权或者用户授权中返回

### 获取用户手机号

[文档地址](https://opendocs.alipay.com/mini/api?pathHash=5b4d0c83)

获取手机号之前需要用户授权完成。

调用方式：

- button 组件
- 支付宝 API

接口开发：

- 手机号密文解密

注意事项：

- 仅支持企业小程序、不支持个人小程序
- 需配置接口内容加密
- 需要服务端解密

### 获取用户当前位置信息

[文档地址](https://opendocs.alipay.com/mini/api/mkxuqd)

注意事项：

- 位置类接口仅对符合要求的小程序主营行业开放，[开放类目](https://opendocs.alipay.com/mini/0aarei?pathHash=680a85bd)
- 需申请位置接口调用

### 打开支付宝卡包

- 显示优惠券列表
- 显示商家券
- 打开券详情

注意事项：

- 目前没有限制条件

### 小程序领券插件

[领券组件插件接入流程](https://opendocs.alipay.com/open/08bcgx?pathHash=27680edd)

支持发放支付券和商家券

接口开发：

- 活动领取咨询接口
- 领券成功通知服务端接口（如有需要）

注意事项：

- 完成商家注册后校验通过接入检测
- 正式领券前需要提前调用活动领取咨询接口

### 支付宝小程序码

[文档](https://opendocs.alipay.com/mini/03l9b8)

## 二、支付宝小程序服务端对接

接口请求通用 header 参数

| 参数名称 | 类型   | 是否必须 | 默认值 | 备注                   |
| :------- | :----- | :------- | :----- | ---------------------- |
| App-Id   | string | 是       |        | 小程序 APP_ID          |
| Brand-Id | string | 是       |        | 品牌 ID                |
| Union-Id | string | 否       |        | 开放平台下用户唯一标识 |
| Open-Id  | string | 否       |        | 小程序用户唯一标识     |
