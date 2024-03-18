// mermaidMode.js
// TODO: 이 부분을 mermaid 문법에 따라 erd에 쓰이는 것들을 하이라이팅 하는 코드로 변경해야 합니다.
// customMermaidTheme.css 파일에 같은 이름의 클래스를 만들어서 스타일을 적용하면 됩니다.

export function mermaidMode(CodeMirror) {
  CodeMirror.defineMode("mermaid", function () {
    return {
      startState: function () {
        return {
          inClass: false,
          inProperty: false,
          inType: false,
        };
      },
      token: function (stream, state) {
        // 공백을 기준으로 처리를 시작합니다.
        if (stream.eatSpace()) return null;

        // 'class' 키워드 처리
        if (stream.match("class")) {
          state.inClass = true;
          return "keyword"; // 'keyword' 스타일 적용
        }

        // 'class' 다음에 나오는 단어(클래스명) 처리
        if (state.inClass) {
          if (stream.match(/^\w+/)) {
            state.inClass = false; // 클래스명이 끝나면 상태를 리셋합니다.
            return "class-name"; // 'class-name' 스타일 적용
          }
        }

        // 속성과 타입 처리
        if (stream.match(/^\+?(String|Integer|DateTime)\b/)) {
          return "type"; // 'type' 스타일 적용
        }

        // '+' 기호로 시작하는 속성명 처리
        if (stream.match(/^\+\w+/)) {
          return "property"; // 'property' 스타일 적용
        }

        // '->' 연결선 처리
        if (stream.match("->")) {
          return "link"; // 'link' 스타일 적용
        }

        // 기타 모든 텍스트는 기본 처리
        stream.next();
        return null;
      },
    };
  });
}
