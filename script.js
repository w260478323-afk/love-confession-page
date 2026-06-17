// 这里修改告白文案。想换行可以加入 \n，例如："第一句。\n第二句。"
const loveText =
  "遇见你之后，普通的日子也开始发光。希望以后每一个平凡的瞬间，都有你在身边。";

const button = document.querySelector("#loveButton");
const message = document.querySelector("#message");
const heartLayer = document.querySelector("#heartLayer");

let hasPlayed = false;
let typingTimer = null;

button.addEventListener("click", () => {
  if (hasPlayed) return;

  hasPlayed = true;
  button.disabled = true;
  button.textContent = "正在靠近你";

  startHeartRain();
  typeMessage(loveText);
});

// 打字机效果：逐字显示上面的告白文案
function typeMessage(text) {
  clearTimeout(typingTimer);
  message.textContent = "";
  message.classList.add("show", "typing");

  let index = 0;

  function typeNextChar() {
    if (index >= text.length) {
      message.classList.remove("typing");
      button.textContent = "已经喜欢你啦";
      return;
    }

    message.textContent += text[index];
    index += 1;
    typingTimer = setTimeout(typeNextChar, 78);
  }

  typeNextChar();
}

// 爱心飘落动画：数量适中，保持柔和不花哨
function startHeartRain() {
  const totalHearts = 34;

  for (let i = 0; i < totalHearts; i += 1) {
    setTimeout(createHeart, i * 130);
  }
}

function createHeart() {
  const heart = document.createElement("span");
  const size = randomBetween(14, 28);
  const duration = randomBetween(4.5, 7.5);
  const drift = randomBetween(-70, 70);
  const rotate = randomBetween(-28, 28);

  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${randomBetween(4, 96)}vw`;
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--rotate", `${rotate}deg`);

  heartLayer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
