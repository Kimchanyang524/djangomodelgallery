import os
import json
import glob


def read_file(file):
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def write_file(content):
    """
    마크다운 파일의 내용을 파싱하여 딕셔너리 형태로 반환하는 함수입니다.

    Args:
        content (str): 마크다운 파일의 전체 내용을 담고 있는 문자열

    Returns:
        dict: 파싱된 데이터를 담고 있는 딕셔너리



    이 함수는 다음과 같은 단계를 거쳐 작동합니다:

    1. 입력된 문자열을 줄바꿈 문자('\\n')를 기준으로 분리하여 리스트로 만듭니다.
    2. 각 줄에 대해 다음과 같은 작업을 수행합니다:
        - 줄의 시작과 끝에 있는 공백 문자를 제거합니다.
        - 콜론(':')이 포함되어 있다면, 콜론을 기준으로 키와 값을 분리합니다.
        - 분리된 키와 값에서 공백 문자를 제거합니다.
        - 키에 따라 적절한 값을 data 딕셔너리에 할당합니다.
        - 'contributor' 키의 경우, parse_contributor 함수를 호출하여 contributor 정보를 파싱합니다.
    3. 파싱이 완료된 data 딕셔너리를 반환합니다.

    예를 들어, 다음과 같은 마크다운 파일의 내용이 입력되었을 때:

        id: 001
        title: Django Blog Post Model
        date: 2023-06-01
        category: Blog
        modelCount: 1
        tags: - Django - Model - Blog - Post
        fileName: 001_django-blog-post-model.md
        contributor:
            name: John Doe
            social:
                github: https://github.com/johndoe
                twitter: https://twitter.com/johndoe

    함수는 다음과 같은 딕셔너리를 반환합니다:

    {
        "id": "001",
        "title": "Django Blog Post Model",
        "date": "2023-06-01",
        "category": "Blog",
        "modelCount": 1,
        "tags": ["Django", "Model", "Blog", "Post"],
        "fileName": "001_django-blog-post-model.md",
        "contributor": {
            "name": "John Doe",
            "social": {
                "github": "https://github.com/johndoe",
                "twitter": "https://twitter.com/johndoe"
            }
        }
    }
    
    다만 현재, 줄바꿈을 기준으로 분리하기 떄문에 tags와 contributor가 정상적으로 출력되지 않습니다.
    """
    data = {}
    lines = content.split("\n")
    for line in lines:
        line = line.strip()
        if ":" in line:
            key, value = line.split(":", 1)
            key, value = key.strip(), value.strip()
            match key:
                case "id":
                    data["id"] = value
                case "title":
                    data["title"] = value
                case "date":
                    data["date"] = value
                case "category":
                    data["category"] = value
                case "modelCount":
                    data["modelCount"] = int(value)
                case "tags":
                    data["tags"] = [tag.strip() for tag in value.split("-") if tag.strip()]
                    print(data["tags"], value)
                case "fileName":
                    data["fileName"] = value
                case "contributor":
                    data["contributor"] = parse_contributor(value, lines)
    return data


def parse_contributor(line, lines):
    '''
        Contributor 정보를 파싱하는 함수입니다.

    Args:
        line (str): "contributor:" 문자열이 포함된 라인
        lines (list): 전체 파일의 라인들로 구성된 리스트

    Returns:
        dict: contributor 정보를 담고 있는 딕셔너리
    
    Contributor는 여러 명일 수 있으므로, 이 함수는 딕셔너리 형태로 파싱합니다.
    예를 들어, 다음과 같은 입력이 있을 때:
    
        contributor:
            name: John Doe
            social:
                github: https://github.com/johndoe
                twitter: https://twitter.com/johndoe
                
    결과는 다음과 같은 딕셔너리가 됩니다:
    {
        "name": "John Doe",
        "social": {
            "github": "https://github.com/johndoe",
            "twitter": "https://twitter.com/johndoe"
        }
    }
    
    Contributor 섹션 내에서 "name:" 라인이 나오면 name 키에 값을 할당하고,
    "social:" 라인이 나오면 parse_social 함수를 호출하여 social 정보를 파싱합니다.
    빈 줄이 나오면 contributor 섹션이 끝난 것으로 간주하고 파싱을 종료합니다.
    '''
    contributor = {}
    for contributor_line in lines[lines.index(line) + 1:]:
        contributor_line = contributor_line.strip()
        match contributor_line.split(":", 1):
            case ["name", value]:
                contributor["name"] = value.strip()
            case ["social", _]:
                contributor["social"] = parse_social(lines[lines.index(contributor_line) + 1:])
            case _:
                break
    return contributor


def parse_social(lines):
    """
    Social 계정 정보를 파싱하는 함수입니다.

    Args:
        lines (list): social 섹션의 라인들로 구성된 리스트

    Returns:
        dict: social 계정 정보를 담고 있는 딕셔너리
    
    Social 계정은 여러 개일 수 있으므로, 딕셔너리 형태로 파싱합니다.
    예를 들어, 다음과 같은 입력이 있을 때:
    
        social:
            github: https://github.com/johndoe
            twitter: https://twitter.com/johndoe
            
    결과는 다음과 같은 딕셔너리가 됩니다:
    {
        "github": "https://github.com/johndoe",
        "twitter": "https://twitter.com/johndoe"
    }
    
    빈 줄이 나오면 social 섹션이 끝난 것으로 간주하고 파싱을 종료합니다.
    """
    social = {}
    for social_line in lines:
        social_line = social_line.strip()
        if social_line:
            key, value = social_line.split(":", 1)
            social[key.strip()] = value.strip()
        else:
            break
    return social


def main():
    '''
    src/posts의 md file을 모두 읽어내어 json 파일로 변환
    '''
    json_data = []
    for file_path in glob.glob("src/posts/*.md"):
        content = read_file(file_path)
        json_data.append(write_file(content))
    with open("src/postsList/postsList-Demo.json", "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":

    main()
