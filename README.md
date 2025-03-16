# 반가워요, QR 오더 앱이에요 👋

QR 오더 앱은 [QR-order-customer](https://github.com/inseong01/QR-order-customer) 프로젝트에서 확장된 프로젝트예요.

`React Native` 웹뷰를 도입해서 더더욱 모바일적으로 변했어요.

지금부터 QR-ORDER 주문 서비스가 어떻게 변했는지 알려드릴게요.

## 더이상 주소창이 보이지 않아요!

이전 프로젝트에서는 주소 변경으로  
사용자가 다른 페이지로 이동할 수 있어서 골치 아픈 문제였어요.

하지만 웹뷰 특성으로  
주소창을 표시하지 않게 되었어요.

사용자 시나리오가 제한된 만큼  
더 쾌적한 앱 사용환경을 제공할 수 있게 되었답니다.

## 앱 사용 장면을 가져와봤어요 📷

### 앱 시작 및 주문하기

<img src='./docs/src/gif/qr_order_mobile-orderProcess_1.gif' width='45%'>

### 카테고리 이동

<img src='./docs/src/gif/qr_order_mobile-categoryMove_1.gif' width='45%'>

### 외부 앱 연결 및 앱 종료

<img src='./docs/src/gif/qr_order_mobile-rootPage_1.gif' width='45%'>

## 어떻게 개발했는지, 그 과정을 공개할게요 🙂

해당 주제를 클릭하면 [개발 블로그](https://inseong1204.tistory.com/category/%EA%B0%9C%EB%B0%9C%20%EB%AC%B8%EC%84%9C%3A%20FrontEnd)로 연결되도록 설정했어요.

먼저, 웹뷰 도입하게 된 계기를 알려드릴게요.

[QR-ORDER 고객 주문 서비스, 웹뷰 도입기](https://inseong1204.tistory.com/130)

다음으로는 `React Native` 개발 환경을  
설정한 과정과 마주쳤던 이슈를 간략하게 담았어요.

[Next.js, 웹뷰 도입 과정(1) - Expo 설치](https://inseong1204.tistory.com/127)  
[Next.js 웹뷰 도입 과정(2) - 디버그 환경 구축](https://inseong1204.tistory.com/128)  
[Next.js, 웹뷰 도입 과정(3) - 오류 해결 목록](https://inseong1204.tistory.com/129)

마지막으로 기능 구현 과정에 대해서 알려드릴게요.

[QR-ORDER 고객 주문 서비스, 웹뷰 기능 구현(1) - 외부 링크 연결, 쿠키 연동](https://inseong1204.tistory.com/131)  
[QR-ORDER 고객 주문 서비스, 웹뷰 기능 구현(2) - 더블 클릭 종료, 뒤로 가기](https://inseong1204.tistory.com/132)

## 앱을 보여드리지 못해서 아쉬워요 😢

다른 방법으로 체험할 수 있도록  
[QR 오더 웹 전용 링크](https://qr-order-client.vercel.app/1)를 준비했어요.

PC에서 문서를 읽고 계신다면,  
아래 QR 코드를 스마트폰으로 스캔해서 접속할 수 있어요.

![1번 테이블](./docs/src/img/table-1-QRcode.png)

지금까지 QR 오더 앱 소개였습니다.
