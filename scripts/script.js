let arr = [];
let box = document.querySelectorAll(".box");

box.forEach((item) => {
    const obj = {
        value: Number(item.innerText),
        x: item.getBoundingClientRect().left,
        y: item.getBoundingClientRect().top,
        class: item.classList[0],
    };
    arr.push(obj);
});

async function swapAnimation(b1, b2) {
    return new Promise((resolve) => {
        const x1 = b1.x;
        const y1 = b1.y;
        const x2 = b2.x;
        const y2 = b2.y;

        const style = document.createElement("style");
        style.type = "text/css";

        const animation1 = "animation1";
        const animation2 = "animation2";

        const dynamicKeyframes = `
            @keyframes ${animation1} {
                0% {
                    top:0;
                    left:0;
                }
                25%{
                    left:50px;
                    top:${y2 - y1 - 5 / 2}px;
                    transform:translateY(-50%);
                }
                75%{
                    left:50px;
                    top:${y2 - y1 + 2 / 2}px;
                }
                100%{
                    left:0;
                    top:${y2 - y1}px;
                }
            }

            @keyframes ${animation2} {
                0% {
                    top:0;
                    left:0;
                }
                25%{
                    left:-50px;
                    top:${-(y2 - y1) + 5 / 2}px;
                    transform:translateY(50%);
                }
                75%{
                    left:-50px;
                    top:${-(y2 - y1) - 2 / 2}px;
                    transform:translateY(50%);
                }
                100%{
                    left:0;
                    top:${-(y2 - y1)}px;
                }
            }
        `;

        style.appendChild(document.createTextNode(dynamicKeyframes));
        document.head.appendChild(style);
        const box1 = document.querySelector(`.${b1.class}`);
        const box2 = document.querySelector(`.${b2.class}`);

        // Apply animation to both boxes
        box1.style.animationName = animation1;
        box1.style.animationDuration = "1s";
        box1.style.animationFillMode = "forwards";
        box1.style.animationTimingFunction = "ease-in-out";

        box2.style.animationName = animation2;
        box2.style.animationDuration = "1s";
        box2.style.animationFillMode = "forwards";
        box2.style.animationTimingFunction = "ease-in-out";

        setTimeout(() => {
            resolve();
        }, 1500);
    });
}


async function repaintList(arr, i, j) {
    let contentIt = "";
    let contentScreen = "";
    let list = document.querySelector(".screen");
    let it = document.querySelector(".it-parent");

    contentIt = `
            <div class="it">
            i <span class="it-val">${i}</span>
        </div>
        <div class="it">
            j <span class="it-val">${j}</span>
        </div>
    `

    arr.forEach((item) => {
        contentScreen += `
          <div class="box${item.value} box">${item.value}</div>
          `;
    });
    it.innerHTML = contentIt;
    list.innerHTML = contentScreen;
}

async function startSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        // console.log(i+" ");
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // console.log(arr[j], arr[j+1]);
            if (arr[j].value > arr[j + 1].value) {
                //  console.log(arr[j], arr[j+1]);
                await swapAnimation(arr[j], arr[j + 1]);
                //   console.log("hi after swap");
                let box1 = document.querySelector(`.${arr[j + 1].class}`);
                let box2 = document.querySelector(`.${arr[j].class}`);


                let c1 = document.querySelector(`.${arr[j + 1].class}`).getBoundingClientRect();
                let c2 = document.querySelector(`.${arr[j].class}`).getBoundingClientRect();
                const obj = {
                    value: arr[j + 1].value,
                    x: c1.x,
                    y: c1.y,
                    class: arr[j + 1].class
                }
                const obj2 = {
                    value: arr[j].value,
                    x: c2.x,
                    y: c2.y,
                    class: arr[j].class
                }

                arr[j] = obj;
                arr[j + 1] = obj2;
                await repaintList(arr, i, j);
                box1.style.animation = 'none';
                box2.style.animation = 'none';
            }
        }
    }
}




document.querySelector(".sort").onclick = startSort;
