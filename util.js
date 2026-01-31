function getRandomValue(array){
    const randomIdx = Math.floor(Math.random() * array.length);
    return array[randomIdx]
}

export function doSomeHeavyTask(){
    const ms = getRandomValue([100, 150, 200, 250, 300, 350, 600, 500, 1000, 2500]);
    const throwError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8, 9]) === 8;
    if(throwError){
        const randomError = getRandomValue([
            "DB failure", 
            "Payment failure", 
            "Access Denied"
        ])
        throw new Error(throwError);
    }
    return new Promise((resolve, reject) => setTimeout(()=> resolve(ms)))
}