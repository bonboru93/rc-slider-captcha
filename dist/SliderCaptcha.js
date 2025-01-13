import './SliderCaptcha.css';import React, { useState, useEffect } from "react";
const SliderCaptcha = ({ onLoad, onCheck }) => {
  const [bgSrc, setBgSrc] = useState();
  const [puzzleSrc, setPuzzleSrc] = useState();
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("ready");
  const _onLoad = () => onLoad().then((r) => {
    setBgSrc(r.bgSrc);
    setPuzzleSrc(r.puzzleSrc);
  }).catch(() => {
    setBgSrc("");
    setPuzzleSrc();
  });
  useEffect(() => {
    _onLoad();
  }, []);
  const onReload = () => {
    setBgSrc();
    setPuzzleSrc();
    _onLoad();
  };
  const _onCheck = () => {
    console.log(offset);
    if (offset < 1) {
      return;
    }
    setStatus("checking");
    onCheck(offset).then(() => setStatus("ok")).catch(() => setStatus("err")).finally(() => setTimeout(() => {
      setOffset(0);
      setStatus("ready");
    }, 500));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "slider_captcha" }, /* @__PURE__ */ React.createElement("img", { src: bgSrc, className: "bg" }), /* @__PURE__ */ React.createElement("img", { src: puzzleSrc, className: "puzzle", style: { left: offset } }), /* @__PURE__ */ React.createElement("a", { className: "reload", onClick: onReload }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      max: "260",
      step: "0.1",
      style: {
        "--current-icon": `var(--${status}-icon)`,
        "--current-color": `var(--${status}-color)`,
        "--current-color-light": `var(--${status}-color-light)`
      },
      disabled: !bgSrc || status !== "ready",
      value: offset,
      onChange: (e) => setOffset(Number(e.target.value)),
      onMouseUp: _onCheck,
      onTouchEnd: _onCheck,
      onKeyDown: (e) => e.preventDefault()
    }
  ));
};
export {
  SliderCaptcha as default
};
