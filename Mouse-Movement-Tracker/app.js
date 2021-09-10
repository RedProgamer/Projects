const mouseMovementArea = document.querySelector('.main-space');
const innerTextValue = document.querySelector('.inner-para');


mouseMovementArea.addEventListener('mousemove', (event) => {
    console.log("Mouse entered")

    const x = event.clientX;
    const y = event.clientY;

    // console.log([x,y]);
    innerTextValue.style.backgroundColor = `rgb(${x}, ${y-100}, 100)`;
    innerTextValue.textContent = `Mouse X : ${x}, Y : ${y}`;
});

mouseMovementArea.addEventListener('mouseleave', () => {
    console.log("Mouse out");
    innerTextValue.style.backgroundColor = '#444';
    innerTextValue.textContent = `Hover Here`;
});