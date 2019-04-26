const makeBigger = () => {
   document.querySelector('.content').style.fontSize = '40px';

};

const makeSmaller = () => {
  document.querySelector('.content').style.fontSize = '10px';
};


document.querySelector('nav .a1').onclick = makeBigger;
document.querySelector('nav .a2').onclick = makeSmaller;
