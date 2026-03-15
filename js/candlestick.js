const canvas = document.getElementById("candlestick");
const ctx = canvas.getContext("2d");

const width = canvas.offsetWidth;
const height = canvas.offsetHeight;

const dpr = window.devicePixelRatio || 1;

canvas.width = width * dpr;
canvas.height = height * dpr;

ctx.scale(dpr, dpr);

const candleWidth = 10  ;
const gap = 6;
const step = candleWidth + gap;

const maxCandles = 50;

let candles = [];
let offset = 0;

// ===== Candle Generator =====
function generateCandle(prevClose = 200) {

  const volatility = 8;

  const mean = 200;
  const pull = (mean - prevClose) * 0.03;

  const randomMove = (Math.random() - 0.5) * volatility;

  const close = prevClose + randomMove + pull;
  const open = prevClose;

  const high = Math.max(open, close) + Math.random() * 4;
  const low = Math.min(open, close) - Math.random() * 4;

  return { open, close, high, low };
}

// ===== Seed initial candles =====
let seed = 200;

for (let i = 0; i < maxCandles; i++) {

const candle = generateCandle(seed);
candles.push(candle);

seed = candle.close;

}

// ===== Draw Chart =====
function draw() {

ctx.clearRect(0, 0, width, height);

const prices = candles.flatMap(c => [c.high, c.low]);

const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

const priceRange = maxPrice - minPrice || 1;

const padding = 20;

const scale = (height - padding) / priceRange;

candles.forEach((candle, index) => {

const x =
width - (candles.length - index) * step + offset;

const isGreen = candle.close > candle.open;

const color = isGreen ? "#16c784" : "#ea3943";

ctx.shadowBlur = 6;
ctx.shadowColor = color;
const yOpen = height - (candle.open - minPrice) * scale;
const yClose = height - (candle.close - minPrice) * scale;
const yHigh = height - (candle.high - minPrice) * scale;
const yLow = height - (candle.low - minPrice) * scale;

ctx.strokeStyle = color;
ctx.fillStyle = color;

// wick
ctx.beginPath();
ctx.moveTo(x + candleWidth / 2, yHigh);
ctx.lineTo(x + candleWidth / 2, yLow);
ctx.stroke();

// body
ctx.fillRect(
x,
Math.min(yOpen, yClose),
candleWidth,
Math.max(2, Math.abs(yClose - yOpen))
);

});
ctx.shadowBlur = 0;
}

// ===== Animation Loop =====
function animate() {

offset -= 0.6;

if (offset <= -step) {

offset = 0;

const lastClose = candles[candles.length - 1].close;

const newCandle = generateCandle(lastClose);

candles.push(newCandle);

if (candles.length > maxCandles) {
candles.shift();
}


}

draw();

requestAnimationFrame(animate);

}

animate();