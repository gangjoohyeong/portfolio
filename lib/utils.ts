/** 조건부 클래스명을 공백으로 합칩니다. (의존성 없는 경량 cn) */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
