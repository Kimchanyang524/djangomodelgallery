import os
import json
import glob


def read_file(file):
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def parse_contributor(line, lines):
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
    social = {}
    for social_line in lines:
        social_line = social_line.strip()
        if social_line:
            key, value = social_line.split(":", 1)
            social[key.strip()] = value.strip()
        else:
            break
    return social

def write_file(content):
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


def main():
    '''
    
    '''
    json_data = []
    for file_path in glob.glob("src/posts/*.md"):
        content = read_file(file_path)
        json_data.append(write_file(content))
    with open("src/postsList/postsList-Demo.json", "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":

    main()
