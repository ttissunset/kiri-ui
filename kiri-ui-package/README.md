# KiriVerify 滑动验证码

## 快速入门
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
在模板中使用：
```html
<kiri-verify width="300" height="100" tolerance="3" backroundImage="url" @success="onSuccess"></kiri-verify>
```

### 属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 滑动验证码的宽度 | Number | 300 |
| height | 滑动验证码的高度 | Number | 100 |
| tolerance | 误差值 | Number | 3 |
| backroundImage | 背景图片地址 | String | 无 |
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


