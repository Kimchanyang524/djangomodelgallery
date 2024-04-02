import os
import glob


def read_file(file):
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def main():
    for file_path in glob.glob("src/posts/*.md"):
        content = read_file(file_path)
        print(content)


if __name__ == "__main__":

    main()
