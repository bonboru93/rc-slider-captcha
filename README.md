# rc-slider-captcha

一个用于实现滑动验证码的 React 组件，用户通过滑动拼图来完成身份验证。

## 安装

```bash
npm install @bonboru93/rc-slider-captcha
```

## 示例

```jsx
import SliderCaptcha from "@bonboru93/rc-slider-captcha";

const App = () => {
  const handleLoad = async () => {
    // 返回背景图和拼图的 URL
    return {
      bgSrc: "https://example.com/bg.jpg",
      puzzleSrc: "https://example.com/puzzle.png",
    };
  };

  const handleCheck = async offset => {
    // 校验偏移量，如果有效则 resolve，无效则 reject
    if (offset === 42) {
      return; // 偏移量正确
    } else {
      throw new Error("偏移量无效");
    }
  };

  return (
    <div>
      <h1>滑动验证码示例</h1>
      <SliderCaptcha onLoad={handleLoad} onCheck={handleCheck} />
    </div>
  );
};

export default App;
```

## 图片要求

背景图显示大小为320x160，拼图高度与背景图相同，宽度为60。

请提供等比例图片，源码中有示例图。

## 属性说明

| 属性       | 类型                                      | 必填 | 说明                                                         |
|------------|------------------------------------------|------|------------------------------------------------------------|
| `onLoad`   | `() => Promise<{ bgSrc: string; puzzleSrc: string }>` | 是   | 加载背景图和拼图图像的 URL。                  |
| `onCheck`  | `(offset: number) => Promise<void>`       | 是   | 校验滑块偏移量。成功时 resolve，失败时 reject。|

## 原理

滑动条本质是input[type="range"]。样式基于-webkit-slider-thumb和-moz-range-thumb实现，代码极其简单。

如有兼容性问题，请提issue。