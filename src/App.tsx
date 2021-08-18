import React, { useRef, useEffect } from 'react';
import { localeMap } from "./utility";
import './App.css';

// const displayFont = "14px 'Segoe UI', system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
const feedLocaleMap = localeMap; // map of supported languages
const displayName = "Tushar Pahuja";
const fontFamily = "'Segoe UI', system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
// const devicePixelRatio = ;
const devicePixelRatio = window.devicePixelRatio;
console.log(">>devicePixelRatio", devicePixelRatio);
const fontStyles = [`${14*devicePixelRatio}px ` + fontFamily, `${63.67*devicePixelRatio}px ` + fontFamily, `bold ${14*devicePixelRatio}px ` + fontFamily];

const translateMap = () => {
  for (var locale in feedLocaleMap) {
    feedLocaleMap[locale] = feedLocaleMap[locale].replace("{{displayName}}", displayName);
  }
}

const getRenderedTextWidth = (font: string, text: string) => {
  var element = document.createElement("span");
  element.style.cssText = "position: absolute; display: inline-block; float: left; visibility: hidden; white-space: nowrap;font: " + font;
  element.textContent = text;

  document.body.appendChild(element);
  let textWidth = element.getBoundingClientRect().width;

  element.remove();
  return textWidth;
}

function App() {

  translateMap();
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    var ctx = canvasRef.current?.getContext("2d");
    for (var index in fontStyles) {
      ctx.font = fontStyles[index];
      console.log(">>currFont", fontStyles[index]);
      // var output = [];
      for (var locale in feedLocaleMap) {
        var text = feedLocaleMap[locale];

        var canvasWidth = ctx.measureText(text).width; // width before rendering
        var renderedWidth = getRenderedTextWidth(fontStyles[index], text); // width after rendering text in DOM
        var delta = renderedWidth - canvasWidth;

        // output.push([locale, canvasWidth, delta]);
        console.log("%s: %s", locale, text);
        console.log(canvasWidth, delta);        

        // Web Page UI
        // ctx.font = fontStyles[0];
        // ctx.fillText("font:  " + fontStyles[0], 10, 50);
        // ctx.fillText("text:  " + text, 10, 80);
        // ctx.fillText("canvasWidth:  " + canvasWidth, 10, 110);
        // ctx.fillText("renderedWidth:  " + renderedWidth, 10, 140);
        // ctx.fillText("delta:  " + delta, 10, 170);
      }
      // console.table(output);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="myCanvas"
      // width="700"
      // height="250"
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
}

export default App;
