const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');

let arr = [];



let box = document.querySelectorAll('.box');

box.forEach((item) => {
    //  console.log(item.classList[0]);
    const obj = {
        value: Number(item.innerText),
        x: item.getBoundingClientRect().left,
        y: item.getBoundingClientRect().top,
        class:item.classList[0]
    };
    arr.push(obj);
});


async function swapAnimation(b1, b2) {
    return new Promise(resolve => {
        console.log(b1,b2);
        const x1 = b1.x;
        const y1 = b1.y;
        const x2 = b2.x;
        const y2 = b2.y;

        const style = document.createElement('style');
        style.type = 'text/css';

        

        const animation1 = 'animation1';
        const animation2 = 'animation2';

        const dynamicKeyframes = `
            @keyframes ${animation1} {
                0% {
                    top:0;
                    left:0;
                }
                25%{
                    left:50px;
                    top:${(y2 - y1)-5 / 2}px;
                    transform:translateY(-50%);
                }
                75%{
                    left:50px;
                    top:${(y2 - y1)+2 / 2}px;
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
                    top:${-(y2 - y1)+5 / 2}px;
                    transform:translateY(50%);
                }
                75%{
                    left:-50px;
                    top:${-(y2 - y1)-2 / 2}px;
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

            box1.style.animationName = animation1;
            box1.style.animationDuration = '1s';
            box1.style.animationFillMode = 'forwards';
            // box1.style.animationDelay = '0.2s';
            box1.style.animationTimingFunction = 'ease-in';

    
            box2.style.animationName = animation2;
            box2.style.animationDuration = '1s';
            box2.style.animationFillMode = 'forwards';
            // box2.style.animationDelay = '0.2s';
            box2.style.animationTimingFunction = 'ease-in-out';

      

        // Set a timeout to resolve the promise after the animation duration
        // if we did'nt use it then it will resolve the promis before the completion of animation

        setTimeout(() => {
            resolve();
        }, 1500); // Assuming the total animation duration is 3 seconds (2 seconds duration + 1 second delay)
    });
}

async function repaintList(arr){
    let content='';
     let list= document.querySelector('.container');
     arr.forEach((item)=>{
          content+= `
          <div class="box${item.value} box">${item.value}</div>
          `
     });
     list.innerHTML= content;
}


async function startSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        // console.log(i+" ");
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // console.log(arr[j], arr[j+1]);
            if(arr[j].value>arr[j+1].value){
                //  console.log(arr[j], arr[j+1]);
                  await swapAnimation(arr[j], arr[j+1]);
                //   console.log("hi after swap");
                  let box1=document.querySelector(`.${arr[j+1].class}`);
                  let box2=document.querySelector(`.${arr[j].class}`);

                  
                  let c1=document.querySelector(`.${arr[j+1].class}`).getBoundingClientRect();
                  let c2=document.querySelector(`.${arr[j].class}`).getBoundingClientRect();
                  const obj={
                    value:arr[j+1].value,
                    x:c1.x,
                    y:c1.y,
                    class:arr[j+1].class
                  }
                  const obj2={
                      value:arr[j].value,
                      x:c2.x,
                      y:c2.y,
                      class:arr[j].class
                    }
                    
                    arr[j]= obj;
                    arr[j+1]=obj2; 
                    await repaintList(arr);
                    box1.style.animation='none';
                    box2.style.animation='none';
                }
        }
    }
}

document.querySelector('.sort').onclick = startSort;

































// async function swapAnimation(b1, b2) {
//     const x1 = b1.x;
//     const y1 = b1.y;
//     const x2 = b2.x;
//     const y2 = b2.y;

//     const style = document.createElement('style');
//     style.type = 'text/css';

//     const animation1 = 'animation1';
//     const dynamicKeyframes = `
//         @keyframes ${animation1} {
//             0% {
//                 top:0;
//                 left:0;
//             }
//             50%{
//                 left:$40px;
//                 top:${(y2 - y1) / 2};
//                 transform:translateY(-50%);
//             }
//             100%{
//                 left:0;
//                 top:${y2 - y1}px;
//             }
           
//         }
//     `;

//     const animation2 = 'animation2';
//     const dynamicKeyframes2 = `
//         @keyframes ${animation2} {
//             0% {
//                 top:0;
//                 left:0;
//             }
//             50%{
//                 left:-40px;
//                 top:${-(y2 - y1) / 2};
//                 transform:translateY(50%);
//             }
//             100%{
//                 left:0;
//                 top:${-(y2 - y1)}px;
//             }
           
//         }
//     `;

//     style.appendChild(document.createTextNode(dynamicKeyframes));
//     style.appendChild(document.createTextNode(dynamicKeyframes2));


//     document.head.appendChild(style);
//     const box1= document.querySelector(`.${b1.class}`);
//     const box2= document.querySelector(`.${b2.class}`);


//     box1.style.animationName = 'animation1';
//     box1.style.animationDuration = '2s';
//     box1.style.animationFillMode = 'forwards';
//     box1.style.animationDelay = '1s';

//     box2.style.animationName = 'animation2';
//     box2.style.animationDuration = '2s';
//     box2.style.animationFillMode = 'forwards';
//     box2.style.animationDelay = '1s';
// }



// async function startSort() {
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//              if(arr[j].value>arr[j+1].value){
//                   await swapAnimation(arr[j], arr[j+1]);
//                   console.log("hi after swap");
//                   let obj={
//                     value:arr[j].value,
//                     x:arr[j].x,
//                     y:arr[j].y
//                   }
//                   arr[j]=arr[j+1];
//                   arr[j+1]=obj;
//              }
//         }
//     }
// }


// document.querySelector('.sort').onclick = startSort;







