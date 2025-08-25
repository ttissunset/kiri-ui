# 快速入门
依赖安装：
```bash
npm install kiri-ui-package
```
在 main.js 中引入：
```javascript
import  KiriUi from 'kiri-ui-package';
import  'kiri-ui-package/kiri-ui-package.css';

app.use(KiriUi);
```

## KiriSlideVerify 滑动验证码组件
在模板中使用：
```html
<kiri-slide-verify width="300" height="100" tolerance="3" backroundImage="url" shape="square" @success="onSuccess"></kiri-slide-verify>
```

### 属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 滑动验证码的宽度 | Number | 400 |
| height | 滑动验证码的高度 | Number | 250 |
| tolerance | 误差值 | Number | 2 |
| backroundImage | 背景图片地址 | String | "https://kirii.online/kiri/12.jpg" |
| shape | 缺口形状 | String | square |

#### 缺口形状
| 形状 | 说明 |
| --- | --- |
| square | 正方形缺口 |
| triangle | 三角形缺口 |
| pentagon | 五边形缺口 |
| hexagon | 六边形缺口 |

### 事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- | 
| success | 验证成功回调,返回是否验证成功 | isVerified | 

## KiriColorPicker 颜色选择器组件
在模板中使用：
```html
<kiri-color-picker :showColorDisplay="true" @picked="onColorPicked"></kiri-color-picker>
```
### 属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showColorDisplay | 是否显示当前颜色和选中颜色 | Boolean | true |

### 事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- | 
| picked | 选中颜色回调,返回当前选中颜色值 | color | 