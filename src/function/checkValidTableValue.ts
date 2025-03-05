export function checkValidTableValue(value: string) {
  /*
    숫자만 받아야 함
    - 0번 테이블 제외,
    - 숫자가 아닌 문자 타입,
    - 글자가 들어간 숫자값(진수)
  */
  const isNotValide = parseInt(value) === 0 || isNaN(parseInt(value)) || /[a-z]/i.test(value);

  return isNotValide;
}
