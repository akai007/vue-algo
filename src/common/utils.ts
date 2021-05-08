
export function sleep(delay: number = 1): Promise<number> {
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(delay);
    }, delay * 200)
  })
}

let doing = false;
export const stepInterval = function(f: Function, delay: number = 1) {
  return async function inner(data: any) {
    if ( doing ) {
      await sleep(0.2);
      inner(data);
    } else {
      doing = true;
      await sleep(delay);
      f(data);
      doing = false;
    }
  }
}


export function isPhone() {
	let result = window.matchMedia('(max-width: 768px)');
	return Boolean(result.matches);
}