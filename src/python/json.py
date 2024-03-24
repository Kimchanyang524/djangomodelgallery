# 이 프로그램은 파일 위치를 받아서 그 파일의 내용을 읽어서 JSON 형식으로 출력하는 프로그램이다.
# 이 프로그램은 다음과 같이 사용할 수 있다.
# python json.py /etc/passwd
# python json.py /etc/hosts
# python json.py /etc/hosts /etc/passwd
# python json.py /etc/hosts /etc/passwd /etc/hosts
# python json.py /etc/hosts /etc/passwd /etc/hosts /etc/passwd
# 이 프로그램은 다음과 같이 동작한다.
# 1. 파일 위치를 받는다.
# 2. 파일을 읽어서 JSON 형식으로 출력한다.
# 3. 파일이 없으면 에러 메시지를 출력한다.
# 4. 파일이 여러 개 있으면 여러 개의 파일을 읽어서 JSON 형식으로 출력한다.
# 5. 파일이 여러 개 있으면 파일 이름을 출력한다.

import sys
import json
import os


def read_file(file):
    if os.path.exists(file):
        with open(file, "r") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def main():
    files = sys.argv[1:]
    if len(files) == 0:
        print("Usage: python json.py <file1> <file2> ...")
        sys.exit(1)

    result = {}
    for file in files:
        result[file] = read_file(file).split()
    print(json.dumps(result, indent=4))


if __name__ == "__main__":

    main()
